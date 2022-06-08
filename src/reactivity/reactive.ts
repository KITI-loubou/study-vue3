/*
 * @Descripttion: free
 * @version: 1.1
 * @Author: VLOU
 * @Date: 2022-05-22 15:04:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-08 23:49:29
 */

import { mutableHandlers, readonlyHandlers } from './baseHandlers'

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly'
}

export function reactive(raw) {
  return createProxy(raw, mutableHandlers)
}

export function readonly(raw) {
  return createProxy(raw, readonlyHandlers)
}

export function isReactive(value) {
  // !! 将undefined转boolean
  return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY];
}

function createProxy(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}
