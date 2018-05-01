import { clone } from '../../utils/util'
const app = getApp()

Page({
  data: {
    taskMax: app.Constant.taskMax,
    listStyle: 'grid',
    taskList: [],
    total: 0,
    editMode: false
  },
  onShow () {
    // todo: get storage to order
    this.updateTaskList()
  },
  onTaskTap (e) {
    wx.navigateTo({
      url: 'task/task?id=' + e.currentTarget.id
    })
  },
  onTaskAdd (e) {
    wx.navigateTo({
      url: 'add/add'
    })
  },
  updateTaskList () {
    const list = clone(app.Store.task.list)
    const show = list.filter(item => item.is_hidden === false)
    const style = app.Store.userInfo.list_style

    if (style === 'list') {
      list.map(item => {
        if (item.method === 'timer') {
          item.desc = `累计${(item.total_duration / 60).toFixed(1)}小时`
        } else {
          item.desc = `累计${item.total_commits}次打卡`
        }
        
        if (item.type !== 'daily') {
          item.desc += ` / 已完成${item.stage}%`
        }
      })
    }

    this.setData({
      listStyle: style,
      total: list.length,
      taskList: show
    })
  }
})
