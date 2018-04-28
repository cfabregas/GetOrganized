import Store from 'store'

// 内部方法，用于重置数据
function __resetData (tableName) {
  Store[tableName].total = 0
  Store[tableName].hasNext = true
  Store[tableName].lastQuery = null
  Store[tableName].list = []
  Store[tableName].dict = {}

  console.log(`${tableName} reseted`, Store[tableName])
}

// 仅暴露给BaaS模块更新用户数据
function _updateUserInfo (data) {
  Object.assign(Store.userInfo, data)

  console.log('user info updated', Store.userInfo)
}

/*
  以下方法与request模块一一对应
 */

function findData (tableName, query = {}, replace, data) {
  if (replace && !!Store[tableName.lastQuery]) {
    __resetData(tableName)
  }

  Store[tableName].total = data.meta.total_count
  Store[tableName].hasNext = !!data.meta.next
  Store[tableName].lastQuery = query

  for (let item of data.objects) {
    Store[tableName].list.push(item)
    Store[tableName].dict[item.id] = item
  }

  console.log(`find ${tableName} committed`, Store[tableName])
}

function addData (tableName, item, insert) {
  if (insert) {
    Store[tableName].list.unshift(item)
  } else {
    Store[tableName].list.push(item)
  }

  Store[tableName].dict[item.id] = item
  Store[tableName].total++

  console.log(`add ${tableName} committed`, Store[tableName])
}

function updateData (tableName, data) {
  let item = Store[tableName].dict[data.id]
  Object.assign(item, data)

  for (let i in Store[tableName].list) {
    if (Store[tableName].list[i].id === data.id) {
      Store[tableName].list.splice(i, 1, item)
      Store[tableName].dict[data.id] = item
    }
  }

  console.log(`update ${tableName} committed`, Store[tableName])
}

export default {
  _updateUserInfo,

  findData,
  addData,
  updateData
}
