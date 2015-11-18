var Color = {
    backgroundColor: 'rgb(230,84,35)',
    textColor: 'rgb(195,72,30)',
    buttonColor: 'rgb(239,85,35)'
}
Ext.define('JajaApp.view.RecordView', {
    extend: 'Ext.Container',
    xtype: 'recordview',

    requires: [],

    config: {
        id: 'recordview',
        fullscreen: true,
        layout: 'vbox', //布局
        autoDestroy: true,
        items: [{
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            docked: 'top',
            title: '交易记录',
            style: {
                'background': Color.backgroundColor,
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                ui: 'back',
                id: 'RecordBack',
                style: {
                    'background': Color.backgroundColor,
                    'margin-left': '-10px',
                    'color': '#fff'
                },
                text: '返回'
            }, {
                xtype: 'spacer'//空格
            }]
        }, {
            xtype: 'container',
            autoDestroy: true,
            flex: 1,
            style: {
                "background-color": "red"
            }
        }]
    }
});