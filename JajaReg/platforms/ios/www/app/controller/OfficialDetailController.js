Ext.define('JajaApp.controller.OfficialDetailController', {
    extend: 'Ext.app.Controller',

    config: {//配置
        refs: {
            officialdetailview: {
                selector: 'officialdetailview',
                xtype: 'officialdetailview',
                autoCreate: true
            },
            OfficialDetailBack: '#OfficialDetailBack'
        },
        control: {
            officialdetailview: {
                activate: 'activateDetailView'
            },
            OfficialDetailBack: {
                tap: 'back'
            }
        },
        routes: {
            'officialdetail': 'showOfficialDetailView'
        }
    },
    // 初始化注册记录列表
    activateDetailView: function (newActiveItem, sender, oldActiveItem, eOpts) {
        var me = this;
        //        if (oldActiveItem.getId() == 'detailview') {
        //            Progress.animate(this.getOfficialview(), 'left'); // 更改动画方向
        //        }

        this.getDetail(function (listview) {
            var data = listview.getRecord().data;
            console.log(listview.getRecord().data);
            Common.setValue('txtOfficialDetailRegDate', data.AskTime),
            Common.setValue('txtOfficialDetailTryDate', data.OffTime),
            Common.setValue('txtOfficialDetailHotelName', data.RegName),
            Common.setValue('txtOfficialDetailHotelAddress', data.RegAddress),
            Common.setValue('txtOfficialDetailSitesNumber', data.RegNum),
            Common.setValue('txtOfficialDetailMealOrderNumber', data.RegMealOrder),
            Common.setValue('txtOfficialDetailSysType', data.RegSystem),
            Common.setValue('txtOfficialDetailModules', data.RegModuleName),
            Common.setValue('txtOfficialDetailRegCode', data.RegCode);
            Common.setValue('txtOfficialDetailRemark', data.Remark);
        });

        var actions = this.getOfficialdetailview().getItems().getAt(2);
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
    // 返回
    back: function () {
        Common.redirectTo(this, 'officialdetail', 'official');
    },
    // 将当前视图设置为活动页视图
    showOfficialDetailView: function () {
        Progress.animate(this.getOfficialdetailview(), 'right');
        Ext.Viewport.setActiveItem(this.getOfficialdetailview());
    }
});