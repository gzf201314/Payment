Ext.define("util.JPush", {
    alternateClassName: "jpush",
    singleton: true,
    config: {
        description: '加加餐饮软件'
    },
    constructor: function (config) {
        this.initConfig(config);
    },
    // 返回相应的操作
    setItem: function (key, value) {
        var result;
        if (value != null) {
            result = "{ 'Option': '" + key + "', 'Config': '" + value + "'  }";
        }
        else {
            result = "{ 'Option': '" + key + "', 'Config': ' '}";
        }
        return result;
    },
    /**
    * 将信息发给所有设备
    * @param data  
    * {
            key: 'PushAlias',
            value: {
                Alias: '1000',
                Message: '注册码生成成功，请注意查收!'
            }
       }
    */
    send: function (data, calback, errorCallBack) {
        var valueType = typeof data.value,
            value;
        if (valueType == 'string') {
            value = data.value;
        }

        if (valueType == 'object') {
            value = JSON.stringify(data.value);
        }

        console.log(this.setItem(data.key, value));
        $.ajax({
            type: "POST",
            url: 'http://' + app.ip + '/Api/SendHandler.ashx',
            //async: false,
            data: this.setItem(data.key, value),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
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
    }
});