import store from 'store'

function __resetData (tableName) {
  store[tableName].total = 0
  store[tableName].hasNext = true
  store[tableName].lastQuery = null
  store[tableName].list = []
  store[tableName].dict = {}

  console.log(`${tableName} reseted`, store[tableName])
}

function _findData (tableName, query, data) {
  if (data.meta.offset === 0) {
    __resetData(tableName)
  }

  store[tableName].total = data.meta.total_count
  store[tableName].hasNext = !!data.meta.next
  store[tableName].lastQuery = query

  for (let item of data.objects) {
    store[tableName].list.push(item)
    store[tableName].dict[item.id] = item
  }

  console.log(`${tableName} committed`, store[tableName])
}

export default {
  _findData
}
