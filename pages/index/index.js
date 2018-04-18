import request from '../../libs/request'
const app = getApp()

Page({
  data: {
    motto: 'Get Organized',
    userInfo: null
  },
  onLoad () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: app.globalData.userInfo
          })
        }
      })
    }
  },
  getUserInfo (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo
    })
  },
  save () {
    request.findData({
      tableName: 'names',
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
          console.log('callback', res)
        },
        catch: err => {
          console.log('callback', err)
        }
      }
    })
  }
})
