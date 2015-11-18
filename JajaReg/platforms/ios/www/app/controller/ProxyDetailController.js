Ext.define('JajaApp.controller.ProxyDetailController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            proxydetailview: {
                selector: 'proxydetailview',
                xtype: 'proxydetailview',
                autoCreate: true
            },
            DetailBack: '#ProxyDetailBack',
            MoreProxyDetailButton: '#MoreProxyDetailButton'
        },
        control: {
            proxydetailview: {
                activate: 'initMessage'
            },
            DetailBack: {
                tap: 'back'
            },
            MoreProxyDetailButton: {
                tap: 'showSheetView'
            }
        },
        routes: {
            'proxydetail': 'showDetailView'
        }
    },
    // 返回
    back: function () {
        var me = this;
        Common.redirectTo(me, 'proxydetail', 'record'); // 数据加载完成进行跳转。
    },
    // 初始化酒店信息
    initMessage: function (newActiveItem, sender, oldActiveItem, eOpts) {
        if (oldActiveItem.getId() == 'registerview') {
            Progress.animate(this.getProxydetailview(), 'left');
        }

        this.getDetail(function (listview) {
            var data = listview.getRecord().data;
            console.log(listview.getRecord().data);
            Common.setValue('txtProxyDetailCompanyName', data.RegUserID),
            Common.setValue('txtProxyDetailRegDate', data.RegTime),
            Common.setValue('txtProxyDetailTryDate', data.TryDate),
            Common.setValue('txtProxyDetailHotelName', data.RegName),
            Common.setValue('txtProxyDetailHotelAddress', data.RegAddress),
            Common.setValue('txtProxyDetailSitesNumber', data.RegNum),
            Common.setValue('txtProxyDetailMealOrderNumber', ''),
            Common.setValue('txtProxyDetailSysType', data.RegSystem),
            Common.setValue('txtProxyDetailModules', data.RegModuleName),
            Common.setValue('txtProxyDetailRegCode', data.RegCode);
            Common.setValue('txtProxyDetailRemark', data.Remark);
        });

    },
    // 获取当前明细
    getDetail: function (callback) {
        var listView = this.getApplication().getController('HistoryController').getRecordview().getItems().getAt(1).getItems().getAt(0).getItems().getAt(2).getItems();
        for (var i = 0; i < listView.length; i++) {
            if (parseInt(localStorage.getItem('recordIndex')) == i) {
                callback(listView.getAt(i));
            }
        }
    },
    // 更多操作
    showSheetView: function () {
        var me = this, data = new JajaApp.view.DetailActionSheet();
        
        // 隐藏操作视图中的“申请正式码”操作视图 
        data.getItems().getAt(0).getItems().getAt(0).getItems().getAt(1).hide();
        // 设置操作视图高度
        data.setHeight(199);
        if (!app.isDevice) {
            // 设置操作视图高度
            data.setHeight(152);
            // 更新操作视图中的“复制注册码”操作视图
            var copyaction = data.getItems().getAt(0).getItems().getAt(0).getItems().getAt(2);
            copyaction.setStyle({ "border-bottom": "0px solid" });
            // 隐藏操作视图中的“转发注册码”操作视图 
            var forwarding = data.getItems().getAt(0).getItems().getAt(0).getItems().getAt(3);
            forwarding.hide();
        }

        
        Ext.Viewport.add(data);
        data.show();

        data._modal.on('tap', function () {
            data.hide();
        });

        data.on('hide', function () {
            data.destroy();
        });

        data.on({
            delegate: 'button',
            tap: function (sender) {
                if (sender.getText() == "重注册(延期)") {
                    data.hide();
                    setTimeout(function () {
                        Common.redirectTo(me, 'detail', 'register');

                        // 获取酒店信息
                        var hotelName = Common.getValue('txtDetailHotelName'),
                            hotelAddress = Common.getValue('txtDetailHotelAddress'),
                            hotelSites = Common.getValue('txtDetailSitesNumber'),
                            hotelMealOrder = Common.getValue('txtDetailMealOrderNumber'),
                            hotelSystemType = Common.getValue('txtDetailSysType'),
                            hotelModules = Common.getValue('txtDetailModules');

                        // 设置注册视图中的酒店信息
                        Common.setValue('txtHotelName', hotelName);
                        Common.setValue('txtHotelAddress', hotelAddress);
                        Common.setValue('txtSitesNumber', hotelSites);
                        Common.setValue('txtMealOrderNumber', hotelMealOrder);
                        Common.setValue('SysTypeButton', hotelSystemType);
                        Common.setValue('ModuleButton', hotelModules);
                    }, 100);
                }

                if (sender.getText() == "复制注册码") {
                    // 发送消息到剪切板
                    var maskpanel = data;
                    sms.sendCopy("永和豆浆\\新乡市银马口家乐福楼下\\2用户试用增强版", function (data) {
                        Common.alert('提示', "注册码" + data);
                        maskpanel.hide();
                    }, function () {
                        Common.alert("提示", data);
                        maskpanel.hide();
                    });
                }
            }
        });
    },
    showDetailView: function () {
        console.log(this);
        Progress.animate(this.getProxydetailview(), 'right');
        Ext.Viewport.setActiveItem(this.getProxydetailview());
    }
});