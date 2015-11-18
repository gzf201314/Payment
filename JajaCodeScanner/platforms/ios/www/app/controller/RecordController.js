Ext.define('JajaApp.controller.RecordController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            recordview: {
                selector: 'recordview',
                xtype: 'recordview',
                autoCreate: true
            },
            RecordBack: '#RecordBack'
        },
        control: {
            recordview: {
                activate: 'onRecordViewActivate'
                //   initialize: 'initialize'
            },
            RecordBack: {
                tap: 'back'
            }
        },
        routes: {
            'record': 'showRecordView'
        }
    },
    onRecordViewActivate: function () {
        var listContainer = this.getRecordview().getItems().getAt(1);
        var data = [{
            "BillID": "1000001",
            "BillTime": "2015-11-06 13:24",
            "BillJinE": "2300",
            "State": "交易成功"
        }, {
            "BillID": "1000002",
            "BillTime": "2015-11-07 17:35",
            "BillJinE": "210",
            "State": "交易成功"
        }, {
            "BillID": "1000003",
            "BillTime": "2015-11-08 09:40",
            "BillJinE": "2009",
            "State": "交易成功"
        }];

//        var list = billRecord.getRecordConfiguration(listContainer, data);
//        list.getStore().on('load', function (d) {
//            console.log(d);
//        });

//        listContainer.setItems(list);
        //        console.log(listContainer);
        billRecord.getRecordConfiguration(listContainer, data);
    },
    // 返回
    back: function () {
        var me = this;
        Common.redirectTo(me, 'record', 'main'); // 数据加载完成进行跳转。
        //        if (Ext.getCmp('proxyofficiallist')) {
        //            Ext.getCmp('proxyofficiallist').destroy();
        //        }
    },
    showRecordView: function () {
        Progress.animate(this.getRecordview(), 'right');
        Ext.Viewport.setActiveItem(this.getRecordview());
    }
});