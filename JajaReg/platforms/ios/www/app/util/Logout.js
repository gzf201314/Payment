Ext.define("util.Logout", {
    alternateClassName: "logout",
    singleton: true,
    userCls: "sysUser p-ico p-userColor",
    tableCls: "sysUser p-ico p-tableColor",
    config: {
        description: '加加餐饮软件'
    },
    constructor: function (config) {
        this.initConfig(config);
    },
    show: function () {
        notification.confirm("确定要注销当前用户吗？", "注销", "取消", function () {
            localStorage.setItem('islogin', false);
            Ext.getCmp('SysUserButton').setIconCls('sysUser p-ico p-userColor');
        });
    }
});