
var formButton = {
    'background-image': 'none',
    'background-color': 'rgb(255, 255, 255)',
    'text-align': 'left',
    'border': '0px solid',
    'border-bottom': '1px solid rgb(221, 221, 221)',
    'border-radius': '0px',
    'font-weight': '400'
}

Ext.define('JajaApp.view.ConfirmReg', {
    extend: 'Ext.Container',
    xtype: 'confirmview',

    requires: ['JajaApp.view.RegCode',
       'JajaApp.view.ShareCode'],

    config: {
        id: 'confirmview',
        fullscreen: true,
        layout: 'vbox', //布局
        autoDestroy: true,
        items: [{
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            docked: 'top',
            title: '请确认信息',
            style: {
                'background': '#0078d7',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                ui: 'back',
                id: 'ConfirmBack',
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
                    labelWidth: '37%',
                    labelCls: 'reg-lable',
                    inputCls: 'inputstyle',
                    readOnly: true
                },
                items: [{
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtConfirmCompanyName",
                    label: '公司名称：',
                    maxRows: 2,
                    placeHolder: '公司名称'
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    id: "txtConfirmHotelName",
                    label: '酒店名称：',
                    placeHolder: '酒店名称'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtConfirmHotelAddress",
                    label: '酒店地址：',
                    maxRows: 3,
                    placeHolder: '酒店地址'
                }, {
                    xtype: 'numberfield',
                    name: 'name',
                    id: "txtConfirmSitesNumber",
                    minValue: 1,
                    maxValue: 20,
                    label: '站&nbsp;&nbsp;点&nbsp;&nbsp;数：',
                    placeHolder: '站点数'
                }, {
                    xtype: 'numberfield',
                    id: 'txtConfirmMealOrderNumber',
                    name: 'name',
                    minValue: 1,
                    maxValue: 20,
                    label: '点菜宝数：',
                    placeHolder: '点菜宝数'
                }, {
                    xtype: 'textfield',
                    id:'txtConfirmVersion',
                    name: 'name',
                    label: '版本选择：',
                    placeHolder: '版本选择'
                }, {
                    xtype: 'textfield',
                    id: 'txtConfirmSysType',
                    name: 'name',
                    label: '系统选择：',
                    placeHolder: '系统选择'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: 'txtConfirmModules',
                    label: '模块选择：',
                    maxRows: 16,
                    placeHolder: '模块选择'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtConfirmRemark",
                    label: '备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：',
                    maxRows: 4,
                    placeHolder: '备注信息'
                }, {
                    xtype: 'hiddenfield',
                    name: 'name',
                    id: "txtConfirmUserName",
                    //label: '操作员',
                    placeHolder: '操作员'
                }, {
                    xtype: 'hiddenfield',
                    id: "txtConfirmOriRegID",
                    name: 'userId'
                }, {
                    xtype: 'hiddenfield',
                    id: "txtConfirmRegUserID",
                    name: 'userId'
                }]
            }]
        }, {
            xtype: 'button',
            docked: 'bottom',
            id: 'ConfirmRegister',
            width: '93%',
            style: {
                'font-size': '1.3em',
                'font-weight': '400',
                'color': '#157efb',
                'border-radius': '6px',
                'border': '1px solid #157efb',
                'background-color': 'transparent',
                'background-image': 'none',
                'margin': '0px auto 20px'
            },
            text: '确认注册'
        }]
    }
});