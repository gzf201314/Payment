Ext.define("util.BillRecord", {
    alternateClassName: "billRecord",
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
    /**
    * 交易记录
    */
    getRecordConfiguration: function (view, data) {
        if (Ext.getCmp('proxyofficiallist')) {
            Ext.getCmp('proxyofficiallist').destroy();
        }
        var record = Ext.create('Ext.dataview.List', {
            cls: 'ks-basic',
            id: 'proxyofficiallist',
            fullscreen: true,
            style: 'width:100%;height:100%;',
            pinHeaders: false,
            autoDestroy: true,
            onItemDisclosure: false,
            scrollable: {
                direction: 'vertical',
                indicators: false
            },
            itemTpl: '<div style="width:100%;position: absolute;padding: 9px 10px 10px 10px;"><div class="date" type="date" style="float: left;height: 38px;width: 45%;font-size: 1.0em;">{BillTime}</div><div class="content" style="width:55%;float: right;text-align: right;"><div class="name">{BillJinE}</div> <div class ="affiliation">{State}</div></div></div>',
            useSimpleItems: true,
            //grouped: true,
            // emptyText: '<div style="margin-bottom:200px;text-align: center;color:rgb(173,170,173);">没有查询到相关数据</div>',
            disableSelection: true
        });
        var me = this;
        record.on('activate', function () {

            //  record.setStore(me.getProxyOfficialStore(data)).setData(data);
            //record.setStore(me.getProxyOfficialStore(data));
            
            console.log(record.getData());
        });

        record.setStore(me.getProxyOfficialStore(data)).on('load', function () {
            console.log("开始添加数据");
        });
        view.setItems(record);
        // listview.setData(data);


        //  return listview;
    },
    getProxyOfficialStore: function (data) {
        this.store = Ext.create('Ext.data.Store', {
            id: 'askStore',
            //define the stores fields
            fields: ['BillID', 'BillTime', 'BillJinE', 'State'],
            sorters: 'BillID',
            data: data,
            groupField: 'BillID',
            autoLoad: true
        });
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
        Common.onSearch(listStore, field, ['BillID', 'BillTime', 'State']);
    }
});