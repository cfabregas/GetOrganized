import { clone } from '../../../utils/util'
const app = getApp()

Page({
  data: {
    hiddenList: []
  },
  onShow () {
    this.updateHiddenList()
  },
  onCellTap (e) {
    // 轻按恢复，长按删除
    const recovery = e.type === 'tap'
    const taskId = e.currentTarget.id

    wx.showActionSheet({
      itemList: recovery ? ['恢复任务'] : ['彻底删除'],
      itemColor: recovery ? '#000' : '#e64340',
      success: res => {
        if (recovery) {
          this.updateTask({ id: taskId, is_hidden: false })
        } else {
          const task = app.Store.task.dict[taskId]

          if (task.is_custom) {
            this.updateTask({ id: taskId, is_deleted: true })
          } else {
            wx.showModal({
              title: '提示',
              content: '不允许删除默认项目',
              showCancel: false
            })
          }
        }
      }
    })
  },
  updateTask (data) {
    app.request.updateData({
      tableName: 'task',
      data: data,
      loadingText: data.is_deleted ? '正在删除...' : '正在恢复...',
      callback: {
        then: res => {
          this.updateHiddenList()
        },
        catch: err => {
          app.showModal(() => {
            this.updateTask(data)
          })
        }
      }
    })
  },
  updateHiddenList () {
    const list = clone(app.Store.task.list)
    const hidden = list.filter(item => item.is_hidden === true)

    this.setData({
      hiddenList: hidden
    })
  }
})
