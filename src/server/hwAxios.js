import axios from 'axios'

const globalConfig = JSON.parse(localStorage.getItem('globalConfig'))

const dasBaseUrl = globalConfig.dasBaseUrl
// 创建axios实例
const dasService = axios.create({
  baseURL: dasBaseUrl,
  timeout: 60000, // 请求超时时间
  crossDomain: true
})

const javaBaseUrl = globalConfig.javaBaseUrl
// 创建axios实例
const javaService = axios.create({
  baseURL: javaBaseUrl,
  timeout: 60000, // 请求超时时间
  crossDomain: true
})

// request拦截器
dasService.interceptors.request.use(
  config => {
    config.headers['Token'] = globalConfig.dasAccessToken
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
dasService.interceptors.response.use(response => {
    return response.data
  }, error => {
    // 兼容blob下载出错json提示
    if (error.response.data instanceof Blob && error.response.data.type.toLowerCase().indexOf('json') !== -1) {
      const reader = new FileReader()
      reader.readAsText(error.response.data, 'utf-8')
      reader.onload = function () {
        const errorMsg = JSON.parse(reader.result).message
        Notification.error({
          title: errorMsg,
          duration: 5000
        })
      }
    } else {
      let code = 0
      try {
        code = error.response.data.status
      } catch (e) {
        if (error.toString().indexOf('Error: timeout') !== -1) {
          Notification.error({
            title: '网络请求超时',
            duration: 5000
          })
          return Promise.reject(error)
        }
      }

      if (code) {
        const errorMsg = error.response.data.message
        if (errorMsg !== undefined) {
          Notification.error({
            title: errorMsg,
            duration: 0
          })
        }
      } else {
        Notification.error({
          title: '接口请求失败',
          duration: 5000
        })
      }
    }
    return Promise.reject(error)
  }
)

// request拦截器
javaService.interceptors.request.use(
  config => {
    config.headers['Token'] = globalConfig.dasAccessToken
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
javaService.interceptors.response.use(response => {
    return response.data
  }, error => {
    // 兼容blob下载出错json提示
    if (error.response.data instanceof Blob && error.response.data.type.toLowerCase().indexOf('json') !== -1) {
      const reader = new FileReader()
      reader.readAsText(error.response.data, 'utf-8')
      reader.onload = function () {
        const errorMsg = JSON.parse(reader.result).message
        Notification.error({
          title: errorMsg,
          duration: 5000
        })
      }
    } else {
      let code = 0
      try {
        code = error.response.data.status
      } catch (e) {
        if (error.toString().indexOf('Error: timeout') !== -1) {
          Notification.error({
            title: '网络请求超时',
            duration: 5000
          })
          return Promise.reject(error)
        }
      }

      if (code) {
        const errorMsg = error.response.data.message
        if (errorMsg !== undefined) {
          Notification.error({
            title: errorMsg,
            duration: 0
          })
        }
      } else {
        Notification.error({
          title: '接口请求失败',
          duration: 5000
        })
      }
    }
    return Promise.reject(error)
  }
)

export default {dasService, javaService}