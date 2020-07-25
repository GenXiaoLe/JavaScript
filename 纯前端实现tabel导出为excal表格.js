class ImportExcal {
      constructor() {
        // 表格DOM对象
        this.tableDOM = null
      }
      
      // 导出表格方法
      importExcal(DOM, ExcalTitle = '下载') {
        this.tableDOM = DOM
        // 将一个table对象转换成一个sheet对象
        var sheet = XLSX.utils.table_to_sheet(DOM)
        // 导出excal
        this.openDownloadDialog(this.sheetBlob(sheet),`${ExcalTitle}.xlsx`)
      }

      // 配置excal格式 生成blob
      // sheet 表格对象
      // sheetName sheet表名
      sheetBlob(sheet, sheetName) {
        sheetName = sheetName || 'sheet1'
        // 定义工作对象
        var workbook = {
            SheetNames: [sheetName],
            Sheets: {}
        }

        // 生成excel的配置项
        workbook.Sheets[sheetName] = sheet 

        var wopts = {
            bookType: 'xlsx', // 要生成的文件类型
            bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
            type: 'binary'
        }
        // 写入配置
        var wbout = XLSX.write(workbook, wopts)
        var blob = new Blob([s2ab(wbout)], {
            type: "application/octet-stream"
        }) 
        // 字符串转ArrayBuffer
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length)
            var view = new Uint8Array(buf)
            for (var i = 0; i != s.length; ++i) {
              view[i] = s.charCodeAt(i) & 0xFF
            }
            return buf
        }
        return blob
      }
      // 下载excal
      openDownloadDialog(url, saveName) {
        // 创建blob地址
        if (typeof url == 'object' && url instanceof Blob) {
          url = URL.createObjectURL(url) 
        }
        // 创建一个a标签
        var aLink = document.createElement('a')
        aLink.href = url
        aLink.download = saveName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
        var event
        if (window.MouseEvent) {
          event = new MouseEvent('click')
        } else {
          event = document.createEvent('MouseEvents')
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        }
        aLink.dispatchEvent(event)
      }
    }
