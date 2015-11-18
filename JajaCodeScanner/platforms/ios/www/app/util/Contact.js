Ext.define("util.Contact", {
    alternateClassName: "Contact",
    singleton: true,
    config: {
        description: '加加餐饮软件------联系人'
    },
    constructor: function (config) {
        this.initConfig(config);
    },
    find: function (callback) {
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        /*
        查找关键字  
        名字: "displayName"  ,
        电话号码:"phoneNumbers"   //ContactField[]类型 

        */
        var fields = ["displayName", "name", "phoneNumbers"];
        navigator.contacts.find(fields, function (contacts) {
            // 联系人与电话号码 全写在这儿
            var aResult = [];

            for (var i = 0; contacts[i]; i++) {
                console.log("Display Name = " + contacts[i].displayName);

                if (contacts[i].phoneNumbers && contacts[i].phoneNumbers.length) {

                    var contactPhoneList = [];

                    for (var j = 0; contacts[i].phoneNumbers[j]; j++) {
                        // alert(contacts[i].phoneNumbers[j].type+"	"+contacts[i].displayName+"---------" + contacts[i].phoneNumbers[j].value );

                        contactPhoneList.push({
                            'type': contacts[i].phoneNumbers[j].type,
                            'value': contacts[i].phoneNumbers[j].value
                        });
                    };

                    aResult.push({
                        name: contacts[i].displayName,
                        phone: contactPhoneList
                    });

                };
            }
            callback(aResult);
            //            //迭代获取 联系人和号码
            //            for (var i = 0; aResult[i]; i++) {
            //                for (var j = 0; aResult[i].phone[j]; j++) {
            //                    alert(aResult[i].name + "--" + aResult[i].phone[j].type + "--" + aResult[i].phone[j].value);
            //                };
            //            };
        }, function () {
            alert("onError");
        }, options); // 查找联系人
    }
});