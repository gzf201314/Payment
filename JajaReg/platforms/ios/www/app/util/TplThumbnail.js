Ext.define("util.TplThumbnail", {
    alternateClassName: "PreviewFactory",
    singleton: true,
    config: {
        description: '加加餐饮软件'
    },
    constructor: function (config) {
        this.initConfig(config);
    },
    TplPanelParent: function (itemsData) {
        var resultTpl = {
            fullscreen: true,
            layout: {
                type: 'vbox'
            },
            style: ' height:100%; width:100%;background:;',
            scrollable: {
                direction: 'vertical'
            },
            items: itemsData
        };
        return resultTpl;
    },
    TplPanelRow: function (data, columns) {//行
        var array = [], arraylength = data.length, rowsSum, modulo;
        if (arraylength > columns) {
            modulo = arraylength % columns; //最后一行显示几列
            rowsSum = this.getRowSum(modulo, arraylength, columns); //行数
        }
        else {
            rowsSum = 1;
        }
        for (var i = 0; i < rowsSum; i++) {
            var resultTpl;
            if (rowsSum == 1) {
                resultTpl = { xtype: 'panel', id: 'rows' + i, layout: 'hbox', items: this.TplPanelColumns(data, arraylength, columns) };
            }
            else {
                if (i == (rowsSum - 1)) {
                    if (modulo > 0) {
                        var moduloLength = (rowsSum - 1) * columns; //需要移除的个数
                        resultTpl = { xtype: 'panel', id: 'rows' + i, layout: 'hbox', items: this.TplPanelColumns(data, modulo, columns) };
                    }
                    else {
                        resultTpl = { xtype: 'panel', id: 'rows' + i, layout: 'hbox', items: this.TplPanelColumns(data, columns, columns) };
                    }
                }
                else {
                    if (i == 0) {
                        resultTpl = { xtype: 'panel', id: 'rows' + i, layout: 'hbox', items: this.TplPanelColumns(data, columns, columns) };
                        for (var k = 0; k < columns; k++) {
                            data.shift();
                        }
                    }
                    else {
                        resultTpl = { xtype: 'panel', id: 'rows' + i, layout: 'hbox', items: this.TplPanelColumns(data, columns, columns) };
                        for (var n = 0; n < columns; n++) {
                            data.shift();
                        }
                    }
                }
            }
            array.push(resultTpl);
        }
        return array;
    },
    TplPanelColumns: function (obj, length, columnSum) {//列
        var columns = [];
        // console.log(obj);
        //console.log(length);
        //console.log(columnSum);
        if (length == columnSum) {
            for (var i = 0; i < length; i++) {
                var resultColumn;
                if (obj[i].PageID == 'addPage') {
                    resultColumn = this.addPage();
                }
                else {
                    //var tplPreview = JSON.parse(obj[i].PageConfig);
                    resultColumn = {
                        xtype: 'panel',
                        margin: '8 8 0 8',
                        'oldIndex': obj[i].PageID,
                        items: [{
                            xtype: 'panel',
                            id: 'sysPage_' + obj[i].PageID,
                            style: 'height:245px;',
                            items: [this.topPanel(obj[i], obj[i].PageID), {
                                'xtype': 'label',
                                'centered': false,
                                'html': '' + obj[i].PageID + ' 页',
                                'style': 'width:176px;height:40px;color:white;font-size:20px;line-height:40px;padding-right:0px;text-align:center;',
                                'itemId': 'label3'
                            }, {
                                xtype: 'button',
                                zIndex: 9,
                                iconAlign: 'top',
                                iconCls: 'sysClose p-ico p-roseRed',
                                style: 'width:80px;height:80px;border-radius: 200px;background-image: none;background-color: rgba(116, 183, 245, 0.470588);background-image: -webkit-linear-gradient(top, rgba(26, 23, 24, 0.47),rgba(26, 23, 24, 0.47) 3%,rgba(26, 23, 24, 0.47)); ',
                                border: 0,
                                top: 65,
                                left: 47
                                //padding: '0px 1px 0px 2px'
                            }]
                        }]
                    };
                }
                columns.push(resultColumn);
            }
        }
        else {
            for (var j = 0; j < length; j++) {
                var resultColumn;
                if (obj[j].PageID == 'addPage') {
                    resultColumn = this.addPage();
                }
                else {
                    console.log(obj[j].PageID);
                    // var tplPreview = JSON.parse(obj[j].PageConfig);
                    resultColumn = {
                        xtype: 'panel',
                        margin: '8 8 0 8',
                        items: [{
                            xtype: 'panel',
                            id: 'sysPage_' + obj[j].PageID,
                            style: 'height:245px;',
                            items: [this.topPanel(obj[j], obj[j].PageID), {
                                'xtype': 'label',
                                'centered': false,
                                'html': '' + obj[j].PageID + ' 页',
                                'style': 'width:176px;height:40px;color:white;font-size:20px;line-height:40px;padding-right:0px;text-align:center;',
                                'itemId': 'label3'
                            }, {
                                xtype: 'button',
                                zIndex: 9,
                                iconAlign: 'top',
                                iconCls: 'sysClose p-ico p-roseRed',
                                style: 'width:80px;height:80px;border-radius: 200px;background-image: none;background-color: rgba(116, 183, 245, 0.470588);background-image: -webkit-linear-gradient(top, rgba(26, 23, 24, 0.47),rgba(26, 23, 24, 0.47) 3%,rgba(26, 23, 24, 0.47)); ',
                                border: 0,
                                top: 65,
                                left: 47
                                // padding: '0px 1px 0px 2px'
                            }]
                        }]
                    };
                }
                columns.push(resultColumn);
            }
        }
        return columns;
    },
    addPage: function () {
        var resultTpladd = {
            xtype: 'panel',
            style: 'margin:8px;',
            items: [{
                id: 'AddPage',
                xtype: 'img',
                src: 'images/addPage.jpg',
                style: 'width:170px;height:210px;background-size:100% 100%;'
            }]
        };
        return resultTpladd;
    },
    topPanel: function (itemsData, pageId) {//vbox
        var resultTpl = {
            xtype: 'panel',
            style: 'height:212px;background:white;width:176px;',
            layout: 'vbox',
            id: pageId,
            items: this.GetResultPanel(itemsData)
        };
        return resultTpl;
    },
    childPanel: function (dataitems) {//hbox
        var resultHbox = { xtype: 'panel', layout: 'hbox', padding: '0 0 2 0', items: dataitems };
        return resultHbox;
    },
    onlyPanel: function (imgID, imgSrc, index, width, height) {
        var panels = {
            xtype: 'panel',
            padding: '0 2 0 0',
            items: [{
                xtype: 'img',
                id: imgID,
                src: imgSrc,
                zIndex: index,
                style: 'width:' + width + 'px;height:' + height + 'px;background-size:100% 100%;'
            }]
        };
        return panels;
    },
    tplSameSituation: function (data, imgSum, imgSrc, index, width, height) {//imgSrc:'images/03002.jpg';列数只有一个的情况
        var resultTpl, me = this;
        if (data != null) {
            if (imgSum == data.length) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].LocationID == index) {
                        var imgID = me.getImageID(data[i].PageID, data[i].ClassID, data[i].MenuID, imgSum, data[i].LocationID);
                        var src = me.getImagePath(data[i].MenuID);
                        //  console.log(imgID + ":" + src);
                        resultTpl = this.childPanel([this.onlyPanel(imgID, src, index, width, height)]);
                    }
                }
            }
            else {
                for (var n = 0; n < data.length; n++) {
                    // console.log(data[n]);
                    if (data[n].LocationID == index) {
                        var imgID = me.getImageID(data[n].PageID, data[n].ClassID, data[n].MenuID, imgSum, data[n].LocationID);
                        var src = me.getImagePath(data[n].MenuID);
                        resultTpl = this.childPanel([this.onlyPanel(imgID, src, data[n].LocationID, width, height)]);
                    }
                    else {
                        resultTpl = this.childPanel([this.onlyPanel('', imgSrc, index, width, height)]);
                    }
                }
            }
        }
        else {
            resultTpl = this.childPanel([this.onlyPanel('', imgSrc, index, width, height)]);
        }

        return resultTpl;
    },
    /**
    * 获取图片路径
    */
    getImagePath: function (menuID) {
        return JajaCy.isDevicePath() + menuID + ".jpg";
    },
    /**
    * 获取图片编号
    */
    getImageID: function (pageId, classId, menuId, sum, locationId) {
        return pageId + "_" + classId + "_" + menuId + "_" + sum + "_" + locationId;
    },
    tplDifferent: function (data, leftCount, imgSum, imgSrc, count, width, height) {//列数大于一时的情况
        var tempArray = [], resultTemp, me = this;
        for (var i = 0; i < leftCount; i++) {
            count += 1;
            if (data != null) {
                if (imgSum == data.length) {
                    for (var j = 0; j < data.length; j++) {
                        if (data[j].LocationID == count) {
                            var imgID = me.getImageID(data[j].PageID, data[j].ClassID, data[j].MenuID, imgSum, data[j].LocationID);
                            var src = me.getImagePath(data[j].MenuID);
                            var tempTpl = this.onlyPanel(imgID, src, count, width, height);
                            tempArray.push(tempTpl);
                        }
                    }
                }
                else {
                    for (var m = 0; m < data.length; m++) {
                        //console.log(data[m]);
                        if (data[m].LocationID == count) {
                            var imgID = me.getImageID(data[m].PageID, data[m].ClassID, data[m].MenuID, imgSum, data[m].LocationID);
                            var src = me.getImagePath(data[m].MenuID);
                            var tempTpl = this.onlyPanel(imgID, src, count, width, height);
                            tempArray.push(tempTpl);
                            break;
                        }
                        else if (m == data.length - 1) {
                            var tempTpl = this.onlyPanel('', imgSrc, count, width, height);
                            tempArray.push(tempTpl);
                        }
                    }
                }
            }
            else {
                var tempTpl = this.onlyPanel('', imgSrc, count, width, height);
                tempArray.push(tempTpl);
            }

        }
        resultTemp = this.childPanel(tempArray);
        this.SetStorage('tplCount', count);
        return resultTemp;
    },
    getRowSum: function (modulo, length, columnSum) {//返回所需要生成的行数
        var rowslength;
        if (modulo > 0) {
            rowslength = parseInt((length / columnSum).toString().split('.')[0]) + 1;
        }
        else {
            rowslength = (length / columnSum);
        }
        return rowslength;
    },
    GetResultPanel: function (data) {
        //var DataSet = JSON.parse(data); //获取传过来的数据集
        var DataSet = data; //获取传过来的数据集
        var layout = SysPage.showTemplate(data.TemplateID);
        //console.log(layout);
        var rows = layout.rows,
         leftLength = layout.leftLength,
         rightLength = layout.rightLength,
         resultArray = [], width, height,
         imgSrc = layout.imgSrc,
         imgSum = layout.imgSum,
         imgData = DataSet.data;
        // console.log(DataSet);
        //console.log(imgSrc);
        //alert(JSON.stringify(imgData));
        for (var i = 0; i < rows; i++) {
            var temp, count = i;
            if (i == 0) {
                if (leftLength == 1) {
                    count += 1;
                    width = 176;
                    if (rows > 1) {
                        height = 210 / rows;
                    }
                    else
                        height = 212;
                    temp = this.tplSameSituation(imgData, imgSum, imgSrc, count, width, height);
                }
                else if (leftLength > 1) {
                    width = (176 - (leftLength - 1) * 2) / leftLength;
                    height = (212 - (rows - 1) * 2) / rows;
                    temp = this.tplDifferent(imgData, leftLength, imgSum, imgSrc, count, width, height);
                }
                resultArray.push(temp);
            }
            else {
                var minCount = parseInt(this.GetStorage('tplCount'));
                if (rightLength == 1) {
                    width = 176;
                    if (rows > 1) {
                        height = 210 / rows;
                    }
                    else
                        height = 210;
                    temp = this.tplSameSituation(imgData, imgSum, imgSrc, minCount + 1, width, height);
                }
                else if (rightLength > 1) {
                    width = (176 - (rightLength - 1) * 2) / rightLength;
                    height = (212 - (rows - 1) * 2) / rows;
                    temp = this.tplDifferent(imgData, rightLength, imgSum, imgSrc, count, width, height);
                }
                else if (leftLength == 1) {
                    width = 176;
                    height = 105;
                    temp = this.tplSameSituation(imgData, imgSum, imgSrc, count + 1, width, height);
                }
                else if (leftLength > 1) {
                    //width = 173 / leftLength;
                    width = (176 - (leftLength - 1) * 2) / leftLength;
                    height = (212 - (rows - 1) * 2) / rows;
                    temp = this.tplDifferent(imgData, leftLength, imgSum, imgSrc, minCount, width, height);
                }
                resultArray.push(temp);
            }
        }
        return resultArray;
    },
    SetStorage: function (key, value) {//设置值
        localStorage.setItem(key, value);
    },
    GetStorage: function (key) {//获取值
        return localStorage.getItem(key);
    },
    RemoveStorage: function (key) {//删除某个值
        localStorage.removeItem(key);
    }
});