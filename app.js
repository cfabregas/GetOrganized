import service from 'libs/service'

App({
  onLaunch: function () {
    // 启动BaaS服务
    service.initBaaS()

    // 登录
    wx.BaaS.login().then(res => {
      // 用户允许授权，res 包含用户完整信息，详见下方描述
      console.log('access', res)
    }, res => {
      // 用户拒绝授权，res 包含基本用户信息：id、openid、unionid
      console.log('reject', res)
    })

    // 获取用户信息
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
