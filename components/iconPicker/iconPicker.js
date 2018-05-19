const app = getApp()
const { iconList, iconColorList } = app.Constant.taskOption

Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
    icon: String,
    iconColor: String
  },
  data: {
    iconList: iconList,
    iconColorList: iconColorList,

    currentIcon: 0,
    currentIconColor: 0
  },
  ready () {
    this.setData({
      currentIcon: iconList.indexOf(this.properties.icon),
      currentIconColor: iconColorList.indexOf(this.properties.iconColor)
    })
  },
  methods: {
    onClose () {
      this.triggerEvent('close')
    },
    onIconChange (e) {
      if (e.detail.source === 'touch') {
        this.triggerEvent('iconChange', {
          icon: iconList[e.detail.current]
        })
      }
    }
  }
})
