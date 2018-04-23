import BaaS from 'libs/BaaS' // 知晓云的BaaS服务
import Store from 'libs/store' // 底层公共数据
import request from 'libs/request' // 请求数据的方法集合
import commit from 'libs/commit' // 显式地改变底层数据的方法集合，与request一一对应

App({
  onLaunch () {
    // 启动BaaS服务
    BaaS.initBaaS()
  },
  onShow () {},
  onHide () {},
  BaaS: BaaS,
  Store: Store,
  request: request,
  commit: commit
})
