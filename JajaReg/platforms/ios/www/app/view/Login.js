Ext.define('JajaApp.view.Login', {
    extend: 'Ext.Container',
    xtype: 'login',

    requires: [],

    config: {
        id: 'loginview',
        layout: 'vbox',
        autoDestroy: true,
        items: [{
            xtype: "toolbar",
            docked: 'top',
            cls: 'toolbar',
            ui: 'light',
            title: '用户登录',
            height: 44,
            style: {
                'background': '#0078d7',
                'border-top': '0px',
                'border-bottom-width': '0px'
            }
            //            ,
            //            items: [{
            //                xtype: 'spacer'//空格
            //            }, {
            //                xtype: 'button',
            //                id: 'CloseLogin',
            //                style: 'background-color:rgba(0, 0, 0, 0);background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0),rgba(0, 0, 0, 0) 3%,rgba(0, 0, 0, 0));color: rgb(221, 221, 221);',
            //                // iconCls: 'sysClose p-ico p-roseRed'
            //                text: '设置'
            //            }]
        }, {
            xtype: 'container',
            height: 380,
            items: [{
                xtype: 'container',
                width: '100%',

                style: {
                    'height': '190px'
                },
                items: [{
                    xtype: 'image',
                    src: 'images/logo.png',
                    centered: true,
                    style: {
                        'border-radius': '20px',
                        'border': '1px solid rgba(55, 112, 176, 0.42)',
                        'margin-left': 'auto',
                        'margin-right': 'auto'
                    },
                    height: 100,
                    width: 100
                }]
            }, {
                xtype: 'container',
                width: '93%',
                style: {
                    'height': '102px',
                    'margin-left': 'auto',
                    'margin-right': 'auto'
                },
                items: [{
                    xtype: 'fieldset',
                    cls: 'loginCls',
                    centered: true,
                    margin: 0,
                    style: 'width:100%;',
                    items: [{
                        xtype: 'textfield',
                        inputCls: 'searchinput',
                        id: 'txtUserID',
                        clearIcon: false,
                        name: 'txtUserID',
                        //maxLength: 4,
                        placeHolder: '请输入用户名',
                        padding: 0,
                        style: 'font-size:20px;color:#006bb6;padding: 0px;'
                    }, {
                        xtype: 'passwordfield',
                        id: 'txtPassword',
                        clearIcon:false,
                        inputCls: 'searchinput',
                        name: 'txtPassword',
                        //maxLength: 8,
                        placeHolder: '请输入密码',
                        padding: 0,
                        style: {
                            'font-size': '20px',
                            'color': '#006bb6',
                            'padding': '0px'
                        }
                    }]
                }]
            }, {
                xtype: 'container',
                width: '100%',
                height: 100,
                items: [{
                    xtype: 'container',
                    width: '100%',
                    height: 60,
                    items: [{
                        xtype: 'togglefield',
                        centered: true,
                        id: 'RememberPassword',
                        name: 'awesome',
                        value: 1,
                        label: '记住密码',
                        labelWidth: '55%',
                        labelCls: 'toggle-lable',
                        style: {
                            'margin-left': '12px',
                            'margin-right': 'auto',
                            'margin-top': '2px',
                            'line-height': '30px',
                            'border-radius': '6px'
                        }
                    }]

                }, {
                    xtype: 'container',
                    width: '100%',
                    items: [{
                        xtype: 'button',
                        ui: 'light',
                        id: 'login',
                        style: {
                            'font-size': '1.3em',
                            'font-weight': '400',
                            'color': '#157efb',
                            'border-radius': '6px',
                            'border-color': '#157efb',
                            'border': '1px solid #157efb',
                            'background-image': 'none',
                            'margin-left': 'auto',
                            'margin-right': 'auto'
                        },
                        cls: 'button',
                        height: 42,
                        width: '93%',
                        pack: 'right',
                        text: '登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录'
                    }]

                }]
            }]
        }, {
            xtype: 'container',
            flex: 1
        }]
    }
});