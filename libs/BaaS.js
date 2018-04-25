import '../utils/sdk'
import Store from 'store'
import { loading } from '../utils/util'
const clientId = 'e12a3118555868926fd8' // 小程序数据库id

function initBaaS () {
  wx.BaaS.init(clientId)
  console.log('App Inited')
}

function login (callback = {}) {
  wx.BaaS.login().then(res => {
    // 用户允许授权，res 包含用户完整信息
    console.log('authorized', res)

    Store.userInfo = res
    callback.then(res)
  }, res => {
    if (res instanceof Error) {
      // 网络错误
      console.log('network error', err)
      callback.catch(res)
    } else {
      // 用户拒绝授权，res 包含基本用户信息：id、openid、unionid
      console.log('rejected', res)

      Store.userInfo = res
      callback.then(res)
    }
  })
}

function getUserInfo ({ userId, loadingText = '正在登录...', callback = {} }) {
  loading.show(loadingText)

  let user = new wx.BaaS.User()

  user.get(userId).then(res => {
    console.log('get user info success', res)

    Object.assign(Store.userInfo, res.data) // 合并用户信息
    // loading.hide()
    callback.then(res.data)
  }, err => {
    console.log('get user info error', err)

    loading.hide()
    callback.catch(err)
  })
}

function updateUserInfo ({ key, value, loadingText = '正在保存...', callback = {} }) {
  loading.show(loadingText)

  let user = new wx.BaaS.User()
  user = user.getCurrentUserWithoutData().set(key, value)

  user.update().then(res => {
    console.log('user info updated', res)

    Object.assign(Store.userInfo, res.data) // 合并用户信息
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
