const app = getApp()

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

  },
  methods: {
    onClose () {
      this.triggerEvent('close')
    }
  }
})
