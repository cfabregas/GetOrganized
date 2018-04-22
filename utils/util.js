// 深拷贝
function clone () {
  let type = Object.prototype.toString.call(val).slice(8, -1).toLowerCase()

  if (type === 'array') {
    var arr = []
    for (var i in val) {
      arr[i] = clone(val[i])
    }
    return arr
  } else if (type === 'object') {
    var obj = {}
    for (i in val) {
      if (val.hasOwnProperty(i)) {
        obj[i] = clone(val[i])
      }
    }
    return obj
  }
  return val
}

function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber (num) {
  num = num.toString()
  return num[1] ? num : '0' + num
}

const loading = {
  show: title => {
    wx.showLoading({
      title: title,
      mask: true
    })
  },
  hide: () => {
    wx.hideLoading()
  }
}

export {
  clone,
  formatTime,
  formatNumber,
  loading
}
