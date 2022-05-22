/*
 * @Descripttion: free
 * @version: 1.1
 * @Author: VLOU
 * @Date: 2022-05-22 16:28:38
 * @LastEditors: VLOU
 * @LastEditTime: 2022-05-22 16:32:24
 */


const obj = {
  a: {b:{c:2}}
}
const startTime = new Date().getTime()
const a = Reflect.get(obj,'a')
const endTime = new Date().getTime()
console.log('a==', '执行时间=='+(endTime - startTime), a)
