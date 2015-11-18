var Color = {
    backgroundColor: 'rgb(230,84,35)',
    textColor: 'rgb(195,72,30)',
    buttonColor: 'rgb(239,85,35)'
}
Ext.define('JajaApp.view.AboutView', {
    extend: 'Ext.Container',
    xtype: 'aboutview',

    requires: [],

    config: {
        id: 'aboutview',
        fullscreen: true,
        layout: 'vbox', //布局
        autoDestroy: true,
        items: [{
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            docked: 'top',
            title: '关于软件',
            style: {
                'background': Color.backgroundColor,
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                ui: 'back',
                id: 'AboutBack',
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
            width: '100%',
            height: '100%',
            scrollable: {
                direction: 'vertical',
                indicators: false
            },
            style: {
                'background-color': '#ffffff'
            }
        }]
    }
});