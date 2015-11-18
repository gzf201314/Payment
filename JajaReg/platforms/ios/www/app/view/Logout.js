Ext.define('JajaApp.view.Logout', {
    extend: 'Ext.Container',
    xtype: 'logout',

    requires: [],

    config: {
        id: 'logoutview',
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
        centered: true,
        padding: 0,
        border: 0,
        width: 330,
        height: 175,
        style: {
            'background': 'rgb(228, 228, 228)'
        },
        items: [{
            xtype: "toolbar",
            docked: 'top',
            cls: 'mtoolbar',
            style: {
                'border-radius': '10px 10px 0px 0px',
                'background-color': 'rgb(237, 236, 236)'
            },
            ui: 'light',
            title: '确定要注销当前用户吗？',
            width: '100%',
            height: 50
        }, {
            xtype: 'container',
            width: '100%',
            height: 86,
            flex: 1,
            style: {
                'background': 'rgb(237, 236, 236)'
            },
            items: [{
                xtype: 'button',
                iconAlign: 'top',
                id:'ConfirmLogout',
                height: 42,
                width: 285,
                style: {
                    'background': 'rgba(173, 31, 31, 0.701961)',
                    'font-size': '1.2em',
                    'color': 'rgb(253, 252, 252)',
                    'border-radius': '7px',
                    'margin-top': '5px',
                    'margin-left': 'auto',
                    'margin-right': 'auto'
                },
                cls: 'button',
                text: '注销'
            }]
        }, {
            xtype: 'container',
            width: '100%',
            height: 60,
            style: {
                'background': 'rgb(237, 236, 236)',
                'border-radius': '0px 0px 10px 10px'
            },
            items: [{
                xtype: 'button',
                id: 'CancelLogout',
                style: {
                    'background': 'rgba(247, 249, 250, 0.701961)',
                    'font-size': '1.2em',
                    'color': 'rgb(39, 18, 18)',
                    'border-radius': '7px',
                    'margin-left': 'auto',
                    'margin-right': 'auto'
                },
                cls: 'button',
                height: 42,
                width: 285,
                pack: 'right',
                text: '取消'
            }]
        }]
    }
});