Ext.define('JajaApp.view.UserList', {
    extend: 'Ext.List',
    xtype: 'userlist',
    id: 'userlist',
    requires: ['Ext.XTemplate', 'JajaApp.store.UserStore'],
    config: {
        fullscreen: true,
        style: 'height:100%; width:100%',
        store: {
            xclass: 'JajaApp.store.UserStore'
        },
        itemTpl: '{name},{phone}'
    }
});