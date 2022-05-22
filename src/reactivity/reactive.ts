/*
 * @Descripttion: free
 * @version: 1.1
 * @Author: VLOU
 * @Date: 2022-05-22 15:04:16
 * @LastEditors: VLOU
 * @LastEditTime: 2022-05-22 16:19:27
 */
import { TrackEvent, TriggerEvent } from "./effect"

export function reactive(raw){
  return new Proxy(raw, {
    get(target, key){
      // console.log('receiver-Proxy或者继承Proxy的对象==', receiver)
      const res = Reflect.get(target, key)

      // TODO依赖收集
      TrackEvent(target, key)
      return res
    },
    set(target, key, value){
      // 如果target对象中指定了getter，receiver则为getter调用时的this值。
      const res = Reflect.set(target, key, value)
      
      // TODO触发依赖
      TriggerEvent(target, key)
      return res
    }
  })
}