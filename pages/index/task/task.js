const app = getApp()

Page({
  data: {
    task: {}
  },
  onLoad (option) {
    const task = app.Store.task.dict[option.id]
    this.setData({
      task: task
    })
    console.log('task', task)
  },
  onReady () {
    wx.setNavigationBarTitle({
      title: this.data.task.name
    })
  }
})
