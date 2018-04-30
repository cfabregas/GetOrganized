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
  },
  // 提交本次打卡
  addLog () {
    const duration = parseInt((Math.random() * 100).toFixed(0))
    const stage = 0

    app.request.addData({
      tableName: 'logs',
      data: {
        user_id: this.data.task.user_id,
        task_id: this.data.task.id,
        task_name: this.data.task.name,
        total_duration: this.data.task.total_duration,
        total_commits: this.data.task.total_commits,

        duration: duration,
        stage: stage,
        remark: ''
      },
      callback: {
        then: res => {
          // 同步更新该任务的数据
          app.commit.updateData('task', {
            id: res.task_id,
            stage: res.stage,
            last_duration: res.duration,
            last_commit_at: res.created_at,

            total_duration: res.total_duration + duration,
            total_commits: res.total_commits + 1,
          })
        },
        catch: err => {
          app.showModal(() => {
            this.addLog()
          })
        }
      }
    })
  }
})
