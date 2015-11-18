Ext.define('JajaApp.view.ShareCode', {
    extend: 'Ext.Container',
    xtype: 'shareview',

    requires: [],

    config: {
        fullscreen: true,
        layout: 'vbox', //布局
        floating: true,
        modal: true,
        bottom: 0,
        centered: true,
        autoDestroy: true,
        width: '100%',
        height: 218.5,
        showAnimation: {
            type: 'slide',
            direction: 'up',
            duration: 300
        },
        hideAnimation: {
            type: 'slide',
            direction: 'up',
            duration: 300,
            reverse: true,
            out: true
        },
        style: 'background:rgb(236, 237, 237)',
        items: [{
            xtype: 'toolbar',
            cls: 'mtoolbar',
            ui: 'light',
            docked: 'top',
            title: '"注册码" 转发',
            height: 67.5,
            style: {
                'background': 'rgb(248, 248, 248)',
                'border-top': '0px',
                'border-bottom-width': '1px'
            }
        }, {
            xtype: 'container',
            width: '100%',
            height: '100%',
            layout: 'hbox',
            style: {
                'background': 'rgb(248, 248, 248)'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'vbox',
                items: [{
                    xtype: 'image',
                    id:'qq',
                    src: 'images/share/shareqq.png',
                    style: {
                        'margin-left': 'auto',
                        'margin-top': '10px',
                        'margin-right': 'auto'
                    },
                    height: 90,
                    width: 90
                }, {
                    xtype: 'label',
                    style: {
                        'text-align': 'center'
                    },
                    html: 'Q Q'
                }]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'vbox',
                items: [{
                    xtype: 'image',
                    id: 'wechat',
                    src: 'images/share/weixin.png',
                    style: {
                        'margin-left': 'auto',
                        'margin-top': '10px',
                        'margin-right': 'auto'
                    },
                    height: 90,
                    width: 90
                }, {
                    xtype: 'label',
                    style: {
                        'text-align': 'center'
                    },
                    html: '微 信'
                }]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'vbox',
                items: [{
                    xtype: 'image',
                    id: 'sms',
                    style: {
                        'margin-left': 'auto',
                        'margin-top': '10px',
                        'margin-right': 'auto'
                    },
                    src: 'images/share/duanxin.png',
                    height: 90,
                    width: 90
                }, {
                    xtype: 'label',
                    style: {
                        'text-align': 'center'
                    },
                    html: '短 信'
                }]
            }]
        }]
    }
});