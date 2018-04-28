let Store = {
  userInfo: {},

  // 任务列表
  task: {
    total: 0,
    hasNext: true,
    lastQuery: null,
    list: [],
    dict: {}
  },

  // 操作记录
  logs: {
    total: 0,
    hasNext: true,
    lastQuery: null,
    list: [],
    dict: {}
  },

  // 测试数据
  names: {
    total: 0,
    hasNext: true,
    lastQuery: null,
    list: [],
    dict: {}
  }
}

export default Store
