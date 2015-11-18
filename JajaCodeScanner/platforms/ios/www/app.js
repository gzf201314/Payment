// PhoneGap加载完毕后执行,这样就可以在项目中使用PhoneGap调用手机硬件
var app = {
    isDevice: true, // 是否使用移动设备
    init: function () {  // 初始化
        if (this.isDevice) {
            initDeviceReady();
            showDevice();
        }
        else {
            onDeviceReady();
        }
    }
};



// 等待加载--PhoneGap
function initDeviceReady() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

// 输出移动设备的详细信息
function showDevice() {
    console.log("平台:" + device.platform);
    console.log("设备型号:" + device.model);
    console.log("获取手机版本号:" + device.version);
    console.log("设备唯一标识:" + device.uuid);
    console.log("Cordova版本:" + device.cordova);
}

// 移动设备初始化
function onDeviceReady() {
    // 注册返回按钮事件监听器
    document.addEventListener("backbutton", onBackKeyDown, false);
    //启用自动加载
    Ext.Loader.setConfig({
        enabled: true,
        disableCaching: false,
        paths: {
            'util': 'app/util'
        }
    });
    Ext.Ajax.setDisableCaching(false);

    Ext.application({
        name: 'JajaApp',
        appFolder: 'app',
        // 引用
        requires: [
        /* sencha 自带类 */
        'Ext.device.Device',
        'Ext.Toast',
        'Ext.dataview.List',
        'Ext.field.Search',
        'Ext.device.Connection',
        'Ext.data.Store',
        'Ext.List',

        /**
        工具类
        */
        "util.DB",
        'util.PinYin',
        'util.Login',
        'util.Logout',
        'util.Progress',
        'util.Notification',
        'util.Segmente',
        'util.ToolBar',
        'util.Request',
        'util.RegCommon',
        'util.Record',
        'util.Time',
        'util.Contact',
        'util.SystemChoose',
        'util.BillRecord',
        'util.Menu'
        ],
        // 视图
        views: ['Main', 'ResultView', 'UserView', 'RecordView', 'SettingView', 'AboutView', 'WeView'],
        // 控制器
        controllers: ['Main', 'ResultController', 'UserController', 'RecordController', 'SettingController', 'AboutController', 'WeController'],
        themeVariation: 'light',
        launch: function () {
            if (Ext.os.is.Android) {
                Ext.Viewport.addWindowListener('resize', Ext.Function.bind(Ext.Viewport.onResize, Ext.Viewport));
                Ext.Viewport.updateSize();
                Ext.Viewport.orientation = Ext.Viewport.determineOrientation();
            }

            Ext.Date.monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
            
            Ext.create('JajaApp.view.Main', { fullscreen: true });
            
        }
    });

}

// 当存在注册返回事件，就应该移除返回事件
function onConfirm(button) {
    if (button == 1)
        navigator.app.exitApp(); // 选择了确定才执行退出
}

/**
*  显示一个自定义的确认对话框
*/
function onBackKeyDown() {

    navigator.notification.confirm('按确定退出程序!', // message
              onConfirm, // callback to invoke with index of button pressed
              '确定要退出程序吗?', // title
              '确定,取消' // buttonLabels
     );
}