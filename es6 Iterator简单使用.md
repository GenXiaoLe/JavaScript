#### Iterator 概念
- Iterator 是 ES6 引入的一种新的遍历机制, 用于遍历数据结构元素的指针（如数据库中的游标）。


#### Iterator 用法
- 创建一个迭代器，指向当前数据结构的起始位置, 创建方法通常有这几种:
 1. 用*表示迭代器 let fun = function* ()、 fun:* () {};
 2. 用Symbol.iterator 创建 const items = ["zero", "one", "two"]; const it = items[Symbol.iterator]();
- 随后通过 next 方法进行向下迭代指向下一个位置， next 方法会返回当前位置的对象，对象包含了 value 和 done 两个属性， value 是当前属性的值， done 用于判断是否遍历结束
- 当 done 为 true 时则遍历结束

#### 例子
> 创建一个数组，每个子元素都有一个id，条件是当id能被2整除的时候，将其替换为新元素

```js

  // Iterator
  let arr = [
      { id: 1, name: '1' },
      { id: 2, name: '2' },
      { id: 3, name: '3' },
      { id: 4, name: '4' },
      { id: 5, name: '5' },
      { id: 6, name: '6' },
  ];
  let newArr = [];

  let createIterator = function* () {
      for (let i = 0; i < arr.length; i++) {
          if (arr[i].id % 2 === 0) {
              yield {id: arr[i].id * 2, name: String(arr[i].id * 2)};
          } else {
              yield arr[i];
          }
      }
  };

  let _iterator = createIterator();

  let step = function() {
      let _next = _iterator.next();

      if (!_next.done) {
          newArr.push(_next.value);
          step();
      } else {
          console.log(newArr);
      }
  };
  step();

```
