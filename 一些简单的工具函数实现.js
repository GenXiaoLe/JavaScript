#### 持续更新一些函数实现

- 根据 parent_id 形成树状图

const tree = (arr, id = 0, attribute = 'parent_id') =>
      arr
        .filter(item => item[attribute] === id)
        .map(item => ({...item, children: tree(arr, item.id)}));
        
const data = [
  {id: 1, name: 'a', parent_id: 0},
  {id: 2, name: 'b', parent_id: 0},
  {id: 3, name: 'a-1', parent_id: 1},
  {id: 4, name: 'a-2', parent_id: 1},
  {id: 5, name: 'b-1', parent_id: 2},
  {id: 6, name: 'a-2-1', parent_id: 4}
]

const newTree = tree(data);

- 基础的柯里化

let judge;
const curry = fn => {
return judge = (...args) => args.length === fn.length ? fn(...args) : (...arg) => judge(...args, ...arg);
};

const sum = (a, b, c, d, e) => a + b + c + d + e;
const currySum = curry(sum);

currySum(1)(2)(3)(4); // 10
currySum(1, 2)(3)(4); // 10
currySum(1)(2, 3)(4); // 10
