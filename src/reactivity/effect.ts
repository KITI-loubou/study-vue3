import { extend } from '../shared/index'


// 构建容器收集依赖
const targetMap = new Map()
// 当前执行的ReactiveEffect
let activeEffect: ReactiveEffect | undefined;
let shouldTrack: boolean;
let isRun:boolean;

class ReactiveEffect {
  private _fn: any;
  onStop?: () => void;
  active = true; // 防止多次调用stop带来性能问题
  deps: any[] = []; // dep也就是存收集起来的effect，它是Set
  // 这里加public为了外部能够直接使用,也就是effect.scheduler
  public scheduler: Function | undefined;
  constructor(fn, scheduler?: Function) {
    this._fn = fn
    this.scheduler = scheduler
  }

  run() {
    let result;
    // 判断当前时候在执行作用域函数
    isRun = true
    if (!this.active) {
      result = this._fn()
      isRun = false
      return result
    }

    activeEffect = this
    shouldTrack = true

    result = this._fn()

    shouldTrack = false
    isRun = false

    return result
  }

  stop() {
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

// 5.收集依赖
export function TrackEvent(target, key) {
  if (!activeEffect || !shouldTrack) return;
  //一个目标对象target对应一个key,一个key对应一个容器dep
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  if (dep.has(activeEffect)) return
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

// 7.触发依赖
export function TriggerEvent(target, key) {
  const depsMap = targetMap.get(target)
  const dep = depsMap.get(key)

  for (const effect of dep) {
    if (!isRun) { // 修复死循环，在当前作用域内就不在触发
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      // 8.执行effect作用域函数更新数据
      effect.run()
    }
    }
  }
}

// 清除effect
export function cleanupEffect(effect) {
  effect.deps.forEach(dep => {
    dep.delete(effect)
  })
}

export function stop(runner) {
  runner.effect.stop()
}

export function effect(fn, options: any = {}) {

  // 初始化schedule函数
  const scheduler = options?.scheduler
  const _effect = new ReactiveEffect(fn, scheduler)

  extend(_effect, options)

  _effect.run()

  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}