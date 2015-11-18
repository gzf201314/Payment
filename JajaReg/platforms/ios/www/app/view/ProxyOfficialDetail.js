Ext.define('JajaApp.view.ProxyOfficialDetail', {
    extend: 'Ext.Container',
    xtype: 'proxyofficialdetailview',

    requires: [],

    config: {
        id: 'proxyofficialdetailview',
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
                id: 'ProxyOfficialDetailBack',
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
                    id: 'txtProxyOfficialDetailRegUserID',
                    name: 'name',
                    label: '申&nbsp;&nbsp;请&nbsp;&nbsp;人：',
                    placeHolder: '联系人'
                }, {
                    xtype: 'textfield',
                    id: 'txtProxyOfficialDetailRegDate',
                    name: 'name',
                    label: '申请日期：',
                    placeHolder: '申请日期'
                }, {
                    xtype: 'textfield',
                    id: 'txtProxyOfficialDetailTryDate',
                    name: 'name',
                    label: '审批日期：',
                    placeHolder: '审批日期'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtProxyOfficialDetailHotelName",
                    label: '酒店名称：',
                    maxRows: 2,
                    placeHolder: '酒店名称'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtProxyOfficialDetailHotelAddress",
                    label: '酒店地址：',
                    maxRows: 3,
                    placeHolder: '山东省青岛市市北区辽宁路228号科信大厦2516'
                }, {
                    xtype: 'numberfield',
                    name: 'name',
                    id: "txtProxyOfficialDetailSitesNumber",
                    minValue: 18,
                    maxValue: 150,
                    label: '站&nbsp;&nbsp;点&nbsp;&nbsp;数：',
                    placeHolder: '站点数'
                }, {
                    xtype: 'numberfield',
                    id: 'txtProxyOfficialDetailMealOrderNumber',
                    name: 'name',
                    minValue: 18,
                    maxValue: 150,
                    label: '点菜宝数：',
                    placeHolder: '点菜宝数'
                }, {
                    xtype: 'textfield',
                    id: 'txtProxyOfficialDetailSysType',
                    name: 'name',
                    label: '所选系统：',
                    placeHolder: '所选系统'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: 'txtProxyOfficialDetailModules',
                    label: '所选模块：',
                    maxRows: 15,
                    placeHolder: '所选模块'
                }, {
                    xtype: 'textareafield',
                    id: 'txtProxyOfficialDetailRegCode',
                    name: 'name',
                    label: '注&nbsp;&nbsp;册&nbsp;&nbsp;码：',
                    maxRows: 4,
                    placeHolder: '注册码'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtProxyOfficialDetailRemark",
                    label: '备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：',
                    maxRows: 4,
                    placeHolder: '备注信息'
                }, {
                    xtype: 'hiddenfield',
                    name: 'name',
                    id: "txtProxyOfficialDetailUserName",
                    //label: '操作员',
                    placeHolder: '操作员'
                }, {
                    xtype: 'hiddenfield',
                    id: "txtProxyOfficialDetailOriRegID",
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
            items: [{
                xtype: 'spacer'//空格
            }, {
                xtype: 'button',
                iconAlign: 'left',
                labelCls: 'toolbar-button-lable',
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
    }
});