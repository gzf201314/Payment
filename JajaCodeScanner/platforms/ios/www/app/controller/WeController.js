Ext.define('JajaApp.controller.WeController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            weview: {
                selector: 'weview',
                xtype: 'weview',
                autoCreate: true
            },
            WeBack: '#WeBack'
        },
        control: {
            weview: {
                activate: 'onWeViewActivate'
                //   initialize: 'initialize'
            },
            WeBack: {
                tap: 'back'
            }
        },
        routes: {
            'we': 'showWeView'
        }
    },
    onWeViewActivate: function () {
        
    },
    // 返回
    back: function () {
        var me = this;
        Common.redirectTo(me, 'we', 'usercenter'); // 数据加载完成进行跳转。
    },
    showWeView: function () {
        Progress.animate(this.getWeview(), 'right');
        Ext.Viewport.setActiveItem(this.getWeview());
    }
});