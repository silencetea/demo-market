# 双向绑定的实现方式：
## 发布者-订阅者模式
一般通过sub，pub的方式实现数据和视图的绑定监听，更新数据的方式的通常做法是vm.set('property', value)

## 脏值检查
angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图.
最简单的方式就是通过setInterval()定时轮询监测数据变动，当然这种方式不怎么友好，angular只有在指定的事件触发时进入脏值检测，大致如下：
1、DOM事件，如用户输入文本，点击按钮等（ng-click）
2、xhr响应事件
3、浏览器location变更事件
4、timer事件（$timeout、$interval）
5、执行$digest() 或 $apply()

## 数据劫持
vue.js 采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter、getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
此外，在vue3中，将使用 ES6的 Proxy 作为其观察者机制，取代之前使用的Object.defineProperty
取代的原因可以戳[Vue3.0 尝鲜，Object.defineProperty VS Proxy](http://www.ishenping.com/ArtInfo/256477.html)，大家可以参考一下。
使用Object.defineProperty实现双向绑定的思路：
1、实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者 
2、实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数 
3、实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图 
4、mvvm入口函数，整合以上三者

参考链接： https://github.com/DMQ/mvvm