// 代理模式
// 代理函数
function Proxy(realSubject) {
  this.realSubject = realSubject;
}
Proxy.prototype.request = function () {
  console.log("---proxy request---");
  this.realSubject.request();
};

// 目标函数
function subject() {}
subject.prototype.request = function () {
  console.log("---subject request---");
};

let proxy = new Proxy(new subject());
console.log(proxy.request());

/**
 * Output
 * ---proxy request---
 * ---subject request---
 */
