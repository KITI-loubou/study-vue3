/*
 * @Descripttion: free
 * @version: 1.1
 * @Author: VLOU
 * @Date: 2022-05-22 15:01:55
 * @LastEditors: VLOU
 * @LastEditTime: 2022-05-22 15:05:14
 */

import { reactive } from '../reactive'

describe('reactive', () => {
  it('happy path', () => {
    const original = { foo: 1 }

    const observed = reactive(original)

    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)

  })
})