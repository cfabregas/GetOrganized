import { formatTime } from '../../../utils/util'
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
  onCellTap (e) {
    console.log(e)
    let key = e.currentTarget.id

    wx.showActionSheet({
      itemList: taskOption[key].map(i => i.label),
      success: res => {
        let item = taskOption[key][+(res.tapIndex)]

        if (key === 'type') {
          this.setData({
            'newTask.type': item
          })
        } else {
          this.setData({
            'newTask.method': item
          })
        }          
      }
    })
  },
  onPickerChange (e) {
    console.log(e)
  },
  onCreate (e) {
    console.log(e)
  }
})
