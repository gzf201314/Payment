Ext.define('JajaApp.controller.UserController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            userview: {
                selector: 'userview',
                xtype: 'userview',
                autoCreate: true
            },
            ZhangHao: '#zhanghao',
            UserBack: '#UserBack'
        },
        control: {
            userview: {
                activate: 'onUserViewActivate'
                //   initialize: 'initialize'
            },
            UserBack: {
                tap: 'back'
            },
            ZhangHao: {
                tap: 'showSettingUserView'
            }
        },
        routes: {
            'usercenter': 'showUserView'
        }
    },
    onUserViewActivate: function (newActiveItem, sender, oldActiveItem, eOpts) {
        var me = this;
        if (oldActiveItem != 0) {
            if (oldActiveItem.getId() == 'settingview' || oldActiveItem.getId() == 'aboutview' || oldActiveItem.getId() == 'weview') {
                Progress.animate(this.getUserview(), 'left');
            }
        }
        var listContainer = this.getUserview().getItems().getAt(1);
        menu.init(this, listContainer);
        console.log(listContainer);
    },
    showSettingUserView: function () {
        var me = this;
        Common.redirectTo(me, 'usercenter', 'setting'); // 数据加载完成进行跳转。
    },
    // 返回
    back: function () {
        var me = this;
        Common.redirectTo(me, 'usercenter', 'main'); // 数据加载完成进行跳转。
    },
    showUserView: function () {
        Progress.animate(this.getUserview(), 'right');
        Ext.Viewport.setActiveItem(this.getUserview());
    }
});