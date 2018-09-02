/**
 * @description localStorage函数封装
 * @author cuiyang18756
 */

// const TMP = '[?=pa]'
const TMP = ''

export default {
  /**
   * @description 存储数据
   * @param {String} name 保存在ls中的字段名
   * @param {String} value 保存在ls中的字段值
   */
  setItem: function (name, value) {
    value = JSON.stringify(value) + TMP
    let enValue = encodeURIComponent(value)
    localStorage.setItem(name, enValue)
  },

  /**
   * @description 获取数据
   * @param {String} name 保存在ls中的字段名
   * @param {String} value 保存在ls中的字段值
   */
  getItem: function (name) {
    let enValue = localStorage.getItem(name)
    if (enValue) {
      let value = decodeURIComponent(enValue).split(TMP).join('')
      return JSON.parse(value)
    } else {
      return false
    }
  },

  /**
   * @description 删除变量
   * @param {String} name 保存在ls中的字段名
   */
  removeItem: function(name) {
    localStorage.removeItem(name)
  }
}
