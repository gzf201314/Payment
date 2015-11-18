Ext.define('JajaApp.view.SaveBill', {
    extend: 'Ext.Panel',
    xtype: 'savebill',

    requires: [],

    config: {
        id: 'savebillview',
        floating: true,
        layout: 'vbox',
        autoDestroy: true,
        showAnimation: {
            type: 'pop',
            duration: 250
        },
        hideAnimation: {
            type: 'popOut',
            duration: 250
        },
        modal: true,
        centered: false,
        top: 95,
        left: 131,
        padding: 0,
        border: 0,
        width: 270,
        height: 174,
        items: [{
            xtype: 'container',
            width: '100%',
            height: '100%',
            top: 0,
            layout: 'vbox',
            items: [{
                xtype: 'image',
                docked: 'top',
                height: 24,
                width: 42,
                style: {
                    'margin-top': '-27px',
                    'margin-left': '108px'
                },
                src: 'icons/toptriangle.png'
            }, {
                docked: 'top',
                ui: 'light',
                xtype: 'toolbar',
                cls: 'p-toolbar',
                height: '45px',
                title: '保存'
            }, {
                xtype: 'formpanel',
                width: '100%',
                height: "100%",
                scrollable: false,
                items: [{
                    xtype: 'fieldset',
                    cls: 'c-field',
                    margin: '0.4em 0.4em',
                    style: 'height:50px;width:243px;',
                    items: [{
                        xtype: 'textfield',
                        id: 'txtTableName',
                        name: 'firstName',
                        padding: 0,
                        style: 'background: #f2f2f2;height:40px;font-size:20px;color:#006bb6;padding: 0px;'
                    }]
                }, {
                    xtype: 'button',
                    id: 'btnSaveOrderTemp',
                    style: 'background:rgb(55, 151, 151);font-size:23px;color: rgb(253, 252, 252);border-radius: 5px;',
                    cls: 'button',
                    height: 50,
                    width: 243,
                    margin: '0em 0.3em 0.3em',
                    text: '确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定'
                }]
            }]
        }]
    }
});