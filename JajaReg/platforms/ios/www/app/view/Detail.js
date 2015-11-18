Ext.define('JajaApp.view.Detail', {
    extend: 'Ext.Container',
    xtype: 'detailview',

    requires: ['JajaApp.view.DetailActionSheet'],

    config: {
        id: 'detailview',
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
                id: 'DetailBack',
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
                    id: 'txtDetailRegDate',
                    name: 'name',
                    label: '注册日期：',
                    placeHolder: '注册日期'
                }, {
                    xtype: 'textfield',
                    id: 'txtDetailTryDate',
                    name: 'name',
                    label: '试用期限：',
                    placeHolder: '试用期限'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtDetailHotelName",
                    label: '酒店名称：',
                    maxRows: 2,
                    placeHolder: '酒店名称'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtDetailHotelAddress",
                    label: '酒店地址：',
                    maxRows: 3,
                    placeHolder: '山东省青岛市市北区辽宁路228号科信大厦2516'
                }, {
                    xtype: 'numberfield',
                    name: 'name',
                    id: "txtDetailSitesNumber",
                    minValue: 18,
                    maxValue: 150,
                    label: '站&nbsp;&nbsp;点&nbsp;&nbsp;数：',
                    placeHolder: '站点数'
                }, {
                    xtype: 'numberfield',
                    id: 'txtDetailMealOrderNumber',
                    name: 'name',
                    minValue: 18,
                    maxValue: 150,
                    label: '点菜宝数：',
                    placeHolder: '点菜宝数'
                }, {
                    xtype: 'textfield',
                    id: 'txtDetailSysType',
                    name: 'name',
                    label: '所选系统：',
                    placeHolder: '所选系统'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: 'txtDetailModules',
                    label: '所选模块：',
                    maxRows: 15,
                    placeHolder: '所选模块'
                }, {
                    xtype: 'textareafield',
                    id: 'txtDetailRegCode',
                    name: 'name',
                    label: '注&nbsp;&nbsp;册&nbsp;&nbsp;码：',
                    maxRows: 4,
                    placeHolder: '注册码'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtDetailRemark",
                    label: '备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：',
                    maxRows: 4,
                    placeHolder: '备注信息'
                },  {
                    xtype: 'hiddenfield',
                    id: "txtDetailOriRegID",
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
                id: 'MoreActionButton',
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