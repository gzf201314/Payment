Ext.define('JajaApp.controller.ResultController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            resultview: {
                selector: 'resultview',
                xtype: 'resultview',
                autoCreate: true
            },
            CompleteButton: '#CompleteButton',
            ResultBack: '#ResultBack'
        },
        control: {
            resultview: {
                activate: 'onResultViewActivate'
                //   initialize: 'initialize'
            },
            ResultBack: {
                tap: 'back'
            },
            CompleteButton: {
                tap: 'complete'
            }
        },
        routes: {
            'result': 'showResultView'
        }
    },
    onResultViewActivate: function () {
        var txtPos = Ext.getCmp('txtPos').getValue();
        Ext.getCmp('lblPay').setHtml("￥" + txtPos);
        console.log(Ext.getCmp('lblPay'));
    },
    // 结账完成
    complete: function () {
        var me = this;
        Common.redirectTo(me, 'result', 'main'); // 数据加载完成进行跳转。
    },
    // 返回
    back: function () {
        var me = this;
        Common.redirectTo(me, 'result', 'main'); // 数据加载完成进行跳转。
    },
    showResultView: function () {
        console.log(this);
        Progress.animate(this.getResultview(), 'right');
        Ext.Viewport.setActiveItem(this.getResultview());
    }
});