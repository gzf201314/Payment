Ext.define('JajaApp.model.Menus', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
        { name: 'RegMenuID', type: 'string' },
        { name: 'Message', type: 'string' },
        { name: 'Remark', type: 'string' }
    ]
    }
});