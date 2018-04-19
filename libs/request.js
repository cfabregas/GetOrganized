import store from 'store'

// 通过查询参数(可选)批量获取相关数据，参数由各页面自行配置，规则见链接：
function findData ({
  tableName,
  query,
  limit = 20,
  offset = store[tableName].length, // 默认根据本地已有数据来计算偏移量
  orderBy = 'created_at', // 默认按创建时间排序
  callback = {}
}) {

  /*
    指定的query格式，更多查询方法见 https://doc.minapp.com/js-sdk/schema/query.html
      query: {
        type: 'and' || 'or',
        option: [{
          method: 'compare',
          params: ['price', '<', 1]
        }]
      }
   */

  let table = new wx.BaaS.TableObject(tableName)

  if (query && query.type && query.option) {
    let options = []
    for (const item of query.option) {
      let query = new wx.BaaS.Query()
      query[item.method](...item.params)
      options.push(query)
    }
    let filter = wx.BaaS.Query[query.type](...options)
    table = table.setQuery(filter)
  }

  table.limit(limit).offset(offset).orderBy(orderBy).find().then(res => {
    console.log('find response', res)
    callback.then(res)
  }, err => {
    console.log('find error', err)
    callback.catch(err)
  })
}

// 通过id精确获取单个数据
function getData (tableName, id, callback = {}) {
  let table = new wx.BaaS.TableObject(tableName)

  table.get(id).then(res => {
    console.log('get response', res)
    callback.then(res)
  }, err => {
    console.log('get error', err)
    callback.catch(err)
  })
}

// 添加新的数据
function addData ({ tableName, data, callback = {} }) {
  let table = new wx.BaaS.TableObject(tableName)
  let item = table.create().set(data)

  item.save().then(res => {
    console.log('add response', res)
    callback.then(res)
  }, err => {
    console.log('add error', err)
    callback.catch(err)
  })
}

// 编辑单个数据
function updateData ({ tableName, data = {}, callback = {} }) {
  let table = new wx.BaaS.TableObject(tableName)
  let item = table.getWithoutData(data.id)

  item.set(data)

  item.update().then(res => {
    console.log('update response', res)
    callback.then(res)
  }, err => {
    console.log('update error', err)
    callback.catch(err)
  })
}

// 对于number类型的字段，实现增量编辑
function increaseData ({ tableName, data = {}, callback = {} }) {
  let table = new wx.BaaS.TableObject(tableName)
  let item = table.getWithoutData(data.id)

  item.incrementBy(data.key, data.value)

  item.update().then(res => {
    console.log('increase response', res)
    callback.then(res)
  }, err => {
    console.log('increase error', err)
    callback.catch(err)
  })
}

// 对于array类型的字段，添加元素到数组末尾
function appendData ({ tableName, data = {}, callback = {} }) {
  let table = new wx.BaaS.TableObject(tableName)
  let item = table.getWithoutData(data.id)

  item.append(data.key, data.value)

  item.update().then(res => {
    console.log('append response', res)
    callback.then(res)
  }, err => {
    console.log('append error', err)
    callback.catch(err)
  })
}

// 对于array类型的字段，删除指定元素
function removeData ({ tableName, data = {}, callback = {} }) {
  let table = new wx.BaaS.TableObject(tableName)
  let item = table.getWithoutData(data.id)

  item.remove(data.key, data.value)

  item.update().then(res => {
    console.log('remove response', res)
    callback.then(res)
  }, err => {
    console.log('remove error', err)
    callback.catch(err)
  })
}

// 删除单个数据
function deleteData ({ tableName, id, callback = {} }) {
  let table = new wx.BaaS.TableObject(tableName)

  item.delete(id).then(res => {
    console.log('delete response', res)
    callback.then(res)
  }, err => {
    console.log('delete error', err)
    callback.catch(err)
  })
}

export default {
  findData,
  getData,
  addData,
  updateData,
  increaseData,
  appendData,
  removeData,
  deleteData
}
