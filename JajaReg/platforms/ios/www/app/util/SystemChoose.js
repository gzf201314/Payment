Ext.define("util.SystemChoose", {
    alternateClassName: "Choose",
    singleton: true,
    config: {
        description: '加加餐饮软件'
    },
    constructor: function (config) {
        this.initConfig(config);
    },
    /**
    * 显示授权用户视图
    */
    showAuthorizationView: function (args, reguserid) {
        var dataSet = [{
            Address: "青岛市城阳区批发市场北侧",
            CompanyName: "贵族洗浴休闲广场",
            UserName: "潘经理",
            UserID:"1000",
            CNZJF: 'PJL'
        }, {
            Address: "青岛市市北区辽宁路228号",
            CompanyName: "加加软件服务有限公司",
            UserName: "刘经理",
            UserID: "1001",
            CNZJF: 'LJL'
        }, {
            Address: "河南省洛阳市 西工区行署路",
            CompanyName: "洛阳晋新软件公司",
            UserName: "李经理",
            UserID: "1002",
            CNZJF: 'LJL'
        }];
        var data = new JajaApp.view.AuthorizationUser(); // 授权用户

        Ext.Viewport.add(data);
        data.show();
        var sender = data.getItems().getAt(1);
        console.log(sender);
        var listview = Record.getUserListConfiguration(dataSet); // 获取list列表对象
        listview.on('itemtap', function (sender, index, target, record, e, eOpts) {
            // 跳转到注册资料明细
            console.log(target.getRecord().data);
            //target.getRecord().data.CompanyName
            Common.setValue(args, target.getRecord().data.CompanyName);
            Common.setValue(reguserid, target.getRecord().data.UserID);
            data.hide();
        });
        sender.setItems(listview);


        data.on({
            delegate: 'button',
            tap: function (sender) {
                console.log(sender.getText());
                if (sender.getText() == "返回") {
                    data.hide();
                }
            }
        });

        data.on('hide', function () {
            data.destroy();
        });
    },
    // 显示版本选择视图
    showVersionView: function () {
        var data = new JajaApp.view.Version(), // 版本类型
        txtVersion = Ext.getCmp('VersionButton').getValue(),
        dataSet = [{ "VersionID": "101", "VersionName": "试用版" }, { "VersionID": "102", "VersionName": "正式版"}],
        versions = [];
        for (var i = 0; i < dataSet.length; i++) {
            var temp = {
                name: 'color',
                id: dataSet[i].VersionID,
                label: dataSet[i].VersionName,
                value: dataSet[i].VersionName
            };
            versions.push(temp);
        }
        var versiontype = data.query('fieldset')[0];
        versiontype.setItems(versions);
        Ext.Viewport.add(data);
        data.show();
    },
    /**
    * 显示系统选择视图
    */
    showSystem: function (items) {
        Progress.start("正在加载,请稍后...");
        var data = new JajaApp.view.SystemType(), // 系统类型
            flag = false,
            txtSys = Common.getValue(items[0]),
            dataSet = JSON.parse(localStorage.getItem('SystemVersion')), // 系统版本类型
            systypeItems = [];

        if (txtSys.length > 0) {
            flag = true;
        }

        for (var i = 0; i < dataSet.length; i++) {
            var temp = {
                name: 'color',
                id: dataSet[i].SysID,
                label: dataSet[i].SysName,
                value: dataSet[i].SysName
            };
            console.log(parseInt(dataSet[i].SysID));
            if (flag && txtSys == dataSet[i].SysName) {
                temp.checked = true;
            }
            systypeItems.push(temp);
        }
        var systypes = data.query('fieldset')[0];
        console.log(systypes);
        systypes.setItems(systypeItems);
        Progress.close();

        Ext.Viewport.add(data);
        data.show();

        data.on({
            delegate: 'radiofield',
            check: function (radioview) {
                console.log(radioview.getValue());
                localStorage.setItem("SysID", radioview.getId());
                Ext.getCmp(items[0]).setValue(radioview.getValue());
                Ext.getCmp(items[1]).setValue("");
                data.hide();
            }
        });

        data.on('hide', function () {
            data.destroy();
        });
    },
    /**
    * 收费模块
    */
    chargeModules: function () {
        return ["iPad电子菜谱", "纯菜谱", "电子称", "广告副屏", "排队系统"];
    },
    /**
    * 显示模块选择界面
    */
    showModule: function (items) {
        var txtStr = Common.getValue(items[1]),
            txtSys = Common.getValue(items[0]),
            modifySys;

        console.log(txtStr.length);

        Progress.start("正在加载,请稍后...");
        var data = new JajaApp.view.Modules(); // 模块视图

        // SysModule
        var module_Array, flag = false;

        if (txtStr.length > 2 && txtStr.indexOf(',') < 0) { // string
            module_Array = txtStr;
            flag = true;
        }

        if (txtStr.indexOf(',') > 0) { // object
            module_Array = txtStr.split(',');
            flag = true;
        }

        var dataSet = JSON.parse(localStorage.getItem('SysModule')), // 系统版本类型
            modules_items = [];


        console.log(dataSet);

        for (var i = 0; i < dataSet.length; i++) {
            var temp = {};
            if (flag) {
                if (typeof (module_Array) == "string") {
                    if (module_Array == dataSet[i].ModuleName) {
                        temp.checked = true;
                    }
                }
                else {
                    for (var j = 0; j < module_Array.length; j++) {
                        if (module_Array[j] == dataSet[i].ModuleName) {
                            temp.checked = true;
                        }
                    }
                }
            }

            if (txtSys == "餐饮系统" &&
                (dataSet[i].ModuleName != "商品库存" &&
                dataSet[i].ModuleName != "客房门锁接口" &&
                dataSet[i].ModuleName != "客房户籍接口" &&
                dataSet[i].ModuleName != "客房电话计费")
                ) {
                temp.name = dataSet[i].GroupID;
                temp.id = dataSet[i].ModuleID;
                temp.label = dataSet[i].ModuleName;
                temp.value = dataSet[i].ModuleName;
                if (!Record.isAdmin()) {
                    temp.hidden = dataSet[i].IsCharge;
                }
                modules_items.push(temp);
            }

            if (txtSys == "客房系统" &&
                (dataSet[i].ModuleName != "厨房打印" &&
                dataSet[i].ModuleName != "无线点菜" &&
                dataSet[i].ModuleName != "预定系统" &&
                dataSet[i].ModuleName != "触摸屏系统" &&
                dataSet[i].ModuleName != "传菜系统" &&
                dataSet[i].ModuleName != "连锁汇总" &&
                dataSet[i].ModuleName != "客房挂账" &&
                dataSet[i].ModuleName != "触摸屏收银(快餐)" &&
                dataSet[i].ModuleName != "排队系统" &&
                dataSet[i].ModuleName != "iPad纯菜谱" &&
                dataSet[i].ModuleName != "电子菜谱")
            ) {
                temp.name = dataSet[i].GroupID;
                temp.id = dataSet[i].ModuleID;
                temp.label = dataSet[i].ModuleName;
                temp.value = dataSet[i].ModuleName;
                if (!Record.isAdmin()) {
                    temp.hidden = dataSet[i].IsCharge;
                }
                modules_items.push(temp);
            }

            if (txtSys == "餐饮客房一体化") {
                temp.name = dataSet[i].GroupID;
                temp.id = dataSet[i].ModuleID;
                temp.label = dataSet[i].ModuleName;
                temp.value = dataSet[i].ModuleName;
                if (!Record.isAdmin()) {
                    temp.hidden = dataSet[i].IsCharge;
                }
                modules_items.push(temp);
            }

        }

        var modules = data.query('fieldset')[0];
        console.log(modules.getItems().length);
        modules.setItems(modules_items);
        Progress.close();

        Ext.Viewport.add(data);
        data.show();

        var storages = []; // 用来保存系统模块的数据
        data.on({
            delegate: 'checkboxfield',
            check: function (sender) {
                var xtype = sender.getXTypes();
                if (xtype.indexOf('radiofield') < 0) {
                    var id = sender.getId() + ":" + sender.getLabel();
                    storages.push(sender.getValue());
                }
            },
            uncheck: function (sender) {
                var xtype = sender.getXTypes();
                if (xtype.indexOf('radiofield') < 0) {
                    var temps = data.query('fieldset')[0].getItems();
                    for (var i = 0; i < temps.length; i++) {
                        if (temps.getAt(i).getXTypes().indexOf('checkboxfield') > 0) {
                            if (temps.getAt(i).isChecked()) {
                                // console.log(temps.getAt(i));
                            }
                        }
                    }
                }
            }
        });
    }
});