// 创建人：杜昊天
// 创建时间：2022-01-18
// 功能描述：通用方法JavaScript
// noinspection JSUnusedGlobalSymbols

const common = {

    /**
     * 转换树为列表
     * @return {*[]} 结果
     * @param treedata 源树形数据
     */
    tree2List(treedata = []) {
        const result = []
        treedata.forEach(item => {
            let children = item.children || null;
            result.push(item)
            if (children && children.length > 0) {
                this.tree2List(children, result);
            }
        });
        return result;
    },

    /**
     * 获取当前日期
     * @param fmt 格式串
     * @param num 偏移天数
     * @param date 日期
     */
    getCurrentDate(fmt, num, date) {
        let myDate = new Date();
        if (date) {
            myDate = new Date(date)
        }

        if (num) {
            myDate.setTime(myDate.getTime() + num * 24 * 60 * 60 * 1000);
        }

        const o = {
            "M+": myDate.getMonth() + 1, //月份
            "d+": myDate.getDate(), //日
            "h+": myDate.getHours(), //小时
            "m+": myDate.getMinutes(), //分
            "s+": myDate.getSeconds(), //秒
            "q+": Math.floor((myDate.getMonth() + 3) / 3), //季度
            "S": myDate.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (myDate.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (const k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },

    /**
     * 获取年月
     * @param format 格式，%Y-%M
     * @param yearMonth 年月值
     * @param addMonth 加减月份数量
     */
    getMonthYM(format, yearMonth, addMonth) {
        let curDate = new Date();  //当前日期
        if (yearMonth) {
            if (yearMonth.indexOf("-") === -1) {
                yearMonth = yearMonth.substring(0, 4) + "-" + yearMonth.substring(4, 6);
            }
            curDate = new Date(yearMonth);
        }
        let year = curDate.getFullYear();
        let month = curDate.getMonth() + 1;
        if (addMonth) {
            if (addMonth > 0) {
                month += addMonth;
                const num = Math.floor(addMonth / 12);
                for (let i = 0; i < num; i++) {
                    month -= 12;
                    year++;
                }
            } else {
                addMonth = Math.abs(addMonth);
                if (month > addMonth)
                    month = month - addMonth;
                else {
                    const num = Math.floor(addMonth / 12);
                    for (let i = 0; i < num; i++) {
                        month += 12;
                        year--;
                    }
                    month = month + 12 - addMonth;
                    year--;
                }
            }
        }
        const monthOri = month;
        let _month = month.toString();
        if (month >= 0 && month < 10)
            _month = "0" + month;

        let retNy;
        if (format) {
            retNy = format.replace("%Y", year).replace("%M", _month).replace("%m", monthOri);
        } else
            retNy = year + "-" + month;
        return retNy;
    },

    /**
     * 递归创建树形数据结构
     * @param data 源数据
     * @param pid 父节点，传入根节点ID，默认为0
     * @returns {*[]} 树形结构数据
     */
    createTree(data, pid) {
        if (!pid) {
            pid = '0'
        }
        const children = []
        for (const item of data) {
            if (pid === item.pid) {
                const temp = this.createTree(data, item.id)
                if (temp.length > 0) {
                    children.push({
                        id: item.id,
                        name: item.name,
                        flag: item.flag,
                        children: temp
                    })
                } else {
                    children.push({
                        id: item.id,
                        name: item.name,
                        flag: item.flag
                    })
                }
            }
        }
        return children
    },

    /**
     * 数组去重
     * @param arr 源数组
     */
    uniqueArray(arr) {
        const newArr = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] === arr[j]) {
                    ++i;
                }
            }
            newArr.push(arr[i]);
        }
        return newArr;
    },

    /**
     * 生成GUID
     */
    getGuid() {
        let d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },
}

export default common