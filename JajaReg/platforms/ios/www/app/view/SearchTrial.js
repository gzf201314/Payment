Ext.define('JajaApp.view.SearchTrial', {
    extend: 'Ext.Container',
    xtype: 'searchtrial',

    requires: [],

    config: {
        fullscreen: true,
        centered: true,
        autoDestroy: true,
        showAnimation: {
            type: 'slide',
            direction: 'left',
            duration: 300
        },
        hideAnimation: {
            type: 'slide',
            direction: 'left',
            duration: 300,
            reverse: true,
            out: true
        },
        width: '100%',
        height: '100%',
        style: 'background:rgb(236, 237, 237)',
        items: [{
            xtype: 'toolbar',
            id: 'menutitle',
            cls: 'toolbar',
            ui: 'light',
            docked: 'top',
            height: 45,
            style: {
                'background': '#006dc6',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                iconAlign: 'left',
                iconCls: 'back p-ico',
                style: {
                    'background': '#006dc6',
                    'margin-left': '-10px',
                    'color': 'rgb(247, 244, 244)'
                },
                handler: function () {
                    // console.log(this.getParent().getParent().getId());
                    // console.log(this.getParent().getParent().getXTypes());
                    var searchview = this.getParent().getParent();
                    searchview.hide();
                    searchview.on('hide', function () {
                        searchview.destroy();
                    });
                }
            }]
        }, {
            xtype: 'formpanel',
            scrollable: true,
            style: {
                'background-color': 'rgb(44, 153, 210)'
            },
            flex: 1,
            height: '100%',
            items: [{
                xtype: 'fieldset',
                margin: '0 0 30 0',
                style: {
                    '-webkit-border-radius': '0',
                    'border-radius': '0'
                },
                defaults: {
                    labelWidth: '130px',
                    labelCls: 'detail-lable',
                    labelAlign: 'left',
                    inputCls: 'searchinput'
                },
                items: [{
                    xtype: 'datepickerfield',
                    id: 'starttime',
                    name: 'name',
                    label: '开始日期',
                    value: new Date(),
                    dateFormat: 'Y-m-d',
                    placeHolder: '开始日期',
                    picker: {
                        cancelButton: '取消',
                        doneButton: '确定',
                        useTitles: true,
                        yearText: '年',
                        monthText: '月',
                        dayText: '日',
                        slotOrder: ['year', 'month', 'day']
                    }
                }, {
                    xtype: 'datepickerfield',
                    id: 'endtime',
                    name: 'name',
                    label: '结束日期',
                    value: new Date(),
                    // dateFormat: 'Y-m-d H:i', // 日期 + 时间
                    dateFormat: 'Y-m-d',
                    picker: {
                        cancelButton: '取消',
                        doneButton: '确定',
                        useTitles: true,
                        yearText: '年',
                        monthText: '月',
                        dayText: '日',
                        slotOrder: ['year', 'month', 'day']
                    }
                }, {
                    xtype: 'textfield',
                    id: 'hotelname',
                    name: 'name',
                    label: '酒店名称',
                    placeHolder: '酒店名称'
                }, {
                    xtype: 'textfield',
                    id: 'address',
                    name: 'name',
                    label: '地址',
                    placeHolder: '地址'
                }, {
                    xtype: 'selectfield',
                    name: 'name',
                    label: '操作员',
                    placeHolder: '操作员',
                    options: [{
                        text: '张三', value: 'first'
                    }, {
                        text: '李四', value: 'second'
                    }, {
                        text: '王五', value: 'third'
                    }, {
                        text: '赵', value: 'third'
                    }, {
                        text: '五', value: 'third'
                    }, {
                        text: '王', value: 'third'
                    }, {
                        text: '五', value: 'third'
                    }, {
                        text: '王', value: 'third'
                    }]
                }]
            }, {
                xtype: 'button',
                id: 'SubmitSearch',
                iconAlign: 'top', // rgba(55, 112, 176,1)、rgb(15, 115, 227)
                style: {
                    'background-color': '#F2F2F2',
                    'background-image': '-webkit-linear-gradient(top, rgba(0, 0, 0, 0),rgba(0, 0, 0, 0) 3%,rgba(0, 0, 0, 0))',
                    'color': '#157efb',
                    'font-size': '1.3em',
                    'font-weight': '400',
                    'border': '1px solid #157efb',
                    'border-radius': '7px',
                    'margin-left': 'auto',
                    'margin-right': 'auto',
                    'width': '150px',
                    'height': '42px'
                },
                text: '查询'
            }]
        }]
    }
});