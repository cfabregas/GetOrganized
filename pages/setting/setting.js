import util from '../../utils/util'
const app = getApp()

Page({
  data: {
    avatar: '../../assets/avatar.png',
    name: '暂未登录',
    desc: ''
  },
  onReady () {
    const user = app.Store.userInfo
    if (user.avatarUrl) {
      this.setData({
        avatar: user.avatarUrl,
        name: user.nickName
      })
    }
  }
})
