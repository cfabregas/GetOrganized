import request from '../../libs/request'
const app = getApp()

Page({
  data: {

  },
  onLoad () {

  },
  save () {
    request.findData({
      tableName: 'names',
      query: {
        type: 'or',
        option: [{
          method: 'contains',
          params: ['name', 'test']
        }, {
          method: 'contains',
          params: ['name', 'df']
        }]
      },
      callback: {
        then: res => {
          console.log('callback', res)
        },
        catch: err => {
          console.log('callback', err)
        }
      }
    })
  }
})
