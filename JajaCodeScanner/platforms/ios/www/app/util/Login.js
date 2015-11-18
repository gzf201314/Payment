Ext.define("util.Login", {
    alternateClassName: "login",
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
        var me = this;
        var loginview = new JajaApp.view.Login();
        Ext.Viewport.add(loginview);
        loginview.show();
        Ext.getCmp('CloseLogin').on('tap', function () {
            localStorage.removeItem('islogin');
            //localStorage.setItem('islogin', false);
            loginview.hide();
        });

        Ext.getCmp('SaveLoginState').on('tap', function () {
            // 判断登录信息以及获取登录信息
            localStorage.setItem('islogin', true);
            var user = {
                // 用户名
                txtUserName: Ext.getCmp('txtUserID').getValue(),
                // 密码
                txtPassword: Ext.getCmp('txtPassword').getValue()
            };

            if ((user.txtUserName != "" && user.txtUserName != " ") && (user.txtPassword != "" && user.txtPassword != " ")) {
                localStorage.setItem('logMsg', JSON.stringify(user));
                // 使用键值对来存储:用户名和密码--------------------logMsg
                Ext.Msg.alert(user.txtUserName + ":" + user.txtPassword);
                Ext.getCmp('SysUserButton').setIconCls(me.tableCls);
                // 设置登录后的样式
                loginview.hide();
            }
        });

        loginview.on('hide', function () {
            loginview.destroy();
        });
    }
});