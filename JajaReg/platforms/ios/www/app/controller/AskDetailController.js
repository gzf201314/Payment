Ext.define('JajaApp.controller.AskDetailController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            askdetailview: {
                selector: 'askdetailview',
                xtype: 'askdetailview',
                autoCreate: true
            },
            Back: '#AskDetailBack',
            DelayButton: '#DelayButton',
            GenerateButton: '#GenerateButton'
        },
        control: {
            askdetailview: {
                activate: 'initMessage',
                initialize: 'initialize'
            },
            Back: {
                tap: 'back'
            },
            DelayButton: { // 延期
                tap: 'delayUse'
            },
            GenerateButton: { // 正式注册
                tap: 'generateCode'
            }
        },
        routes: {
            'askdetail': 'showDetailView'
        }
    },
    initialize: function () {
        this.getAskdetailview().on({
            delegate: 'textfield',
            focus: function (sender) {
                var placeHolder = sender.getPlaceHolder();
                if (placeHolder == "申请人" ||
                placeHolder == "申请日期" ||
                placeHolder == "注册日期" ||
                placeHolder == "试用期限") {
                    return;
                }
                sender.setReadOnly(false);

                var key = Common.getValue('txtAskDetailSysType');
                if (placeHolder == "请选择模块") {
                    if (key.length == 0) {
                        Common.alert("提示", "请选择系统");
                        return;
                    }
                    else {
                        Choose.showModule(['txtAskDetailSysType', 'txtAskDetailModules']);
                    }
                }
                else if (placeHolder == "请选择系统") {
                    Choose.showSystem(['txtAskDetailSysType', 'txtAskDetailModules']);
                }
            }
        });
    },
    // 返回
    back: function () {
        var me = this;
        Common.redirectTo(me, 'askdetail', 'ask'); // 数据加载完成进行跳转。
    },
    // 延期使用
    delayUse: function () {
        // 1.需要更新数据库内容 --- [1.删除申请记录;2.更新试用注册码]
        var me = this;
        // 提示是否延期
        Common.confirm({
            Title: "延期\"软件正式注册\"",
            Message: "若延期，请按\"确定\"进行延期!",
            Done: "确定",
            Cancel: "取消"
        }, function () {
            Progress.start("正在生成注册码,请稍后...");
            var modelString = this.getDelayModel();
            setTimeout(function () {
                Record.getList('DelayTrial', modelString, function (msg) {
                    Progress.close();
                    console.log(msg);
                    var obj = JSON.parse(msg);
                    if (obj.Message == "延期注册成功") {
                        if (app.isDevice) {
                            //  2.给指定的别名进行消息推送
                            jpush.send({
                                key: 'PushAlias',
                                value: {
                                    Alias: '1000',
                                    Message: '您有新的消息请注意查收!'
                                }
                            }, function (data) {
                                console.log(data);
                            }, function (data) {
                                console.log(data);
                            });
                        }

                        // 3.数据加载完成进行跳转
                        Common.redirectTo(me, 'askdetail', 'regcode');

                        // 4.设置注册码
                        Common.setValue('txtRegCode', "永和豆浆\\新乡市银马口家乐福楼下\\2用户试用增强版");
                    }

                }, function (msg) {
                    console.log(msg);
                    Progress.close();
                });
            }, 50);
        }, function () {
            console.log("取消延期");
        });
    },
    /**
    * 获取延期信息
    */
    getDelayModel: function () {
        var data = this.getApplyModel(); // 获取申请信息

        console.log(Time.getDelayOneMonth(data.TryDate));

        var model = {};
        model.RegID = data.OriRegID;                          // 注册单号										
        model.RegName = data.HotelName; 					  // 注册店名										
        model.RegAddress = data.HotelAddress; 			      // 注册地址										
        model.RegNum = data.SitesNumber; 				      // 注册用户数	
        model.RegMealOrder = data.MealOrderNumber;            // 注册点菜宝数
        model.TryDate = Time.getDelayOneMonth(data.TryDate);  // 试用到期日------一般延期期1个月										
        model.RegModuleID = data.RegModuleID; 		          // 注册模块ID										
        model.RegModuleName = data.Modules; 		          // 注册模块名
        model.RegSystem = data.SysType; 	                  // 注册系统类型										
        model.RegCode = ""					                  // 注册码										
        model.OriRegID = data.RegID; 		              // 原注册单号------代理商在重注册的情况下会记录原有的单号
        model.RegTime = Time.GetDateShortTime(); 		      // 注册时间										
        model.RegUserID = data.RegUserID;                     // 申请人账户
        model.Remark = data.Remark;                           // 备注
        return JSON.stringify(model);                         // 返回json格式的字符串
    },
    /**
    * 获取申请信息
    */
    getApplyModel: function () {
        var data = {
            RegUserID: Common.getValue('txtAskDetailRegUserID'), // 申请人
            AskTime: Common.getValue('txtAskDetailApplyDate'), // 申请时间
            RegTime: Common.getValue('txtAskDetailRegDate'),   // 注册时间
            TryDate: Common.getValue('txtAskDetailTryDate'),   // 试用时间
            HotelName: Common.getValue('txtAskDetailHotelName'), // 酒店名称
            HotelAddress: Common.getValue('txtAskDetailHotelAddress'), // 酒店地址
            SitesNumber: Common.getValue('txtAskDetailSitesNumber'), // 站点数
            MealOrderNumber: Common.getValue('txtAskDetailMealOrderNumber'), // 点菜宝数
            SysType: Common.getValue('txtAskDetailSysType'), // 系统类型
            RegModuleID: Common.getValue('txtAskDetailRegModuleID'), // 模块编号
            Modules: Common.getValue('txtAskDetailModules'), // 系统模块
            Remark: Common.getValue('txtAskDetailRemark'),   // 备注
            RegID: Common.getValue('txtAskDetailRegID'),
            OriRegID: Common.getValue('txtAskDetailOriRegID')
        }
        return data;
    },
    /**
    * 生成正式码需要的信息
    */
    getGenerateModel: function () {
        var data = this.getApplyModel(); // 获取申请信息
        // 注:系统编号，模块编号
        var modules = JSON.parse(localStorage.getItem("modules"));
        var UserID = JSON.parse(localStorage.getItem('remember')).UserName;
        /*
        需要进行注册的信息
        */
        var model = {};
        model.RegID = data.RegID;                             // 注册单号										
        model.RegName = data.HotelName; 					  // 注册店名										
        model.RegAddress = data.HotelAddress; 			      // 注册地址										
        model.RegNum = data.SitesNumber; 				      // 注册用户数	
        model.RegMealOrder = data.MealOrderNumber;            // 注册点菜宝数
        model.TryDate = data.TryDate; 				          // 试用到期日------一般试用期三个月										
        model.RegModuleID = data.RegModuleID; 		          // 注册模块ID										
        model.RegModuleName = data.Modules; 		          // 注册模块名
        model.RegSystem = data.SysType; 	                  // 注册系统类型										
        model.RegCode = ""					                  // 注册码										
        model.OriRegID = data.OriRegID; 		              // 原注册单号------代理商在重注册的情况下会记录原有的单号
        model.RegTime = data.RegTime; 		                  // 注册时间										
        model.RegUserID = data.RegUserID;                     // 申请人账户
        model.Remark = data.Remark;                           // 备注
        model.AskTime = data.AskTime; 		                  // 申请时间
        model.OffTime = Time.GetDateShortTime(); 		      // 正式注册时间										
        model.IsOffReg = true;                                // 是否为正式
        model.OffRegUser = UserID;                            // 正式注册人
        return JSON.stringify(model);                         // 返回json格式的字符串
    },
    // 生成正式注册
    generateCode: function () {
        var me = this;
        // 提示是否延期
        Common.confirm({
            Title: "软件正式注册",
            Message: "若注册，请按\"确定\"进行注册!",
            Done: "确定",
            Cancel: "取消"
        }, function () {
            Progress.start("正在生成注册码,请稍后...");
            // 1.需要更新数据库内容 --- [1.更新申请状态(申请状态改为正式注册状态);2.更新注册码(是否需要将这条临时注册记录彻底)]

            console.log(this.getGenerateModel());
            var modelString = me.getGenerateModel();
            setTimeout(function () {
                Record.getList('Generate', modelString, function (msg) {
                    console.log(msg);
                    Progress.close();
                    var obj = JSON.parse(msg);
                    if (obj.Message == "注册成功") {
                        if (app.isDevice) {
                            //  2.给指定的别名进行消息推送
                            jpush.send({
                                key: 'PushAlias',
                                value: {
                                    Alias: '1000',
                                    Message: '您有新的消息请注意查收!'
                                }
                            }, function (data) {
                                console.log(data);
                            }, function (data) {
                                console.log(data);
                            });
                        }

                        // 3.数据加载完成进行跳转。
                        // Common.alert("提示", data.Message);
                        Common.redirectTo(me, 'askdetail', 'regcode');

                        // 4.设置注册码
                        Common.setValue('txtRegCode', "永和豆浆\\新乡市银马口家乐福楼下\\2用户试用增强版");

                    }

                }, function (msg) {
                    console.log(msg);
                    Progress.close();
                });
            }, 50);
        }, function () {
            console.log("取消正式注册");
        });
    },
    // 初始化酒店信息
    initMessage: function (newActiveItem, sender, oldActiveItem, eOpts) {
        if (oldActiveItem.getId() == 'registerview') {
            Progress.animate(this.getAskdetailview(), 'left');
        }

        this.getDetail(function (listview) {
            var data = listview.getRecord().data;
            console.log(listview.getRecord().data);
            Common.setValue('txtAskDetailRegUserID', data.RegUserID);
            Common.setValue('txtAskDetailApplyDate', data.AskTime),
            Common.setValue('txtAskDetailRegDate', data.RegTime),
            Common.setValue('txtAskDetailTryDate', data.TryDate),
            Common.setValue('txtAskDetailHotelName', data.RegName),
            Common.setValue('txtAskDetailHotelAddress', data.RegAddress),
            Common.setValue('txtAskDetailSitesNumber', data.RegNum),
            Common.setValue('txtAskDetailMealOrderNumber', data.RegMealOrder),
            Common.setValue('txtAskDetailSysType', data.RegSystem),
            Common.setValue('txtAskDetailRegModuleID', data.RegModuleID),
            Common.setValue('txtAskDetailModules', data.RegModuleName),
            Common.setValue('txtAskDetailRemark', data.Remark),
            Common.setValue('txtAskDetailRegID', data.RegID),
            Common.setValue('txtAskDetailOriRegID', data.OriRegID);
        });
        // this.setTextFieldState();
    },
    /**
    *  设置文本框状态
    */
    setTextFieldState: function () {
        var sender = this.getAskdetailview().query('textfield');
        for (var i = 0; i < sender.length; i++) {
            sender[i].setReadOnly(true); // 设为只读
        }
    },
    // 获取当前明细
    getDetail: function (callback) {
        var listView = this.getApplication().getController('AskController').getAskview().getItems().getAt(1).getItems().getAt(0).getItems().getAt(2).getItems();
        for (var i = 0; i < listView.length; i++) {
            if (parseInt(localStorage.getItem('recordIndex')) == i) {
                callback(listView.getAt(i));
            }
        }
    },
    showDetailView: function () {
        console.log(this);
        Progress.animate(this.getAskdetailview(), 'right');
        Ext.Viewport.setActiveItem(this.getAskdetailview());
    }
});