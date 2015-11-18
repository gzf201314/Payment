/**
*   试用操作:延期、申请、复制、发送
*/
Ext.define('JajaApp.view.TrialOption', {
    extend: 'Ext.Container',
    xtype: 'trialoptionview',

    requires: [],

    config: {
        width: '100%',
        height: 112,
        floating: true,
        autoDestroy: true,
        layout: 'vbox',
        modal: true,
        bottom: 0,
        showAnimation: {
            type: 'slide',
            direction: 'up',
            duration: 300
        },
        hideAnimation: {
            type: 'slide',
            duration: 300,
            direction: 'up',
            reverse: true,
            out: true
        },
        style: 'background:red;',
        zInex: 13,
        items: [{
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            style: {
                'border-top': '1px solid #DBDBDB'
            },
            height: 56,
            items: [{
                xtype: 'spacer'
            }, {
                xtype: 'button',
                iconAlign: 'left',
                iconCls: 'delay t-ico l-h-rose',
                style: {
                    color: '#5E99CC'
                },
                margin: '0 -8',
                text: '延期'
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                iconAlign: 'left',
                id: '',
                iconCls: 'apply t-ico l-h-rose',
                margin: '0 -8',
                style: {
                    color: '#5E99CC'
                },
                text: '申请'
            }, {
                xtype: 'spacer'
            }]
        }, {
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            style: {
                'border-top': '1px solid rgb(94, 153, 204)'
            },
            height: 56,
            items: [{
                xtype: 'spacer'
            }, {
                xtype: 'button',
                iconAlign: 'left',
                iconCls: 'copying t-ico l-h-rose',
                style: {
                    color: '#5E99CC'
                },
                margin: '0 -8',
                text: '复制'
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                iconAlign: 'left',
                iconCls: 'message t-ico l-h-rose',
                style: {
                    color: '#5E99CC'
                },
                margin: '0 -8',
                text: '发送'
            }, {
                xtype: 'spacer'
            }]
        }]
    }
});