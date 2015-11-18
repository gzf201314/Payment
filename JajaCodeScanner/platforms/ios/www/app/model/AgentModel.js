Ext.define('JajaApp.model.AgentModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: ['UserID', 'UserName', 'LoginPsw', 'CNZJF', 'CompanyName', 'Address', 'TelNo', 'MobileNo', 'LinkQQ', 'LinkEl', 'AuthModule', 'IsAdmin', 'LimitDate', 'IsStop', 'LastLoginDate']
    }
});