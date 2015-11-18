Ext.define('JajaApp.controller.SettingController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            settingview: {
                selector: 'settingview',
                xtype: 'settingview',
                autoCreate: true
            },
            SaveButton: '#saveButton',
            SettingBack: '#SettingBack'
        },
        control: {
            settingview: {
                activate: 'onSettingViewActivate'
                //   initialize: 'initialize'
            },
            SaveButton: {
                tap: 'save'
            },
            SettingBack: {
                tap: 'back'
            }
        },
        routes: {
            'setting': 'showSettingView'
        }
    },
    onSettingViewActivate: function () {
        var txtNameCss = document.getElementsByName('txtName')[0],
            txtNumberCss = document.getElementsByName('txtNumber')[0];
        this.updateInputCss(txtNameCss);
        this.updateInputCss(txtNumberCss);
    },
    updateInputCss: function (n) {
        $('#' + n.id).css({
            'padding': '.4em',
            'font-family': ' normal',
            'min-height': '2.5em'
        });
    },
    save: function () {
        var txtID = Ext.getCmp('txtNumber').getValue(),
            txtName = Ext.getCmp('txtName').getValue();
        if (txtID != null && txtName != '') {
            var data = {
                name: txtName,
                code: txtID
            };
            localStorage.setItem('shanghuInfo', JSON.stringify(data));
            notification.alert("提示", "保存成功!");
        }
        else {
            notification.alert("提示", "请填写交易名称和支付商号");
        }

    },
    // 返回
    back: function () {
        var me = this;
        Common.redirectTo(me, 'setting', 'usercenter'); // 数据加载完成进行跳转。
    },
    showSettingView: function () {
        Progress.animate(this.getSettingview(), 'right');
        Ext.Viewport.setActiveItem(this.getSettingview());
    }
});