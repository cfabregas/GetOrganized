import util from '../../utils/util'
import { setting } from '../../libs/constants'
const app = getApp()

Page({
  data: {
    avatar: '../../assets/avatar.png',
    defaultLimits: setting.default_limit
  },
  onReady () {
    const user = app.Store.userInfo
    const avatarThumb = user.avatarUrl.slice(0, -1) + '132'
    const setInfo = this.getSetInfo()

    if (user.avatarUrl) {
      this.setData({
        avatar: avatarThumb,
        name: user.nickName || '不愿意透露姓名的玩家',
        // locale: user.country ? `${user.country} ${user.province} ${user.city}` : '',
        listStyle: setInfo.listStyle,
        defaultLimit: setInfo.defaultLimit,
        i18n: setInfo.i18n,
        theme: setInfo.theme
      })
    }
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

    this.updateUserInfo(key, value)
  },
  getSetInfo () {
    const user = app.Store.userInfo

    const listStyle = setting.list_style.find(item => item.value === user.list_style)
    const defaultLimit = setting.default_limit.findIndex(item => item.value === user.default_limit)
    const i18n = setting.i18n.find(item => item.value === user.i18n)
    const theme = setting.theme.find(item => item.value === user.theme)

    return { listStyle, defaultLimit, i18n, theme }
  },
  updateUserInfo (key, value) {
    app.BaaS.updateUserInfo({
      key: key,
      value: value,
      callback: {
        then: res => {
          const setInfo = this.getSetInfo()
          this.setData({
            listStyle: setInfo.listStyle,
            defaultLimit: setInfo.defaultLimit,
            i18n: setInfo.i18n,
            theme: setInfo.theme
          }, () => {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
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
