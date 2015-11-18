Ext.define('JajaApp.view.Version', {
    extend: 'Ext.Container',
    xtype: 'versionview',

    requires: [],

    config: {
        id: 'versionview',
        fullscreen: true,
        layout: 'vbox', //布局
        left: 0,
        top: 0,
        autoDestroy: true,
        width: '100%',
        height: '100%',
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
        style: 'background:rgb(236, 237, 237)',
        items: [{
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            docked: 'top',
            height: 44,
            title: '版本选择',
            style: {
                'background': '#0078d7',
                'border-top': '0px',
                'border-bottom-width': '0px'
            },
            items: [{
                xtype: 'button',
                ui: 'back',
                style: {
                    'background': '#0078d7',
                    'margin-left': '-10px',
                    'color': '#fff'
                },
                text: '返回',
                handler: function () {
                    var systype = this.getParent().getParent();
                    systype.hide();
                    systype.on('hide', function () {
                        systype.destroy();
                    });
                }
            }, {
                xtype: 'spacer'//空格
            }]
        }, {
            xtype: 'container',
            width: '100%',
            height: '100%',
            scrollable: {
                direction: 'vertical',
                indicators: false
            },
            items: [{
                xtype: 'fieldset',
                margin: 0,
                width: '100%',
                style: {
                    '-webkit-border-radius': '0',
                    'border-radius': '0'
                },
                defaults: {
                    labelWidth: '50%',
                    lableAlign: 'left',
                    xtype: 'radiofield'
                }
            }]
        }]
    }
});