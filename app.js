import BaaS from 'libs/BaaS' // 知晓云的BaaS服务
import Store from 'libs/store' // 底层公共数据
import request from 'libs/request' // 请求数据的方法集合
import commit from 'libs/commit' // 显式地改变底层数据的方法集合，与request一一对应

App({
  onLaunch () {
    // 启动BaaS服务
    BaaS.initBaaS()

    // 登录
    BaaS.login({
      then: function(res) {
        Store.userInfo = res
      },
      catch: function(err) {
        wx.showModal({
          title: '提示',
          content: '网络错误，是否重试？',
          confirmText: '重试',
          success: res => {
            if (res.confirm) {
              BaaS.login(this) // 此时的this对象为callback自身
            }
          }
        })
      }
    })

    // todo：加载基础数据：用户信息、任务列表
  },
  onShow () {},
  onHide () {},
  Store: Store,
  request: request,
  commit: commit
})
