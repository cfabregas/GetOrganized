import BaaS from 'libs/BaaS' // 知晓云的BaaS服务
import Store from 'libs/store' // 底层公共数据
import request from 'libs/request' // 请求数据的方法集合
import commit from 'libs/commit' // 显式地改变底层数据的方法集合，与request一一对应

App({
  onLaunch () {
    // 启动BaaS服务
    BaaS.initBaaS()

    // 登录
    wx.BaaS.login().then(res => {
      // 用户允许授权，res 包含用户完整信息，详见下方描述
      console.log('access', res)
    }, res => {
      // 用户拒绝授权，res 包含基本用户信息：id、openid、unionid
      console.log('reject', res)
    })

    // 获取用户信息
    wx.getUserInfo({
      success: res => {
        this.Store.userInfo = res.userInfo
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
