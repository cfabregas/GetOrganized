const app = getApp()

Page({
  data: {
    title: 'statics',
    url: app.Constant.image.reward
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
