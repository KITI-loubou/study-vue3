/*
 * @Descripttion: free
 * @version: 1.1
 * @Author: VLOU
 * @Date: 2022-05-22 15:04:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-27 23:11:42
 */
import { TrackEvent, TriggerEvent } from "./effect"

export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  IS_SHALLOW = '__v_isShallow',
  RAW = '__v_raw'
}

export interface Target {
  [ReactiveFlags.SKIP]?: boolean
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.IS_READONLY]?: boolean
  [ReactiveFlags.IS_SHALLOW]?: boolean
  [ReactiveFlags.RAW]?: any
}

export function reactive(raw){
  return new Proxy(raw, {
    get(target, key){
      // console.log('receiver-Proxy或者继承Proxy的对象==', receiver)
      const res = Reflect.get(target, key)

      // 4.依赖收集
      TrackEvent(target, key)
      return res
    },
    set(target, key, value){
      // 如果target对象中指定了getter，receiver则为getter调用时的this值。
      const res = Reflect.set(target, key, value)
      
      // 触发依赖
      console.log('toRaw==', toRaw(target))
      TriggerEvent(target, key)
      return res
    }
  })
}

export function toRaw<T>(observed: T): T {
  const raw = observed && (observed as Target)[ReactiveFlags.RAW]
  return raw ? toRaw(raw) : observed
}