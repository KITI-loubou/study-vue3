/*
 * @Descripttion: free
 * @version: 1.1
 * @Author: VLOU
 * @Date: 2022-05-22 15:01:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-08 23:45:05
 */

import { reactive, isReactive } from '../reactive'

describe('reactive', () => {
  it('happy path', () => {
    const original = { foo: 1 }

    const observed = reactive(original)

    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)

    expect(isReactive(observed)).toBe(true)
  })
})