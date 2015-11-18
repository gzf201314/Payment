Ext.define('JajaApp.view.Setting', {
    extend: 'Ext.Container',
    xtype: 'settingview',

    requires: [],

    config: {
        id: 'settingview',
        fullscreen: true,
        layout: 'vbox', //布局
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
            height: 44,
            title: '登录选择',
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
                text: '返回',
                handler: function () {
                    var systype = this.getParent().getParent();
                    systype.hide();
                    systype.on('hide', function () {
                        systype.destroy();
                    });
                }
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
            items: [{
                xtype: 'fieldset',
                margin: 0,
                width: '100%',
                style: {
                    '-webkit-border-radius': '0',
                    'border-radius': '0'
                },
                defaults: {
                    labelWidth: '50%',
                    lableAlign: 'left',
                    xtype: 'radiofield'
                },
                items: [{
                    name: 'color',
                    label: '管理员登录',
                    value: '管理员登录'
                }, {
                    name: 'color',
                    label: '代理商登录',
                    value: '代理商登录'
                }]
            }]
        }, {
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            height: 58,
            docked: 'bottom',
            style: {
                'background': '#0078d7',
                'border-radius': '0px',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'spacer'
            }, {
                xtype: 'button',
                labelCls: 'toolbar-button-lable',
                margin: 0,
                height: 53,
                iconCls: 'yanqi p-ico p-roseRed',
                style: {
                    'background': '#0078d7',
                    'color': '#fff'
                },
                text: '向所有设备发送',
                handler: function () {
                    // 给所有安装有此程序的设备进行消息推送
                    jpush.send({
                        key: 'PushAll',
                        value: '全部:山东省 青岛市 加加软件服务有限公司'
                    }, function (data) {
                        Common.alert("提示", data.Message);
                    }, function (data) {
                        Common.alert("提示", "网络异常,请检查网络!");
                    });
                }
            }, {
                xtype: 'spacer'
            }]
        }]
    }
});