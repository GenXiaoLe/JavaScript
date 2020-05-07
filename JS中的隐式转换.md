### 前言
  在js中，经常看到一些判断， ``` 1 == '1' ``` 或者 ``` 1 + '1' = '11' ```, 在强类型语言中一般会抛出错误, 但在js中好像很常见, 这其实就是js中做了隐式转化处理。
  
### 什么的隐式转换
   在js中，当运算符在运算时，如果两边数据不统一，CPU就无法计算，这时我们编译器会自动将运算符两边的数据做一个数据类型转换，转成一样的数据类型再计算
   
### 常见的隐式转换的类型
  -  ```string + 其他类型``` ```+``` 在这里属于连接符, 只要左右有一边为字符串类型, 就会把另一边转化为字符串类型, 等同于String(); 或者一边为数值类型, 会把另外一边转化为数值类型, 等同于Number(). 其运算符则没有这个功能
  - ``` > <``` 会把两边转化为数值类型进行比较
  -  ``` Bolean() ``` 这类转换方法同样会进行隐式转换
  
### 例子
 ```js
 
 console.log('2' > 10) // false
 
 console.log(1 + '2') // '12'
 
 console.log(1 + true) // 2
 
 var a = new Boolean(false);
 
 if (a) {
  console.log(1);
 } else {
  console.log(2);
 }
 
 // 1
 
 console.log([] == ![]) // true;
 
 // [] 被隐式转换 toString() 转化为 ''
 // !的优先级比==高 先执行! 所以 ![] 为 false
 // '' == false 为 true
 
  let a = {
      value: 1,
      toString() {
          return this.value++;
      }
  }

  console.log(a == 1 && a == 2 && a == 3);
  // a != 2 由于 == 的隐式转换 执行toString
  
  
  console.log(false <= null && false >= null) // true
  console.log(false < null || false > null || false == null) // false
  
  // 首先== 和 < <= 之类的并不能算同一类，因为关系运算符 和 相等运算符 并不是一个类别的
  // 因为< >会把两边转化为数值型比较，所以第一个console为 console.log(0 <= 0 && 0 >= 0)，结果是true
  // 第二个是console.log(0 < 0 || 0 > 0 || false == null)， 结果为false
 
 ```
