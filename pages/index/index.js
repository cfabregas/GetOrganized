const app = getApp()

Page({
  data: {
    taskList: []
  },
  onLoad () {
    this.setData({
      taskList: app.Store.task.list
    })
  },
  onTaskTap (e) {
    const task = app.Store.task.dict[e.currentTarget.id]
    const duration = 23
    const stage = 0

    app.request.addData({
      tableName: 'logs',
      data: {
        user_id: task.user_id,
        task_id: task.id,
        duration: duration,
        stage: task.stage + stage,
        total_hours: task.total_hours + (duration / 60),
        total_times: task.total_times + 1,
        remark: ''
      },
      callback: {
        then: res => {
          app.commit.updateData('task', {
            id: res.task_id,
            last_duration: res.duration,
            last_time: res.created_at,
            stage: res.stage,
            total_hours: res.total_hours,
            total_times: res.total_times,
          })
          // 更新视图
          this.setData({
            taskList: app.Store.task.list
          })
        },
        catch: err => {}
      }
    })
  },
  onTaskAdd (e) {
    console.log('todo: 新建任务')
  }
})
