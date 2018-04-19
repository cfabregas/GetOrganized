import Store from 'store'

function __resetData (tableName) {
  Store[tableName].total = 0
  Store[tableName].hasNext = true
  Store[tableName].lastQuery = null
  Store[tableName].list = []
  Store[tableName].dict = {}

  console.log(`${tableName} reseted`, Store[tableName])
}

function _findData (tableName, query, data) {
  if (data.meta.offset === 0) {
    __resetData(tableName)
  }

  Store[tableName].total = data.meta.total_count
  Store[tableName].hasNext = !!data.meta.next
  Store[tableName].lastQuery = query

  for (let item of data.objects) {
    Store[tableName].list.push(item)
    Store[tableName].dict[item.id] = item
  }

  console.log(`${tableName} committed`, Store[tableName])
}

export default {
  _findData
}
