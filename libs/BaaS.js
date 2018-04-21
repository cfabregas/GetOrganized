import '../utils/sdk'

const clientId = 'e12a3118555868926fd8' // 小程序数据库id

function initBaaS () {
  wx.BaaS.init(clientId)

  console.log('mini app inited')
}

function login (callback) {
  wx.BaaS.login().then(res => {
    // 用户允许授权，res 包含用户完整信息，详见下方描述
    callback.then(res)
    console.log('同意授权', res)
  }, res => {
    if (res instanceof Error) {
      // 网络错误
      callback.catch(res)
    } else {
      // 用户拒绝授权，res 包含基本用户信息：id、openid、unionid
      callback.then(res)
      console.log('拒绝授权', res)
    }
  })
}

export default {
  initBaaS,
  login
}
