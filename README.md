# design-pattern
Web design pattern

### 常用设计模式

1. 单例模式
   定义: 这种设计模式的思想是确保一个类只有唯一实例，
   一般用于全局缓存，比如全局 window，唯一登录浮窗等。采用闭包的方式实现

   ```js
   // 单例模式
   var single = (function () {
     let instance
     // 如果该实例存在，则直接返回，否则就对其实例化
     function getInstance() {
       if (instance === undefined) {
         instance = new Construct()
       }
       return instance
     }
     function setName(name) {
       this.name = name
     }
     function Construct() {
       this.name = '小民'
       this.setName = setName
     }
     return {
       getInstance: getInstance
     }
   })()

   let xiaoming = single.getInstance()
   console.log(xiaoming) // Construct { name: '小民', setName: [Function: setName] }
   console.log(xiaoming.name) // 小民
   xiaoming.setName('小明')
   console.log(xiaoming) // Construct { name: '小明', setName: [Function: setName] }
   console.log(xiaoming.name) // 小明
   ```

2. 工厂模式
   定义：工厂模式是创建对象的常用设计模式，为了不暴露创建对象的具体逻辑，将逻辑封装在一个函数中，这个函数就称为一个工厂。
   本质上是一个负责生产对象实例的工厂。工厂模式根据抽象程度的不同可以分为：简单工厂，工厂方法和抽象工厂。通常用于根据权限生成角色的场景

   ```js
   // 安全模式创建的工厂方法函数
   let UserFactory = function (role) {
     if (this instanceof UserFactory) {
       console.log(111)
       var s = this[role] ? new this[role]() : new UserFactory('NormalUser')
       return s
     } else {
       console.log(222)
       return new UserFactory(role)
     }
   }
   // 工厂方法函数的原型中设置所有对象的构造函数
   UserFactory.prototype = {
     SuperAdmin: function () {
       this.name = '超级管理员'
       this.viewPage = ['首页', '用户', '报表', '权限']
     },
     Admin: function () {
       this.name = '管理员'
       this.viewPage = ['首页', '用户', '报表']
     },
     NormalUser: function () {
       this.name = '普通用户'
       this.viewPage = ['首页', '报表']
     }
   }
   // 调用
   let superAdmin = UserFactory('SuperAdmin')
   let admin = UserFactory('Admin')
   let normalUser = UserFactory('NormalUser')
   console.log(superAdmin) // SuperAdmin { name: '超级管理员', viewPage: [ '首页', '用户', '报表', '权限' ] }
   console.log(admin) // Admin { name: '管理员', viewPage: [ '首页', '用户', '报表' ] }
   console.log(normalUser) // NormalUser { name: '普通用户', viewPage: [ '首页', '报表' ] }
   let other = UserFactory('other')
   console.log(other)

   /**
    * 注意这里
    * Output
    * 222
    * 111
    * 222
    * 111
    * 222
    * 111
    * SuperAdmin { name: '超级管理员', viewPage: [ '首页', '用户', '报表', '权限' ] }
    * Admin { name: '管理员', viewPage: [ '首页', '用户', '报表' ] }
    * NormalUser { name: '普通用户', viewPage: [ '首页', '报表' ] }
    * 222
    * 111
    * 111
    * NormalUser { name: '普通用户', viewPage: [ '首页', '报表' ] }
    */
   ```

3. 策略模式
   定义：策略模式的本意将算法的使用与算法的实现分离开来，避免多重判断调用哪些算法。
   适用于有多个判断分支的场景，如解决表单验证的问题。你可以创建一个 validator 对象，有一个 validate()方法。这个方法被调用时不用区分具体的表单类型，它总是会返回同样的结果——一个没有通过验证的列表和错误信息。

   ```js
   // 策略模式
   // vip客户
   let vipPrice = function () {
     this.discount = 0.5
   }
   vipPrice.prototype.getPrice = function (price) {
     return price * this.discount
   }
   // 老客户
   let oldPrice = function () {
     this.discount = 0.8
   }
   oldPrice.prototype.getPrice = function (price) {
     return price * this.discount
   }
   // 普通用户
   let normaldPrice = function () {
     this.discount = 1
   }
   normaldPrice.prototype.getPrice = function (price) {
     return price * this.discount
   }

   // 上下文，对于客户端的使用
   function Context() {
     this.name = ''
     this.strategy = null
     this.price = 0
   }
   Context.prototype.set = function (name, strategy, price) {
     this.name = name
     this.strategy = strategy
     this.price = price
   }
   Context.prototype.getResult = function () {
     console.log(
       `原价为: ${this.price}, ${this.name}的结账价为: ${this.strategy.getPrice(
         this.price
       )}`
     )
   }
   let context = new Context()
   let vip = new vipPrice()
   context.set('vip客户', vip, 200)
   context.getResult() // 原价为: 200, vip客户的结账价为: 100
   let old = new oldPrice()
   context.set('老客户', old, 200)
   context.getResult() // 原价为: 200, 老客户的结账价为: 160
   let normal = new normaldPrice()
   context.set('普通客户', normal, 200)
   context.getResult() // 原价为: 200, 普通客户的结账价为: 200
   ```

