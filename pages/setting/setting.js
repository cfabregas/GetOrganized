import util from '../../utils/util'
const app = getApp()

Page({
  data: {
    avatar: '../../assets/avatar.png',
    name: '',
    locale: ''
  },
  onReady () {
    const user = app.Store.userInfo
    if (user.avatarUrl) {
      this.setData({
        avatar: user.avatarUrl,
        name: user.nickName || '游客',
        locale: `${user.country} ${user.province} ${user.city}`
      })
    }
  },
  onAvatarTap (e) {
    if (app.Store.userInfo.avatarUrl) {
      wx.previewImage({
        current: this.data.avatar,
        urls: [this.data.avatar]
      })
    }
  }
})
