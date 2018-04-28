import util from '../../utils/util'
import { setting } from '../../libs/constants'
const app = getApp()

Page({
  data: {
    defaultLimits: setting.default_limit
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
      itemList: setting[key].map(i => i.label),
      success: res => {
        let value = setting[key][res.tapIndex].value

        if (app.Store.userInfo[key] !== value) {
          this.updateUserInfo({ [key]: value })
        }
      }
    })
  },
  // 修改默认提醒时间
  onPickerChange (e) {
    const key = e.currentTarget.id
    const value = setting[key][e.detail.value].value
    if (app.Store.userInfo.default_limit !== value) {
      this.updateUserInfo({ [key]: value })
    }
  },
  // 重绘用户信息
  renderUserInfo () {
    const user = app.Store.userInfo

    const listStyle = setting.list_style.find(item => item.value === user.list_style)
    const defaultLimit = setting.default_limit.findIndex(item => item.value === user.default_limit)
    const i18n = setting.i18n.find(item => item.value === user.i18n)
    const theme = setting.theme.find(item => item.value === user.theme)

    this.setData({
      avatar: app.Store.userInfo.avatarUrl || '../../assets/logo.png',
      name: app.Store.userInfo.nickName || '',
      authorized: app.Store.userInfo.is_authorized,
      listStyle,
      defaultLimit,
      i18n,
      theme
    })
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
          wx.showModal({
            title: '提示',
            content: '网络错误，是否重试？',
            confirmText: '重试',
            success: res => {
              if (res.confirm) {
                this.updateUserInfo(key, value)
              }
            }
          })
        }
      }
    })
  }
})
