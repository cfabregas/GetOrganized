const app = getApp()

Page({
  data: {
    defaultLimits: app.Constant.setting.default_limits
  },
  onLoad () {
    this.renderUserInfo()
  },
  // 用户授权
  onGetUserInfo (e) {
    const userInfo = e.detail.userInfo

    if (userInfo) {
      this.updateUserInfo({
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName
      })
    }
  },
  // 修改个人设置
  onCellTap (e) {
    let key = e.currentTarget.id

    wx.showActionSheet({
      itemList: app.Constant.setting[key].map(i => i.label),
      success: res => {
        let value = app.Constant.setting[key][res.tapIndex].value

        if (app.Store.userInfo[key] !== value) {
          this.updateUserInfo({ [key]: value })
        }
      }
    })
  },
  // 修改默认提醒时间
  onPickerChange (e) {
    const key = e.currentTarget.id
    const value = app.Constant.setting[key][e.detail.value].value
    if (app.Store.userInfo.default_limit !== value) {
      this.updateUserInfo({ [key]: value })
    }
  },
  // 更新用户设置信息
  updateUserInfo (data) {
    app.BaaS.updateUserInfo({
      data,
      callback: {
        then: res => {
          this.renderUserInfo()
        },
        catch: err => {
          app.showModal(() => {
            this.updateUserInfo(data)
          })
        }
      }
    })
  },
  // 重绘用户信息
  renderUserInfo () {
    const user = app.Store.userInfo
    const setting = app.Constant.setting

    const listStyle = setting.list_style.find(item => item.value === user.list_style)
    const defaultLimit = setting.default_limits.findIndex(item => item.value === user.default_limit)
    const i18n = setting.i18n.find(item => item.value === user.i18n)
    const theme = setting.theme.find(item => item.value === user.theme)

    this.setData({
      avatar: user.avatarUrl || '../../assets/logo.png',
      name: user.nickName || '',
      listStyle,
      defaultLimit,
      i18n,
      theme
    })
  }
})
