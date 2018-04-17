import service from '../../libs/service'
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
    service.setName({
      name: 'test' + Math.random().toFixed(5)
    })
  }
})
