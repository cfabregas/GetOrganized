// 小程序数据库id
const clientId = 'e12a3118555868926fd8'

function initBaaS () {
  require('../utils/sdk')
  wx.BaaS.init(clientId)

  console.log('mini app inited')
}

export default {
  initBaaS
}
