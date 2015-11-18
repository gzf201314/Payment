Ext.define('JajaApp.controller.RegCodeController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            regcodeview: {
                selector: 'regcodeview',
                xtype: 'regcodeview',
                autoCreate: true
            },
            RegCodeBack: '#RegCodeBack'
        },
        control: {
            regcodeview: {
                activate: 'initRegCode'
            },
            RegCodeBack: {
                tap: 'back'
            }
        },
        routes: {
            'regcode': 'showRegCodeView'
        }
    },
    initRegCode: function () {
        var actions = this.getRegcodeview().getItems().getAt(1).getItems().getAt(1);
        Common.isDevice(actions);
    },
    // 返回
    back: function () {
        var me = this;
        var listView = me.getApplication().getController('HistoryController').getRecordview().getItems().getAt(1).getItems().getAt(0);
        if (listView) {
            console.log(listView);
        }
        Common.redirectTo(me, 'regcode', 'main'); // 数据加载完成进行跳转。
    },
    showRegCodeView: function () {
        console.log(this);
        Progress.animate(this.getRegcodeview(), 'right');
        Ext.Viewport.setActiveItem(this.getRegcodeview());
    }
});