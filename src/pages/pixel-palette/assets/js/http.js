/**
 * @description axios方法封装
 * @author cuiyang18756
 */

'use strict'
import axios from 'axios'
import config from 'static/config'
import qs from 'qs' // eslint-disable-line no-unused-vars

function checkStatus(response) {
  if (!response || response.status !== 200) {
    // -1 请求错误
    // -2 需要登录
    // -3 其他业务错误
    return Promise.reject(new Error(-1))
  } else {
    // 如果data.data中没有数据 提示msg
    if (response.data.msg) {
      console.log(response.data.msg)
    }
    return response.data.data
  }
}

axios.interceptors.request.use(config => {
  console.log(config)
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // axios处理ie返回时为String类型
  if (response.data && typeof response.data === 'string') {
    response.data = JSON.parse(response.data)
  }
  return checkStatus(response)
}, error => {
  return Promise.reject(error)
})

export default {
  get(url, params = {}) {
    return axios({
      method: 'get',
      baseURL: config.baseUrl,
      url,
      params,
      timeout: 1000 * 60,
      headers: {}
    })
  },
  post(url, data = {}) {
    return axios({
      method: 'post',
      baseURL: config.baseUrl,
      url,
      // data: qs.stringify(data),
      data,
      timeout: 1000 * 60,
      headers: {}
    })
  }
}
