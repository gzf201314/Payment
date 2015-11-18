Ext.define('JajaApp.controller.ProxyOfficialDetailController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            proxyofficialdetailview: {
                selector: 'proxyofficialdetailview',
                xtype: 'proxyofficialdetailview',
                autoCreate: true
            },
            Back: '#ProxyOfficialDetailBack'
        },
        control: {
            proxyofficialdetailview: {
                activate: 'initMessage'
            },
            Back: {
                tap: 'back'
            }
        },
        routes: {
            'proxyofficialdetail': 'showDetailView'
        }
    },
    // 返回
    back: function () {
        Common.redirectTo(this, 'proxyofficialdetail', 'official');
    },
    // 初始化酒店信息
    initMessage: function (newActiveItem, sender, oldActiveItem, eOpts) {
        //        if (oldActiveItem.getId() == 'registerview') {
        //            Progress.animate(this.getProxyofficialdetailview(), 'left');
        //        }
        
        var me = this;
        this.getDetail(function (listview) {
            var data = listview.getRecord().data;
            console.log(listview.getRecord().data);
            Common.setValue('txtProxyOfficialDetailRegUserID', data.RegUserID),
            Common.setValue('txtProxyOfficialDetailRegDate', data.AskTime),
            Common.setValue('txtProxyOfficialDetailTryDate', data.OffTime),
            Common.setValue('txtProxyOfficialDetailHotelName', data.RegName),
            Common.setValue('txtProxyOfficialDetailHotelAddress', data.RegAddress),
            Common.setValue('txtProxyOfficialDetailSitesNumber', data.RegNum),
            Common.setValue('txtProxyOfficialDetailMealOrderNumber', data.RegMealOrder),
            Common.setValue('txtProxyOfficialDetailSysType', data.RegSystem),
            Common.setValue('txtProxyOfficialDetailModules', data.RegModuleName),
            Common.setValue('txtProxyOfficialDetailRegCode', data.RegCode);
            Common.setValue('txtProxyOfficialDetailRemark', data.Remark);
        });
        var actions = this.getProxyofficialdetailview().getItems().getAt(2);
        Common.isDevice(actions);
        console.log(actions);
    },
    // 获取当前明细
    getDetail: function (callback) {
        var listView = this.getApplication().getController('OfficialController').getOfficialview().getItems().getAt(1).getItems().getAt(0).getItems().getAt(2).getItems();
        for (var i = 0; i < listView.length; i++) {
            if (parseInt(localStorage.getItem('recordIndex')) == i) {
                callback(listView.getAt(i));
            }
        }
    },
    showDetailView: function () {

        console.log(this);
        Progress.animate(this.getProxyofficialdetailview(), 'right');
        Ext.Viewport.setActiveItem(this.getProxyofficialdetailview());
    }
});