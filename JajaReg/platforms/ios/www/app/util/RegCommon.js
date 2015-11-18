// 历史记录中的图片状态
var State = {
    trial: 'none',
    apply: 'block'
};

Ext.define("util.RegCommon", {
    alternateClassName: "Common",
    singleton: true,
    config: {
        description: '加加餐饮软件'
    },
    constructor: function (config) {
        this.initConfig(config);
    },
    // 返回
    back: function (sender) {
        var register_add = sender;
        register_add.hide();
        register_add.on('hide', function () {
            register_add.destroy();
        });
    },
    isDevice: function (sender) {
        if (app.isDevice) {
            sender.show();
        }
        else {
            sender.hide();
        }
    },
    // 注册码转发
    shareCode: function () {
        /**
        * 转发
        */
        var data = new JajaApp.view.ShareCode();
        Ext.Viewport.add(data);
        data.show();
        data._modal.on('tap', function () {
            data.hide();
        });

        data.on('hide', function () {
            data.destroy();
        });

        data.on({
            delegate: 'image',
            tap: function (sender) {
                // 此处需要调用插件来实现分享功能

                if (sender.getId() == "qq") {  // 发送消息到QQ好友
                    sms.sendQQ("永和豆浆\\新乡市银马口家乐福楼下\\2用户试用增强版", function (data) { }, function () { });
                }

                if (sender.getId() == "wechat") {  // 发送消息到微信好友
                    sms.sendWeChat("永和豆浆\\新乡市银马口家乐福楼下\\2用户试用增强版", function (data) { }, function () { });
                }

                if (sender.getId() == "sms") {  // 发送消息给电话薄联系人
                    sms.sendSMS("", "永和豆浆\\新乡市银马口家乐福楼下\\2用户试用增强版", function (data) { }, function () { });
                }

                setTimeout(function () {
                    data.hide();
                }, 500);
            }
        });
    },
    /**
    *  根据id编号获取对应的值
    */
    getValue: function (id) {
        return Ext.getCmp(id).getValue();
    },
    getText: function (id) {
        return Ext.getCmp(id).getText();
    },
    setValue: function (id, value) {
        return Ext.getCmp(id).setValue(value);
    },
    setText: function (id, value) {
        return Ext.getCmp(id).setText(value);
    },
    // 设置跳转目标
    redirectTo: function (sender, redirectBegin, redirectEnd) {
        sender.getApplication().getHistory().add(Ext.create('Ext.app.Action', {
            url: redirectBegin
        }));
        sender.redirectTo(redirectEnd); // 数据加载完成进行跳转。
    },
    //  弹出消息
    alert: function (title, message) {
        if (app.isDevice && device.platform == "iOS") { // 使用原生接口
            navigator.notification.alert(message, function () { }, title, '确定');
        }
        else { // 自定义
            notification.alert(title, message);
        }
    },
    // 带确定和取消 按钮的提示框
    confirm: function (title, button1, button2, callback) {
        notification.confirm(title, button1, button2, callback);
    },
    device: function (callbackAndroid, callbackiOS) {
        //var platform = device.platform;
        var platform = "Android";
        if (platform == "Android") {
            callbackAndroid();
        }

        if (platform == "iOS") {
            callbackiOS();
        }
    },
    // 判断对象是否为数组
    isArray: function (o) {
        return Object.prototype.toString.call(o) === "[object Array]";
    },
    // 判断对象是否为字符串
    isString: function (o) {
        return Object.prototype.toString.call(o) === "[object String]";
    },
    // 判断对象是否为对象
    isObject: function (o) {
        return Object.prototype.toString.call(o) === "[object Object]";
    },
    isNumber: function (o) {
        return Object.prototype.toString.call(o) === "[object Number]";
    },
    // 返回数据加载的地址
    getUrl: function (className) {
        return "http://" + localStorage.getItem('ipAddress') + "/Ashx/" + className + ".ashx";
    },
    // 返回相应的操作
    setItem: function (key, value) {
        var result;
        if (value != null) {
            result = "{ 'Operation': '" + key + "', 'StorageMesage': '" + value + "'  }";
        }
        else {
            result = "{ 'Operation': '" + key + "', 'StorageMesage': ' '}";
        }
        return result;
    },
    /**
    * 搜索方法
    * listStore:数据商店
    * field:搜索框对象
    * searchFields:需要搜索的字段数组
    */
    onSearch: function (listStore, field, searchFields) {
        //var listStore = field.getParent().getParent().getStore();

        //get the store and the value of the field
        var value = field.getValue(),
            store = listStore; // this.getUserStore()

        //first clear any current filters on the store. If there is a new value, then suppress the refresh event
        store.clearFilter(!!value);

        //var searchFields = ['CompanyName', 'CNZJF', 'UserName', 'Address'];

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(','),
                regexps = [],
                i, regex;

            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;

                regex = searches[i].trim();
                regex = regex.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp(regex.trim(), 'i'));
            }

            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function (record) {
                var matched = [];
                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                    temp = '';
                    if (searchFields.length > 1) {
                        // 执行循环操作
                        for (var j = 0; j < searchFields.length; j++) {
                            temp += (searchFields.length - 1 != j) ? record.get(searchFields[j]) + ' ' : record.get(searchFields[j]);
                        }
                    }
                    else {
                        temp = record.get(searchFields[0]);
                    }
                    console.log(temp);
                    var didMatch = search.test(temp);

                    //if it matched the first or last name, push it into the matches array
                    matched.push(didMatch);
                }
                return (regexps.length && matched.indexOf(true) !== -1);
            });
        }
    },
    contains: function (str1, str2) {

    },

    // 获取返回的数据
    get: function (className, data, calback, errorCallBack) {
        var valueType = typeof data.value,
            value;
        if (valueType == 'string') {
            value = data.value;
        }

        if (valueType == 'object') {
            value = JSON.stringify(data.value);
        }

        var ip = 'jiajiasoft.w58.ftp123.com';

        //        $.ajax({
        //            type: "post",
        //            url: 'http://' + ip + '/Ashx/' + className + '.ashx',
        //            async: false,
        //            data: this.setItem(data.key, value),
        //            success: function (data, textStatus, jqXHR) {
        //                calback(data);
        //            }
        //        });
        console.log(this.setItem(data.key, value));
        $.ajax({
            type: "POST",
            url: 'http://' + ip + '/Ashx/' + className + '.ashx',
            async: false,
            data: this.setItem(data.key, value),
            dataType: 'text',
            error: function (message, textStatus, jqXHR) {
                console.log(message);
                console.log(textStatus);
                console.log(jqXHR);
                errorCallBack(message);
            },
            success: function (message, textStatus, jqXHR) {
                calback(message);
            }
        });
    },
    /**
    * 获取CheckBox 列表
    *   CheckBox.ashx
    */
    getCheckBoxList: function (className, groupType, callback) {
        var ip = 'jiajiasoft.w58.ftp123.com';
        $.ajax({
            type: "post",
            url: 'http://' + ip + '/Ashx/' + className + '.ashx',
            timeout: 30000,
            //url: "../Ashx/CheckBox.ashx",
            data: { syschk: groupType },
            success: function (data) {
                callback(data);
            }
        });
    },
    // 试用码注册
    TrialInsert: function (regname, regaddress, regnum, trydate, regmoduleid, regmodulename, regsystemid, regsystem, oriregid, reguserid) {
        var model = {};
        model.RegID = reguserid + "_" + Time.getTimeString(); 						    //注册单号										
        model.RegName = regname; 						//注册店名										
        model.RegAddress = regaddress; 			        //注册地址										
        model.RegNum = regnum; 				            //注册用户数	
        model.RegMealOrder = "";                        // 注册点菜宝数
        model.TryDate = trydate; 				        //试用到期日										
        model.RegModuleID = regmoduleid; 			    //注册模块ID										
        model.RegModuleName = regmodulename; 		    //注册模块名	
        // model.RegSystemID = regsystemid;
        model.RegSystem = regsystem; 	                //注册系统类型										
        model.RegCode = ""					            //注册码										
        model.OriRegID = oriregid; 		                //原注册单号										
        model.RegTime = Time.GetDateShortTime(); 		//注册时间										
        model.RegUserID = reguserid;                    // 当前登录用户的用户ID
        model.Remark = "";
        return JSON.stringify(model);
    },
    // 试用码查询
    TrialSearch: function (begintime, endtime, name, address, expirebegin, expireend, istrial, userid, reguserid) {//查询条件
        var RegSearch = {
            RegBeginTime: begintime,
            RegEndTime: endtime,
            HotelName: name,
            HotelAddress: address,
            RegExpireBegin: expirebegin,
            RegExpireEnd: expireend,
            IsTrial: istrial,
            UserID: userid,
            RegUserID: reguserid
        }
        return JSON.stringify(RegSearch);
    }
});