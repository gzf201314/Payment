Ext.define("util.Record", {
    alternateClassName: "Record",
    singleton: true,
    back: 'back',
    search: 'search',
    add: 'add',
    config: {
        description: '加加餐饮软件'
    },
    constructor: function (config) {
        this.initConfig(config);
    },
    /**
    * 获取需要加载的json数据文件的路径
    */
    url: function () {
        return (this.isAdmin()) ? "app/data/main_json.js" : "app/data/menus_json.js";
    },
    /**
    * 用来判断是否为管理员
    */
    isAdmin: function () {
        var data = localStorage.getItem('isAdmin');
        return (data == "true") ? true : false;
    },
    // 左侧导航菜单
    getMenus: function () {
        var mWidth = window.innerWidth / 3 * 2;
        var mainPanel = Ext.create('Ext.Container', {
            floating: true,
            modal: true,
            centered: false,
            left: 0,
            autoDestroy: true,
            showAnimation: {
                type: 'slide',
                direction: 'right',
                duration: 300
            },
            hideAnimation: {
                type: 'slide',
                direction: 'right',
                duration: 300,
                reverse: true,
                out: true
            },
            style: {
                'background': 'url(images/63.jpg)',
                'background-size': 'cover',
                'height': '100%',
                'width': '230px'
            },
            items: [{
                xtype: 'container',
                height: 160,
                width: '100%',
                items: [{
                    xtype: 'img',
                    centered: true,
                    src: 'images/personinfo.png',
                    style: {
                        'border-radius': '100px',
                        'border': '3px solid rgb(195, 220, 235)'
                    },
                    width: 80,
                    height: 80
                }]
            }, {
                xtype: 'container',
                height: 31,
                width: '100%',
                style: "text-align: center;font-size: 1.5em;color: #f7f7f7;",
                html: '张三丰'
            }, {
                xtype: 'container',
                height: 31,
                width: '100%',
                style: "text-align: center;font-size: 1.1em;color: #f7f7f7;line-height:31px;padding: 8px;",
                html: '山东省   青岛市   市北区    辽宁路228号科信大厦2516'
            }, {
                docked: 'bottom',
                ui: 'light',
                xtype: 'toolbar',
                cls: 'toolbar',
                style: {
                    'border-top': '1px solid #DBDBDB'
                },
                height: 56,
                items: [{
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    iconAlign: 'left',
                    iconCls: 'setup w-ico l-h-rose',
                    style: {
                        color: '#5E99CC'
                    },
                    margin: '0 -8',
                    text: '设置'
                }, {
                    xtype: 'spacer'
                }]
            }]
        });
        Ext.Viewport.add(mainPanel);
        mainPanel.show();
        mainPanel._modal.on('tap', function () {
            mainPanel.hide();
        });
    },
    /**
    * 根据不同的用户类别加载不同的操作列表
    */
    loadMenu: function () {
        this.store = Ext.create('Ext.data.Store', {
            //define the stores fields
            fields: [
                 'RegMenuID',
                 'Message',
                 'Remark',
                 'badgeText',
                 'Count'
                 ],
            proxy: {
                type: 'ajax',
                url: this.url(),
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });
        return this.store;
    },
    /**
    * 将字符串转换为时间日期
    */
    ChangeDateFormat: function (time) {
        if (time != null) {
            var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            return date.getFullYear() + "-" + month + "-" + currentDate;
        }
        return "";
    },
    getUserStore: function (data) {

        this.store = Ext.create('Ext.data.Store', {
            id: 'userStore',
            //define the stores fields
            fields: [
                 'Address',
                 'CompanyName',
                 'UserName',
                 'CNZJF'
                 ],
            sorters: 'CompanyName',
            groupField: 'CompanyName',
            autoLoad: true
        });

        // console.log("申请");
        return this.store;
    },
    /**
    * 清除搜索授权用户的条件
    */
    onSearchUserClearIconTap: function (field) {
        // this.getUserStore().clearFilter();
        field.getParent().getParent().getStore().clearFilter();
    },
    /**
    * 取消搜索授权用户
    */
    onCancelSearchUser: function (field) {
        field.getParent().getParent().getStore().clearFilter();
    },
    /**
    * 执行授权用户的条件
    */
    onSearchUserKeyUp: function (field) {
        // console.log(field.getParent().getParent());
        var listStore = field.getParent().getParent().getStore();
        Common.onSearch(listStore, field, ['CompanyName', 'CNZJF', 'UserName', 'Address']);
    },
    /**
    * 酒店正式码记录
    */
    getOfficialList: function (data) {
        var listview = Ext.create('Ext.dataview.List', {
            cls: 'ks-basic',
            id: 'officiallist',
            pinHeaders: false,
            onItemDisclosure: true,
            scrollable: {
                direction: 'vertical',
                indicators: false
            },
            style: 'width:100%;height:100%;',
            itemTpl: '<div style="width:100%;position: absolute;padding: 8px;"><div class="content" style="width:60%;"><div class="name">{RegName}</div> <div class ="affiliation">{RegAddress}</div></div><div class="date" type="date" style="float: right;height: 41px;line-height: 41px;width: 40%; margin-top: -41px;margin-right:6px; text-align: center;">{RegNum}</div></div>',
            //store: this.getOfficialStore(data),
            useSimpleItems: true,
            //grouped: true,
            emptyText: '<div style="margin-bottom:200px;text-align: center;color:rgb(173,170,173);">没有查询到相关数据</div>',
            disableSelection: true,
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                hidden: true,
                //width: '100%',
                style: 'background:rgb(239, 239, 239);',
                items: [{
                    xtype: 'searchfield',
                    id: 'searchOfficial',
                    inputCls: 'searchCls',
                    draggable: false,
                    height: 47,
                    placeHolder: '请输入酒店名称或酒店地址',
                    listeners: {
                        scope: this,
                        clearicontap: this.onSearchClearIconTap,
                        keyup: this.onSearchKeyUp
                    }
                }, {
                    xtype: 'button',
                    labelCls: 'searchlable',
                    style: {
                        'background': 'rgb(239, 239, 239)',
                        'margin-left': '-6px',
                        'height': '47px',
                        'width': '15%',
                        'color': '#fff'
                    },
                    text: '取消',
                    listeners: {
                        scope: this,
                        tap: this.onCancelSearchOfficial
                    }
                }]
            }, {
                xtype: 'container',
                docked: 'top',
                style: {
                    'font-size': '1.1em',
                    //'font-weight': 'bold',
                    'background': 'rgb(0, 0, 0)',
                    'color': 'white'
                },
                height: 47,
                layout: 'hbox',
                items: [{
                    xtype: 'label',
                    style: {
                        'line-height': '47px',
                        'padding-left': '8px'
                    },
                    flex: 1,
                    html: '酒店信息'
                }, {
                    xtype: 'label',
                    style: {
                        'line-height': '47px',
                        'text-align': 'center'
                    },
                    flex: 1,
                    html: '站点数'
                }]
            }]
        });

        listview.setStore(this.getOfficialStore(data)).setData(data);
        return listview;
    },
    getOfficialStore: function (data) {

        this.store = Ext.create('Ext.data.Store', {
            id: 'officialStore',
            //define the stores fields
            fields: [
                 'OriRegID',
                 'RegID',
                 'RegAddress',
                 'RegCode',
                 'RegModuleID',
                 'RegModuleName',
                 'RegName',
                 'RegNum',
                 'RegSystem',
                 'RegTime',
                 'RegUserID',
                 'Remark',
                 'TryDate'
                 ],
            sorters: 'RegName',
            groupField: 'RegName',
            autoLoad: true
        });

        // console.log("申请");
        return this.store;
    },
    // 取消查询
    onCancelSearchOfficial: function (sender) {
        Ext.getCmp('searchOfficial').setValue('');
        // this.onSearchClearIconTap();
        sender.getParent().hide();
    },
    /**
    * 代理商申请正式记录
    */
    getAskOfficialConfiguration: function (data) {
        if (Ext.getCmp("askofficiallist")) {
            Ext.getCmp("askofficiallist").destroy();
        }
        var listview = Ext.create('Ext.dataview.List', {
            cls: 'ks-basic',
            id: 'askofficiallist',
            pinHeaders: false,
            onItemDisclosure: true,
            scrollable: {
                direction: 'vertical',
                indicators: false
            },
            style: 'width:100%;height:100%;',
            itemTpl: '<div style="width:100%;position: absolute;padding: 9px 10px 10px 10px;"><div class="content" style="width:60%;"><div class="name">{RegName}</div> <div class ="affiliation">{RegUserID}</div></div><div class="date" type="date" style="float: right;height: 38px;line-height: 38px;width: 40%; margin-top: -38px;margin-right:6px; text-align: center;">{TryDate}</div></div><div style="width:42px;height:42px;position: relative;background-image: url(./images/complete.png);display:{State};"></div>',
            //store: this.getOfficialStore(data),
            useSimpleItems: true,
            //grouped: true,
            emptyText: '<div style="margin-bottom:200px;text-align: center;color:rgb(173,170,173);">没有查询到相关数据</div>',
            disableSelection: true,
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                hidden: true,
                //width: '100%',
                style: 'background:rgb(239, 239, 239);',
                items: [{
                    xtype: 'searchfield',
                    id: 'searchAskOfficial',
                    inputCls: 'searchCls',
                    draggable: false,
                    height: 47,
                    placeHolder: '请输入酒店名称或酒店地址',
                    listeners: {
                        scope: this,
                        clearicontap: this.onSearchClearIconTap,
                        keyup: this.onSearchKeyUp
                    }
                }, {
                    xtype: 'button',
                    labelCls: 'searchlable',
                    style: {
                        'background': 'rgb(239, 239, 239)',
                        'margin-left': '-6px',
                        'height': '47px',
                        'width': '15%',
                        'color': '#fff'
                    },
                    text: '取消',
                    listeners: {
                        scope: this,
                        tap: this.onSearchTap
                    }
                }]
            }, {
                xtype: 'container',
                docked: 'top',
                style: {
                    'font-size': '1.1em',
                    //'font-weight': 'bold',
                    'background': 'rgb(0, 0, 0)',
                    'color': 'white'
                },
                height: 47,
                layout: 'hbox',
                items: [{
                    xtype: 'label',
                    style: {
                        'line-height': '47px',
                        'padding-left': '18px'
                    },
                    flex: 1,
                    html: '名称'
                }, {
                    xtype: 'label',
                    style: {
                        'line-height': '47px',
                        'text-align': 'center'
                    },
                    flex: 1,
                    html: '日期'
                }]
            }]
        });

        listview.setStore(this.getAskOfficialStore(data)).setData(data);
        // console.log(listview.getStore());
        return listview;
    },
    getAskOfficialStore: function (data) {
        //check if a store has already been set

        this.store = Ext.create('Ext.data.Store', {
            id: 'askStore',
            //define the stores fields
            fields: [
                'OriRegID',
                 'RegID',
                 'RegAddress',
                 'RegCode',
                 'RegModuleID',
                 'RegModuleName',
                 'RegName',
                 'RegNum',
                 'RegSystem',
                 'RegTime',
                 'RegUserID',
                 'Remark',
                 'TryDate',
                 'State'
                 ],
            sorters: 'RegName',
            groupField: 'RegName',
            autoLoad: true
        });

        console.log("申请");
        return this.store;
    },
    /**
    * 代理商正式码记录
    */
    getProxyOfficialListConfiguration: function (data) {
        var listview = Ext.create('Ext.dataview.List', {
            cls: 'ks-basic',
            id: 'proxyofficiallist',
            pinHeaders: false,
            onItemDisclosure: true,
            scrollable: {
                direction: 'vertical',
                indicators: false
            },
            style: 'width:100%;height:100%;',
            itemTpl: '<div style="width:100%;position: absolute;padding: 9px 10px 10px 10px;"><div class="content" style="width:60%;"><div class="name">{RegName}</div> <div class ="affiliation">{RegUserID}</div></div><div class="date" type="date" style="float: right;height: 38px;line-height: 38px;width: 40%; margin-top: -38px;margin-right:6px; text-align: center;">{TryDate}</div></div>',
            //store: this.getOfficialStore(data),
            useSimpleItems: true,
            //grouped: true,
            emptyText: '<div style="margin-bottom:200px;text-align: center;color:rgb(173,170,173);">没有查询到相关数据</div>',
            disableSelection: true,
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                hidden: true,
                //width: '100%',
                style: 'background:rgb(239, 239, 239);',
                items: [{
                    xtype: 'searchfield',
                    id: 'searchAskOfficial',
                    inputCls: 'searchCls',
                    draggable: false,
                    height: 47,
                    placeHolder: '请输入酒店名称或酒店地址',
                    listeners: {
                        scope: this,
                        clearicontap: this.onSearchClearIconTap,
                        keyup: this.onSearchKeyUp
                    }
                }, {
                    xtype: 'button',
                    labelCls: 'searchlable',
                    style: {
                        'background': 'rgb(239, 239, 239)',
                        'margin-left': '-6px',
                        'height': '47px',
                        'width': '15%',
                        'color': '#fff'
                    },
                    text: '取消',
                    listeners: {
                        scope: this,
                        tap: this.onSearchTap
                    }
                }]
            }, {
                xtype: 'container',
                docked: 'top',
                style: {
                    'font-size': '1.1em',
                    //'font-weight': 'bold',
                    'background': 'rgb(0, 0, 0)',
                    'color': 'white'
                },
                height: 47,
                layout: 'hbox',
                items: [{
                    xtype: 'label',
                    style: {
                        'line-height': '47px',
                        'padding-left': '18px'
                    },
                    flex: 1,
                    html: '名称'
                }, {
                    xtype: 'label',
                    style: {
                        'line-height': '47px',
                        'text-align': 'center'
                    },
                    flex: 1,
                    html: '日期'
                }]
            }]
        });

        listview.setStore(this.getProxyOfficialStore(data)).setData(data);
        // console.log(listview.getStore());
        return listview;
    },
    getProxyOfficialStore: function (data) {
        //check if a store has already been set

        this.store = Ext.create('Ext.data.Store', {
            id: 'askStore',
            //define the stores fields
            fields: [
                'OriRegID',
                 'RegID',
                 'RegAddress',
                 'RegCode',
                 'RegModuleID',
                 'RegModuleName',
                 'RegName',
                 'RegNum',
                 'RegSystem',
                 'RegTime',
                 'RegUserID',
                 'Remark',
                 'TryDate',
                 'State'
                 ],
            sorters: 'RegName',
            groupField: 'RegName',
            autoLoad: true
        });

        console.log("代理商正式码记录");
        return this.store;
    },
    /**
    * 代理商试用注册
    */
    getProxyListConfiguration: function (data) {
        var listview = Ext.create('Ext.dataview.List', {
            id: 'proxylist',
            cls: 'ks-basic',
            pinHeaders: false,
            onItemDisclosure: true,
            scrollable: {
                direction: 'vertical',
                indicators: false
            },
            style: 'width:100%;height:100%;',
            itemTpl: '<div style="width:100%;position: absolute;padding: 9px 10px 10px 10px;"><div class="content" style="width:60%;"><div class="name">{RegName}</div> <div class ="affiliation">{RegUserID}</div></div><div class="date" type="date" style="float: right;height: 41px;line-height: 22px;width: 40%; margin-top: -41px;margin-right:6px; text-align: center;"><div>{RegTime}</div><div>{TryDate}</div></div></div>',
            // itemTpl: '<div class="content" style="width:65%;"><div class="img" style="background-image: url(./images/try{Src}.png);"></div><div class="name">{RegName}</div> <div class ="affiliation">{RegAddress}</div></div><div class="date" type="date" style="float: right;height: 41px;line-height: 41px;width: 35%; margin-top: -41px; text-align: center;">{TryDate}</div>',
            //store: this.getTrialStore(data),
            useSimpleItems: true,
            //grouped: true,
            emptyText: '<div style="margin-bottom: 200px;text-align: center;color:rgb(173,170,173);">没有查询到相关数据</div>',
            disableSelection: true,
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                hidden: true,
                //width: '100%',
                style: 'background:rgb(239, 239, 239);',
                items: [{
                    xtype: 'searchfield',
                    id: 'searchhistory',
                    inputCls: 'searchCls',
                    draggable: false,
                    height: 47,
                    placeHolder: '请输入酒店名称或酒店地址',
                    listeners: {
                        scope: this,
                        clearicontap: this.onSearchClearIconTap,
                        keyup: this.onSearchKeyUp
                    }
                }, {
                    xtype: 'button',
                    labelCls: 'searchlable',
                    style: {
                        'background': 'rgb(239, 239, 239)',
                        'margin-left': '-6px',
                        'height': '47px',
                        'width': '15%',
                        'color': '#fff'
                    },
                    text: '取消',
                    listeners: {
                        scope: this,
                        tap: this.onSearchTap
                    }
                }]
            }, {
                xtype: 'container',
                docked: 'top',
                style: {
                    'font-size': '1.1em',
                    //'font-weight': 'bold',
                    'background': 'rgb(0, 0, 0)',
                    'color': 'white'
                },
                height: 47,
                layout: 'hbox',
                items: [{
                    xtype: 'label',
                    style: {
                        'line-height': '47px',
                        'padding-left': '18px'
                    },
                    flex: 1,
                    html: '名称'
                }, {
                    xtype: 'label',
                    style: {
                        'line-height': '47px',
                        'text-align': 'center'
                    },
                    flex: 1,
                    html: '日期'
                }]
            }]
        });

        // listview.getStore().setData(data);
        listview.setStore(this.getTrialStore(data)).setData(data);
        // listview.setData(data);
        console.log(listview.getStore().getStoreId());
        return listview;
    },
    /**
    * 酒店试用注册记录
    * Returns the configuration of the list for this example, to be inserted into the viewport in the launch method.
    */
    getTrialListConfiguration: function (data) {
        var listview = Ext.create('Ext.dataview.List', {
            id: 'triallist',
            cls: 'ks-basic',
            pinHeaders: false,
            onItemDisclosure: true,
            scrollable: {
                direction: 'vertical',
                indicators: false
            },
            style: 'width:100%;height:100%;',
            itemTpl: '<div style="width:100%;position: absolute;padding: 8px;"><div class="content" style="width:60%;"><div class="name">{RegName}</div> <div class ="affiliation">{RegAddress}</div></div><div class="date" type="date" style="float: right;height: 41px;line-height: 41px;width: 40%; margin-top: -41px;margin-right:6px; text-align: center;">{TryDate}</div></div><div style="width:42px;height:42px;position: relative;background-image: url(./images/submit.png);display:{State};"></div>',
            // itemTpl: '<div class="content" style="width:65%;"><div class="img" style="background-image: url(./images/try{Src}.png);"></div><div class="name">{RegName}</div> <div class ="affiliation">{RegAddress}</div></div><div class="date" type="date" style="float: right;height: 41px;line-height: 41px;width: 35%; margin-top: -41px; text-align: center;">{TryDate}</div>',
            //store: this.getTrialStore(data),
            useSimpleItems: true,
            //grouped: true,
            emptyText: '<div style="margin-bottom: 200px;text-align: center;color:rgb(173,170,173);">没有查询到相关数据</div>',
            disableSelection: true,
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                hidden: true,
                //width: '100%',
                style: 'background:rgb(239, 239, 239);',
                items: [{
                    xtype: 'searchfield',
                    id: 'searchhistory',
                    inputCls: 'searchCls',
                    draggable: false,
                    height: 47,
                    placeHolder: '请输入酒店名称或酒店地址',
                    listeners: {
                        scope: this,
                        clearicontap: this.onSearchClearIconTap,
                        keyup: this.onSearchKeyUp
                    }
                }, {
                    xtype: 'button',
                    labelCls: 'searchlable',
                    style: {
                        'background': 'rgb(239, 239, 239)',
                        'margin-left': '-6px',
                        'height': '47px',
                        'width': '15%',
                        'color': '#fff'
                    },
                    text: '取消',
                    listeners: {
                        scope: this,
                        tap: this.onSearchTap
                    }
                }]
            }, {
                xtype: 'container',
                docked: 'top',
                style: {
                    'font-size': '1.1em',
                    //'font-weight': 'bold',
                    'background': 'rgb(0, 0, 0)',
                    'color': 'white'
                },
                height: 47,
                layout: 'hbox',
                items: [{
                    xtype: 'label',
                    style: {
                        'line-height': '47px',
                        'padding-left': '8px'
                    },
                    flex: 1,
                    html: '酒店信息'
                }, {
                    xtype: 'label',
                    style: {
                        'line-height': '47px',
                        'text-align': 'center'
                    },
                    flex: 1,
                    html: '试用到期'
                }]
            }]
        });

        // listview.getStore().setData(data);
        listview.setStore(this.getTrialStore(data)).setData(data);
        // listview.setData(data);
        console.log(listview.getStore().getStoreId());
        return listview;
    },
    /**
    * Returns a new store instance if one hasn't been created yet
    * @return {Ext.data.Store}
    */
    getTrialStore: function (data) {
        //check if a store has already been set

        this.store = Ext.create('Ext.data.Store', {
            id: 'trialStore',
            //define the stores fields
            fields: [
                'OriRegID',
                 'RegID',
                 'RegAddress',
                 'RegCode',
                 'RegModuleID',
                 'RegModuleName',
                 'RegName',
                 'RegNum',
                 'RegSystem',
                 'RegTime',
                 'RegUserID',
                 'Remark',
                 'TryDate',
                 'State'
                 ],
            sorters: 'RegName',
            groupField: 'RegName',
            autoLoad: true
        });

        console.log("试用");
        return this.store;
    },
    onSearchTap: function (sender) {
        var searchField = sender.getParent().getItems().getAt(0);
        console.log(sender.getParent().getItems().getAt(0));
        if (sender.getText() == "查询") {
            if (searchField.getValue().length == 0) return;
            this.onSearchKeyUp(searchField);
            sender.setText("取消");
        }
        else if (sender.getText() == "取消") {
            searchField.setValue('');

            this.onSearchClearIconTap(searchField);
            //sender.setText("查询");
            sender.getParent().hide();
        }
    },
    // 清空当前试用记录检索条件
    onSearchClearIconTap: function (field) {
        //call the clearFilter method on the store instance
        field.getParent().getParent().getStore().clearFilter();
    },
    // 快速检索试用记录
    onSearchKeyUp: function (field) {
        var listStore = field.getParent().getParent().getStore();
        Common.onSearch(listStore, field, ['RegAddress', 'RegName', 'RegUserID']);
    }
});