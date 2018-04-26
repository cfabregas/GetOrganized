import util from '../../utils/util'
const app = getApp()

Page({
  data: {
    title: 'statics',
    url: 'https://cloud-minapp-13603.cloud.ifanrusercontent.com/1fBZYzASEBWueinq.jpg'
  },
  onLoad () {

  },
  onImageTap () {
    wx.previewImage({
      current: this.data.url,
      urls: [this.data.url]
    })
  }
})
