Ext.define('JajaApp.view.AskDetail', {
    extend: 'Ext.Container',
    xtype: 'askdetailview',

    requires: ['JajaApp.view.DetailActionSheet'],

    config: {
        id: 'askdetailview',
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
                id: 'AskDetailBack',
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
                    inputCls: 'inputstyle'
                },
                items: [{
                    xtype: 'textfield',
                    id: 'txtAskDetailRegUserID',
                    name: 'name',
                    readOnly: true,
                    label: '申&nbsp;&nbsp;请&nbsp;&nbsp;人：',
                    placeHolder: '申请人'
                }, {
                    xtype: 'textfield',
                    id: 'txtAskDetailApplyDate',
                    name: 'name',
                    readOnly: true,
                    label: '申请日期：',
                    placeHolder: '申请日期'
                }, {
                    xtype: 'textfield',
                    id: 'txtAskDetailRegDate',
                    name: 'name',
                    readOnly: true,
                    label: '注册日期：',
                    placeHolder: '注册日期'
                }, {
                    xtype: 'textfield',
                    id: 'txtAskDetailTryDate',
                    name: 'name',
                    readOnly: true,
                    label: '试用期限：',
                    placeHolder: '试用期限'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtAskDetailHotelName",
                    label: '酒店名称：',
                    clearIcon: false,
                    maxRows: 2,
                    placeHolder: '酒店名称'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    clearIcon: false,
                    autoCapitalize: true,
                    autoComplete: true,
                    autoCorrect: false,
                    id: "txtAskDetailHotelAddress",
                    label: '酒店地址：',
                    maxRows: 3,
                    placeHolder: '山东省青岛市市北区辽宁路228号科信大厦2516'
                }, {
                    xtype: 'numberfield',
                    clearIcon: false,
                    name: 'name',
                    id: "txtAskDetailSitesNumber",
                    label: '站&nbsp;&nbsp;点&nbsp;&nbsp;数：',
                    placeHolder: '站点数'
                }, {
                    xtype: 'numberfield',
                    clearIcon: false,
                    id: 'txtAskDetailMealOrderNumber',
                    name: 'name',
                    label: '点菜宝数：',
                    placeHolder: '点菜宝数'
                }, {
                    xtype: 'selectfield',
                    label: '版本选择：',
                    usePicker: true,
                    defaultPhonePickerConfig: {
                        doneButton: '确定',
                        cancelButton: '取消'
                    },
                    options: [
                        { text: '试用版', value: 'first' },
                        { text: '正式版', value: 'second' }
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        flex: 1,
                        id: 'txtAskDetailSysType',
                        name: 'name',
                        labelWidth: '41%',
                        minValue: 1,
                        maxValue: 20,
                        clearIcon: false,
                        readOnly: true,
                        label: '所选系统：',
                        placeHolder: '请选择系统'
                    }, {
                        xtype: 'button',
                        iconAlign: 'right',
                        width: '10%',
                        height: '2.65em',
                        labelCls: 'btnlabel',
                        iconCls: 'rightarrow t-ico l-d-rose',
                        style: formButton,
                        handler: function () {
                            Choose.showSystem(['txtAskDetailSysType', 'txtAskDetailModules']);
                        }
                    }]
                }, {
                    xtype: 'textareafield',
                    id: 'txtAskDetailModules',
                    name: 'name',
                    maxRows: 15,
                    clearIcon: false,
                    readOnly: true,
                    label: '所选模块：',
                    placeHolder: '请选择模块'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    clearIcon: false,
                    id: "txtAskDetailRemark",
                    label: '备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：',
                    maxRows: 4,
                    placeHolder: '备注信息'
                }, {
                    xtype: 'hiddenfield',
                    name: 'name',
                    id: "txtAskDetailUserName",
                    //label: '操作员',
                    placeHolder: '操作员'
                }, {
                    xtype: 'hiddenfield',
                    id: "txtAskDetailRegID",
                    name: 'userId'
                },{
                    xtype: 'hiddenfield',
                    id: "txtAskDetailOriRegID",
                    name: 'userId'
                },{
                    xtype: 'hiddenfield',
                    id: "txtAskDetailRegModuleID",
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
                xtype: 'spacer'
            }, {
                xtype: 'button',
                id: 'DelayButton',
                labelCls: 'toolbar-button-lable',
                margin: 0,
                height: 53,
                iconCls: 'yanqi p-ico p-roseRed',
                style: {
                    'background': '#0078d7',
                    'color': '#fff'
                },
                text: '临时延期'
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                id: 'GenerateButton',
                labelCls: 'toolbar-button-lable',
                margin: 0,
                height: 53,
                iconCls: 'edit p-ico p-roseRed',
                style: {
                    'background': '#0078d7',
                    'color': '#fff'
                },
                text: '正式注册'
            }, {
                xtype: 'spacer'
            }]
        }]
    }
});