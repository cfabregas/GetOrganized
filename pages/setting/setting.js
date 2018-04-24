import util from '../../utils/util'
const app = getApp()
const setting = {
  listType: [{ value: 'grid', label: '九宫格' }, { value: 'list', label: '列表' }],
  theme: [{ value: 'default', label: '默认' }]
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
        listType: setting.listType.find(item => item.value === user.list_type),
        theme: setting.theme.find(item => item.value === user.theme)
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
    let cell = e.currentTarget.id
    wx.showActionSheet({
      itemList: setting[cell].map(i => i.label),
      success: function(res) {
        let item = setting[cell][res.tapIndex]
        console.log(item)
      }
    })
  }
})
