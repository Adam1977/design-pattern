// 单例模式
var single = (function () {
  let instance;
  console.log(instance)
  function getInstance() {
    if (instance === undefined) {
      instance = new Construct();
    }
    return instance;
  }
  function setName(name) {
    this.name = name;
  }
  function Construct() {
    this.name = "小民";
    this.setName = setName;
  }
  return {
    getInstance: getInstance,
  };
})();

let xiaoming = single.getInstance();
console.log(xiaoming); // Construct { name: '小民', setName: [Function: setName] }
console.log(xiaoming.name); // 小民
xiaoming.setName("小明");
console.log(xiaoming); // Construct { name: '小明', setName: [Function: setName] }
console.log(xiaoming.name); // 小明

let xiaoming2 = single.getInstance();
console.log(xiaoming2.name); // 小明