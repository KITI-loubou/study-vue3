
class ReactiveEffect {
  private _fn: any;
  // 这里加public为了外部能够直接使用,也就是effect.scheduler
  constructor(fn, public scheduler?) {
    this._fn = fn
  }

  run() {
    activeEffect = this
    return this._fn()
  }
}

// 构建容器收集依赖
const targetMap = new Map()
// 当前执行的ReactiveEffect
let activeEffect;

// 收集依赖
export function TrackEvent(target, key) {
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

  dep.add(activeEffect)
}

// 触发依赖
export function TriggerEvent(target, key) {
  const depsMap = targetMap.get(target)
  const dep = depsMap.get(key)

  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}


export function effect(fn, options: any = {}) {

  // 初始化schedule函数
  const scheduler = options?.scheduler
  const _effect = new ReactiveEffect(fn, scheduler)

  _effect.run()

  const runner = _effect.run.bind(_effect)
  return runner
}