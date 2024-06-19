// noinspection JSUnusedLocalSymbols

/**
 * excel 导出功能
 */
import {saveAs} from "file-saver";
import XLSX from "xlsx-style-vite";

function ExcelExport(conf) {
  this.options = conf
  this.excelDefault = {
    bookType: "xlsx", // 文件类型
    filename: "excel", // 文件名
    sheet: [], // 表格配置
    // 处理数据前
    beforeStart: (bookType, filename, sheet) => {
    },
    // 导出前
    beforeExport: (bookType, filename, blob) => {
    },
    // 导出错误
    onError: error => {
      console.log(error)
    },
  }
  this.sheetDeult = {
    // 标题
    title: "",
    // 表头
    tHeader: [],
    //多级表头
    multiHeader: [],
    //表格数据
    table: [],
    // 合并项
    merges: [],
    // 数据键值
    keys: [],
    // 列宽
    colWidth: [],
    // sheet名称
    sheetName: "",
    // 全局样式
    globalStyle: null,
    // 单元格样式
    cellStyle: null,
  }
  this.defaultStyle = {
    sheetName: "sheet",
    globalStyle: {
      border: {
        top: {
          style: "thin",
          color: {rgb: "000000"},
        },
        bottom: {
          style: "thin",
          color: {rgb: "000000"},
        },
        left: {
          style: "thin",
          color: {rgb: "000000"},
        },
        right: {
          style: "thin",
          color: {rgb: "000000"},
        },
      },
      font: {
        name: "宋体",
        sz: 12,
        color: {rgb: "000000"},
        bold: false,
        italic: false,
        underline: false,
        shadow: false,
      },
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: false,
      },
      fill: {
        fgColor: {rgb: "ffffff"},
      },
    },
  }
}

ExcelExport.prototype.exportExcel = function () {
  let opts = this.options
  if (!opts) return
  opts = Object.assign(this.excelDefault, opts)

  // 处理数据前
  const beforeStart = opts.beforeStart(
    opts.bookType,
    opts.filename,
    opts.sheet
  );
  if (beforeStart === false) {
    return
  }
  if (!opts.sheet || opts.sheet.length <= 0) {
    opts.onError("导出数据不能为空")
    return
  }

  const wb = this.Workbook()
  const self = this
  opts.sheet.forEach((item, index) => {
    item = Object.assign(this.sheetDeult, item)
    let {
      // 标题
      title,
      // 表头
      tHeader,
      // 多级表头
      multiHeader,
      // 表格数据
      table,
      // 合并项
      merges,
      // 数据键值
      keys,
      // 列宽
      colWidth,
      // 表名
      sheetName,
      // 全局样式
      globalStyle,
      // 单元格样式
      cellStyle,
    } = item
    sheetName = sheetName || this.defaultStyle.sheetName
    // 默认全局样式覆盖
    const dgStyle = this.defaultStyle.globalStyle
    if (globalStyle) {
      Object.keys(dgStyle).forEach((key) => {
        globalStyle[key] = {...dgStyle[key], ...globalStyle[key]}
      })
    } else {
      globalStyle = dgStyle
    }
    // 处理标题格式
    if (title || title === 0 || title === "") {
      // 取表头、多级表头中的最大值
      const tHeaderLength = (tHeader && tHeader.length) || 0;
      const multiHeaderLength =
        (multiHeader && Math.max(...multiHeader.map((m) => m.length))) || 0
      const titleLength = Math.max(
        tHeaderLength,
        multiHeaderLength,
        keys.length
      )
      // 第一个元素为title，剩余以空字符串填充
      title = [title].concat(Array(titleLength - 1).fill(""))
      // 处理标题的合并\
      const cell = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",]
      let mergeSecond
      if (titleLength > 26) {
        const one = parseInt(titleLength / 26)
        const two = titleLength % 26
        mergeSecond = cell[one - 1] + cell[two - 1] + "1"
      } else {
        mergeSecond = cell[titleLength - 1] + "1"
      }
      const titleMerge = `A1:${mergeSecond}`
      if (!merges) {
        merges = [titleMerge]
      } else {
        if (merges.indexOf(titleMerge) === -1) {
          merges.push(titleMerge)
        }
      }
    }
    //表头对应字段
    let data = table.map((v) => keys.map((j) => v[j]))

    // 多级表头
    if (multiHeader) {
      // 倒序循环
      for (let i = multiHeader.length - 1; i >= 0; i--) {
        data.unshift(multiHeader[i])
      }
    }
    tHeader && tHeader.length > 0 && data.unshift(tHeader)
    title && data.unshift(title)
    const ws = this.sheet_from_array_of_arrays(data)
    if (merges && merges.length > 0) {
      if (!ws["!merges"]) ws["!merges"] = []
      merges.forEach((merge) => {
        ws["!merges"].push(XLSX.utils.decode_range(merge))
      })
    }
    // 如果没有列宽则自适应
    if (!colWidth) {
      // 基准比例，以12为标准
      const benchmarkRate =
        (globalStyle.font.sz && globalStyle.font.sz / 12) || 1
      // 空字符长度
      const nullstr = 10 * benchmarkRate + 2
      // 单个中文字符长度
      const chinese = 2 * benchmarkRate
      // 单个非中文字符长度
      const nChinese = benchmarkRate
      //设置worksheet每列的最大宽度,并+2调整一点列宽
      const sheetColWidth = data.map((row) =>
        row.map((val) => {
          //先判断是否为null/undefined
          if (!val) {
            return {
              wch: nullstr,
            }
          } else {
            const strArr = val.toString().split("")
            const pattern = new RegExp("[\u4E00-\u9FA5]+")
            let re = strArr.map((str) => {
              // 是否为中文
              if (pattern.test(str)) {
                return chinese
              } else {
                return nChinese
              }
            })
            re = re.reduce((total, r) => total + r, 0)
            return {
              wch: re + 2,
            }
          }
        })
      )
      /*以第一行为初始值*/
      let result = sheetColWidth[0]
      for (let i = 1; i < sheetColWidth.length; i++) {
        for (let j = 0; j < sheetColWidth[i].length; j++) {
          if (result[j]["wch"] < sheetColWidth[i][j]["wch"]) {
            result[j]["wch"] = sheetColWidth[i][j]["wch"]
          }
        }
      }
      ws["!cols"] = result
    } else {
      ws["!cols"] = colWidth.map((i) => {
        return {wch: i}
      })
    }

    // 添加工作表
    wb.SheetNames.push(sheetName)
    wb.Sheets[sheetName] = ws
    let dataInfo = wb.Sheets[wb.SheetNames[index]]

      //全局样式
      (function () {
        Object.keys(dataInfo).forEach((i) => {
          if (i === "!ref" || i === "!merges" || i === "!cols") {
          } else {
            dataInfo[i.toString()].s = globalStyle
          }
        })
      })()

      // 单个样式
      (function () {
        if (!cellStyle || cellStyle.length <= 0) {
          return
        }
        cellStyle.forEach((s) => {
          const {border, font, alignment, fill} = s
          dataInfo[s.cell].s = {
            border: border === {} ? border : border || globalStyle.border,
            font: font || globalStyle.font,
            alignment: alignment || globalStyle.alignment,
            fill: fill || globalStyle.fill,
          }
        })
      })()
  })

  // 类型默认为xlsx
  let bookType = opts.bookType === 'xls' ? 'xls' : 'xlsx'
  this.writeExcel(wb, bookType, opts.filename)
}

