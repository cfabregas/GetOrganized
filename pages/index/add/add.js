import { clone, formatTime } from '../../../utils/util'
const app = getApp()
const taskOption = app.Constant.taskOption

Page({
  data: {
    focus: false,
    iconList: taskOption.iconList,
    iconColorList: taskOption.iconColorList,
    defaultLimits: app.Constant.setting.default_limits,
    defaultLimitIndex: taskOption.default_limits.findIndex(item => item.value === 30),

    newTask: {
      name: '',
      icon: taskOption.iconList[parseInt(Math.random() * taskOption.iconList.length)],
      icon_color: taskOption.iconColorList[parseInt(Math.random() * (taskOption.iconColorList.length - 1))], // 最后一个颜色为fff
      type: taskOption.type[0],
      method: taskOption.method[0],
      deadline: formatTime({ type: 'date' }),
      default_limit: taskOption.default_limits.find(item => item.value === 30)
    }
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
  onTypeChange (e) {
    wx.showActionSheet({
      itemList: taskOption.type.map(i => i.label),
      success: res => {
        this.setData({
          'newTask.type': taskOption.type[+(res.tapIndex)]
        })
      }
    })
  },
  onMethodChange (e) {
    wx.showActionSheet({
      itemList: taskOption.method.map(i => i.label),
      success: res => {
        this.setData({
          'newTask.method': taskOption.method[+(res.tapIndex)]
        })
      }
    })
  },
  onDeadlineChange (e) {
    this.setData({
      'newTask.deadline': e.detail.value
    })
  },
  onDefaultLimitChange (e) {
    const index = +e.detail.value

    this.setData({
      defaultLimitIndex: index,
      'newTask.default_limit': this.data.defaultLimits[index]
    })
  },
  onCreate (e) {
    const newTask = clone(this.data.newTask)
    newTask.type = newTask.type.value
    newTask.method = newTask.method.value
    console.log(newTask)
  }
})
