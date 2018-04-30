// 生成10-60分钟的提醒时间
function __getLimits () {
  let limits = []

  for (let i = 10; i <= 60; i++) {
    limits.push({
      value: i,
      label: i + ' 分钟'
    })
  }
  
  return limits
}

// 生成216种web安全色
function __getColors () {
  let element = ['00', '33', '66', '99', 'cc', 'ff']
  let colors = []

  for (let j of element) {
    for (let k of element) {
      for (let l of element) {
        colors.push('#' + j + k + l)
      }
    }
  }

  return colors
}

// 最大任务数量(不包括已删除的)
const taskMax = 100

// 任务选项
const taskOption = {
  type: [
    { value: 'daily', label: '日常项目' },
    { value: 'temp', label: '阶段性项目' }
  ],
  method: [
    { value: 'timer', label: '计时' },
    { value: 'commit', label: '打卡' }
  ],
  iconList: [
    'alarm',
    'americanfootball',
    'analytics',
    'baseball',
    'basketball',
    'bell',
    'bolt',
    'book',
    'bookmarks',
    'briefcase',
    'camera',
    'cart',
    'colorfilter',
    'colorwand',
    'compose',
    'email',
    'film',
    'flame',
    'flask',
    'flower',
    'football',
    'gamecontroller',
    'glasses',
    'home',
    'infinite',
    'light',
    'location',
    'monitor',
    'musicnotes',
    'navigate',
    'nutrition',
    'paperplane',
    'rose',
    'searchstrong',
    'stopwatch',
    'toggle',
    'wineglass',
    'world',
  ],
  iconColorList: __getColors(),
  default_limits: __getLimits(),
}

// 用户设置的选项
const setting = {
  list_style: [
    { value: 'grid', label: '九宫格' },
    { value: 'list', label: '列表' }
  ],
  default_limits: __getLimits(),
  theme: [
    { value: 'default', label: '默认' }
  ],
  i18n: [
    { value: 'zh_CN', label: '中文-简体' },
    // { value: 'en', label: 'English' }
  ]
}

// 图片资源
const image = {
  logo: 'https://cloud-minapp-13603.cloud.ifanrusercontent.com/1fD9K2GlMNtVkaaW.png',
  reward: 'https://cloud-minapp-13603.cloud.ifanrusercontent.com/1fD9YAzVAixANiam.jpg'
}

export default {
  taskMax,
  taskOption,
  setting,
  image
}
