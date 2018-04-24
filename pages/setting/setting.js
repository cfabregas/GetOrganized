import util from '../../utils/util'
const app = getApp()
const listType = {
  grid: '九宫格',
  list: '列表'
}
const theme = {
  default: '默认'
}

Page({
  data: {
    avatar: '../../assets/avatar.png'
  },
  onReady () {
    const user = app.Store.userInfo
    if (user.avatarUrl) {
      this.setData({
        avatar: user.avatarUrl,
        name: user.nickName || '不愿意透露姓名的玩家',
        locale: user.country ? `${user.country} ${user.province} ${user.city}` : '',
        listType: listType[user.list_type],
        theme: theme[user.theme]
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
  },
  onCellTap (e) {
    console.log(e.currentTarget.id, top)
    wx.showActionSheet({
      itemList: ['23', '34'],
      success: function(res) {
        console.log(res.tapIndex)
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  }
})
