//主视图文件
Ext.define('JajaApp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',

    requires: [
       'Ext.XTemplate',
       'JajaApp.store.MenuStore',
       'JajaApp.model.Menus',
       'JajaApp.model.AgentModel',
       'JajaApp.view.SearchTrial',
       'JajaApp.view.TrialOption',
       'JajaApp.view.SearchApply',
       'JajaApp.view.RegCode',
       'JajaApp.view.ShareCode',
       'JajaApp.view.RegSMS',
       'JajaApp.view.RegContact',
       'JajaApp.view.Setting'
       ],

    config: {
        id: 'mainview',
        fullscreen: true,
        layout: 'fit', //布局
        width: '100%',
        height: '100%',
        autoDestroy: true,
        items: [{
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            docked: 'top',
            title: '加加软件',
            height: 44,
            style: {
                'background': '#0078d7',
                'border-top': '0px',
                'border-bottom-width': '0px'
            }
            //            ,
            //            items: [{
            //                xtype: 'button',
            //                id: 'menus',
            //                iconAlign: 'left',
            //                iconCls: 'menus p-ico p-roseRed',
            //                style: {
            //                    'background': '#0078d7',
            //                    'color': 'rgb(247, 244, 244)'
            //                }
            //            }]
            , items: [{
                xtype: 'spacer'
            }, {
                xtype: 'button',
                id: 'SettingButton',
                iconAlign: 'left',
                iconCls: 'reg-setting p-ico p-roseRed',
                style: {
                    'background': '#0078d7',
                    'color': 'rgb(247, 244, 244)'
                }
            }]
        }, {
            xtype: 'container',
            id: 'tabContainer',
            autoDestroy: true,
            flex: 1
        }, ]
    }
});