Ext.define('JajaApp.controller.RegisterController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            registerview: {
                selector: 'registerview',
                xtype: 'registerview',
                autoCreate: true
            },
            RegisterNext: '#RegisterNext',
            RegisterBack: '#RegisterBack'
        },
        control: {
            registerview: {
                activate: 'onInit',
                initialize: 'initialize'
            },
            RegisterNext: {
                tap: 'initConfirmView'
            },
            RegisterBack: {
                tap: 'back'
            }
        },
        routes: {
            'register': 'showRegisterView'
        }
    },
    isDetal: false,
    // 初始化
    onInit: function (newActiveItem, sender, oldActiveItem, eOpts) {
        console.log(oldActiveItem.getId());
        this.isDetal = false;
        var txtCompanyName = this.getRegisterview().query('fieldset')[0].getItems().getAt(7),
            txtSys = this.getRegisterview().query('fieldset')[0].getItems().getAt(5).getItems().getAt(0),
            txtVersion = Ext.getCmp('txtVersion');
        if (Record.isAdmin()) {
            txtCompanyName.show();
            txtVersion.show();
            console.log(txtSys);
            txtSys.setValue("餐饮系统");
            Common.setValue('txtCompanyName', '');
            Common.setValue('txtVersion', '');
            Common.setValue('txtRegUserID', '');
        }
        else {
            // 隐藏公司名称的选择
            txtCompanyName.hide();

            // 隐藏版本的选择
            txtVersion.hide();

            txtSys.setValue('');
        }

        if (oldActiveItem.getId() == 'confirmview') {
            Progress.animate(this.getRegisterview(), 'left');
        }
        else if (oldActiveItem.getId() == 'detailview') {
            this.isDetal = true;
        }
        else {

            Common.setValue('txtHotelName', ''),
            Common.setValue('txtHotelAddress', ''),
            Common.setValue('txtSitesNumber', ''),
            Common.setValue('txtMealOrderNumber', ''),
            Common.setValue('ModuleButton', '');
            Common.setValue('txtHotelRemark', '');
        }


    },
    // 给文本框绑定事件
    initialize: function () {
        this.getRegisterview().on({
            delegate: 'textfield',
            focus: function (sender) {
                var placeHolder = sender.getPlaceHolder();
                var key = Common.getValue('SysTypeButton');
                if (placeHolder == "请选择模块") {

                    if (key.length == 0) {
                        Common.alert("提示", "请选择系统");
                        return;
                    }
                    else {
                        Choose.showModule(['SysTypeButton', 'ModuleButton']);
                    }
                }
                else if (placeHolder == "请选择系统") {
                    Choose.showSystem(['SysTypeButton', 'ModuleButton']);
                }
                else if (placeHolder == "请选择公司名称") {
                    Choose.showAuthorizationView('txtCompanyName', 'txtRegUserID');
                }
                else if (placeHolder == "请选择版本") {
                    Choose.showVersionView();
                }
            }
        });
    },
    // 初始化确认信息视图
    initConfirmView: function () {
        // 1.检测通过之后

        /*
        txtHotelName 名称不能为空
        txtHotelAddress 地址不能为空
        txtSitesNumber 站点数不能为空、站点数不能为0、站点数不能超过20
        txtMealOrderNumber 如选择的“无线点菜”则点菜宝数不能为空
        SysTypeButton 系统类型
        ModuleButton  模块类型
        */

        var hotelName = Common.getValue('txtHotelName'),
            hotelAddress = Common.getValue('txtHotelAddress'),
            sitesNumber = Common.getValue('txtSitesNumber'),
            mealOrderNumber = Common.getValue('txtMealOrderNumber'),
            sysType = Common.getValue('SysTypeButton'),
            modulesType = Common.getValue('ModuleButton'),
            hotelRemark = Common.getValue('txtHotelRemark'),
            hotelOriRegID = Common.getValue('txtOriRegID'),
            sysVersion = Common.getValue('txtVersion');

        if (hotelName == "" || hotelName == null) {
            Common.alert("提示", "酒店名称不能为空");
            return;
        }

        if (hotelAddress == "" || hotelAddress == null) {
            Common.alert("提示", "酒店地址不能为空");
            return;
        }

        if (sitesNumber == null) {
            console.log(sitesNumber);
            Common.alert("提示", "站点数不能为空");
            return;
        }

        if (sitesNumber == "0") {
            notification.alert("提示", "站点数不能为0");
            return;
        }

        if (sitesNumber > "20") {
            Common.alert("提示", "站点数不能超过20");
            return;
        }

        if (sysType.length == 0) {
            Common.alert("提示", "请选择系统");
            return;
        }

        if (modulesType.indexOf("无线点菜") >= 0) {
            if (mealOrderNumber == "" || mealOrderNumber == null) {
                Common.alert("提示", "点菜宝数不能为空");
                return;
            }
        }

        if (modulesType.length == 0) {
            Common.alert("提示", "请选择模块");
            return;
        }

        // 2.跳转到确认信息页面进行信息核对
        var me = this;
        Common.redirectTo(me, 'register', 'confirm'); // 数据加载完成进行跳转。

        var txtConfirmCompanyName = Ext.getCmp('txtConfirmCompanyName'),
            txtConfirmVersion = Ext.getCmp('txtConfirmVersion');
        if (Record.isAdmin()) {
            txtConfirmCompanyName.show();
            txtConfirmVersion.show();
            Common.setValue('txtConfirmCompanyName', Common.getValue('txtCompanyName'));
            Common.setValue('txtConfirmRegUserID', Common.getValue('txtRegUserID'));
        }
        else {
            txtConfirmCompanyName.hide();
            txtConfirmVersion.hide();
        }
        // 3.给核对页面进行赋值
        Common.setValue('txtConfirmHotelName', hotelName);
        Common.setValue('txtConfirmHotelAddress', hotelAddress);
        Common.setValue('txtConfirmSitesNumber', sitesNumber);
        Common.setValue('txtConfirmMealOrderNumber', mealOrderNumber);
        Common.setValue('txtConfirmSysType', sysType);
        Common.setValue('txtConfirmModules', modulesType);
        Common.setValue('txtConfirmRemark', hotelRemark);
        Common.setValue('txtConfirmOriRegID', hotelOriRegID);
        Common.setValue('txtConfirmVersion', sysVersion);
    },
    // 返回
    back: function () {
        var me = this;
        if (me.isDetal) {
            if (Record.isAdmin()) {
                Common.redirectTo(me, 'register', 'proxydetail');
            } else {
                Common.redirectTo(me, 'register', 'detail'); // 数据加载完成进行跳转。
            }
        }
        else {
            Common.redirectTo(me, 'register', 'main'); // 数据加载完成进行跳转。
        }
    },
    showRegisterView: function () {
        console.log(this);
        Progress.animate(this.getRegisterview(), 'right');
        Ext.Viewport.setActiveItem(this.getRegisterview());
    }
});