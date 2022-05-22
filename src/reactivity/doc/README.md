<!--
 * @Descripttion: free
 * @version: 1.1
 * @Author: VLOU
 * @Date: 2022-05-22 18:03:56
 * @LastEditors: VLOU
 * @LastEditTime: 2022-05-22 18:25:31
-->
### 整体实现effect数据更新（浅更新）

1.设置reactive返回一个proxy代理对象，在proxy内部监控数据，get收集依赖,set触发依赖

// effect在proxy值发生变化后执行的函数，更新相关的值
2.effect => 内置一个函数，在函数中使用reactive对象后对于那个数据就会被监控收集

3.当proxy值发生变化后会执行effect


