import { clone, formatTime } from '../../../utils/util'
const app = getApp()
const taskOption = app.Constant.taskOption

Page({
  data: {
    focus: false,
    showIconPicker: true,
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
  toggleIconPicker (e) {
    this.setData({
      showIconPicker: !this.data.showIconPicker
    })
  },
  onIconChange (e) {
    this.setData({
      'newTask.icon': e.detail.icon
    })
  },
  onIconColorChange (e) {
    this.setData({
      'newTask.icon_color': e.detail.iconColor
    })
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
    if (!this.validate()) { return }

    const newTask = clone(this.data.newTask)
    newTask.user_id = app.Store.userInfo.id
    newTask.type = newTask.type.value
    newTask.method = newTask.method.value
    newTask.default_limit = newTask.default_limit.value

    app.request.addData({
      tableName: 'task',
      data: newTask,
      loadingText: '正在创建...',
      callback: {
        then: res => {
          wx.showToast({
            title: '创建成功',
            icon: 'success',
            duration: 800,
            musk: true,
            success: res => {
              setTimeout(() => {
                wx.navigateBack()
              }, 800)
            }
          })
        },
        catch: err => {
          app.showModal(() => {
            this.onCreate(e)
          })
        }
      }
    })
  },
  validate () {
    const isDaily = this.data.newTask.type.value === 'daily'
    const deadline = new Date(this.data.newTask.deadline).getTime()
    const now = Date.now()

    if (!this.data.newTask.name) {
      wx.showModal({
        title: '提示',
        content: '项目名称不能为空',
        showCancel: false
      })
      return false
    } else if (!isDaily && deadline <= now) {
      wx.showModal({
        title: '提示',
        content: '完成期限不能早于今天',
        showCancel: false
      })
      return false
    } else {
      return true
    }
  }
})
