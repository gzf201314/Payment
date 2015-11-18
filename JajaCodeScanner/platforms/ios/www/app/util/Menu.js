Ext.define("util.Menu", {
    alternateClassName: "menu",
    singleton: true,
    config: {
        description: '加加餐饮软件'
    },
    constructor: function (config) {
        this.initConfig(config);
    },
    loadMenu: function () {
        this.store = Ext.create('Ext.data.Store', {
            //define the stores fields
            fields: [
                 'RegMenuID',
                 'Message',
                 'Remark',
                 'badgeText',
                 'Count'
                 ],
            proxy: {
                type: 'ajax',
                url: "app/data/mySelf.js",
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });
        return this.store;
    },
    /**
    * 显示模块选择界面
    */
    init: function (controler, view) {
        var me = controler;
        if (Ext.getCmp('basiclist')) {
            Ext.getCmp('basiclist').destroy();
        }
        var data = Ext.create('Ext.dataview.List', {//上传操作列表
            id: 'basiclist',
            fullscreen: true,
            disableSelection: true,
            onItemDisclosure: true,
            scrollable: {
                direction: 'vertical',
                indicators: false
            },
            style: 'width:100%;height:100%;',
            itemTpl: '{Message}'
        });

        data.setStore(this.loadMenu()).getStore().on('load', function () {
            view.setItems(data);
            data.on('itemtap', function (sender, index, target, record, e, eOpts) {
                if (index == 0) {
                    Common.redirectTo(controler, 'usercenter', 'setting'); // 跳转到注册视图
                }
                switch (index) {
                    case 0:
                        Common.redirectTo(controler, 'usercenter', 'setting'); // 跳转到注册视图
                        break;
                    case 1:
                        Common.redirectTo(controler, 'usercenter', 'about'); // 跳转到注册视图
                        break;
                    case 2:
                        Common.redirectTo(controler, 'usercenter', 'we'); // 跳转到注册视图
                    default:

                }

            });
        });
    }
});