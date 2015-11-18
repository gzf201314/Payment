var Color = {
    backgroundColor: 'rgb(230,84,35)',
    textColor: 'rgb(195,72,30)',
    buttonColor: 'rgb(239,85,35)'
}
Ext.define('JajaApp.view.SettingView', {
    extend: 'Ext.Container',
    xtype: 'settingview',

    requires: [],

    config: {
        id: 'settingview',
        fullscreen: true,
        layout: 'vbox', //布局
        autoDestroy: true,
        items: [{
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            docked: 'top',
            title: '账号设置',
            style: {
                'background': Color.backgroundColor,
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                ui: 'back',
                id: 'SettingBack',
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
            },
            items: [{
                xtype: 'fieldset',
                margin: '60px 0px 0px 0px',
                width: '100%',

                style: {
                    '-webkit-border-radius': '0',
                    'border-bottom': '1px solid #DBDBE0',
                    'border-top': '1px solid #DBDBE0',
                    'border-radius': '0'
                },
                defaults: {
                    labelWidth: '31%',
                    labelCls: 'c-label',
                    clearIcon: false
                },
                items: [{
                    xtype: 'textfield',
                    height: 43,
                    id: 'txtName',
                    name: 'txtName',
                    label: '商品名：',
                    value:'门店消费',
                    placeHolder: '请输入商品名或交易名'
                }, {
                    xtype: 'numberfield',
                    id: 'txtNumber',
                    name: 'txtNumber',
                    height: 43,
                    label: '商户号：',
                    placeHolder: '请输入微信支付商户号'
                }]
            }, {
                xtype: 'container',
                width: '100%',
                items: [{
                    xtype: 'label',
                    style: {
                        'padding': '20px',
                        'color': '#9C9C9C'
                    },
                    html: '商品名用于向顾客展示本次消费的商品名或交易名；商户号是经本公司向微信申请的微信支付商户号（其他途径申请的微信支付商户号不能使用本系统）'
                }, {
                    xtype: 'button',
                    id:'saveButton',
                    labelCls: 'bao-lable-button-sum',
                    width: '95%',
                    style: {
                        'font-size': '1.3em',
                        'font-weight': '500',
                        'color': '#157efb',
                        'border-radius': '6px',
                        'border': '1px solid rgb(57, 207, 90)',
                        'background-color': 'rgb(57, 207, 90)',
                        'background-image': 'none',
                        'margin-left': '10px',
                        'margin-right': '10px'
                    },
                    text: '保&nbsp;&nbsp;存'
                }]
            }]
        }]
    }
});