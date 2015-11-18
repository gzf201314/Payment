Ext.define('JajaApp.view.Loading', {
    extend: 'Ext.Panel',
    xtype: 'loading',

    requires: [],

    config: {
        id: 'loadview',
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
        left: 55,
        padding: 0,
        border: 0,
        width: 270,
        height: 370,
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
                title: '加载'
            }, {
                xtype: "container",
                width: '100%',
                height: "100%",
                items: [{
                    xtype: 'panel',
                    id: 'formpanelload',
                    width: '100%',
                    height: "100%"
                }, {
                    docked: 'bottom',
                    ui: 'light',
                    xtype: 'toolbar',
                    cls: 'p-toolbar',
                    style: {
                        'border-top-color': ' rgba(115, 115, 115, 0)',
                        'background': 'rgb(208, 208, 208)'
                    },
                    height: '98px',
                    items: [{
                        xtype: 'container',
                        height: '82px',
                        centered: true,
                        layout: 'vbox',
                        items: [{
                            xtype: 'button',
                            'badgeCls': 'd-badge',
                            style: 'margin: 0px;border: 1px solid;border-radius: 0.4em 0.4em 0 0;background-image: none;background-color: rgb(0, 107, 182);background-image: -webkit-linear-gradient(top, rgb(0, 107, 182),rgb(0, 107, 182) 3%,rgb(0, 107, 182));color: rgb(253, 253, 253);',
                            width: '245px',
                            height: 42,
                            //badgeText: '20',
                            text: '加载'
                        }, {
                            xtype: 'button',
                            style: 'margin: 0px;border-bottom-style: solid;border-bottom-color: rgb(253, 253, 253);border-left-color: rgb(253, 253, 253);border-right-color: rgb(253, 253, 253);border-bottom-width: 1px;border-left-width: 1px;border-right-width: 1px;border-radius: 0 0 0.4em 0.4em;background-image: none;background-color: rgb(0, 107, 182);background-image: -webkit-linear-gradient(top, rgb(0, 107, 182),rgb(0, 107, 182) 3%,rgb(0, 107, 182));color: rgb(253, 253, 253);',
                            width: '245px',
                            height: 42,
                            text: '删除'
                        }]
                    }]
                }]
            }]
        }]
    }
});