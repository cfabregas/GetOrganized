const app = getApp()

Page({
  data: {
    url: '../index/index'
  },
  onLoad (option) {
    if (option.url) {
      console.log('redirect to: ', option.url)
      this.setData({
        url: option.url
      })
    }

    this.login()
  },
  login () {
    // 静默登录
    app.BaaS.login({
      then: res => {
        wx.showNavigationBarLoading()
        this.getUserInfo(res.id)
      },
      catch: err => {
        console.log(err)

        wx.hideNavigationBarLoading()
        app.showModal(() => {
          this.login()
        })
      }
    })
  },
  getUserInfo (id) {
    // 加载用户基本信息，完成后跳转首页
    app.BaaS.getUserInfo({
      userId: id,
      // showLoading: false,
      callback: {
        then: res => {
          wx.hideNavigationBarLoading()
          wx.switchTab({
            url: this.data.url
          })
        },
        catch: err => {
          console.log(err)

          wx.hideNavigationBarLoading()
          app.showModal(() => {
            this.getUserInfo(id)
          })
        }
      }
    })
  }
})
