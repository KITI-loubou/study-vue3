/*
 * @Author: VLOU
 */
import { effect, stop } from '../effect'
import { reactive } from '../reactive';

describe('effect', () => {
  it.skip('runner', () => {
    let foo = 10;
    const runner = effect(() => {
      foo++;
      return 'foo'
    })

    expect(foo).toBe(11)
    const r = runner()
    expect(foo).toBe(12)
    expect(r).toBe('foo')
  })

  it.skip('scheduler', () => {
    let dummy;
    let run: any;
    const scheduler = jest.fn(() => {
      run = runner
    })
    const obj = reactive({ foo: 1 })
    const runner = effect(() => {
      dummy = obj.foo
    }
      , { scheduler })

    expect(scheduler).not.toHaveBeenCalled() // 没有被执行
    expect(dummy).toBe(1); // effect是否有执行
    obj.foo++; // 触发依赖，执行effect
    expect(scheduler).toHaveBeenCalledTimes(1); // 被调用一次
    // 也就是触发依赖的时候会执行scheduler不会执行effect里的function
    expect(dummy).toBe(1)
    // 执行run的时候再次执行effect的function
    run()
    expect(dummy).toBe(2)
  })

  it.skip('stop', () => {
    let dummy;
    const obj = reactive({
      props: 1
    })

    const runner = effect(() => {
      dummy = obj.props + 1
    })

    obj.props = 3
    expect(dummy).toBe(4)
    stop(runner)
    obj.props = 4
    expect(dummy).toBe(4)
    runner()
    expect(dummy).toBe(5)
  })

  it('onStop', () => {
    const obj = reactive({
      foo: 1
    })

    const onStop = jest.fn(()=>{
      console.log('执行onStop')
    })
    let dummy;
    const runner = effect(() => {
      dummy = obj.foo;
    }, { onStop })

    stop(runner)
    expect(onStop).toBeCalledTimes(1)

  })
})