4. 代理模式
   定义:代理模式是为其他对象提供一种代理，也就是当其他对象直接访问该对象时，如果开销较大，就可以通过这个代理层控制对该对象的访问。
   常见的使用场景为懒加载，合并 http 请求和缓存。

   ```js
   // 代理模式
   // 代理函数
   function Proxy(realSubject) {
     this.realSubject = realSubject
   }
   Proxy.prototype.request = function () {
     console.log('---proxy request---')
     this.realSubject.request()
   }

   // 目标函数
   function subject() {}
   subject.prototype.request = function () {
     console.log('---subject request---')
   }

   let proxy = new Proxy(new subject())
   console.log(proxy.request())
   /**
    * Output
    * ---proxy request---
    * ---subject request---
    */
   ```

5. 观察者模式(也叫发布订阅模式)
   定义：在这种模式中，一个订阅者订阅发布者，当一个特定的事件发生的时候，发布者会通知（调用）所有的订阅者。

   ```js
   // 观察者模式 or 发布订阅模式
   let EventCenter = (function () {
     let events = {}
     function on(event, handler) {
       events[event] = events[event] || []
       events[event].push({
         handler: handler
       })
     }
     function fire(event, ...args) {
       if (!events[event]) return
       for (let i = 0; i < events[event].length; i++) {
         events[event][i].handler(...args)
       }
     }
     function off(event) {
       delete events[event]
     }
     return {
       on: on,
       fire: fire,
       off: off
     }
   })()

   EventCenter.on('listen', (data) => {
     console.log('listen is ready---', data)
   })
   EventCenter.on('listen', (data, other) => {
     console.log('listen is ready2---', data, other)
   })

   EventCenter.fire('listen', { ll: 123, b: 333 }, 'other')

   /**
    * Output
    * listen is ready--- { ll: 123, b: 333 }
    * listen is ready2--- { ll: 123, b: 333 } other
    */
   ```

6. 模块模式
   定义: 模块模式可以指定类想暴露的属性和方法，并且不会污染全局。采用闭包的形式。

   ```js
   // 模块模式
   let Person = function () {
     let name = 'xiaomei'
     function sayName() {
       console.log(name)
     }
     return {
       name: name,
       sayName: sayName
     }
   }

   let xiaomei = new Person()
   console.log(xiaomei.name) // xiaomei
   xiaomei.sayName() // xiaomei
   ```

7. 构造函数模式 and 混合模式
   定义：构造函数和混合模式就是 js 中继承的两种实现方式，
   构造函数: 通过构造函数的形式定义类，通过 new 新增实例。
   混合模式: 将构造函数的引用属性和方法放到其原型上，子类是父类原型的一个实例。

   ```js
   // 构造函数模式
   function Animals(name, age) {
     this.name = name
     this.age = age
     this.output = function () {
       console.log(`This is a ${this.name}, it\`s ${this.age} years old`)
     }
   }

   let cat = new Animals('cat', 2)
   cat.output() // This is a cat, it`s 2 years old

   // 混合模式
   function Dog(name, age, weight) {
     Animals.call(this, name, age)
     this.weight = weight
   }

   Dog.prototype = new Animals()
   Dog.prototype.getWeight = function () {
     console.log('体重为: ', this.weight)
   }

   let dog = new Dog('dog', 1, 10)
   dog.output() // This is a dog, it`s 1 years old
   dog.getWeight() // 体重为: 10
   ```
