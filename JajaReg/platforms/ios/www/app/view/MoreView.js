//创建新页视图
Ext.define('JajaApp.view.MoreView', {
    extend: 'Ext.Container',
    xtype: 'moreview',

    requires: [],
    config: {
        id: 'moreview',
        fullscreen: true,
        autoDestroy: true,
        showAnimation: {
            type: 'slide',
            direction: 'right',
            duration: 2000,
            reverse: true
        },
        items: [{
            xtype: 'toolbar',
            ui: 'light',
            docked: 'top',
            cls: 'toolbar',
            title:'更多',
            style: {
                'background': 'rgb(158, 188, 221)',
                //'background': 'rgb(94, 153, 204)',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                iconAlign: 'left',
                iconCls: 'back p-ico p-roseRed',
                margin: 0,
                text: '返回'
            }]
        }, {
            xtype: 'container',
            flex: 1,
            style: 'width:100%;height:100%;'
        }]
    }
});