const app = getApp()

Page({
  data: {

  },
  onLoad () {

  },
  save () {
    const tableName = 'names'

    if (app.store[tableName].hasNext) {
      wx.showLoading({ title: '加载中...' })

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
            wx.hideLoading()
            wx.showToast({
              title: '获取成功',
              icon: 'success'
            })
          },
          catch: err => {
            wx.hideLoading()
            wx.showToast({
              title: err,
              icon: ''
            })
          }
        }
      })
    }
  }
})
