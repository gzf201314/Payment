Ext.define('JajaApp.view.RecordView', {
    extend: 'Ext.Container',
    xtype: 'recordview',

    requires: [
    'Ext.data.Store',
        'Ext.List',
        'Ext.field.Search',
        'JajaApp.view.SearchTrial'
        ],

    config: {
        id: 'recordview',
        fullscreen: true,
        layout: 'hbox', //布局
        autoDestroy: true,
        items: [
        {
            docked: 'top',
            ui: 'light',
            id: 'recordtoolbar',
            xtype: 'toolbar',
            title: '正式码',
            cls: 'toolbar',
            height: 60,
            style: {
                'background': 'rgba(55, 112, 176,1)',
                //'background': 'rgb(94, 153, 204)',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                id: 'back',
                iconAlign: 'left',
                iconCls: 'back p-ico p-roseRed',
                style: {
                    'background': 'rgba(55, 112, 176,1)',
                    'color': 'rgb(247, 244, 244)'
                }
                //                ,
                //                text: '返回'
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                id: 'search',
                iconCls: 'search p-ico p-roseRed',
                style: {
                    'background': 'rgba(55, 112, 176,1)',
                    'color': 'rgb(247, 244, 244)'
                }
            }, {
                xtype: 'button',
                id: 'add',
                iconCls: 'add p-ico p-roseRed',
                style: {
                    'background': 'rgba(55, 112, 176,1)',
                    'color': 'rgb(247, 244, 244)'
                }
            }]
        }]
    }
});