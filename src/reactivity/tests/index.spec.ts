import { reactive } from '../reactive'
import { effect } from '../effect'

describe('effect', () => {

  it('happy path', () => {
    const user = reactive({
      age: 10,
      name: 'vlou'
    })

    let nextAge;
    let name;
    effect(()=>{
      nextAge = user.age + 1
      name = user.name
    })

    expect(nextAge).toBe(11)
    expect(name).toBe('vlou')
    
    user.age++
    
    user.name = '皮皮'
    
    expect(nextAge).toBe(12)
    expect(name).toBe('皮皮')
  })

  it('runner', ()=>{
    let foo = 10;
    const runner = effect(()=>{
      foo++;
      return 'foo'
    })

    expect(foo).toBe(11)
    const r = runner()
    expect(foo).toBe(12)
    expect(r).toBe('foo')
  })
})