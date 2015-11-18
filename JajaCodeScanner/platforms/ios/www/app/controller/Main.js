// 路由
var Route = {
    Main: 'main',
    Login: 'login',
    Result: 'result',
    User: 'usercenter',
    Record: 'record',
    Ask: 'ask',
    Official: 'official'
};


//主控制器脚本文件
Ext.define('JajaApp.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainview: {
                selector: 'mainview',
                xtype: 'mainview',
                id: 'mainview',
                autoCreate: true
            },
            Resultcontainer: '#resultcontainer',
            UserCenterButton: '#UserCenterButton',
            RecordButton: '#RecordButton',
            QRCodeButton: '#QRCodeButton'
        },
        control: {
            mainview: {
                activate: 'onMainViewActivate',
                initialize: 'onInitMainView'
            },
            UserCenterButton: {
                tap: 'showUserCenterView'
            },
            RecordButton: {
                tap: 'showRecord'
            },
            QRCodeButton: {
                tap: 'showQRCodeView'
            }
        },
        routes: {
            'main': 'showMainView'
        }
    },
    showRecord: function () {
        var me = this;
        Common.redirectTo(me, Route.Main, Route.Record); // 数据加载完成进行跳转。
    },
    showUserCenterView: function () {
        var me = this;
        Common.redirectTo(me, Route.Main, Route.User); // 数据加载完成进行跳转。
    },
    initButtonStyle: function (data) {
        var windowWidth = $(window).width();
        var height = $('.bao-lable-button-sum').width() / 2 + 31.875 + 15;
        var buttonWidth = 0;
        var containerHeight = 0;
        var marginHeight = 0;
        if (data) {
            buttonWidth = (windowWidth - 50) / 4;
            containerHeight = 50 + buttonWidth * 4;
            marginHeight = (((buttonWidth * 2 + 10) - height) / 2);
        }
        else {
            buttonWidth = (windowWidth) / 4;
            containerHeight = buttonWidth * 4;
            marginHeight = (((buttonWidth * 2) - height) / 2);
        }
        var buttons = Ext.getCmp('resultcontainer').query('button');
        for (var i = 0; i < buttons.length; i++) {
            //  console.log(buttons[i].getText());
            if (buttons[i].getText() != '收款') {
                buttons[i].setHeight(buttonWidth);
                buttons[i].setWidth(buttonWidth);
            }
        }

        $('.sao').css('margin-top', marginHeight.toString() + 'px');
        Ext.getCmp('resultcontainer').setHeight(containerHeight);
        this.updateContainerStyle(data);
    },
    updateContainerStyle: function (data) {
        var marginSpace = (data) ? '10px' : '0px',
            paddingSpace = (data) ? '40px' : '0px',
            defaultRadius = (data) ? '50%' : '0px',
            shouKuanRadius = (data) ? '6px' : '0px';

        Ext.getCmp('resultcontainer').setStyle({
            'margin-left': '0px',
            'margin-top': '0px',
            'margin-right': marginSpace,
            'margin-bottom': marginSpace
        });

        var buttons = Ext.getCmp('resultcontainer').query('button');
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].getText() != '收款') {
                buttons[i].setStyle({
                    'border-radius': defaultRadius
                });
            }
            buttons[i].getParent().setStyle({
                'margin-left': marginSpace,
                'margin-top': marginSpace
            });

            if (app.isDevice) {
                this.onButtonActivateStyle(buttons[i].getId(), 'touchstart', 'touchend');
            }
            else {
                this.onButtonActivateStyle(buttons[i].getId(), 'mousedown', 'mouseup');
            }
        }
        Ext.getCmp('collection').setStyle({
            'border-radius': shouKuanRadius
        });
        Ext.getCmp('pointContiner').setStyle({
            'padding-left': paddingSpace
        });
    },
    onButtonActivateStyle: function (id, down, up) {
        var me = this;
        $('#' + id).bind(down, function (event) {
            event.preventDefault();
            var t = $(this).text();
            me.onButtonTouchStart(t);
            switch (t) {
                case "=":
                    $(this).css("background-color", "rgb(243, 151, 120)");
                    break;
                case "收款":
                    $(this).css("background-color", "rgb(243, 151, 120)");
                    break;
                default:
                    $(this).css("background-color", "rgb(201, 211, 227)");
            }
            
        });
        $('#' + id).bind(up, function (e) {
            e.preventDefault();
            var t = $(this).text();
            switch (t) {
                case "删除":
                    $(this).css("background-color", "rgb(247, 239, 247)");
                    break;
                case "清空":
                    $(this).css("background-color", "rgb(247, 239, 247)");
                    break;
                case "=":
                    $(this).css("background-color", "rgb(230, 84, 35)");
                    break;
                case "收款":
                    $(this).css("background-color", "rgb(230,84,35)");
                    break;
                default:
                    $(this).css("background-color", "#fff");
            }
        });
    },
    onInitMainView: function (sender) {
        var me = this;
        me.initButtonStyle(false);
        var o = document.getElementsByName('txtPosName')[0];
        $('#' + o.id).css({
            'padding': '0.0em 0.4em 0.0em 0.0em',
            'height': '55px',
            'line-height': '55px',
            'color': ' wheat',
            'font-family': ' normal',
            'min-height': '0em'
        });
        
    },
    onButtonTouchStart: function (text) {
        var me = this;
        var o = document.getElementsByName('txtPosName')[0];
        $('#' + o.id).css({
            'font-size': ' 30px',
            'letter-spacing': '-1px'
        });

        var posValue = Ext.getCmp('txtPos').getValue();
        console.log(text);
        console.log(this);
        var str;
        var textChar = posValue.charAt(Number(posValue.length) - 1);
        if (text == "+") {

            if (textChar == '+') {
                return;
            }

            if (posValue != "") {
                str = posValue + text;
                Ext.getCmp('collection').setText("=").setIconCls('');
                $('.bao-lable-button-sum').css('line-height', '' + $('.bao-lable-button-sum').height() + 'px');
                Ext.getCmp('txtPos').setValue(str);
            }
            else {
                $('#' + o.id).css({
                    'font-size': ' 16px ',
                    'letter-spacing': '0px'
                });
            }
        } else if (text == ".") {
            if (posValue != '') {
                if (textChar == '+') {
                    str = posValue + '0' + text;
                    console.log(str);
                }
                else if (textChar == '.') {
                    str = posValue;
                    console.log(str);
                }
                else {
                    str = posValue + text;
                }

                var arr = str.split('+'), arrStr = '';

                for (var i = 0; i < arr.length; i++) {
                    var point = arr[i].charAt(Number(arr[i].length) - 1);
                    var child = arr[i].split('.'), childStr = '';

                    for (var j = 0; j < child.length; j++) {
                        if (j == 0) {
                            childStr += child[j];
                        }
                        else if (j == (child.length - 1) && j < 1) {
                            childStr += ".";
                        }
                        else if (j == 1) {
                            childStr += "." + child[j];
                        }
                    }

                    if (i == 0) {
                        arrStr += childStr;
                    }
                    else if (i > 0) {
                        arrStr += "+" + childStr;
                    }
                    console.log(childStr);
                }
                str = arrStr;
                console.log(arrStr);
            }
            else {
                str = posValue + '0' + text;
            }
            Ext.getCmp('txtPos').setValue(str);
        } else if (text == "=") {
            Ext.getCmp('collection').setText("收款").setIconCls('sao p-ico p-roseRed');
            $('.bao-lable-button-sum').css('line-height', '');
            var sumArr = posValue.split('+'), sum = 0;
            console.log(sumArr.length);
            for (var i = 0; i < sumArr.length; i++) {
                console.log(sumArr[i]);
                console.log(parseFloat(sumArr[i]));
                if (sumArr[i] != '') {
                    sum += parseFloat(sumArr[i]);
                }

            }

            Ext.getCmp('txtPos').setValue(sum.toFixed(2).toString());
        } else if (text == "收款") {
            if (posValue != '') {
                if (app.isDevice) {
                    me.showQRCodeView(parseFloat(posValue).toFixed(2).toString());
                }
                else {
                    var code = "130334038833699819";
                    if (code.length == 18) {
                        Common.redirectTo(me, Route.Main, Route.Result); // 数据加载完成进行跳转。
                    }

                }
            }
            else {
                $('#' + o.id).css({
                    'font-size': ' 16px ',
                    'letter-spacing': '0px'
                });
                notification.alert("提示", "请输入消费金额!");
            }


        } else if (text == "删除") {
            var pos = posValue.substring(0, posValue.length - 1);
            if (pos.length == 0) {
                $('#' + o.id).css({
                    'font-size': ' 16px ',
                    'letter-spacing': '0px'
                });
            }
            Ext.getCmp('txtPos').setValue(pos);
        } else if (text == "清空") {
            $('#' + o.id).css({
                'font-size': ' 16px ',
                'letter-spacing': '0px'
            });
            Ext.getCmp('txtPos').setValue('');
        } else if (text != "收款" || text != "删除" || text != "清空") {
            str = posValue + text;
            Ext.getCmp('txtPos').setValue(str);
        }
    },
    /**
    * 页面激活 ------ 每次显示当前页面，都会执行这段代码
    */
    onMainViewActivate: function (newActiveItem, sender, oldActiveItem, eOpts) {
        var me = this;
        if (oldActiveItem != 0) {
            if (oldActiveItem.getId() == 'resultview' || oldActiveItem.getId() == 'userview' || oldActiveItem.getId() == 'recordview') {
                Progress.animate(this.getMainview(), 'left');
            }
        }
        var o = document.getElementsByName('txtPosName')[0];
        $('#' + o.id).css({
            'font-size': ' 16px ',
            'letter-spacing': '0px'
        });
        Ext.getCmp('txtPos').setValue('');
    },
    // 调用原生接口
    showQRCodeView: function (message) {
        var me = this;
           
        if (!localStorage.getItem('shanghuInfo')) {
           notification.alert("提示", "没有检测到微信支付商号!");
           me.updateShouKuanStyle();
           return;
        }
           
        cordova.plugins.barcodeScanner.scanDesc(message,function (result) {
            // alert("We got a barcode\n" +
            //   "Result: " + result.text + "\n" +
            //   "Format: " + result.format + "\n" +
            //   "Cancelled: " + result.cancelled);

            var shanghuInfo = JSON.parse(localStorage.getItem('shanghuInfo'));
            if (result.cancelled == 0) {
                var data = {
                    name: shanghuInfo.name,
                    code: shanghuInfo.code,
                    payID: '1303 3403 8833 6998 19',
                    sum: '200'
                };

                var paycode = result.text;
                if (paycode.length == 18) {

                    /*
                    // 提交服务器
                    Request.post('', data, function () {

                    }, function () {

                    });
                    */
                    Common.redirectTo(me, Route.Main, Route.Result); // 数据加载完成进行跳转。
                    // notification.alert("付款码", paycode);
                    // 1.检测通过之后
                    var merchants = "加加大酒店",
                    amount = "1000.00";
                    me.updateShouKuanStyle();
                    // 2.给核对页面进行赋值
                    // Common.setValue('txtMerchants', merchants);
                    // Common.setValue('txtAmount', amount);
                }
                else {
                    notification.alert("提示", "付款码校验失败,请重新扫码!");
                    me.updateShouKuanStyle();
                }
            }
            me.updateShouKuanStyle();

        }, function (error) {
            alert("Scanning failed: " + error);
        });

    },
    updateShouKuanStyle:function(){
        Ext.getCmp('collection').setStyle({"background-color":"rgb(230,84,35)"});
    },
    showMainView: function () {
        Progress.animate(this.getMainview(), 'right');
        Ext.Viewport.setActiveItem(this.getMainview());
    }
});