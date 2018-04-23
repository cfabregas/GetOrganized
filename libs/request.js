import { loading } from '../utils/util'
import Store from 'store'
import commit from 'commit'

// 通过查询参数(可选)批量获取相关数据，参数由各页面自行配置，规则见链接：
function findData ({
  tableName,
  query,
  limit = 20,
  offset = Store[tableName].list.length, // 默认根据本地已有数据来计算偏移量
  orderBy = 'created_at', // 默认按创建时间排序
  loadingText = '正在加载...',
  callback = {}
}) {

  /*

    指定的query格式，更多查询方法见
    https://doc.minapp.com/js-sdk/schema/query.html

    query: {
      type: 'and' || 'or',
      option: [{
        method: 'compare',
        params: ['price', '<', 1]
      }]
    }

   */

  if (Store[tableName].hasNext) {
    loading.show(loadingText)

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
      console.log(`find ${tableName} response`, res)
      commit.findData(tableName, query, res.data)
      loading.hide()
      callback.then(res)
    }, err => {
      console.log(`find ${tableName} error`, err)
      loading.hide()
      callback.catch(err)
    })
  } else {
    callback.catch('已全部加载完成')
  }
}

// 通过id精确获取单个数据
function getData ({ tableName, id, loadingText = '正在加载...', callback = {} }) {
  loading.show(loadingText)

  let table = new wx.BaaS.TableObject(tableName)

  table.get(id).then(res => {
    console.log(`get ${tableName} response`, res)
    loading.hide()
    callback.then(res)
  }, err => {
    console.log(`get ${tableName} error`, err)
    loading.hide()
    callback.catch(err)
  })
}

// 添加新的数据
function addData ({ tableName, data, loadingText = '正在保存...', callback = {} }) {
  loading.show(loadingText)

  let table = new wx.BaaS.TableObject(tableName)
  let item = table.create().set(data)

  item.save().then(res => {
    console.log(`add ${tableName} response`, res)
    loading.hide()
    callback.then(res)
  }, err => {
    console.log(`add ${tableName} error`, err)
    loading.hide()
    callback.catch(err)
  })
}

// 编辑单个数据
function updateData ({ tableName, data = {}, loadingText = '正在保存...', callback = {} }) {
  loading.show(loadingText)

  let table = new wx.BaaS.TableObject(tableName)
  let item = table.getWithoutData(data.id)

  item.set(data)

  item.update().then(res => {
    console.log(`update ${tableName} response`, res)
    loading.hide()
    callback.then(res)
  }, err => {
    console.log(`update ${tableName} error`, err)
    loading.hide()
    callback.catch(err)
  })
}

// 对于number类型的字段，实现增量编辑
function increaseData ({ tableName, data = {}, loadingText = '正在保存...', callback = {} }) {
  loading.show(loadingText)

  let table = new wx.BaaS.TableObject(tableName)
  let item = table.getWithoutData(data.id)

  item.incrementBy(data.key, data.value)

  item.update().then(res => {
    console.log(`increase ${tableName} response`, res)
    loading.hide()
    callback.then(res)
  }, err => {
    console.log(`increase ${tableName} error`, err)
    loading.hide()
    callback.catch(err)
  })
}

// 对于array类型的字段，添加元素到数组末尾
function appendData ({ tableName, data = {}, loadingText = '正在保存...', callback = {} }) {
  loading.show(loadingText)

  let table = new wx.BaaS.TableObject(tableName)
  let item = table.getWithoutData(data.id)

  item.append(data.key, data.value)

  item.update().then(res => {
    console.log(`append ${tableName} response`, res)
    loading.hide()
    callback.then(res)
  }, err => {
    console.log(`append ${tableName} error`, err)
    loading.hide()
    callback.catch(err)
  })
}

// 对于array类型的字段，删除指定元素
function removeData ({ tableName, data = {}, loadingText = '正在删除...', callback = {} }) {
  loading.show(loadingText)

  let table = new wx.BaaS.TableObject(tableName)
  let item = table.getWithoutData(data.id)

  item.remove(data.key, data.value)

  item.update().then(res => {
    console.log(`remove ${tableName} response`, res)
    loading.hide()
    callback.then(res)
  }, err => {
    console.log(`remove ${tableName} error`, err)
    loading.hide()
    callback.catch(err)
  })
}

// 删除单个数据
function deleteData ({ tableName, id, loadingText = '正在删除...', callback = {} }) {
  loading.show(loadingText)

  let table = new wx.BaaS.TableObject(tableName)

  item.delete(id).then(res => {
    console.log(`delete ${tableName} response`, res)
    loading.hide()
    callback.then(res)
  }, err => {
    console.log(`delete ${tableName} error`, err)
    loading.hide()
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
