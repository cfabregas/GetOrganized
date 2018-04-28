const app = getApp()

Page({
  data: {
    listStyle: 'grid',
    taskList: [],
    total: 0
  },
  onShow () {
    this.updateTaskList()
  },
  onTaskTap (e) {
    console.log(e)
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
  onTaskAdd (e) {
    console.log('todo: 新建任务')
  },
  updateTaskList () {
    const list = app.Store.task.list

    // 区分日常/阶段性任务
    // let daily = []; let temp = []
    // for (let item of list) {
    //   item.type === 'daily' ? daily.push(item) : temp.push(item)
    // }

    this.setData({
      listStyle: app.Store.userInfo.list_style,
      total: list.length,
      taskList: list.filter(item => item.is_hidden === false)
    })
  }
})
