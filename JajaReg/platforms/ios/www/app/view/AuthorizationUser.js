Ext.define('JajaApp.view.AuthorizationUser', {
    extend: 'Ext.Container',
    xtype: 'authorizationview',

    requires: ['Ext.XTemplate', 'Ext.dataview.List'],

    config: {
        id: 'authorizationview',
        fullscreen: true,
        layout: 'fit', //布局
        left: 0,
        top: 0,
        autoDestroy: true,
        width: '100%',
        height: '100%',
        showAnimation: {
            type: 'slide',
            direction: 'left',
            duration: 300
        },
        hideAnimation: {
            type: 'slide',
            direction: 'left',
            duration: 300,
            reverse: true,
            out: true
        },
        style: 'background:rgb(236, 237, 237)',
        items: [{
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            docked: 'top',
            title: '授权用户',
            style: {
                'background': '#0078d7',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                ui: 'back',
                style: {
                    'background': '#0078d7',
                    'margin-left': '-10px',
                    'color': '#fff'
                },
                text: '返回'
            }, {
                xtype: 'spacer'//空格
            }]
        }, {
            xtype: 'container',
            layout: 'fit', //布局
            width: '100%',
            height: '100'
        }]
    }
});