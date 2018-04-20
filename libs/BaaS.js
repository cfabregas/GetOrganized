import '../utils/sdk'

const clientId = 'e12a3118555868926fd8' // 小程序数据库id

function initBaaS () {
  wx.BaaS.init(clientId)

  console.log('mini app inited')
}

export default {
  initBaaS
}
