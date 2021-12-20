// 模块模式
let Person = function () {
  let name = "xiaomei";
  function sayName() {
    console.log(name);
  }
  return {
    name: name,
    sayName: sayName,
  };
};

let xiaomei = new Person();
console.log(xiaomei.name); // xiaomei
xiaomei.sayName(); // xiaomei
