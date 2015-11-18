Ext.define('JajaApp.view.Official', {
    extend: 'Ext.Container',
    xtype: 'officialview',

    requires: ['Ext.XTemplate', 'Ext.dataview.List'],

    config: {
        id: 'officialview',
        fullscreen: true,
        layout: 'fit', //布局
        autoDestroy: true,
        style: 'background:rgb(236, 237, 237)',
        items: [{
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            docked: 'top',
            title: '正式注册记录',
            style: {
                'background': '#0078d7',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                id: 'OfficialBack',
                ui: 'back',
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
                iconCls: 'search p-ico p-roseRed',
                style: {
                    'background': '#0078d7',
                    'margin-left': '-10px',
                    'color': '#fff'
                },
                handler: function () {
                    //Record.searchView();
                    var searchBar = this.getParent().getParent().getItems().getAt(1).getItems().getAt(0).getItems().getAt(0);
                    if (searchBar.isHidden())
                        searchBar.show();
                    else
                        searchBar.hide();
                }
            }]
        }, {
            xtype: 'container',
            layout: 'fit', //布局
            width: '100%',
            height: '100'
        }]
    }
});