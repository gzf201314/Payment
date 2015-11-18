Ext.define('JajaApp.view.DetailActionSheet', {
    extend: 'Ext.Container',
    xtype: 'detailactionview',

    requires: [],

    config: {
        fullscreen: true,
        layout: 'vbox', //布局
        floating: true,
        modal: true,
        bottom: 0,
        centered: true,
        autoDestroy: true,
        width: '100%',
        //height: 199,
        height: 246,
        showAnimation: {
            type: 'slide',
            direction: 'up',
            duration: 300
        },
        hideAnimation: {
            type: 'slide',
            direction: 'up',
            duration: 300,
            reverse: true,
            out: true
        },
        style: 'background:rgb(236, 237, 237)',
        items: [{
            xtype: 'container',
            width: '100%',
            height: '100%',
            layout: 'vbox',
            style: {
                'background': 'rgb(239, 239, 239)'
            },
            items: [{
                xtype: 'container',
                layout: 'vbox',
                items: [{
                    xtype: 'button',
                    labelCls: 'lable-button',
                    style: {
                        'height': '48px',
                        'font-size': '1.2em',
                        'font-weight': '400',
                        'color': '#157efb',
                        'border-radius': '0px',
                        'border-top': '0px solid #157efb',
                        'border-left': '0px solid #157efb',
                        'border-right': '0px solid #157efb',
                        'border-bottom': '1px solid #d6d7d8',
                        'background-color': '#fff',
                        'background-image': 'none'
                    },
                    text: '重注册(延期)'
                }, {
                    xtype: 'button',
                    labelCls: 'lable-button',
                    style: {
                        'height': '48px',
                        'font-size': '1.2em',
                        'font-weight': '400',
                        'color': '#157efb',
                        'border-radius': '0px',
                        'border-top': '0px solid #157efb',
                        'border-left': '0px solid #157efb',
                        'border-right': '0px solid #157efb',
                        'border-bottom': '1px solid #d6d7d8',
                        'background-color': '#fff',
                        'background-image': 'none'
                    },
                    text: '申请正式码'
                }, {
                    xtype: 'button',
                    labelCls: 'lable-button',
                    style: {
                        'height': '48px',
                        'font-size': '1.2em',
                        'font-weight': '400',
                        'color': '#157efb',
                        'border-radius': '0px',
                        'border-top': '0px solid #157efb',
                        'border-left': '0px solid #157efb',
                        'border-right': '0px solid #157efb',
                        'border-bottom': '1px solid #d6d7d8',
                        'background-color': '#fff',
                        'background-image': 'none'
                    },
                    text: '复制注册码'
                }, {
                    xtype: 'button',
                    labelCls: 'lable-button',
                    style: {
                        'height': '48px',
                        'font-size': '1.2em',
                        'font-weight': '400',
                        'color': '#157efb',
                        'border-radius': '0px',
                        'border-top': '0px solid #157efb',
                        'border-left': '0px solid #157efb',
                        'border-right': '0px solid #157efb',
                        'border-bottom': '0px solid #d6d7d8',
                        'background-color': '#fff',
                        'background-image': 'none'
                    },
                    text: '转发注册码',
                    handler: function () {

                        Common.shareCode(); // 注册码转发
                        var register_add = this.getParent().getParent().getParent();


                        setTimeout(function () {
                            Common.back(register_add);
                        }, 500);
                    }
                }]
            }, {
                xtype: 'container',
                docked: 'bottom',
                layout: 'vbox',
                items: [{
                    xtype: 'button',
                    labelCls: 'lable-button',
                    style: {
                        'height': '48px',
                        'font-size': '1.2em',
                        'font-weight': '400',
                        'color': '#157efb',
                        'border-radius': '0px',
                        'border-top': '0px solid #d6d7d8',
                        'border-left': '0px solid #157efb',
                        'border-right': '0px solid #157efb',
                        'border-bottom': '0px solid #157efb',
                        'background-color': '#fff',
                        'background-image': 'none'
                    },
                    text: '取消',
                    handler: function () {
                        var register_add = this.getParent().getParent().getParent();
                        Common.back(register_add);
                    }
                }]
            }]
        }]
    }
});