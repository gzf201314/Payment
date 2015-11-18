Ext.define('JajaApp.controller.DetailController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            detailview: {
                selector: 'detailview',
                xtype: 'detailview',
                autoCreate: true
            },
            MoreOption: '#MoreActionButton',
            DetailBack: '#DetailBack'
        },
        control: {
            detailview: {
                activate: 'initMessage'
            },
            MoreOption: {
                tap: 'initMoreOptionView'
            },
            DetailBack: {
                tap: 'back'
            }
        },
        routes: {
            'detail': 'showDetailView'
        }
    },
    // 返回
    back: function () {
        var me = this;
        Common.redirectTo(me, 'detail', 'record'); // 数据加载完成进行跳转。
    },
    // 初始化酒店信息
    initMessage: function (newActiveItem, sender, oldActiveItem, eOpts) {
        if (oldActiveItem.getId() == 'registerview') {
            Progress.animate(this.getDetailview(), 'left');
        }
        this.getDetail(function (listview) {
            var data = listview.getRecord().data;
            console.log(listview.getRecord().data);
            Common.setValue('txtDetailRegDate', data.RegTime),
            Common.setValue('txtDetailTryDate', data.TryDate),
            Common.setValue('txtDetailHotelName', data.RegName),
            Common.setValue('txtDetailHotelAddress', data.RegAddress),
            Common.setValue('txtDetailSitesNumber', data.RegNum),
            Common.setValue('txtDetailMealOrderNumber', ''),
            Common.setValue('txtDetailSysType', data.RegSystem),
            Common.setValue('txtDetailModules', data.RegModuleName),
            Common.setValue('txtDetailRegCode', data.RegCode);
            Common.setValue('txtDetailRemark', data.Remark);
            Common.setValue('txtDetailOriRegID', data.RegID);
        });

    },
    // 初始化注册码转发视图
    initMoreOptionView: function () {
        var me = this, actionDetail = new JajaApp.view.DetailActionSheet();
        if (!app.isDevice) {
            // 设置操作视图高度
            actionDetail.setHeight(199);
            // 更新操作视图中的“复制注册码”操作视图
            var copyaction = actionDetail.getItems().getAt(0).getItems().getAt(0).getItems().getAt(2);
            copyaction.setStyle({ "border-bottom": "0px solid" });
            // 隐藏操作视图中的“转发注册码”操作视图 
            var forwarding = actionDetail.getItems().getAt(0).getItems().getAt(0).getItems().getAt(3);
            forwarding.hide();
        }

        Ext.Viewport.add(actionDetail);
        actionDetail.show();

        actionDetail._modal.on('tap', function () {
            actionDetail.hide();
        });

        actionDetail.on('hide', function () {
            actionDetail.destroy();
        });

        actionDetail.on({
            delegate: 'button',
            tap: function (sender) {
                if (sender.getText() == "重注册(延期)") { // 需要将list销毁

                    actionDetail.hide();
                    setTimeout(function () {
                        Common.redirectTo(me, 'detail', 'register');

                        // 获取酒店信息
                        var hotelName = Common.getValue('txtDetailHotelName'),
                            hotelAddress = Common.getValue('txtDetailHotelAddress'),
                            hotelSites = Common.getValue('txtDetailSitesNumber'),
                            hotelMealOrder = Common.getValue('txtDetailMealOrderNumber'),
                            hotelSystemType = Common.getValue('txtDetailSysType'),
                            hotelModules = Common.getValue('txtDetailModules'),
                            hotelRemark = Common.getValue('txtDetailRemark'),
                            hotelOriRegID = Common.getValue('txtDetailOriRegID');

                        // 设置注册视图中的酒店信息
                        Common.setValue('txtHotelName', hotelName);
                        Common.setValue('txtHotelAddress', hotelAddress);
                        Common.setValue('txtSitesNumber', hotelSites);
                        Common.setValue('txtMealOrderNumber', hotelMealOrder);
                        Common.setValue('SysTypeButton', hotelSystemType);
                        Common.setValue('ModuleButton', hotelModules);
                        Common.setValue('txtHotelRemark', hotelRemark);
                        Common.setValue('txtOriRegID', hotelOriRegID);
                    }, 50);
                }

                if (sender.getText() == "复制注册码") {
                    // 发送消息到剪切板
                    var maskpanel = actionDetail;
                    sms.sendCopy("永和豆浆\\新乡市银马口家乐福楼下\\2用户试用增强版", function (data) {
                        Common.alert('提示', "注册码" + data);
                        maskpanel.hide();
                    }, function () {
                        Common.alert("提示", data);
                        maskpanel.hide();
                    });
                }

                if (sender.getText() == "申请正式码") {
                    // 提示是否申请
                    Common.confirm({ Title: "申请\"软件正式注册\"", Message: "若申请，请按\"确定\"进行申请!", Done: "确定", Cancel: "取消" }, function () {
                        Progress.start("正在提交,请稍后...");
                        me.getDetail(function (listview) {
                            var data = listview._record.data;
                            console.log(data.RegID);
                            if (data.State == State.apply) {
                                Progress.close();
                                Common.alert("申请\"软件正式注册\"", "不能重复提交!");
                                actionDetail.hide();
                                return;
                            }

                            me.isApply(data.RegID, function (msg) {
                                data.State = State.apply;
                                listview.setData(data); // 更新当前记录

                                if (app.isDevice) { // 移动设备
                                    // 给指定的别名进行消息推送
                                    jpush.send({
                                        key: 'PushAlias',
                                        value: {
                                            Alias: 'admin', // 管理员账号
                                            Message: '您有新的消息请注意查收!'
                                        }
                                    }, function (data) {
                                        //Common.alert("提示", data.Message);

                                    }, function (data) {
                                        // Common.alert("提示", "网络异常,请检查网络!");
                                    });
                                }

                                Progress.close();
                                Common.alert("申请\"软件正式注册\"", msg);
                                actionDetail.hide();
                                me.back();

                            }, function (msg) {
                                Progress.close();
                                Common.alert("提示", "网络异常");
                            });

                        });
                    }, function () {
                        actionDetail.hide();
                        return;
                    });
                }
            }
        });
    },
    // 返回数据模型
    getApplyModel: function (data) {
        var model = {};
        model.RegID = data.RegUserID + "_" + Time.getTimeString();  // 注册单号										
        model.RegName = data.RegName; 						        // 注册店名										
        model.RegAddress = data.RegAddress; 			            // 注册地址										
        model.RegNum = data.RegNum; 				                // 注册用户数										
        model.TryDate = data.TryDate; 				                // 试用到期日										
        model.RegModuleID = data.RegModuleID; 			            // 注册模块ID										
        model.RegModuleName = data.RegModuleName; 		            // 注册模块名	
        //model.RegSystemID = data.RegSystemID;                     // 注册系统ID
        model.RegSystem = data.RegSystem; 	                        // 注册系统类型										
        model.RegCode = ""					                        // 注册码										
        model.OriRegID = data.RegID; 		                    // 原注册单号										
        model.RegTime = data.RegTime; 			                    // 注册时间		
        model.Remark = data.Remark;                                 // 备注说明								
        model.RegUserID = data.RegUserID;
        model.AskTime = Time.GetDateShortTime();                    // 提交申请的时间
        model.IsOffReg = false;
        model.OffRegUser = "";
        model.OffTime = "";
        return model;
    },
    /**
    * 是否提交正式码申请
    */
    isApply: function (id, success, error) {
        var me = this;
        Record.getList('TrialModify', id, function (jsonStr) {
            var obj = me.getApplyModel(JSON.parse(jsonStr));
            Record.getList('TrialApply', obj, function (data) {
                success(data);
                console.log(data);
            }, function (message) {
                error(message);
                console.log(message);
            });
        }, function (message) {
            error(message);
            console.log(message);
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
    showDetailView: function () {
        Progress.animate(this.getDetailview(), 'right');
        Ext.Viewport.setActiveItem(this.getDetailview());
    }
});