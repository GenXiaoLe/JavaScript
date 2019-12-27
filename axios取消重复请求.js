// 使用axios自带的CancelToken方法实现重复请求过滤，只发送最后一次请求
// 对指定队列进行先删除后加入，达到相同请求只发送最后一次请求的目的

import axios from 'axios';

let pending = []; // 请求队列 内容: { url: String, cancal: Function }
const CancelToken = axios.CancelToken; // 初始化取消请求的构造函数

const removePending = (url) => {
    for (let i in pending) {
        if (pending[i].url === url) {
            pending[i].cancel(url);
            pending.splice(i, 1);
        }
    }
}

//不使用拦截器
const HTTP = (type = 'GET', url, data = {}, headers) => {
    const TOKEN = '';
    const CANCELURL = `${url}&${type}`;

    // 在一个请求发送前执行一下取消操作
    removePending(CANCELURL);

    const config = {
        method: type,
        url: url,
        headers: headers || { "Authorization": "Bearer " + TOKEN },
        cancelToken: new CancelToken(cancel => {
            // 将本次请求加入队列
            pending.push({ 
                url: CANCELURL, 
                cancel 
            });
        })
    }

    return new Promise((resolve, reject) => {
        axios(config)
        .then(response => {
            // ...请求成功后的操作
            resolve(response);
            // 执行成功后删除该队列里的值
            removePending(CANCELURL);
        })
        .catch(error => {
            if (axios.isCancel(error)) {
                consol.log(`Request canceled, ${error.message}`);
            } else {
                // ...请求失败后的操作
                reject(reject)
            }
        })
    })
}

export default HTTP;
