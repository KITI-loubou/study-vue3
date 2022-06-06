import { reactive } from '../reactive'
import { effect } from '../effect'

describe('reactivity', () => {

  it('reactivity test', () => {
    // 1.注册代理对象
    const user = reactive({
      age: 10,
      name: 'vlou'
    })

    // const user2 = reactive({
    //   age: 10,
    //   name: 'vlou'
    // })

    let nextAge;
    // let nextAge2;
    let name;
    // 2.注册作用域
    effect(()=>{
      // 3.proxy的get方法触发
      nextAge = user.age + 1
      name = user.name
      // 这里设值后会触发set又重新执行ReactiveEffect造成死循环
      // user.age = nextAge
      // nextAge2 = user2.age + 1
    })

    expect(nextAge).toBe(11)
    // expect(nextAge2).toBe(56)
    expect(name).toBe('vlou')
    
    // 6.触发proxy的get方法再触发set方法
    user.age = user.age + 1
    user.age++
    
    user.name = '皮皮'
    
    expect(nextAge).toBe(13)
    expect(name).toBe('皮皮')
  })
})