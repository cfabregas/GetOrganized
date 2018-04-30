const app = getApp()

Page({
  data: {
    iconList: app.Constant.iconList,
    iconColorList: app.Constant.iconColorList,

    newTask: {
      icon: app.Constant.iconList[0],
      icon_color: app.Constant.iconColorList[0],
      name: '',
      type: 'daily',
      deadline: Date.now(),
      method: 'timer',
      default_limit: 30
    }
  },
  onLoad () {

  }
})
