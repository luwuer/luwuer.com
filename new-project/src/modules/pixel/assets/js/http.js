/**
 * @description axios方法封装
 * @author luwuer
 */

'use strict'
import axios from 'axios'

axios.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  // ie hacker
  if (response.data && typeof response.data === 'string') {
    response.data = JSON.parse(response.data)
  }

  return checkStatus(response)
}, err => {
  return Promise.reject(err)
})

// 请求状态检查
function checkStatus(response) {
  if (!response || response.status !== 200 || response.data.code === -1) {
    return Promise.reject('请求错误')
  }

  return response.data
}

export default {
  get(url, params = {}) {
    return axios({
      method: 'get',
      baseURL: window.config.baseUrl,
      url,
      params,
      timeout: 1000 * 60,
      headers: {}
    })
  },
  post(url, data = {}) {
    return axios({
      method: 'post',
      baseURL: window.config.baseUrl,
      url,
      // data: qs.stringify(data),
      data,
      timeout: 1000 * 60,
      headers: {}
    })
  }
}
