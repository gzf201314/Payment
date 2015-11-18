// 路由
var Route = {
    Main: 'main',
    Login: 'login',
    Register: 'register',
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
            MenuButton: '#menus',
            SettingButton: '#SettingButton'
        },
        control: {
            mainview: {
                activate: 'onInit',
                initialize: 'showOrientationchange'
            },
            SettingButton: {
                tap: 'showChooseLoginView'
            },
            MenuButton: {
                tap: 'showMenuView'
            }
        },
        routes: {
            'main': 'showMainView'
        }
    },
    /**
    * 页面激活 ------ 每次显示当前页面，都会执行这段代码
    */
    onInit: function (newActiveItem, sender, oldActiveItem, eOpts) {
        var me = this;

        // 滑动事件 ------ 向右滑动
        Ext.Viewport.element.on('swipe', function (event, node, options, eOpts) {
            if (event.direction == "right") {
                //me.getMenus();
            }
        });

        this.initWithMenu(); // 初始化
        if (oldActiveItem.getId() == 'recordview' ||
            oldActiveItem.getId() == 'officialview' ||
            oldActiveItem.getId() == 'askview' ||
            oldActiveItem.getId() == 'registerview' ||
            oldActiveItem.getId() == 'regcodeview') {
            Progress.animate(this.getMainview(), 'left');
        }
    },
    showMenuView: function () {
        this.getMenus();
    },
    showChooseLoginView: function () {
        var me = this;
        var data = new JajaApp.view.Setting();
        Ext.Viewport.add(data);
        data.show();
        data.on({
            delegate: 'radiofield',
            check: function (radioview) {
                if (radioview.getValue().indexOf('管理员') >= 0) {
                    localStorage.setItem('isAdmin', true);
                }

                if (radioview.getValue().indexOf('代理商') >= 0) {
                    localStorage.setItem('isAdmin', false);
                }

                Common.redirectTo(me, Route.Main, Route.Login); // 跳转到历史记录视图
                data.hide();
            }
        });

        data.on('hide', function () {
            data.destroy();
        });
    },
    /**
    *  给页面添加方向改变事件
    */
    showOrientationchange: function () {
        
        Ext.Viewport.on('orientationchange', this.showLandScapePortrait, {});
    },
    /**
    *  根据视图方向来显示更改之后的视图
    */
    showLandScapePortrait: function (sender, eOpts) {
        var me = this,
            trial_fieldset = Ext.getCmp('trial_fieldset'),
            formal_fieldset = Ext.getCmp('formal_fieldset'),
            searchfieldset = Ext.getCmp('searchfieldset'),
            ViewportOrientation = Ext.Viewport.getOrientation();

        if (ViewportOrientation == 'portrait') {//portrait---竖屏
            if (trial_fieldset) {
                trial_fieldset.setWidth(window.innerWidth);
            }

            if (formal_fieldset) {
                formal_fieldset.setWidth(window.innerWidth);
            }
        }

        if (ViewportOrientation == 'landscape') {//landscape---横屏
            if (trial_fieldset) {
                trial_fieldset.setWidth(window.innerWidth);
            }

            if (formal_fieldset) {
                formal_fieldset.setWidth(window.innerWidth);
            }
        }
    },
    /**
    * 初始化功能菜单列表
    */
    initWithMenu: function () {
        menu.init(this);
    },
    showMainView: function () {
        // Progress.animate(this.getMainview(), 'right');
        Ext.Viewport.setActiveItem(this.getMainview());
    }
});