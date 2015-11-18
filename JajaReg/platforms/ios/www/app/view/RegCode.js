
var formButton = {
    'background-image': 'none',
    'background-color': 'rgb(255, 255, 255)',
    'text-align': 'left',
    'border': '0px solid',
    'border-bottom': '1px solid rgb(221, 221, 221)',
    'border-radius': '0px',
    'font-weight': '400'
};
var forwardingButton = {
    'font-size': '1.3em',
    'font-weight': '400',
    'color': '#157efb',
    'border-radius': '0px',
    'border': '0px',
    'border-right': '1px solid rgb(179, 177, 177)',
    'background-color': 'rgb(0, 120, 215)',
    'background-image': 'none',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'width': '100%',
    'height': '100%'
};


Ext.define('JajaApp.view.RegCode', {
    extend: 'Ext.Container',
    xtype: 'regcodeview',

    requires: [],

    config: {
        id: 'regcodeview',
        fullscreen: true,
        layout: 'vbox', //布局
        autoDestroy: true,
        style: 'background:rgb(236, 237, 237)',
        items: [{
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            docked: 'top',
            title: '注册码',
            style: {
                'background': '#0078d7',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                id: 'RegCodeBack',
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
            width: '100%',
            height: '100%',
            items: [{
                xtype: 'formpanel',
                width: '100%',
                height: '100%',
                scrollable: false,
                style: {
                    'background-color': 'rgb(44, 153, 210)'
                },
                items: [{
                    xtype: 'fieldset',
                    margin: 0,
                    style: {
                        '-webkit-border-radius': '0',
                        'border-radius': '0'
                    },
                    defaults: {
                        labelWidth: '31%',
                        labelCls: 'reg-lable',
                        inputCls: 'inputstyle',
                        readOnly: true
                    },
                    items: [{
                        xtype: 'textareafield',
                        id: 'txtRegCode',
                        name: 'name',
                        //label: '模块选择',
                        maxRows: 6,
                        placeHolder: '永和豆浆\\新乡市银马口家乐福楼下\\41717965413620919080940000320575\\2用户试用增强版'
                    }]
                }]
            }, {
                xtype: 'toolbar',
                cls: 'toolbar',
                ui: 'light',
                docked: 'bottom',
                height: 53,
                style: {
                    'background': '#0078d7',
                    'border-top': '0px',
                    'border-bottom-width': '0px'
                },
                items: [{
                    xtype: 'spacer'//空格
                }, {
                    xtype: 'button',
                    labelCls:'toolbar-button-lable',
                    iconAlign: 'left',
                    iconCls: 'copying p-ico p-roseRed',
                    style: {
                        'background': '#0078d7',
                        'margin-left': '-10px',
                        'color': '#fff'
                    },
                    text: '复制',
                    handler: function () {
                        // 发送消息到剪切板
                        sms.sendCopy("永和豆浆\\新乡市银马口家乐福楼下\\2用户试用增强版", function (data) {
                            Common.alert('提示', "注册码" + data);
                        }, function () {
                            Common.alert("提示", data);
                        });
                    }
                }, {
                    xtype: 'spacer'//空格
                }, {
                    xtype: 'spacer'//空格
                }, {
                    xtype: 'button',
                    labelCls: 'toolbar-button-lable',
                    style: {
                        'background': '#0078d7',
                        'margin-left': '-10px',
                        'color': '#fff'
                    },
                    iconAlign: 'left',
                    iconCls: 'code-forward p-ico p-roseRed',
                    text: '转发',
                    handler: function () {
                        Common.shareCode(); // 注册码转发
                    }
                }, {
                    xtype: 'spacer'//空格
                }]
            }]
        }]
    }
});