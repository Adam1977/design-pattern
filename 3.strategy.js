// 策略模式
// vip客户
let vipPrice = function () {
  this.discount = 0.5;
};
vipPrice.prototype.getPrice = function (price) {
  return price * this.discount;
};
// 老客户
let oldPrice = function () {
  this.discount = 0.8;
};
oldPrice.prototype.getPrice = function (price) {
  return price * this.discount;
};
// 普通用户
let normaldPrice = function () {
  this.discount = 1;
};
normaldPrice.prototype.getPrice = function (price) {
  return price * this.discount;
};

// 上下文，对于客户端的使用
function Context() {
  this.name = "";
  this.strategy = null;
  this.price = 0;
}
Context.prototype.set = function (name, strategy, price) {
  this.name = name;
  this.strategy = strategy;
  this.price = price;
};
Context.prototype.getResult = function () {
  console.log(
    `原价为: ${this.price}, ${this.name}的结账价为: ${this.strategy.getPrice(
      this.price
    )}`
  );
};
let context = new Context();
let vip = new vipPrice();
context.set("vip客户", vip, 200);
context.getResult(); // 原价为: 200, vip客户的结账价为: 100
let old = new oldPrice();
context.set("老客户", old, 200);
context.getResult(); // 原价为: 200, 老客户的结账价为: 160
let normal = new normaldPrice();
context.set("普通客户", normal, 200);
context.getResult(); // 原价为: 200, 普通客户的结账价为: 200
