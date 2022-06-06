/*
 * @Author: VLOU
 */
import { TrackEvent, TriggerEvent } from "./effect"

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

function createGetter(isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key)

    // 4.依赖收集
    if (!isReadonly) {
      TrackEvent(target, key)
    }
    return res
  }
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)

    // 触发依赖
    TriggerEvent(target, key)
    return res
  }
}

// 考虑缓存问题，把get,抽离出来
export const mutableHandlers = {
  get,
  set
}

export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn('当前target是readonly，不能set')
    return true
  }
}
