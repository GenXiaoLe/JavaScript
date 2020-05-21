// 双指针合并有序数组
// [2, 3, 8] & [1, 4, 6] => [1, 2, 3, 4, 6, 7]

// 思路 
// 1. 两个数组指针放在最后，从后向前移动，以第一个数组为基准，合并至第一个数组
// 2. 如果第一个数组的值大，则把第一个数组当前的数值放到最后，并把第一个数组的指针前移，同时总长度向前移一位
// 3. 如果第二个数值的值大，这把第二个数组当前的值放到最后，并把第二个数组的指针前移，同时总长度向前移一位
// 4. 直到某一个指针的遍历结束为止，如果第一个数组先结束，则证明第二个数组都是最小的值，直接插到第一个数组最前面。反之不用做处理

function _arrSort(arrOne, arrTwo) {
  // 数组1的长度
  let n = arrOne.length;
  // 数组2的长度
  let m = arrTwo.length;
  // 合成后数组的长度
  let k = n + m - 1;
  
  while (n >= 0 && m >= 0) {
    
    if (arrOne[n] > arrTwo[m]) {
      arrOne[k] = arrOne[n];
      n--;
    } else {
      arrOne[k] = arrTwo[m];
      m--;
    }
    k--;
    
  }
  
  while (m >= 0) {
  
    arrOne[k] = arrTwo[m];
    m--;
    k--;
  
  }
  
  return arrOne;

}

console.log(_arrSort([2, 3, 8], [1, 4, 6]))    // [1, 2, 3, 4, 6, 8]



// 双指针之指针撞针法求三个数的和为零
// [-1, 0, 1, 2, -1, -4] => [[-1, 1, 0], [-1, -1, 2]]

// 思路
// 循环数组，每次固定一个数字，然后定义双指针去遍历数组，求和
// 1. 首先对数组进行升序排序
// 2. 对数组进行遍历，如果相同的数字跳过，然后看固定的指针的数字之和是否是0
// 3. 如果和是负数 说明左侧指针数值太小，则向右移动一位。反之证明右侧数字太大，向左移动一位
// 5. 注意要查找当前指针是否和上一个的数字相同，相同需要排除重复数字
// 4. 如果正好等于0则将三个数放入输入，push进公共数组里，然后两个指针向中间靠拢，继续寻找有无匹配到的

function _arrSum(arr) {
    let sumArr = [];
    arr = arr.sort((n, p) => n - p)
    let len = arr.length;
    
    for (let i = 0; i < arr.length - 2; i++) {
      if (i > 0 && arr[i] === arr[i - 1]) {
        continue;
      }

      let start = i + 1;
      let end = len - 1;
    
    
      while(start < end) {
        if (arr[i] + arr[start] + arr[end] > 0) {
          end--;
  
          while(start < end && arr[end] === arr[end + 1]) {
            end--;
          }
        } else if (arr[i] + arr[start] + arr[end] < 0) {
          start++;
          while(start < end && arr[start] === arr[start - 1]) {
            start++;
          }
        } else {
          sumArr.push([arr[i], arr[start], arr[end]])


          end--;
          start++;

          while(start < end && arr[start] === arr[start - 1]) {
            start++;
          }

          while(start < end && arr[end] === arr[end + 1]) {
            end--;
          }
        }
      }
    
    }
    
    return sumArr;
  
  }
  
  console.log(_arrSum([-1, 0, 1, 2, -1, -4]))    // [[-1, 0, 1], [-1, -1, 2]]
