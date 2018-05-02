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
          wx.showNavigationBarLoading()
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
          this.getTask(id)
        },
        catch: err => {
          console.log(err)

          wx.hideNavigationBarLoading()
          app.showModal(() => {
            wx.showNavigationBarLoading()
            this.getUserInfo(id)
          })
        }
      }
    })
  },
  getTask (id) {
    app.request.findData({
      tableName: 'task',
      limit: app.Constant.taskMax,
      replace: true,
      query: {
        type: 'and',
        option: [{
          method: 'compare',
          params: ['user_id', '=', id] // 当前用户的任务
        }, {
          method: 'compare',
          params: ['is_deleted', '=', false] // 未被删除的任务
        }, {
          method: 'compare',
          params: ['stage', '<', 1] // 未完成的任务
        }]
      },
      // showLoading: false,
      loadingText: '正在同步...',
      callback: {
        then: res => {
          this.redirect()
        },
        catch: err => {
          console.log(err)
          
          wx.hideNavigationBarLoading()
          app.showModal(() => {
            wx.showNavigationBarLoading()
            this.getTask(id)
          })
        }
      }
    })
  },
  redirect () {
    wx.hideNavigationBarLoading()

    if (this.data.url.split('/').length === 4) {
      wx.redirectTo({
        url: this.data.url
      })
    } else {
      wx.switchTab({
        url: this.data.url
      })
    }
  }
})
