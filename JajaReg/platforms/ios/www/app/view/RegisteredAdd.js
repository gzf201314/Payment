
var formButton = {
    'background-image': 'none',
    'background-color': 'rgb(255, 255, 255)',
    'text-align': 'left',
    'border': '0px solid',
    'border-bottom': '1px solid rgb(221, 221, 221)',
    'border-radius': '0px',
    'font-weight': '400'
}

Ext.define('JajaApp.view.RegisteredAdd', {
    extend: 'Ext.Container',
    xtype: 'registerview',

    requires: ['JajaApp.view.SystemType', 'JajaApp.view.Modules', 'JajaApp.view.Version', 'JajaApp.view.AuthorizationUser'],

    config: {
        id: 'registerview',
        fullscreen: true,
        layout: 'vbox', //布局
        autoDestroy: true,
        items: [{
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            docked: 'top',
            title: '软件注册',
            style: {
                'background': '#0078d7',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                ui: 'back',
                id: 'RegisterBack',
                style: {
                    'background': '#0078d7',
                    'margin-left': '-10px',
                    'color': '#fff'
                },
                text: '返回'
            }, {
                xtype: 'spacer'//空格
            }, {
                xtype: 'button',
                id: 'EditRegister',
                labelCls:'edit-button',
                style: {
                    'background': '#0078d7',
                    'margin-left': '-10px',
                    'color': '#fff'
                },
                hidden:true,
                text: '编辑'
            }]
        }, {
            xtype: 'formpanel',
            width: '100%',
            height: '100%',
            cls: 'code-form',
            scrollable: {
                direction: 'vertical',
                indicators: false
            },
            style: {
                'background-color': '#ffffff'
            },
            items: [{
                xtype: 'fieldset',
                id: 'formal_fieldset',
                margin: 0,
                width: '100%',
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
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtHotelName",
                    clearIcon: false,
                    maxRows: 2,
                    label: '酒店名称：',
                    placeHolder: '请输入酒店名称'
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtHotelAddress",
                    clearIcon: false,
                    label: '酒店地址：',
                    maxRows: 3,
                    placeHolder: '请输入酒店地址'
                }, {
                    xtype: 'numberfield',
                    name: 'name',
                    id: "txtSitesNumber",
                    clearIcon: false,
                    minValue: 1,
                    maxValue: 20,
                    label: '站&nbsp;&nbsp;点&nbsp;&nbsp;数：',
                    placeHolder: '请输入站点数',
                    value: 1
                }, {
                    xtype: 'numberfield',
                    name: 'name',
                    id: 'txtMealOrderNumber',
                    clearIcon: false,
                    minValue: 1,
                    maxValue: 20,
                    label: '点菜宝数：',
                    placeHolder: '请输入点菜宝数'
                }, {
                    xtype: 'selectfield',
                    id: 'txtVersion',
                    label: '版本选择：',
                    usePicker: true,
                    defaultPhonePickerConfig: {
                        doneButton: '确定',
                        cancelButton: '取消'
                    },
                    options: [
                        { text: '试用版', value: '试用版' },
                        { text: '正式版', value: '正式版' }
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        //                         xtype: 'textareafield',
                        //                         maxRows: 2,
                        flex: 1,
                        id: 'SysTypeButton',
                        name: 'name',
                        labelWidth: '41%',
                        minValue: 1,
                        maxValue: 20,
                        clearIcon: false,
                        readOnly: true,
                        label: '系统选择：',
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
                            Choose.showSystem(['SysTypeButton', 'ModuleButton']);
                        }
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        flex: 1,
                        id: 'ModuleButton',
                        name: 'name',
                        labelWidth: '41%',
                        minValue: 1,
                        maxValue: 20,
                        readOnly: true,
                        clearIcon: false,
                        label: '模块选择：',
                        placeHolder: '请选择模块'
                    }, {
                        xtype: 'button',
                        iconAlign: 'right',
                        width: '10%',
                        height: '2.65em',
                        labelCls: 'btnlabel',
                        iconCls: 'rightarrow t-ico l-d-rose',
                        style: formButton,
                        handler: function () {
                            var key = Common.getValue('SysTypeButton');
                            if (key.length == 0 || key == "") {
                                Common.alert("提示", "请选择系统");
                                return;
                            }
                            else {
                                Choose.showModule(['SysTypeButton', 'ModuleButton']);
                            }
                        }
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textareafield',
                        flex: 1,
                        id: 'txtCompanyName',
                        name: 'name',
                        labelWidth: '41%',
                        maxRows: 2,
                        clearIcon: false,
                        readOnly: true,
                        label: '公司名称：',
                        placeHolder: '请选择公司名称'
                    }, {
                        xtype: 'button',
                        iconAlign: 'right',
                        width: '10%',
                        height: '3.9em',
                        labelCls: 'btnlabel',
                        iconCls: 'rightarrow t-ico l-d-rose',
                        style: formButton,
                        handler: function () {
                            Choose.showAuthorizationView('txtCompanyName', 'txtRegUserID');
                        }
                    }]
                }, {
                    xtype: 'textareafield',
                    name: 'name',
                    id: "txtHotelRemark",
                    clearIcon: false,
                    label: '备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：',
                    maxRows: 4,
                    placeHolder: '请输入备注信息'
                }, {
                    xtype: 'hiddenfield',
                    id: "txtOriRegID",
                    name: 'userId'
                }, {
                    xtype: 'hiddenfield',
                    id: "txtRegUserID",
                    name: 'userId'
                }]
            }, {
                xtype: 'button',
                id: 'RegisterNext',
                width: '93%',
                style: {
                    'font-size': '1.3em',
                    'font-weight': '500',
                    'color': '#157efb',
                    'border-radius': '6px',
                    'border': '1px solid #157efb',
                    'background-color': '#fff',
                    'background-image': 'none',
                    'margin-top': '20px',
                    'margin-left': 'auto',
                    'margin-right': 'auto'
                },
                text: '下一步'
            }]
        }]
    }
});