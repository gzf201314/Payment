Ext.define('JajaApp.view.SearchApply', {
    extend: 'Ext.Container',
    xtype: 'searchapply',

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
            height: 60,
            style: {
                'background': 'rgba(55, 112, 176,1)',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                id: 'backsearch',
                iconAlign: 'left',
                iconCls: 'back p-ico',
                style: {
                    'background': 'rgb(55, 112, 176)',
                    'color': 'rgb(247, 244, 244)'
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
                margin: '30 0 30 0',
                style: {
                    '-webkit-border-radius': '0',
                    'border-radius': '0'
                },
                defaults: {
                    labelWidth: '130px'
                },
                items: [{
                    xtype: 'datepickerfield',
                    id: 'starttime',
                    name: 'name',
                    label: '开始日期',
                    value: new Date(),
                    dateFormat: 'Y-m-d',
                    picker: {
                        cancelButton: '取消',
                        doneButton: '确定',
                        useTitles: true,
                        yearText: '年',
                        monthText: '月',
                        dayText: '日',
                        slotOrder: ['year', 'month', 'day']
                    },
                    style: {
                        'background': 'red'
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
                    },
                    style: {
                        'background': 'red'
                    }
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
                    'width': '260px',
                    'height': '50px'
                },
                text: '查询'
            }]
        }]
    }
});