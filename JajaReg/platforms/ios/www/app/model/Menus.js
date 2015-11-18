Ext.define('JajaApp.model.Menus', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        idProperty: 'menu',
        fields: [
        { name: 'RegMenuID', type: 'string' },
        { name: 'Message', type: 'string' },
        { name: 'Remark', type: 'string' },
        { name: 'badgeText', type: 'string' },
        { name: 'Count', type: 'string' }
    ]
    }
});