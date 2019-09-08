import http from './http.js' // eslint-disable-line

// 获取图片数据 for test
const getImageData = () => {
  // return http.get('pixelPalette/getImageData')
  let test = Array(1024 * 512 * 4).fill(255)
  // dot 1
  test[0] = 255
  test[1] = 102
  test[2] = 102
  // dot 2
  test[4] = 255
  test[5] = 102
  test[6] = 102

  // dot 4
  test[12] = 255
  test[13] = 102
  test[14] = 102
  // dot 5
  test[16] = 255
  test[17] = 102
  test[18] = 102
  return Promise.resolve({
    width: 1024,
    height: 512,
    data: test
  })
}

/**
 * @description 注册
 * @param {String} name 昵称
 */
const register = name => {
  return http.post('/user/register', {
    name
  }).then(data => {
    return data
  })
}

/**
 * @description 获取系统信息
 */
const getSysInfo = () => {
  return http.get('/sysInfo').then(data => data.data)
}

/**
 * @description 获取像素点附加信息
 * @param {Number} index 像素点位置
 */
const getDotInfo = index => {
  return http.get('/dotInfo', {
    index
  }).then(data => data.data)
}

/**
 * @description 获取聊天历史
 */
const getChatHistory = () => {
  return http.get('/chartHistory')
}

/**
 * @description 发送消息
 */
const sendChat = (content, user, way) => {
  let timestamp = new Date().getTime()
  window.socket.emit('newChat', {
    timestamp,
    content,
    user,
    way
  })
  // return http.post('/newChat', {
  //   timestamp,
  //   content,
  //   user,
  //   way
  // })
}

export {
  getImageData,
  getDotInfo,
  register,
  getSysInfo,
  getChatHistory,
  sendChat
}
