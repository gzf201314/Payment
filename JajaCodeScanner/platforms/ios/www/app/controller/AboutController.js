Ext.define('JajaApp.controller.AboutController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            aboutview: {
                selector: 'aboutview',
                xtype: 'aboutview',
                autoCreate: true
            },
            AboutBack: '#AboutBack'
        },
        control: {
            aboutview: {
                activate: 'onAboutViewActivate'
                //   initialize: 'initialize'
            },
            AboutBack: {
                tap: 'back'
            }
        },
        routes: {
            'about': 'showAboutView'
        }
    },
    onAboutViewActivate: function () {

    },
    // 返回
    back: function () {
        var me = this;
        Common.redirectTo(me, 'about', 'usercenter'); // 数据加载完成进行跳转。
    },
    showAboutView: function () {
        Progress.animate(this.getAboutview(), 'right');
        Ext.Viewport.setActiveItem(this.getAboutview());
    }
});