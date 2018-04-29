const app = getApp()

Page({
  data: {
    listStyle: 'grid',
    taskList: [],
    total: 0,
    editMode: false
  },
  onLoad () {
    this.getTask()
  },
  onShow () {
    // todo: get storage to order
    
    const loaded = !!app.Store.task.lastQuery

    if (loaded) {
      this.updateTaskList()
    }
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
  getTask () {
    const id = app.Store.userInfo.id

    app.request.findData({
      tableName: 'task',
      replace: true,
      query: {
        type: 'and',
        option: [{
          method: 'compare',
          params: ['user_id', '=', id] // 当前用户的任务
        }, {
          method: 'compare',
          params: ['is_deleted', '=', false] // 未被删除的任务
        }, {
          method: 'compare',
          params: ['stage', '<', 1] // 未完成的任务
        }]
      },
      // showLoading: false,
      loadingText: '正在同步...',
      callback: {
        then: res => {
          this.updateTaskList()
        },
        catch: err => {
          console.log(err)
          app.showModal(() => {
            this.getTask(id)
          })
        }
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
