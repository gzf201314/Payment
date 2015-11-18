Ext.define("util.Progress", {
    alternateClassName: "Progress",
    singleton: true,
    config: {
        description: '加加餐饮软件'
    },
    constructor: function (config) {
        this.initConfig(config);
    },
    animate: function (sender, direction) {
        var data = {
            type: 'slide',
            direction: direction,
            duration: 300,
            reverse: true,
            out: true
        };
        Ext.Viewport.animateActiveItem(sender, data);
    },
    /**
    开始
    id:需要使用Load的视图id
    msg:Load中需要显示的信息
    */
    start: function (msg) {
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            //id: 'loginmaske',
            zIndex: 99999,
            message: msg
        });
    },
    /**
    关闭
    id:需要使用Load的视图id
    */
    close: function () {
        Ext.Viewport.unmask();
        //Ext.getCmp('loginmaske').destroy();
    }
});