Ext.define("util.ToolBar", {
    alternateClassName: "ToolBar",
    singleton: true,
    config: {
        description: '加加餐饮软件'
    },
    constructor: function (config) {
        this.initConfig(config);
    },
    // 通知
    onNoticeToolBar: function () {
        var data = Ext.create('Ext.Toolbar', {
            docked: 'top',
            id: 'custombar',
            ui: 'light',
            autoDestroy: true,
            xtype: 'toolbar',
            cls: 'toolbar',
            height: 45,
            style: {
                'background': '#006dc6',
                //'background': 'rgb(94, 153, 204)',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                id: 'menus',
                iconAlign: 'left',
                iconCls: 'menus p-ico p-roseRed',
                margin: '0',
                //height: 48,
                style: {
                    'background': '#006dc6',
                    'color': 'rgb(247, 244, 244)'
                }
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'container',
                layout: 'hbox',
                style: 'border: 1px solid rgb(252, 251, 250);border-radius: 9px;height: 36px;width:146px',
                centered: true,
                items: [{
                    xtype: 'button',
                    id: 'btnTrial',
                    text: '试用',
                    style: Color.heightCls
                }, {
                    xtype: 'button',
                    id: 'btnFormal',
                    style: Color.defaultCls,
                    text: '正式'
                }]
            }, {
                xtype: 'spacer'
            }]
        });
        return data;
    },
    // 记录
    onRecordToolBar: function () {
        var data = Ext.create('Ext.Toolbar', {
            docked: 'top',
            ui: 'light',
            id: 'custombar',
            xtype: 'toolbar',
            autoDestroy: true,
            cls: 'toolbar',
            title: '记录',
            height: 45,
            style: {
                'background': '#006dc6',
                //'background': 'rgb(94, 153, 204)',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                id: 'menus',
                iconAlign: 'left',
                iconCls: 'menus p-ico p-roseRed',
                margin: '0',
                //height: 48,
                style: {
                    'background': '#006dc6',
                    'color': 'rgb(247, 244, 244)'
                }
            }]
        });
        return data;
    },
    // 代理商
    onAgentToolBar: function () {
        var data = Ext.create('Ext.Toolbar', {
            docked: 'top',
            ui: 'light',
            id: 'custombar',
            xtype: 'toolbar',
            autoDestroy: true,
            cls: 'toolbar',
            height: 45,
            title: '代理商',
            style: {
                'background': '#006dc6',
                //'background': 'rgb(94, 153, 204)',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                id: 'menus',
                iconAlign: 'left',
                iconCls: 'menus p-ico p-roseRed',
                margin: '0',
                style: {
                    'background': '#006dc6',
                    'color': 'rgb(247, 244, 244)'
                }
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                iconAlign: 'left',
                iconCls: 'add p-ico p-roseRed',
                margin: '0',
                style: {
                    'background': '#006dc6',
                    'color': 'rgb(247, 244, 244)'
                }
            }]
        });
        return data;
    }
});