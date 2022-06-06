/*
 * @Descripttion: free
 * @version: 1.1
 * @Author: VLOU
 * @Date: 2022-05-22 15:04:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-06 23:51:58
 */

import { mutableHandlers, readonlyHandlers } from './baseHandlers'


export function reactive(raw) {
  return createProxy(raw, mutableHandlers)
}

export function readonly(raw) {
  return createProxy(raw, readonlyHandlers)
}

function createProxy(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}
