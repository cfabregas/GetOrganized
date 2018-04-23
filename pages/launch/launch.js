const app = getApp()

Page({
  onLoad () {
    wx.showNavigationBarLoading()
  },
  onUnload () {
    wx.hideNavigationBarLoading()
  },
  onReady () {
    this.login()
  },
  login () {
    // 登录
    app.BaaS.login({
      then: res => {
        this.getUserInfo(res.id)
      },
      catch: err => {
        this.showModal('login')
      }
    })
  },
  getUserInfo (id) {
    // 加载用户基本信息
    app.BaaS.getUserInfo({
      userId: id,
      callback: {
        then: res => {
          this.getTask(id)
        },
        catch: err => {
          this.showModal('getUserInfo', id)
        }
      }
    })
  },
  getTask (id) {
    // 加载任务列表，完成后跳转到首页
    app.request.findData({
      tableName: 'task',
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
          params: ['is_hidden', '=', false] // 未被删除的任务
        }, {
          method: 'compare',
          params: ['stage', '<', 1] // 未完成的任务
        }]
      },
      loadingText: '正在初始化...',
      callback: {
        then: res => {
          wx.switchTab({
            url: '../index/index'
          })
        },
        catch: err => {
          this.showModal('getTask', id)
        }
      }
    })
  },
  showModal (method, id) {
    wx.showModal({
      title: '提示',
      content: '网络错误，是否重试？',
      confirmText: '重试',
      success: res => {
        if (res.confirm) {
          console.log(method, id)
          this[method](id)
        }
      }
    })
  },
})
