

   var argscheck = require('cordova/argscheck'),
   exec = require('cordova/exec');
   
   var safesmsExport = {};

   // 复制文本内容
   safesmsExport.setText = function(text, successCallback, failureCallback) {
   
   cordova.exec( successCallback, failureCallback, 'Copy', 'stringWithCopy', [ text ] );
   
   };
   
   module.exports = safesmsExport;
