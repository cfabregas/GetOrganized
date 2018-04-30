const app = getApp()
const taskOption = app.Constant.taskOption

Page({
  data: {
    iconList: taskOption.iconList,
    iconColorList: taskOption.iconColorList,

    newTask: {
      name: '',
      icon: taskOption.iconList[parseInt(Math.random() * taskOption.iconList.length)],
      icon_color: taskOption.iconColorList[parseInt(Math.random() * (taskOption.iconColorList.length - 1))], // 最后一个颜色为fff
      type: taskOption.type[0],
      method: taskOption.method[0],
      deadline: Date.now(),
      default_limit: taskOption.default_limits[20]
    },

    focus: false
  },
  onLoad (option) {
    console.log(option)
  },
  onInputFocus (e) {
    this.setData({
      focus: true
    })
  },
  onInputBlur (e) {
    this.setData({
      'newTask.name': e.detail.value.trim()
    })
  },
  onCellTap (e) {
    console.log(e)
  },
  onCreate (e) {
    console.log(e)
  }
})
