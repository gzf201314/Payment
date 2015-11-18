var Color = {
    backgroundColor: 'rgb(230,84,35)',
    textColor: 'rgb(195,72,30)',
    buttonColor: 'rgb(239,85,35)'
}
Ext.define('JajaApp.view.ResultView', {
    extend: 'Ext.Container',
    xtype: 'resultview',

    requires: [],

    config: {
        id: 'resultview',
        fullscreen: true,
        layout: 'vbox', //布局
        autoDestroy: true,
        items: [{
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            docked: 'top',
            title: '支付详情',
            style: {
                'background': Color.backgroundColor,
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                ui: 'back',
                id: 'ResultBack',
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
            layout: 'vbox',
            items: [{
                xtype: 'container',
                height: 150,
                style: {
                    'padding-top': '40px',
                    'background-color': '#fff'
                },
                items: [{
                    xtype: 'image',
                    centered: true,
                    width: 96,
                    height: 96,
                    src: 'images/dui.png'
                }]
            }, {
                xtype: 'container',
                height: 36,
                style: {
                    'text-align': 'center',
                    'font-size': '1.3em',
                    'color': '#42BA39'
                },
                html: '支付成功'
            }, {
                xtype: 'container',
                height: 96,
                layout: 'vbox',
                items: [{
                    xtype: 'container',
                    height: 47,
                    style: {
                        'line-height': '47px',
                        'border-top': '1px solid #B6B5B5'
                    },
                    items: [{
                        xtype: 'label',
                        style: {
                            'padding-left': '30px'
                        },
                        html: '商户名称：加加大酒店'
                    }]
                }, {
                    xtype: 'container',
                    height: 47,
                    style: {
                        'line-height': '47px',
                        'border-top': '1px solid #B6B5B5'
                    },
                    items: [{
                        xtype: 'label',
                        style: {
                            'padding-left': '30px'
                        },
                        html: '交易时间：2015-11-02 17:10:10'
                    }]
                }]
            }, {
                xtype: 'container',
                height: 70,
                style: {
                    'border-top': '1px solid #B6B5B5',
                    'line-height': '70px'
                },
                items: [{
                    xtype: 'label',
                    id:'lblPay',
                    style: {
                        'text-align': 'center',
                        'letter-spacing': '-2px',
                        'font-size': '3em'
                    },
                    html: '￥10.00'
                }]
            }, {
                xtype: 'container',
                height: 60,
                margin: 10,
                items: [{
                    xtype: 'button',
                    id: 'CompleteButton',
                    height: 43,
                    labelCls: 'bao-lable-button-sum',
                    style: {
                        'background-color': '#39cf5a',
                        'border-color': '#39cf5a'
                    },
                    text: '完成'
                }]
            }, {
                xtype: 'container',
                flex: 1
            }]
        }]
    }
});