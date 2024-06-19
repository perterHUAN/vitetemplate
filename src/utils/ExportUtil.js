import ExcelExport from "@/lib/ExcelExport";
import common from "@/utils/common";
//高风险作业督查情况
const gfxdc = {
    ExcelExport: (title, multiHeader, expdata, columns, merges) => {
        //sheet页配置项
        const sheetConf = {};
        //导出数据标题
        sheetConf.title = title; //标题;
        //复合表头设置
        sheetConf.multiHeader = multiHeader;
        //组织导出的数据
        sheetConf.table = common.tree2List(expdata);
        //导出的数据列代码
        sheetConf.keys = columns;
        //表头单元格合并设置
        sheetConf.merges = merges;
        //列宽设置
        sheetConf.colWidth = [
            8, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 50,
        ];
        //sheet页名称设置
        sheetConf.sheetName = "sheet";
        //单元格表头样式，
        sheetConf.cellStyle = [];
        const colsArr = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
        ];
        for (let j = 1; j <= 2; j++) {
            for (let i = 1; i <= colsArr.length; i++) {
                const cell = {};
                cell.cell = colsArr[i - 1] + j;
                cell.fill = {
                    fgColor: {rgb: "d6f0ff"},
                };
                sheetConf.cellStyle.push(cell)
            }
        }
        const eConf = {};
        eConf.bookType = "xlsx"; //导出文件类型
        eConf.filename = sheetConf.title; //导出文件名称
        eConf.sheet = [sheetConf];

        const excelExport = new ExcelExport(eConf)
        excelExport.exportExcel()
    },
}
export {
    gfxdc,
}
