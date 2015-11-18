Ext.define('JajaApp.controller.OfficialController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            officialview: {
                selector: 'officialview',
                xtype: 'officialview',
                autoCreate: true
            },
            OfficialBack: '#OfficialBack'
        },
        control: {
            officialview: {
                activate: 'activateList'
            },
            OfficialBack: {
                tap: 'back'
            }
        },
        routes: {
            'official': 'showListOfficialView'
        }
    },
    // 数据初始化
    initListData: function () {
        var sender = this.getOfficialview().getItems().getAt(1), me = this;
        Progress.start("正在加载,请稍后...");
        setTimeout(function () {
            Record.getList('Official', {
                RegBeginTime: '',
                RegEndTime: '',
                HotelName: '',
                HotelAddress: '',
                RegExpireBegin: '',
                RegExpireEnd: '',
                IsTrial: false,
                UserID: 'admin',
                RegUserID: ''
            }, function (jsonStr) {

                var dataSet = JSON.parse(jsonStr);
                var listview = Record.getOfficialList(dataSet);
                listview.on('itemtap', function (sender, index, target, record, e, eOpts) {
                    // 跳转到注册资料明细
                    // console.log(target.getRecord().data);
                    // localStorage.setItem('recordIndex', index);
                    Common.redirectTo(me, 'official', 'officialdetail');
                });
                sender.setItems(listview);

                Progress.close();
            }, function (message) {
                console.log(message);
                Progress.close();
                Common.alert("提示", "网络异常,请检查网络!");
            });
        }, 50);
    },
    /**
    *  正式注册记录
    */
    initOfficiall: function () {
        var sender = this.getOfficialview().getItems().getAt(1), me = this;
        var UserID = JSON.parse(localStorage.getItem('remember')).UserName;
        Progress.start("正在加载,请稍后...");
        setTimeout(function () {
            Record.getList('Official', {
                RegBeginTime: '',
                RegEndTime: '',
                HotelName: '',
                HotelAddress: '',
                RegExpireBegin: '',
                RegExpireEnd: '',
                IsTrial: false,
                UserID: UserID,
                RegUserID: UserID
            }, function (jsonStr) {

                var dataSet = JSON.parse(jsonStr);

                if (Common.isArray(dataSet)) {
                    for (var index in dataSet) {
                        if (isNaN(parseInt(index))) break;
                        dataSet[index].AskTime = Record.ChangeDateFormat(dataSet[index].AskTime);
                        dataSet[index].OffTime = Record.ChangeDateFormat(dataSet[index].OffTime);
                        dataSet[index].TryDate = Record.ChangeDateFormat(dataSet[index].TryDate);
                        dataSet[index].RegTime = Record.ChangeDateFormat(dataSet[index].RegTime);
                        //dataSet[index].State = (dataSet[index].IsAsk) ? State.apply : State.trial;
                        dataSet[index].IsRegAdmin = Record.isRegAdmin(dataSet[index].RegUserID);
                    }
                }
                console.log(dataSet);
                var listview;
                if (Record.isAdmin()) {
                    listview = Record.getProxyOfficialListConfiguration(dataSet); // 获取list列表对象
                    listview.on('itemtap', function (sender, index, target, record, e, eOpts) {

                        console.log(target.getRecord().data);
                        // 保存当前的下标索引
                        localStorage.setItem('recordIndex', index);
                        // 跳转到注册资料明细
                        Common.redirectTo(me, 'official', 'proxyofficialdetail');

                        var txtRegDate = Ext.getCmp('txtProxyOfficialDetailTryDate'),
                            isRegAdmin = target.getRecord().data.IsRegAdmin,
                            txtHiddens = ["txtProxyOfficialDetailRegUserID", "txtProxyOfficialDetailRegDate"];
                        var RegUserID = target.getRecord().data.RegUserID;
                        if (isRegAdmin) {
                            txtRegDate.setLabel("注册日期：");
                            me.hide(txtHiddens);
                        }
                        else {
                            txtRegDate.setLabel("审批日期：");
                            me.show(txtHiddens);
                        }
                    });
                }
                else {
                    listview = Record.getOfficialList(dataSet);
                    listview.on('itemtap', function (sender, index, target, record, e, eOpts) {
                        // 跳转到注册资料明细
                        // console.log(target.getRecord().data);
                        localStorage.setItem('recordIndex', index);
                        Common.redirectTo(me, 'official', 'officialdetail');
                    });
                }

                sender.setItems(listview);

                Progress.close();
            }, function (message) {
                console.log(message);
                Progress.close();
                Common.alert("提示", "网络异常,请检查网络!");
            });
        }, 10);
    },
    // 隐藏
    hide: function (data) {
        for (var i = 0; i < data.length; i++) {
            Ext.getCmp(data[i]).hide();
        }
    },
    // 显示
    show: function (data) {
        for (var i = 0; i < data.length; i++) {
            Ext.getCmp(data[i]).show();
        }
    },
    // 代理商正式码记录
    initProxyOfficialList: function () {
        var me = this;
        var sender = this.getOfficialview().getItems().getAt(1);
        var dataSet = [{
            IsAsk: true,
            OriRegID: "",
            RegAddress: "噢一天幸福与出口韩国出了贡献和xou欧冠续哦偷笑她错",
            RegCode: "1322542677520080501",
            RegID: "A7A74AEB3811D15B1DF510077F66ED1FF2FA744FA8E535C7",
            RegModuleID: "002,003,004,005",
            RegModuleName: "库存管理(全部),商品库存,厨房打印,无线点菜",
            RegName: "加加大酒店",
            RegNum: 678,
            RegSystem: "客房系统",
            RegTime: "2014-06-27",
            RegUserID: "加加软件服务有限公司",
            Remark: "加加大酒店试用码注册",
            State: "block",
            TryDate: "2015-07-01"
        }, {
            IsAsk: false,
            OriRegID: "",
            RegAddress: "阿斯顿发",
            RegCode: "1322542677520080501",
            RegID: "A7A74AEB3811D15B99A8469B411A44FA45FC6E95FECCE2F5",
            RegModuleID: "001,007,010",
            RegModuleName: "会员管理,触摸屏系统,远程查询",
            RegName: "加加餐饮连锁酒店",
            RegNum: 34,
            RegSystem: "餐饮系统",
            RegTime: "2014-06-20",
            RegUserID: "郑州锐思特科技有限公司",
            Remark: "加加大酒店试用码注册",
            State: "none",
            TryDate: "2015-06-20"
        }];
        var listview = Record.getProxyOfficialListConfiguration(dataSet); // 获取list列表对象
        listview.on('itemtap', function (sender, index, target, record, e, eOpts) {
            // 跳转到注册资料明细
            // console.log(target.getRecord().data);
            // localStorage.setItem('recordIndex', index);
            Common.redirectTo(me, 'official', 'proxyofficialdetail');
        });

        sender.setItems(listview);
    },
    // 初始化注册记录列表
    activateList: function (newActiveItem, sender, oldActiveItem, eOpts) {
        var me = this;
        if (oldActiveItem.getId() == 'officialdetailview' || oldActiveItem.getId() == 'proxyofficialdetailview') {
            Progress.animate(this.getOfficialview(), 'left'); // 更改动画方向
        }
        else {
            // (Record.isAdmin()) ? me.initProxyOfficialList() : me.initListData();
            var listView = me.getOfficialview().getItems().getAt(1).getItems().getAt(0);
            if (listView) {
                console.log(listView);
                listView.destroy(); // 销毁list
            }
            me.initOfficiall();
        }
    },
    // 返回
    back: function () {
        var me = this, sender = this.getOfficialview().getItems().getAt(1);
        Common.redirectTo(me, 'official', 'main');
        sender.removeAll();
    },
    // 将当前视图设置为活动页视图
    showListOfficialView: function () {
        Progress.animate(this.getOfficialview(), 'right');
        Ext.Viewport.setActiveItem(this.getOfficialview());
    }
});