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

        // 加载用户基本信息
        BaaS.getUserInfo({
          userId: res.id,
          callback: {
            then: data => {
              Object.assign(Store.userInfo, data)
            },
            catch: err => {
              showModal(this) // 此时的this对象依然是login函数的callback
            }
          }
        })

        // todo：加载任务列表
      },
      catch: function(err) {
        showModal(this)
      }
    })

    function showModal(callback) {
      wx.showModal({
        title: '提示',
        content: '网络错误，是否重试？',
        confirmText: '重试',
        success: res => {
          if (res.confirm) {
            BaaS.login(callback)
          }
        }
      })
    }
  },
  onShow () {},
  onHide () {},
  BaaS: BaaS,
  Store: Store,
  request: request,
  commit: commit
})
