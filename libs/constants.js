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

const setting = {
  list_style: [
    { value: 'grid', label: '九宫格' },
    { value: 'list', label: '列表' }
  ],
  default_limit: __getLimits(),
  theme: [
    { value: 'default', label: '默认' }
  ],
  i18n: [
    { value: 'zh_CN', label: '中文-简体' },
    // { value: 'en', label: 'English' }
  ]
}

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

export {
  setting,
  iconList
}
