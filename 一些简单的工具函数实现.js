#### 持续更新一些工具函数实现

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
