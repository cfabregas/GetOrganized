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
  ]
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

// 图标列表
const iconList = [
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
]

// 颜色列表
const iconColorList = []

export default {
  taskMax,
  setting,
  iconList,
  iconColorList
}
