Ext.define("util.Notification", {
    alternateClassName: "notification",
    singleton: true,
    config: {
        description: '加加餐饮软件'
    },
    constructor: function (config) {
        this.initConfig(config);
    },
    toast: function () {

    },
    alert: function (title, message) {
        var obj = {
            title: title || null,
            message: message || null
        };
        var data = Ext.create('Ext.Container', {
            floating: true,
            layout: 'vbox',
            autoDestroy: true,
            showAnimation: {
                type: 'pop',
                duration: 250
            },
            hideAnimation: {
                type: 'popOut',
                duration: 250
            },
            modal: true,
            centered: true,
            padding: 0,
            border: 0,
            width: 290,
            height: 142,
            style: {
                'background-image': '-webkit-linear-gradient(top, #e7e8e8 1%, #d8ddde 25%, #e7e8e8 100%)',
                '-webkit-border-radius': '7px',
                'border-radius': '7px'
            },
            items: [{
                xtype: 'container',
                width: '100%',
                flex: 1,
                style: {
                    'background': 'transparent none'
                },
                items: [{
                    xtype: "toolbar",
                    docked: 'top',
                    cls: 'mtoolbar',
                    style: {
                        'border-radius': '5px 5px 0px 0px',
                        'background': 'transparent none'
                    },
                    ui: 'light',
                    title: obj.title,
                    width: '100%',
                    height: 40
                }, {
                    xtype: 'container',
                    width: '100%',
                    style: {
                        'text-align': 'center',
                        'font-size': '.9em',
                        'color': 'rgb(67, 67, 67)',
                        'line-height': '33px',
                        'border-bottom': '1px solid rgb(204, 204, 204)'
                    },
                    height: 53,
                    html: obj.message
                }, {
                    xtype: 'button',
                    iconAlign: 'top',
                    docked: 'bottom',
                    width: 290,
                    height: 43,
                    style: {
                        'border': '0px solid',
                        'background': 'transparent none',
                        'font-size': '.9em',
                        // 'color': '#157efb',
                        'color': 'rgb(55, 112, 176)',
                        'border-radius': '7px',
                        'margin-left': 'auto',
                        'margin-right': 'auto'
                    },
                    cls: 'button',
                    text: '确定',
                    handler: function () {
                        var sender = this.getParent().getParent();
                        sender.hide();
                        sender.on('hide', function () {
                            sender.destroy();
                        });
                    }
                }]
            }]
        });
        Ext.Viewport.add(data);
        data.show();
    },
    confirm: function (title, button1, button2, callback) {
        var data = Ext.create('Ext.Container', {
            floating: true,
            layout: 'vbox',
            autoDestroy: true,
            showAnimation: {
                type: 'pop',
                duration: 250
            },
            hideAnimation: {
                type: 'popOut',
                duration: 250
            },
            modal: true,
            centered: true,
            padding: 0,
            border: 0,
            width: 330,
            height: 175,
            style: {
                'background': 'rgb(228, 228, 228)',
                'border-radius': '10px'
            },
            items: [{
                xtype: "toolbar",
                docked: 'top',
                cls: 'mtoolbar',
                style: {
                    'border-radius': '5px 5px 0px 0px',
                    'background-color': 'rgb(237, 236, 236)'
                },
                ui: 'light',
                title: title,
                width: '100%',
                height: 50
            }, {
                xtype: 'container',
                width: '100%',
                height: 86,
                flex: 1,
                style: {
                    'background': 'rgb(237, 236, 236)'
                },
                items: [{
                    xtype: 'button',
                    iconAlign: 'top',
                    id: 'ConfirmLogout',
                    height: 42,
                    width: 285,
                    style: {
                        'background': 'rgba(173, 31, 31, 0.701961)',
                        'font-size': '1.2em',
                        'color': 'rgb(253, 252, 252)',
                        'border-radius': '7px',
                        'margin-top': '5px',
                        'margin-left': 'auto',
                        'margin-right': 'auto'
                    },
                    cls: 'button',
                    text: button1
                }]
            }, {
                xtype: 'container',
                width: '100%',
                height: 60,
                style: {
                    'background': 'rgb(237, 236, 236)',
                    'border-radius': '0px 0px 5px 5px'
                },
                items: [{
                    xtype: 'button',
                    id: 'CancelLogout',
                    style: {
                        'background': 'rgba(247, 249, 250, 0.701961)',
                        'font-size': '1.2em',
                        'color': 'rgb(124, 124, 124)',
                        'border-radius': '7px',
                        'margin-left': 'auto',
                        'margin-right': 'auto'
                    },
                    cls: 'button',
                    height: 42,
                    width: 285,
                    pack: 'right',
                    text: button2
                }]
            }]
        });
        Ext.Viewport.add(data);
        data.show();

        // 确定
        Ext.getCmp('ConfirmLogout').on('tap', function () {
            callback();
            data.hide();
        });

        // 取消
        Ext.getCmp('CancelLogout').on('tap', function () {
            data.hide();
        });

        data.on('hide', function () {
            data.destroy();
        });
    }
});