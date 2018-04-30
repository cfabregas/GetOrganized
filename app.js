import BaaS from 'libs/BaaS' // 知晓云的BaaS服务
import Store from 'libs/store' // 底层公共数据
import Constant from 'libs/constant' // 基本的公用常量
import request from 'libs/request' // 请求数据的方法集合
import commit from 'libs/commit' // 显式地改变底层数据的方法集合，与request一一对应

App({
  onLaunch () {
    // 启动BaaS服务
    BaaS.initBaaS()
    // todo: 若有计时项目，则恢复
  },
  onHide () {
    // todo: 若有计时项目，则保存
  },
  // 网络错误时统一弹窗处理
  showModal (callback) {
    wx.showModal({
      title: '提示',
      content: '网络错误，是否重试？',
      confirmText: '重试',
      success: res => {
        if (res.confirm) {
          callback()
        }
      }
    })
  },
  BaaS: BaaS,
  Store: Store,
  Constant: Constant,
  request: request,
  commit: commit
})
