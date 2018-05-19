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
  },
  methods: {
    onClose () {
      this.triggerEvent('close')
    },
    onIconChange (e) {
      if (e.detail.source === 'touch') {
        this.triggerEvent('iconChange', {
          icon: e.detail.currentItemId
        })
      }
    },
    onIconColorChange (e) {
      if (e.detail.source === 'touch') {
        this.triggerEvent('iconColorChange', {
          iconColor: e.detail.currentItemId
        })
      }
    }
  }
})
