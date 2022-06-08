/*
 * @Author: VLOU
 */

import { readonly, isReadonly } from "../reactive"

describe('readonly', () => {
  it('happy path', () => {
    const origin = { foo: 1, bar: { baz: 2 } }
    const wrapped = readonly(origin)
    expect(wrapped).not.toBe(origin)
    expect(wrapped.foo).toBe(1)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(origin)).toBe(false)
  })

  it('readonly warn', () => {
    console.warn = jest.fn()
    const user = readonly({age:1})
    user.age++

    expect(console.warn).toBeCalled()
  })
})