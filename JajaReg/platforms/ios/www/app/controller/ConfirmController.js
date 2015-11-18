Ext.define('JajaApp.controller.ConfirmController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            confirmview: {
                selector: 'confirmview',
                xtype: 'confirmview',
                autoCreate: true
            },
            ConfirmRegister: '#ConfirmRegister',
            ConfirmBack: '#ConfirmBack'
        },
        control: {
            ConfirmRegister: {
                tap: 'initRegCode'// 初始化注册码
            },
            ConfirmBack: {
                tap: 'back'
            }
        },
        routes: {
            'confirm': 'showConfirmView'
        }
    },
    /**
    * 返回确认之后的信息JSON对象
    */
    getConfirmData: function () {
        // 注:系统编号，模块编号
        var modules = JSON.parse(localStorage.getItem("modules"));
        function clear(str) {
            str = str.replace(/,/g, ""); //去掉字符串中出现的所有逗号  
            return str;
        }
        var UserID = JSON.parse(localStorage.getItem('remember')).UserName;
        var SystemID = localStorage.getItem('remember')
        var idStr = clear(modules.ModuleID);
        console.log("系统编号:", modules.RegSystemID);
        console.log("模块编号:", idStr);

        var data = {
            UserID: UserID,
            HotelName: Common.getValue('txtConfirmHotelName'),
            HotelAddress: Common.getValue('txtConfirmHotelAddress'),
            SitesNumber: Common.getValue('txtConfirmSitesNumber'),
            MealOrderNumber: Common.getValue('txtConfirmMealOrderNumber'),
            RegSystemID: modules.RegSystemID,
            RegSystem: Common.getValue('txtConfirmSysType'),
            RegModuleID: modules.ModuleID,
            RegModuleName: Common.getValue('txtConfirmModules'),
            Remark: Common.getValue('txtConfirmRemark'),
            // RegUserID:Common.getValue('txtConfirmRegUserID'),
            RegUserID: UserID,
            OriRegID: Common.getValue('txtConfirmOriRegID')
        };
        return data;
    },
    /**
    * 返回临时注册信息的json对象
    */
    getTrialModel: function () {
        var data = this.getConfirmData();

        /*
        需要进行临时注册的信息
        */
        var model = {};
        model.RegID = data.UserID + "_" + Time.getTimeString();    // 注册单号										
        model.RegName = data.HotelName; 					       // 注册店名										
        model.RegAddress = data.HotelAddress; 			           // 注册地址										
        model.RegNum = data.SitesNumber; 				           // 注册用户数	
        model.RegMealOrder = data.MealOrderNumber;                 // 注册点菜宝数
        model.TryDate = Time.getDelayTime(3); 				       // 试用到期日------一般试用期三个月										
        model.RegModuleID = data.RegModuleID; 		               // 注册模块ID										
        model.RegModuleName = data.RegModuleName; 		           // 注册模块名
        model.RegSystemID = data.RegSystemID;                      // 系统编号
        model.RegSystem = data.RegSystem; 	                       // 注册系统类型										
        model.RegCode = ""					                       // 注册码										
        model.OriRegID = data.OriRegID; 		                   // 原注册单号------代理商在重注册的情况下会记录原有的单号
        model.RegTime = Time.GetDateShortTime(); 		           // 注册时间										
        model.RegUserID = data.RegUserID;                          // 当前登录用户的用户ID
        model.Remark = data.Remark;                                // 备注

        return model;
    },
    /**
    * 返回正式注册信息json对象
    */
    getOffModel: function () {
        var data = this.getConfirmData(); // 获取确认注册信息
        var model = {};
        model.RegID = data.UserID + "_" + Time.getTimeString();    // 注册单号										
        model.RegName = data.HotelName; 					  // 注册店名										
        model.RegAddress = data.HotelAddress; 			      // 注册地址										
        model.RegNum = data.SitesNumber; 				      // 注册用户数	
        model.RegMealOrder = data.MealOrderNumber;            // 注册点菜宝数
        model.TryDate = ''; 				                  // 试用到期日------一般试用期三个月										
        model.RegModuleID = data.RegModuleID; 		          // 注册模块ID										
        model.RegModuleName = data.RegModuleName; 		      // 注册模块名
        model.RegSystem = data.RegSystem; 	                  // 注册系统类型										
        model.RegCode = ""					                  // 注册码										
        model.OriRegID = ''; 		                          // 原注册单号------代理商在重注册的情况下会记录原有的单号
        model.RegTime = Time.GetDateShortTime(); 	          // 注册时间										
        model.RegUserID = data.RegUserID;                     // 注册用户
        model.Remark = data.Remark;                           // 备注
        model.AskTime = ''; 		                          // 申请时间
        model.OffTime = Time.GetDateShortTime(); 		      // 正式注册时间										
        model.IsOffReg = true;                                // 是否为正式
        model.OffRegUser = data.RegUserID;                    // 正式注册人
        return model;
    },
    // 初始化注册码
    initRegCode: function () {
        var me = this, data = me.getConfirmData(); // 返回确认之后的信息JSON对象

        // 是否为正式注册
        var IsOffReg;
        if (Ext.getCmp('txtConfirmVersion').getHidden()) {
            IsOffReg = false;
        }
        else {
            data.Version = Common.getValue('txtConfirmVersion');
            IsOffReg = (data.Version == "正式版") ? true : false;
        }

        /**
        * 需要进行注册的信息
        */
        var insertRegMsg, className;
        if (IsOffReg) {
            className = "OffReg"; // 正式注册
            insertRegMsg = JSON.stringify(me.getOffModel()); // 需要上传服务器的数据---然后返回正式注册码
            console.log(me.getOffModel());
        }
        else {
            className = "TrialAdd"; // 临时注册
            insertRegMsg = JSON.stringify(me.getTrialModel()); // 需要上传服务器的数据---然后返回临时注册码
            console.log(me.getTrialModel());
        }

        Progress.start("正在生成,请稍后...");
        setTimeout(function () {
            Record.getList(className, insertRegMsg, function (msg) {
                console.log(msg);

                var obj = JSON.parse(msg);
                if (obj.Message == "注册成功") {
                    Progress.close();
                    var code = data.HotelName + "\\" + data.HotelAddress + "\\" + obj.Code + "\\" + data.SitesNumber + "用户试用增强版";
                    /*
                    1.将已经确认的软件注册信息提交到服务器，并将生成的注册码返回。
                    2.将生成的注册码赋值到RegCode视图中
                    */
                    Common.redirectTo(me, 'confirm', 'regcode'); // 数据加载完成进行跳转。

                    // 设置注册码
                    Common.setValue('txtRegCode', code);
                    //Common.setValue('txtRegCode', "永和豆浆\\新乡市银马口家乐福楼下\\2用户试用增强版");
                }

            }, function (msg) {
                console.log(msg);
                Progress.close();
            });
        }, 50);
    },
    /**
    * 根据系统名称返回系统编号
    */
    getSysID: function (data) {
        var versions = JSON.parse(localStorage.getItem("SystemVersion"));
        for (var i = 0; i < versions.length; i++) {
            if (versions[i].SysName == data) {
                return versions[i].SysID;
            }
        }
    },
    /**
    * 根据模块名称返回模块编号
    */
    getModulesID: function (data) {
        var versions = JSON.parse(localStorage.getItem("SystemVersion"));
        for (var i = 0; i < versions.length; i++) {
            if (versions[i].SysName == data) {
                return versions[i].SysID;
            }
        }
    },
    // 返回
    back: function () {
        var me = this;
        Common.redirectTo(me, 'confirm', 'register');
    },
    showConfirmView: function () {
        Progress.animate(this.getConfirmview(), 'right');
        Ext.Viewport.setActiveItem(this.getConfirmview());
    }
});