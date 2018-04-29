const app = getApp()

Page({
  data: {
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
    let taskId = e.currentTarget.id
    wx.navigateTo({
      url: 'task/task?id=' + taskId
    })
  },
  onTaskAdd (e) {
    wx.navigateTo({
      url: 'add/add'
    })
  },
  addLog (e) {
    const task = app.Store.task.dict[e.currentTarget.id]
    const duration = parseInt((Math.random() * 100).toFixed(0))

    app.request.addData({
      tableName: 'logs',
      data: {
        user_id: task.user_id,
        task_id: task.id,
        task_name: task.name,

        duration: duration,
        stage: 0,

        total_duration: task.total_duration,
        total_commits: task.total_commits,
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
          // 更新视图
          this.updateTaskList()
        },
        catch: err => {}
      }
    })
  },
  updateTaskList () {
    const list = app.Store.task.list.filter(item => item.is_hidden === false)
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

    this.setData({
      listStyle: app.Store.userInfo.list_style,
      total: app.Store.task.list.length,
      taskList: list
    })
  }
})
