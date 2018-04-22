const app = getApp()

Page({
  data: {
    app: ''
  },
  onLoad () {

  },
  save () {
    const tableName = 'names'

    if (app.Store[tableName].hasNext) {
      app.request.findData({
        tableName: tableName,
        query: {
          type: 'or',
          option: [{
            method: 'contains',
            params: ['name', 'test']
          }, {
            method: 'contains',
            params: ['name', 'df']
          }]
        },
        callback: {
          then: res => {
            wx.showToast({
              title: '获取成功',
              icon: 'success'
            })
          },
          catch: err => {
            wx.showToast({
              title: err,
              icon: 'none'
            })
          }
        }
      })
    }
  },
  update () {
    app.BaaS.updateUserInfo({
      key: 'first',
      value: 'ffff',
      callback: {}
    })
  }
})
