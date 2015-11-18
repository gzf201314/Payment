Ext.define('JajaApp.view.ProxyDetail', {
    extend: 'Ext.Container',
    xtype: 'proxydetailview',

    requires: ['JajaApp.view.DetailActionSheet'],

    config: {
        id: 'proxydetailview',
        fullscreen: true,
        layout: 'vbox', //布局
        autoDestroy: true,
        style: 'background:rgb(236, 237, 237)',
        items: [{
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            docked: 'top',
            title: '注册信息',
            style: {
                'background': '#0078d7',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                id: 'ProxyDetailBack',
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
            xtype: 'formpanel',
            flex: 1,
            scrollable: {
                direction: 'vertical',
                indicators: false
            },
            items: [{
                xtype: 'fieldset',
                margin: 0,
                style: {
                    '-webkit-border-radius': '0',
                    'border-radius': '0'
                },
                defaults: {
                    labelWidth: '37%',
                    labelCls: 'reg-lable',
                    inputCls: 'inputstyle',
                    readOnly: true
                },
                items: [{
                    xtype: 'textfield',
                    id: 'txtProxyDetailRegDate',
                    name: 'name',
                    label: '注册日期：',
                    placeHolder: '注册日期'
                }, {
                    xtype: 'textfield',
                    id: 'txtProxyDetailTryDate',
                    name: 'name',
                    label: '试用期限：',
                    placeHolder: '试用期限'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtProxyDetailHotelName",
                    label: '酒店名称：',
                    maxRows: 2,
                    placeHolder: '酒店名称'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtProxyDetailHotelAddress",
                    label: '酒店地址：',
                    maxRows: 3,
                    placeHolder: '山东省青岛市市北区辽宁路228号科信大厦2516'
                }, {
                    xtype: 'numberfield',
                    name: 'name',
                    id: "txtProxyDetailSitesNumber",
                    minValue: 18,
                    maxValue: 150,
                    label: '站&nbsp;&nbsp;点&nbsp;&nbsp;数：',
                    placeHolder: '站点数'
                }, {
                    xtype: 'numberfield',
                    id: 'txtProxyDetailMealOrderNumber',
                    name: 'name',
                    minValue: 18,
                    maxValue: 150,
                    label: '点菜宝数：',
                    placeHolder: '点菜宝数'
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    label: '所选版本：',
                    placeHolder: '所选版本'
                }, {
                    xtype: 'textfield',
                    id: 'txtProxyDetailSysType',
                    name: 'name',
                    label: '所选系统：',
                    placeHolder: '所选系统'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: 'txtProxyDetailModules',
                    label: '所选模块：',
                    maxRows: 15,
                    placeHolder: '所选模块'
                }, {
                    xtype: 'textfield',
                    id: 'txtProxyDetailCompanyName',
                    name: 'name',
                    label: '公司名称：',
                    placeHolder: '公司名称'
                }, {
                    xtype: 'textareafield',
                    id: 'txtProxyDetailRegCode',
                    name: 'name',
                    label: '注&nbsp;&nbsp;册&nbsp;&nbsp;码：',
                    maxRows: 4,
                    placeHolder: '注册码'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtProxyDetailRemark",
                    label: '备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：',
                    maxRows: 4,
                    placeHolder: '备注信息'
                }, {
                    xtype: 'hiddenfield',
                    name: 'name',
                    id: "txtProxyDetailUserName",
                    //label: '操作员',
                    placeHolder: '操作员'
                }, {
                    xtype: 'hiddenfield',
                    id: "txtProxyDetailOriRegID",
                    name: 'userId'
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
            items: [
            {
                xtype: 'button',
                id: 'MoreProxyDetailButton',
                labelCls: 'toolbar-button-lable',
                margin: 0,
                height: 53,
                iconAlign: 'top',
                width: '100%',
                iconCls: 'list-navigate p-ico p-roseRed',
                style: {
                    'background': '#0078d7',
                    'color': '#fff'
                },
                text: '更多操作'
            }]
        }]
    }
});