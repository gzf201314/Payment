Ext.define('JajaApp.controller.AskController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            askview: {
                selector: 'askview',
                xtype: 'askview',
                autoCreate: true
            },
            Back: '#AskBack'
        },
        control: {
            askview: {
                activate: 'initMessage',
            },
            Back: {
                tap: 'back'
            }
        },
        routes: {
            'ask': 'showAskView'
        }
    },
    initAskOfficialList: function () {
        var me = this;
        var sender = this.getAskview().getItems().getAt(1);
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
        var listview = Record.getAskOfficialConfiguration(dataSet); // 获取list列表对象
        listview.on('itemtap', function (sender, index, target, record, e, eOpts) {
            // 跳转到注册资料明细
            // console.log(target.getRecord().data);
            localStorage.setItem('recordIndex', index);
            Common.redirectTo(me, 'ask', 'askdetail');
        });

        sender.setItems(listview);
    },
    initAskOfficial: function () {
        var sender = this.getAskview().getItems().getAt(1), me = this;
        Progress.start("正在加载,请稍后...");
        setTimeout(function () {
            Record.getList('Pending', { // 待处理
                RegBeginTime: '',
                RegEndTime: '',
                HotelName: '',
                HotelAddress: '',
                RegExpireBegin: '',
                RegExpireEnd: '',
                IsTrial: false,
                UserID: '1000',
                RegUserID: '1000'
            }, function (jsonStr) {
                var dataSet = JSON.parse(jsonStr);
                if (Common.isArray(dataSet)) {
                    for (var index in dataSet) {
                        if (isNaN(parseInt(index))) break;
                        dataSet[index].AskTime = Record.ChangeDateFormat(dataSet[index].AskTime);
                        dataSet[index].OffTime = Record.ChangeDateFormat(dataSet[index].OffTime);
                        dataSet[index].TryDate = Record.ChangeDateFormat(dataSet[index].TryDate);
                        dataSet[index].RegTime = Record.ChangeDateFormat(dataSet[index].RegTime);
                        dataSet[index].State = (dataSet[index].IsAsk) ? State.apply : State.trial;
                    }
                }
                var listview = Record.getAskOfficialConfiguration(dataSet); // 获取list列表对象
                listview.on('itemtap', function (sender, index, target, record, e, eOpts) {
                    // 跳转到注册资料明细
                    // console.log(target.getRecord().data);
                    localStorage.setItem('recordIndex', index);
                    Common.redirectTo(me, 'ask', 'askdetail');
                });
                sender.setItems(listview);

                Progress.close();
            }, function (message) {
                console.log(message);
                Progress.close();
                Common.alert("提示", "网络异常,请检查网络!");
            });
        }, 10);
    },
    // 返回
    back: function () {
        var me = this, sender = this.getAskview().getItems().getAt(1);
        Common.redirectTo(me, 'ask', 'main'); // 数据加载完成进行跳转。
        sender.removeAll();
    },
    // 初始化酒店信息
    initMessage: function (newActiveItem, sender, oldActiveItem, eOpts) {
        if (oldActiveItem.getId() == 'askdetailview') {
            Progress.animate(this.getAskview(), 'left');
        }
        else
            this.initAskOfficial(); //this.initAskOfficialList();
    },
    showAskView: function () {
        console.log(this);
        Progress.animate(this.getAskview(), 'right');
        Ext.Viewport.setActiveItem(this.getAskview());
    }
});