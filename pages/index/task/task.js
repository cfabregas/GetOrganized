const app = getApp()
let interval = null

Page({
  data: {
    task: {},
    timer: {
      status: 'vacant', // 状态：vacant/running/paused/finished
      value: 0,
      label: '00:00'
    }
  },
  onLoad (option) {
    const task = app.Store.task.dict[option.id] || app.Store.task.list[0]
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
  startTimer () {
    this.setData({
      'timer.status': 'running'
    }, () => {
      interval = setInterval(() => {
        let time = this.data.timer.value + 1
        let min = Math.floor(time / 60)
        let sec = time % 60

        this.setData({
          'timer.value': time,
          'timer.label': `${min >= 10 ? min : '0' + min}:${sec >= 10 ? sec : '0' + sec}`
        })
      }, 1000)
    })
  },
  pauseTimer () {
    this.setData({
      'timer.status': 'paused'
    }, () => {
      clearInterval(interval)
    })
  },
  finishTimer () {
    this.pauseTimer()
    // 提交记录，成功后清空计时器
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
