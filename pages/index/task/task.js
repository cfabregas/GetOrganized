const app = getApp()

Page({
  data: {
    task: {}
  },
  onLoad (option) {
    this.setData({
      task: app.Store.task.dict[option.id]
    })
  },
  onReady () {
    wx.setNavigationBarTitle({
      title: this.data.task.name
    })
  }
})
