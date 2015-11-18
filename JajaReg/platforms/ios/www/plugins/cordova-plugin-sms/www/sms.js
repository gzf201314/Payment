cordova.define("cordova-plugin-sms.sms", function(require, exports, module) { 

        var argscheck = require('cordova/argscheck'),
        exec = require('cordova/exec');

        var safesmsExport = {};

        // 发送到剪切板
        safesmsExport.sendCopy = function(text, successCallback, failureCallback) {
            cordova.exec( successCallback, failureCallback, 'SMS', 'stringWithCopy', [text] );
        };

        // 发送短信
        safesmsExport.sendSMS = function(phone,text, successCallback, failureCallback) {
            phone = safesmsExport.convertPhoneToArray(phone);
            cordova.exec( successCallback, failureCallback, 'SMS', 'sendSMS', [ phone,text ] );
            
        };

        // 发送微信
        safesmsExport.sendWeChat = function(text, successCallback, failureCallback) {
            cordova.exec( successCallback, failureCallback, 'SMS', 'sendWeChat', [text] );
        };

        // 发送QQ
        safesmsExport.sendQQ = function(text, successCallback, failureCallback){
            cordova.exec( successCallback, failureCallback, 'SMS', 'sendQQ', [text] );
        };

        // 数组转
        safesmsExport.convertPhoneToArray = function(phone){
            if(typeof phone === 'string' && phone.indexOf(',') !== -1) {
                phone = phone.split(',');
            }
            if(Object.prototype.toString.call(phone) !== '[object Array]') {
                phone = [phone];
            }
            return phone;
        };

        module.exports = safesmsExport;


});
