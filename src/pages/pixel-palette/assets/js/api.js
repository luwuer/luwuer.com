import http from './http.js' // eslint-disable-line

/**
 * @description 获取图片数据
 */
const getImageData = () => {
  // return http.get('pixelPalette/getImageData')
  return Promise.resolve({
    width: 512,
    height: 288,
    data: new Array(512 * 288 * 4)
  })
}

export {
  getImageData
}