//如果数据是树形 递归返回导出数据列表
ExcelExport.prototype.recurive = function (data, keys) {
  let result = []
  data.map((v) => {
    let tmpres = []
    keys.map((j) => {
      tmpres.push(v[j])
    })

    result.push(tmpres)
    if (v['children'] && v['children'].length > 0) {
      result = this.recurive(v['children'])
    }
  })
  return result
}
/**
 * 深度克隆对象
 * @param obj 源对象
 * @return 克隆后的对象
 */
ExcelExport.prototype.deepClone = function (obj) {
  let result
  if (Array.isArray(obj)) {
    result = []
  } else if (typeof obj === 'object') {
    result = {}
  } else {
    return obj
  }
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      result[key] = this.deepClone(obj[key])
    } else {
      result[key] = obj[key]
    }
  })
  return result
}

// Workbook对象
ExcelExport.prototype.Workbook = function () {
  class WB {
    constructor() {
      this.SheetNames = []
      this.Sheets = {}
    }
  }

  return new WB()
}

// 导出Excel文件
ExcelExport.prototype.writeExcel = function (wb, bookType, filename) {
  const wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: "binary",
  })
  const blob = new Blob([this.s2ab(wbout)], {
    type: "application/octet-stream",
  })
  if (this.options.beforeExport) {
    const beforeExport = this.options.beforeExport(blob, bookType, filename)
    if (beforeExport === false) {
      return
    }
  }

  saveAs(blob, `${filename}.${bookType}`)
}

// 转化时间格式
ExcelExport.prototype.datenum = function (v, date1904) {
  if (date1904) v += 1462
  const epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

// 设置数据类型
ExcelExport.prototype.sheet_from_array_of_arrays = function (data, opts) {
  let ws = {};
  const range = {
    s: {
      c: 1000000000,
      r: 1000000000,
    },
    e: {
      c: 0,
      r: 0,
    },
  }
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      let cell = {
        v: data[R][C],
      };
      if (cell.v == null) continue
      let cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R,
      })

      if (typeof cell.v === "number") cell.t = "n"
      else if (typeof cell.v === "boolean") cell.t = "b"
      else if (cell.v instanceof Date) {
        cell.t = "n"
        cell.z = XLSX.SSF._table[14]
        cell.v = this.datenum(cell.v)
      } else cell.t = "s"

      ws[cell_ref] = cell
    }
  }
  if (range.s.c < 1000000000) ws["!ref"] = XLSX.utils.encode_range(range)
  return ws
}

// 转换格式
ExcelExport.prototype.s2ab = function (s) {
  const b = new ArrayBuffer(s.length)
  const v = new Uint8Array(b)
  for (let i = 0; i < s.length; i++) {
    v[i] = s.charCodeAt(i) & 0xff
  }
  return b
}

export default ExcelExport