Ext.define("util.Menu", {
    alternateClassName: "menu",
    singleton: true,
    config: {
        description: '加加餐饮软件'
    },
    constructor: function (config) {
        this.initConfig(config);
    },
    /**
    * 显示模块选择界面
    */
    init: function (controler) {
        var me = controler;
        if (Ext.getCmp('basiclist')) {
            Ext.getCmp('basiclist').destroy();
        }
        var data = Ext.create('Ext.dataview.List', {//上传操作列表
            id: 'basiclist',
            fullscreen: true,
            disableSelection: true,
            cls: 'dataview-basic-up',
//            plugins: [{
//                xclass: 'Ext.plugin.PullRefresh',  // 下拉刷新
//                pullText: '下拉刷新...',
//                releaseText: '松开刷新...',
//                loadingText: '请稍等...',
//                loadedText: '加载...',
//                lastUpdatedText: '最近刷新时间&nbsp;',
//                height: 0,
//                listeners: {
//                    latestfetched: function () {
//                        //menu.updateBadgeText();
//                        console.log(data.getStore());
//                        console.log("1234567890");
//                    } 
//                }
//            }],
            scrollable: {
                direction: 'vertical',
                indicators: false
            },
            style: 'width:100%;height:100%;',
            itemTpl: '<div  class="img" style="background-image: url(./images/{RegMenuID}.png);"></div><div class="content" style="position: absolute;"><div class="name">{Message}</div><div class="affiliation">{Remark}</div></div><div style="float: right;position: relative;background-color: red;line-height: 30px;text-align: center;color: white;width: 30px;height: 30px;border-radius: 100px;margin-top: 15px;display: {badgeText};">{Count}</div>'

        });
        data.setStore(Record.loadMenu()).getStore().on('load', function () {
            var sender = data.getItems().getAt(0).getItems().getAt(2);
            var obj = sender._record.data;
            console.log(obj);
            if (obj.Message == "待处理列表") {
                obj.badgeText = (obj.Count == 0) ? "none" : "block";
                sender.setData(obj);
            }
            console.log(data.getItems());
        });
        Ext.getCmp('tabContainer').setItems(data);
        data.on('itemtap', function (sender, index, target, record, e, eOpts) {

            if (Record.isAdmin()) {
                switch (index) {
                    case 0:
                        Common.redirectTo(me, Route.Main, Route.Register); // 跳转到注册视图
                        break;
                    case 1:
                        Common.redirectTo(me, Route.Main, Route.Record); // 跳转到历史记录视图
                        break;
                    case 2:
                        Common.redirectTo(me, Route.Main, Route.Ask); // 跳转到申请记录视图
                        break;
                    case 3:
                        Common.redirectTo(me, Route.Main, Route.Official); // 跳转到正式注册记录视图
                        break;
                    default:
                }
            }
            else {
                switch (index) {
                    case 0:
                        Common.redirectTo(me, Route.Main, Route.Register); // 跳转到注册视图
                        break;
                    case 1:
                        Common.redirectTo(me, Route.Main, Route.Record); // 跳转到历史记录视图
                        break;
                    case 2:
                        Common.redirectTo(me, Route.Main, Route.Official); // 跳转到正式注册记录视图
                        break;
                    default:
                }
            }
        });
    },
    /// 设置提示数字
    updateBadgeText: function () {
        var listview;
        if (Ext.getCmp('basiclist')) {
            listview = Ext.getCmp('basiclist').getItems().getAt(0).getItems().getAt(2);
            console.log(listview._record.data);
        }
        else {
            return;
        }
        if (Record.isAdmin()) {
            Progress.start("正在加载,请稍后...");
            setTimeout(function () {
                Record.Pending(function (dataSet) { // 待处理列表
                    var sender = listview;
                    var obj = sender._record.data;
                    console.log(obj);
                    if (obj.Message == "待处理列表") {
                        obj.Count = dataSet.length;
                        obj.badgeText = (obj.Count == 0) ? "none" : "block";
                        sender.setData(obj);
                    }
                    Progress.close();
                }, function (message) {
                    Progress.close();
                    console.log(message);
                });
            }, 1);
        }
    }
});