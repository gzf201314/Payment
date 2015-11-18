Ext.define('JajaApp.view.SearchView', {
    extend: 'Ext.Container',
    xtype: 'searchview',

    requires: [],

    config: {
        id: 'searchview',
        fullscreen: true,
        layout: 'hbox', //布局
        autoDestroy: true,
        style: {
            'background-color': '#eeeeee',
            'height': '100%',
            'width': '100%'
        },
        items: [{
            docked: 'top',
            ui: 'light',
            xtype: 'toolbar',
            cls: 'toolbar',
            height: 60,
            style: {
                'background': '#317ef3',
                //'background': 'rgb(94, 153, 204)',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                id: 'cancel',
                iconAlign: 'left',
                iconCls: 'back p-ico p-roseRed',
                style: {
                    'background': 'rgba(55, 112, 176,1)',
                    'color': 'rgb(247, 244, 244)'
                },
                text: '返回'
            }]
        }, {
            xtype: 'container',
            style: {
                'background-color': '#eeeeee',
                'height': '100%',
                'width': '100%'
            },
            html: '此页显示搜索条件'
        }]
    }
});