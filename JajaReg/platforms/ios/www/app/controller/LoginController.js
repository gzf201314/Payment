Ext.define('JajaApp.controller.LoginController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            login: {
                selector: 'login',
                xtype: 'login',
                autoCreate: true
            },
            LoginButton: '#login'
        },
        control: {
            login: {
                activate: 'onActivateView',
                deactivate: 'onDeActivagte'
            },
            LoginButton: {
                tap: 'loginClick'
            }
        },
        routes: {
            'login': 'showSearchView'
        }
    },
    // 每次激活当前视图，都会进行数据加载
    onActivateView: function () {
        var remember = localStorage.getItem('remember');
        if (remember) {
            var msg = JSON.parse(remember);
            var txtName = Ext.getCmp('txtUserID').setValue(msg.UserName);
            var txtPassword = Ext.getCmp('txtPassword').setValue(msg.PassWord);
            Ext.getCmp('RememberPassword').setValue(msg.IsRemember ? 1 : 0)
        }
    },
    onDeActivagte: function () {
        console.log(this.getApplication().getController('Main'));
        console.log(this.getApplication().getController('Main').getMainview().getItems().getAt(1).getItems());
    },
    // 登录事件
    loginClick: function () {
        var me = this;
        var txtName = Ext.getCmp('txtUserID').getValue();
        var txtPassword = Ext.getCmp('txtPassword').getValue();

        if (txtName == null || txtName == "") {
            Common.alert("提示", "用户名不能为空");
            return;
        } else if (txtPassword == null || txtPassword == "") {
            Common.alert("提示", "密码不能为空");
            return;
        }

        var RememberPassword = Ext.getCmp('RememberPassword').getValue();
        console.log(RememberPassword);
        var isFlag = false;
        if (RememberPassword == 1) {
            isFlag = true;
        }

        var data = { 'Operation': 'UserLogin', 'StorageMesage': '{"UserName":"' + txtName + '","PassWord":"' + txtPassword + '","IsRemember":' + isFlag + '} ' };
        //var data = Request.operation('UserLogin', JSON.stringify({ "UserName": "admin", "PassWord": "123", "IsRemember": false }));
        //var data = Request.operation('AccountList', null);

        Progress.start("正在登录,请稍后...");
        setTimeout(function () {
            Common.get('HandlerRegister', {
                key: 'UserLogin',
                value: {
                    "UserName": txtName,
                    "PassWord": txtPassword,
                    "IsRemember": isFlag
                }
            }, function (data) {
                var msg = JSON.parse(data);
                console.log(msg);
                if (msg.IsSuccess) { // 登录成功时:更新数据

                    localStorage.setItem('remember', data);

                    msg.version = "v0.0.3"; // 获取到的版本号
                    var historyVersion = localStorage.getItem('sysversion');
                    if (historyVersion) {
                        // 新版本与历史版本进行对比，然后进行数据更新
                        if (me.compareVersion(msg.version, historyVersion)) {
                            console.log("不更新版本号和数据");
                            Progress.close();
                        }
                        else {
                            console.log("更新版本号和数据");
                            localStorage.setItem('sysversion', msg.version);
                            // 加载模块数据
                            me.updateStorage(function () {
                                Progress.close();
                            });
                        }
                    }
                    else {
                        console.log("加载版本号和数据");
                        // 版本号的记录:sysversion
                        localStorage.setItem('sysversion', msg.version);
                        // 加载模块数据
                        me.updateStorage(function () {
                            Progress.close();
                        });
                    }

                    // 判断是否是移动设备,只有移动设备的时候才可以调用原生接口
                    if (app.isDevice) {
                        window.plugins.jPushPlugin.setAlias(txtName);
                    }

                    // 判断是否为管理员登录
                    if (Record.isRegAdmin(txtName)) {
                        localStorage.setItem('isAdmin', true);
                    }
                    else {
                        localStorage.setItem('isAdmin', false);
                    }
                    Progress.close();
                    // 下载数据
                    Common.redirectTo(me, 'login', 'main');
                }
                else {
                    Progress.close();
                    localStorage.removeItem('remember');
                    Common.alert("提示", "用户名密码错误!");
                }
            }, function (message) {
                console.log(message);
                Progress.close();
                Common.alert("提示", "网络异常,请检查网络!");
            });
        }, 50);

    },
    // 版本号比较
    compareVersion: function (version1, version2) {
        var v1 = version1.substring(1, version1.length).split('.'),
            v2 = version2.substring(1, version2.length).split('.'),
            c1 = v1[0] + v1[1] + v1[2],
            c2 = v2[0] + v2[1] + v2[2];
        if (parseInt(c1) == parseInt(c2))
            return true;
        else
            return false;
    },
    // 更新数据
    updateStorage: function (callback) {
        Common.getCheckBoxList('CheckBox', 'SysModule', function (items) { // 系统版本类型
            localStorage.setItem('SysModule', items);
            Common.getCheckBoxList('CheckBox', 'SystemVersion', function (items) { // 系统版本类型
                var dataSet = JSON.parse(items),
                    systypeItems = [];
                dataSet.push({
                    SysID: '03',
                    SysName: '餐饮客房一体化'
                });
                localStorage.setItem('SystemVersion', JSON.stringify(dataSet));
                callback;
            });

        });
    },
    showSearchView: function () {
        //Progress.animate(this.getLogin(), 'right');
        Ext.Viewport.setActiveItem(this.getLogin());
    }
});