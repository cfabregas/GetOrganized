import util from '../../utils/util'
import { setting } from '../../libs/constants'
const app = getApp()

Page({
  data: {
    defaultLimits: setting.default_limit
  },
  onReady () {
    const user = app.Store.userInfo
    const settingInfo = this.getSettingInfo()

    this.setData({
      avatar: user.avatarUrl || '../../assets/logo.png',
      name: user.nickName || '神秘的玩家',
      listStyle: settingInfo.listStyle,
      defaultLimit: settingInfo.defaultLimit,
      i18n: settingInfo.i18n,
      theme: settingInfo.theme
    })
  },
  // 预览头像大图
  onAvatarTap (e) {
    let url = app.Store.userInfo.avatarUrl
    if (!!url) {
      wx.previewImage({
        current: url,
        urls: [url]
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
          this.updateUserInfo(key, value)
        }
      }
    })
  },
  // 修改默认提醒时间
  onPickerChange (e) {
    const key = e.currentTarget.id
    const value = setting[key][e.detail.value].value
    if (app.Store.userInfo.default_limit !== value) {
      this.updateUserInfo(key, value)
    }
  },
  // 获取用户设置信息
  getSettingInfo () {
    const user = app.Store.userInfo

    const listStyle = setting.list_style.find(item => item.value === user.list_style)
    const defaultLimit = setting.default_limit.findIndex(item => item.value === user.default_limit)
    const i18n = setting.i18n.find(item => item.value === user.i18n)
    const theme = setting.theme.find(item => item.value === user.theme)

    return { listStyle, defaultLimit, i18n, theme }
  },
  // 更新用户设置信息
  updateUserInfo (key, value) {
    app.BaaS.updateUserInfo({
      key: key,
      value: value,
      callback: {
        then: res => {
          const settingInfo = this.getSettingInfo()
          this.setData({
            listStyle: settingInfo.listStyle,
            defaultLimit: settingInfo.defaultLimit,
            i18n: settingInfo.i18n,
            theme: settingInfo.theme
          }, () => {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 800
            })
          })
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
