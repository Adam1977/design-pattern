// 构造函数模式
function Animals(name, age) {
  this.name = name;
  this.age = age;
  this.output = function () {
    console.log(`This is a ${this.name}, it\`s ${this.age} years old`);
  };
}

let cat = new Animals("cat", 2);
cat.output(); // This is a cat, it`s 2 years old

// 混合模式
function Dog(name, age, weight) {
  Animals.call(this, name, age);
  this.weight = weight;
}

Dog.prototype = new Animals();
Dog.prototype.getWeight = function () {
  console.log("体重为: ", this.weight);
};

let dog = new Dog("dog", 1, 10);
dog.output(); // This is a dog, it`s 1 years old
dog.getWeight(); // 体重为: 10
