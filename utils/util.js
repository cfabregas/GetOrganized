// 深拷贝
function clone (val) {
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

function formatTime ({ date = new Date(), type = 'full' }) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const dateStr = [year, month, day].map(formatNumber).join('-')
  const timeStr = [hour, minute, second].map(formatNumber).join(':')

  if (type === 'full') {
    return dateStr + ' ' + timeStr
  } else if (type === 'date') {
    return dateStr
  } else {
    return timeStr
  }
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
