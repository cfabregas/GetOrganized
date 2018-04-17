const clientId = 'e12a3118555868926fd8'
const table = {
  name: '32840',
  file: '234'
}

function initBaaS () {
  require('../utils/sdk')
  wx.BaaS.init(clientId)

  console.log('mini app inited')
}

function setName (params) {
  let request = new wx.BaaS.TableObject(table.name).create()

  request.set({
    name: params.name
  }).save()
  .then(res => {
    console.log('response', res)
  }, err => {
    console.log('error', err)
  })
}

export default {
  initBaaS,
  setName
}
