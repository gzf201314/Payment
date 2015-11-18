Ext.define("util.Request", {
    alternateClassName: "Request",
    singleton: true,
    config: {
        description: '加加餐饮软件'
    },
    constructor: function (config) {
        this.initConfig(config);
    },
    get: function (apiName, data, calback) {
        var ip = 'jiajiasoft.w58.ftp123.com';
        $.ajax({
            type: "post",
            url: 'http://' + ip + '/Ashx/' + apiName + '.ashx',
            async: false,
            data: JSON.stringify(data),
            success: function (data, textStatus, jqXHR) {
                calback(data);
            }
        });
    },
    // 
    operation: function (key, value) {
        var result;
        if (value != null) {
            result = "{ 'Operation': '" + key + "', 'StorageMesage': '" + value + " '}";
        }
        else {
            result = "{ 'Operation': '" + key + "', 'StorageMesage': ' '}";
        }
        return result;
    }
});