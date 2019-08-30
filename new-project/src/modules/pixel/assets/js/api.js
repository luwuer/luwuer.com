import http from './http.js' // eslint-disable-line

/**
 * @description 获取图片数据
 */
// const getImageData = () => {
//   // return http.get('pixelPalette/getImageData')
//   let test = Array(512 * 288 * 4).fill(255)
//   // dot 1
//   test[0] = 255
//   test[1] = 102
//   test[2] = 102
//   // dot 2
//   test[4] = 255
//   test[5] = 102
//   test[6] = 102
//   return Promise.resolve({
//     width: 512, // 1024 / 2
//     height: 288, // 576 / 2
//     // data: Uint8ClampedArray.from(test)
//     data: test
//   })
// }

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
    // data: Uint8ClampedArray.from(test)
    data: test
  })
}
export {
  getImageData
}
