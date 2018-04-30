import '../utils/sdk'
import commit from 'commit'
import { loading } from '../utils/util'
const clientId = 'e12a3118555868926fd8' // 小程序数据库id

function initBaaS () {
  wx.BaaS.init(clientId)
  console.log('App Inited Right Now')
}

function login (callback = {}) {
  // 静默登录，只返回基本信息，小程序后续不允许私自发起getUserInfo接口，所以放在设置页由用户手动发起
  wx.BaaS.login(false).then(res => {
    console.log('user login successed', res)

    commit._updateUserInfo(res)
    callback.then(res)
  }, err => {
    console.log('network error', err)

    callback.catch(err)
  })
}

function getUserInfo ({ userId, showLoading = true, loadingText = '正在登录...', callback = {} }) {
  showLoading && loading.show(loadingText)

  let user = new wx.BaaS.User()

  user.get(userId).then(res => {
    console.log('get user info success', res)

    commit._updateUserInfo(res.data)
    // loading.hide()
    callback.then(res.data)
  }, err => {
    console.log('get user info error', err)

    loading.hide()
    callback.catch(err)
  })
}

function updateUserInfo ({ data, showLoading = true, loadingText = '正在保存...', callback = {} }) {
  showLoading && loading.show(loadingText)

  let user = new wx.BaaS.User()
  user = user.getCurrentUserWithoutData().set(data)

  user.update().then(res => {
    console.log('user info updated', res)

    commit._updateUserInfo(res.data)
    loading.hide()
    callback.then(res.data)
  }, err => {
    console.log('user info update error', err)

    loading.hide()
    callback.catch(err)
  })
}

export default {
  initBaaS,
  login,
  getUserInfo,
  updateUserInfo
}
