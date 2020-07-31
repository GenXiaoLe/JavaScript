// indexDB.js
class IndexDB {
  constructor() {
    this.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
    this.personStore = 'LBM'
    this.LBMDB = null
  }

  // 初始化IndexDB
  DBinstall(cb) {
    const that = this
    if (!this.indexedDB) {
      console.log('你的浏览器不支持IndexedDB')
    } else {
      console.log('你的浏览器支持IndexedDB')
    }
    console.log('成功初始化IndexDB')
    // 打开数据库第一个为DB名字 第二个为DB版本
    const IDBOpenDBRequest = this.indexedDB.open(this.personStore, 1)

    // 3. 对打开数据库的事件进行处理
    // 打开数据库成功后，自动调用onsuccess事件回调。
    IDBOpenDBRequest.onsuccess = (e) => {
      console.log('e------>数据库打开成功', e)
      // 
      that.LBMDB = e.target.result
      cb()
    }

    // 打开数据库失败
    IDBOpenDBRequest.onerror = (e) => {
      console.log(e.currentTarget.error.message)
    }

    // 第一次打开成功后或者版本有变化自动执行以下事件：一般用于初始化数据库。
    IDBOpenDBRequest.onupgradeneeded = (e) => {
      that.LBMDB = e.target.result // 获取到 demoDB对应的 IDBDatabase实例,也就是我们的数据库。
      console.log('this.LBMDB-----1---->', that.LBMDB)
      if (!that.LBMDB.objectStoreNames.contains(that.personStore)) {
        // 如果表格不存在，创建一个新的表格（keyPath，主键 ； autoIncrement,是否自增），会返回一个对象（objectStore）
        // objectStore就相当于数据库中的一张表。IDBObjectStore类型。
        that.LBMDB.createObjectStore(that.personStore, {
          keyPath: 'field'
          // autoIncrement: true
        })
      }
    }
  }

  // 插入一个字段
  /**
   *
   * @param {*} data
   *     data : {
   *       field : '表名字段',
   *       value: {} , // 插入数据信息  Object
   *     }
   * @param {*} cb
   */
  DBAddData(data, cb) {
    // 创建一个事务，类型：IDBTransaction，文档地址： https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction
    console.log('data--1-->', data.data)
    if (!this.LBMDB) return
    if ((!data.data) instanceof Object) {
      console.log('入参仅支持Object类型')
      return
    }
    console.log(this.personStore)
    const transaction = this.LBMDB.transaction(this.personStore, 'readwrite')
    // 通过事务来获取IDBObjectStore
    const store = transaction.objectStore(this.personStore)
    // 获取当前字段
    const request = store.get(data.data.field)
    const field = data.data.field
    console.log('request---->', request)
    // 字段获取成功
    request.onsuccess = (e) => {
      const keys = e.target.result || { field, data: [] }
      console.log('keys---1----', keys)
      const newList = Array.isArray(keys.data) ? keys.data.concat([data.data]) : [keys.data].concat([data.data])
      data.data = newList
      console.log('data--3--->', data)

      // 如果不是第一次添加数据 则走更新
      if (data.data.length > 1) {
        this.updateDataByKey(field, data.data, cb)
        return
      }

      // 往store表中添加数据
      // return
      const addPersonRequest = store.add({ field, data: data.data })
      console.log('addPersonRequest----->', addPersonRequest)
      // 监听添加成功事件
      addPersonRequest.onsuccess = (e) => {
        const keys = e.target.result
        console.log('keys---->', keys) // 打印添加成功数据的 主键（id）
        if (typeof cb === 'function') {
          return cb(keys)
        }
      }
      // 监听失败事件
      addPersonRequest.onerror = (e) => {
        console.log('DBAdd----', e.target.error)
      }
    }
    // console.log('keys---2----', JSON.stringify(keys))
    console.log('store------', store)
  }

  // 获取字段
  getDataByKey(field, cb) {
    if (!this.LBMDB) return
    console.log('value------>', field)
    const transaction = this.LBMDB.transaction(this.personStore, 'readwrite')
    const store = transaction.objectStore(this.personStore)
    const request = store.get(field)
    console.log('request---->', request)
    request.onsuccess = (e) => {
      const keys = e.target.result
      console.log('keys----> get', keys)
      if (typeof cb === 'function') {
        return cb(!keys ? [] : keys.data)
      }
    }
  }

  // 删除字段
  deleteDataByKey(key) {
    if (!this.LBMDB) return
    const transaction = this.LBMDB.transaction(this.personStore, 'readwrite')
    const store = transaction.objectStore(this.personStore)
    const request = store.delete(key)
    console.log('request---->', request)
    request.onsuccess = (e) => {
      console.log('数据删除成功')
    }
  }

  // 更新字段
  updateDataByKey(field, value, cb) {
    if (!this.LBMDB) return
    const transaction = this.LBMDB.transaction(this.personStore, 'readwrite')
    const store = transaction.objectStore(this.personStore)
    const request = store.get(field)
    console.log('request---->', request)
    request.onsuccess = (e) => {
      const keys = e.target.result
      keys.data = value
      // keys[field] = value
      store.put(keys)
      console.log('更新成功 ->>>>>>>>>', keys, value)
      if (typeof cb === 'function') {
        return cb(keys)
      }
    }
  }

  // 删除关闭数据库
  closeDB() {
    this.indexedDB.deleteDatabase(this.personStore);
    this.LBMDB.close();
    console.log('删除成功')
  }
}
