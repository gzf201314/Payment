//端口设置视图脚本文件
Ext.define('JajaApp.view.SysPage', {
    extend: 'Ext.Container',
    xtype: 'syspage',

    requires: ['Ext.XTemplate', 'JajaApp.store.DownloadStore'],

    config: {
        id: 'syspage',
        fullscreen: true,
        layout: 'hbox', //布局
        items: [
        {
            docked: 'top',
            ui: 'light',
            xtype: 'toolbar',
            cls: 'p-toolbar',
            title: '设置',
            style: 'font-size: 1.05em;',
            items: [{
                xtype: 'button',
                id: 'BackButton',
                iconAlign: 'left',
                iconCls: 'back p-ico p-roseRed',
                style: 'padding-left: 10px;margin-left:-5px;',

                text: '返回'
            }]
        }, {
            xtype: 'container',
            layout: 'vbox',
            style: 'height:100%;width:100%;',
            scrollable: {
                direction: 'vertical'
            },
            flex: 1,
            items: [{
                xtype: 'container',
                layout: 'hbox',
                style: 'height:50px;width:100%;',
                items: [{
                    xtype: 'container',
                    flex: 1
                }, {
                    xtype: 'container',
                    flex: 3
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                style: 'height:50px;width:100%;',
                items: [{
                    xtype: 'fieldset',
                    width: '95%',
                    centered: true,
                    margin: '.3em .0em 0em',
                    items: [{
                        xtype: 'textfield',
                        label: '服务器IP',
                        name: 'txtIpAddress',
                        id: 'txtIpAddress'
                    }]
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                style: 'height:50px;width:100%;',
                items: [{
                    xtype: 'fieldset',
                    width: '95%',
                    margin: '.3em .0em 0em',
                    centered: true,
                    items: [{
                        xtype: 'numberfield',
                        label: '服务器端口号',
                        minValue: 18,
                        maxValue: 150,
                        name: 'txtNumberPort',
                        id: 'txtNumberPort'
                    }]
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                style: 'height:60px;width:100%;border-top:10px solid #eeeeee;border-bottom:5px solid #eeeeee',
                items: [{
                    xtype: 'button',
                    id: 'btnDemo',
                    centered: false,
                    style: 'height:50px;width:150px;border-radius:0.4em;background-image: none;background-color: #5DC2A6;background-image: -webkit-linear-gradient(top, #5DC2A6,#5DC2A6 3%,#5DC2A6);border: 0px;color: rgb(253, 253, 253);left: 37px;',
                    text: '保存'
                }, {
                    xtype: 'button',
                    id: 'btnGenerateFile',
                    centered: false,
                    style: 'height:50px;width:150px;border-radius:0.4em;background-image: none;background-color: #5DC2A6;background-image: -webkit-linear-gradient(top, #5DC2A6,#5DC2A6 3%,#5DC2A6);border: 0px;color: rgb(253, 253, 253);right: 37px;',
                    text: '生成文件'
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                style: 'height:50px;width:100%;',
                items: [{
                    xtype: 'fieldset',
                    width: '95%',
                    margin: '.3em .0em 0em',
                    centered: true,
                    items: [{
                        xtype: 'checkboxfield',
                        label: '清除全部数据和图片',
                        value: 'chkClearAll',
                        name: 'chkClearAll',
                        id: 'chkClearAll'
                    }]
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                style: 'height:50px;width:100%;',
                items: [{
                    xtype: 'fieldset',
                    width: '95%',
                    margin: '.3em .0em 0em',
                    centered: true,
                    items: [{
                        xtype: 'checkboxfield',
                        label: '演示模式',
                        value: 'chkDemo',
                        name: 'chkDemo',
                        id: 'chkDemo'
                    }]
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                style: 'height:50px;width:100%;',
                items: [{
                    xtype: 'fieldset',
                    width: '95%',
                    margin: '.3em .0em 0em',
                    centered: true,
                    items: [{
                        xtype: 'checkboxfield',
                        label: '纯菜谱模式',
                        value: 'chkMenuMode',
                        name: 'chkMenuMode',
                        id: 'chkMenuMode'
                    }]
                }]
            }]
        }]
    }
});