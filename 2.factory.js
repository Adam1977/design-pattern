// 工厂模式
// 安全模式创建的工厂方法函数
let UserFactory = function (role) {
  if (this instanceof UserFactory) {
    console.log(111);
    var s = this[role] ? new this[role]() : new UserFactory("NormalUser");
    return s;
  } else {
    console.log(222);
    return new UserFactory(role);
  }
};
// 工厂方法函数的原型中设置所有对象的构造函数
UserFactory.prototype = {
  SuperAdmin: function () {
    this.name = "超级管理员";
    this.viewPage = ["首页", "用户", "报表", "权限"];
  },
  Admin: function () {
    this.name = "管理员";
    this.viewPage = ["首页", "用户", "报表"];
  },
  NormalUser: function () {
    this.name = "普通用户";
    this.viewPage = ["首页", "报表"];
  },
};
// 调用
let superAdmin = UserFactory("SuperAdmin");
let admin = UserFactory("Admin");
let normalUser = UserFactory("NormalUser");
console.log(superAdmin); // SuperAdmin { name: '超级管理员', viewPage: [ '首页', '用户', '报表', '权限' ] }
console.log(admin); // Admin { name: '管理员', viewPage: [ '首页', '用户', '报表' ] }
console.log(normalUser); // NormalUser { name: '普通用户', viewPage: [ '首页', '报表' ] }
let other = UserFactory("other");
console.log(other);

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
