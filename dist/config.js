// 创建人：赵文涛
// 创建时间：2022-07-01
// 功能描述： 公共配置文件，定义访问路径等
// noinspection JSUnusedGlobalSymbols

// 数据服务基础Url
const dasBaseUrl = 'http://192.168.1.223:5002/DasService/DataService/'
// 后端服务基础Url
const javaBaseUrl = 'http://192.168.1.223:5002/'
// 文件上传
const fileUploadUrl = 'http://192.168.1.223:5002/DasService/FileService/wdk/Upload'
// 文件下载
const fileDownloadUrl = 'http://192.168.1.223:5002/DasService/FileService/wdk/Down'
// 文件基础Url
const fileBaseUrl = 'http://192.168.1.223:5008/wdk/'
// 文档预览引擎Url
const docViewPath = 'http://192.168.1.223:8012/'

// 数据服务访问令牌
let dasAccessToken
if (getQueryString('hwToken')) {
  dasAccessToken = getQueryString('hwToken')
} else if (getCookie('hwToken')) {
  dasAccessToken = getCookie('hwToken')
} else if (sessionStorage.getItem('hwToken')) {
  dasAccessToken = sessionStorage.getItem('hwToken')
} else {
  dasAccessToken = '6C5D0D5040DE9D973F4B038878167B17D89DCCE35E565BDD0C530C844B5A345830924A12D361FBE778D207ADF4F322E506E0499545536175901BEBB970C30201BD6257DD76162F3632687B737FB5E3FF0A068F18A6748D19FD9FC00E7E95A302EA79DAB26C19C121CD258C4B378795E8C602F328551C6DAEDD870DA9F85363A0FCFADF666C5673AF61C9DF71BF1D61F37443C7865A20DDF534A376848834571F2A5AACD5E3715433751CE11937487EDE27708A0014888CC5'
}

const globalConfig = {
  dasBaseUrl: dasBaseUrl,
  dasAccessToken: dasAccessToken,
  javaBaseUrl: javaBaseUrl,
  fileUploadUrl: fileUploadUrl,
  fileDownloadUrl: fileDownloadUrl,
  fileBaseUrl: fileBaseUrl,
  docViewPath: docViewPath
}

localStorage.setItem('globalConfig', JSON.stringify(globalConfig))

/**
 * 设置Cookie
 * @param key Cookie键
 * @param value Cookie值
 * @param options 配置项
 */
function setCookie(key, value, options) {
  options = options || {}
  if (typeof options.expires === 'number') {
    const days = options.expires,
      t = options.expires = new Date()
    t.setDate(t.getDate() + days)
  }

  document.cookie = [
    encodeURIComponent(key), '=',
    options.raw ? String(value) : encodeURIComponent(String(value)),
    options.expires ? '; expires=' + options.expires.toUTCString() : '',
    options.path ? '; path=' + options.path : '; path=/',
    options.domain ? '; domain=' + options.domain : '',
    options.secure ? '; secure' : ''
  ].join('')
}

/**
 * 获取网页Cookie
 * @param {string} name Cookie名称
 */
function getCookie(name) {
  if (document.cookie.length > 0) {
    let arr
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    if ((arr = document.cookie.match(reg)))
      return unescape(arr[2])
    else
      return ""
  }
  return ""
}

/**
 * 获取页面传递过来的参数
 * @param {string} name 参数名
 */
function getQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  let r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
  let context = ""
  if (r != null)
    context = r[2]
  reg = null
  r = null
  return context == null || context === "" || context === "undefined" ? "" : context
}