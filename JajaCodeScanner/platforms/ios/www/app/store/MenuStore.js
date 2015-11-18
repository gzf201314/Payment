Ext.define('JajaApp.store.MenuStore', {//容器导航列表
    extend: 'Ext.data.Store',

    requires: [
        'JajaApp.model.Menus',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    config: {
        model: 'JajaApp.model.Menus',
        storeId: 'MenuStore',
        // 代理
        proxy: {
            type: 'ajax',
            url: Record.url(),
            reader: {
                type: 'json'
            }
        },
        autoLoad: true
    }
});