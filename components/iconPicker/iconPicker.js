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
    iconColorList: iconColorList
  },
  ready () {
    this.setData({
      iconIndex: iconList.indexOf(this.properties.icon) + 1,
      iconColorIndex: iconColorList.indexOf(this.properties.iconColor) + 1
    })
  },
  methods: {
    onClose () {
      this.triggerEvent('close')
    },
    onIconChange (e) {
      this.setData({
        iconIndex: e.detail.current + 1
      })
      if (e.detail.source === 'touch') {
        this.triggerEvent('iconChange', {
          icon: e.detail.currentItemId
        })
      }
    },
    onIconColorChange (e) {
      this.setData({
        iconColorIndex: e.detail.current + 1
      })
      if (e.detail.source === 'touch') {
        this.triggerEvent('iconColorChange', {
          iconColor: e.detail.currentItemId
        })
      }
    }
  }
})
