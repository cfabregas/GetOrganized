const app = getApp()

Page({
  data: {
    taskList: {
      listStyle: '',
      daily: [],
      term: []
    }
  },
  onShow () {
    this.updateTaskList()
  },
  onTaskTap (e) {
    const task = app.Store.task.dict[e.currentTarget.id]
    const duration = parseInt((Math.random() * 100).toFixed(0))

    app.request.addData({
      tableName: 'logs',
      data: {
        user_id: task.user_id,
        task_id: task.id,
        task_name: task.name,
        user_name: task.user_name,

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
    // 过滤已经隐藏的任务
    const list = app.Store.task.list.filter(item => item.is_hidden === false)

    // 区分日常/阶段性任务
    let daily = []; let term = []
    for (let item of list) {
      item.type === 'daily' ? daily.push(item) : term.push(item)
    }

    this.setData({
      'taskList.listStyle': app.Store.userInfo.list_style,
      'taskList.daily': daily,
      'taskList.term': term,
    })
  }
})
