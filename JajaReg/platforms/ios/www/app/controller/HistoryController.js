Ext.define('JajaApp.controller.HistoryController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            recordview: {
                selector: 'recordview',
                xtype: 'recordview',
                autoCreate: true
            },
            HistoryBack: '#HistoryBack'
        },
        control: {
            recordview: {
                activate: 'activateList'
            },
            HistoryBack: {
                tap: 'back'
            }
        },
        routes: {
            'record': 'showListHistoryView'
        }
    },
    // 数据初始化
    initListData: function () {
        var me = this;
        var sender = this.getRecordview().getItems().getAt(1)
        var userid = JSON.parse(localStorage.getItem('remember')).UserName;
        console.log(userid);
        Progress.start("正在加载,请稍后...");
        setTimeout(function () {
            Record.getList('TrialAsk', { // TrialList
                RegBeginTime: '',
                RegEndTime: '',
                HotelName: '',
                HotelAddress: '',
                RegExpireBegin: '',
                RegExpireEnd: '',
                IsTrial: false,
                UserID: userid,
                RegUserID: userid
            }, function (jsonStr) {
                var dataSet = JSON.parse(jsonStr);
                console.log(dataSet);
                if (Common.isArray(dataSet)) {
                    for (var index in dataSet) {
                        if (isNaN(parseInt(index))) break;
                        dataSet[index].TryDate = Record.ChangeDateFormat(dataSet[index].TryDate);
                        dataSet[index].RegTime = Record.ChangeDateFormat(dataSet[index].RegTime);
                        dataSet[index].State = (dataSet[index].IsAsk) ? State.apply : State.trial;
                    }
                }
                console.log(dataSet);
                var listview; // 获取list列表对象
                if (Record.isAdmin()) {
                    listview = Record.getProxyListConfiguration(dataSet); // 获取list列表对象
                    listview.on('itemtap', function (sender, index, target, record, e, eOpts) {
                        // 跳转到注册资料明细
                        localStorage.setItem('recordIndex', index);
                        Common.redirectTo(me, 'record', 'proxydetail');
                    });
                } else {
                    listview = Record.getTrialListConfiguration(dataSet); // 获取list列表对象
                    listview.on('itemtap', function (sender, index, target, record, e, eOpts) {
                        // 跳转到注册资料明细
                        // console.log(target.getRecord().data);
                        localStorage.setItem('recordIndex', index);
                        Common.redirectTo(me, 'record', 'detail');
                    });
                };
                sender.setItems(listview);
                Progress.close();
            }, function (message) {
                console.log(message);
                Progress.close();
                Common.alert("提示", "网络异常,请检查网络!");
            });
        }, 10);
    },
    // 初始化注册记录列表
    activateList: function (newActiveItem, sender, oldActiveItem, eOpts) {
        var me = this;
        if (oldActiveItem.getId() == 'detailview' || oldActiveItem.getId() == 'proxydetailview') {
            Progress.animate(this.getRecordview(), 'left'); // 更改动画方向
        }
        else {
            var listView = me.getRecordview().getItems().getAt(1).getItems().getAt(0);
            if (listView) {
                console.log(listView);
                listView.destroy(); // 销毁list
            }

            me.initListData();
        }
    },
    // 返回
    back: function () {
        var me = this, sender = this.getRecordview().getItems().getAt(1);
        console.log(sender);
        Common.redirectTo(me, 'record', 'main');
        sender.removeAll();
    },
    // 将当前视图设置为活动页视图
    showListHistoryView: function () {
        Progress.animate(this.getRecordview(), 'right');
        Ext.Viewport.setActiveItem(this.getRecordview());
    }
});