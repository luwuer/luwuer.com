export default {
  WIDTH: 1024, // canvas width pow(2, 10)
  HEIGHT: 512, // canvas height pow(2, 9)
  RATIO: {
    levelInfos: [1, 8, 16, 32],
    levelMin: 0,
    levelMax: 2,
    default: 1, // 默认缩放，2 表示 2 x 2 实际像素对应原数据 1 个像素
    min: 1, // 最小缩放比率
    max: 16 // 最大缩放比率 pow(2, 4)
  }
}
