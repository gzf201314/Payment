Ext.define('JajaApp.view.RegContact', {
    extend: 'Ext.Container',
    xtype: 'contact',

    requires: [],

    config: {
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
            title: '选择联系人',
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
                    var register_add = this.getParent().getParent();
                    register_add.hide();
                    register_add.on('hide', function () {
                        register_add.destroy();
                    });
                }
            }, {
                xtype: 'spacer'//空格
            }, {
                xtype: 'button',
                id: 'ChkContactButton',
                style: {
                    'background': '#0078d7',
                    'margin-left': '-10px',
                    'color': '#fff'
                },
                text: '保存',
                handler: function () {
                    var view = this.getParent().getParent();


                    var chkSet = view.query('fieldset')[0],
                     chks = chkSet.getItems(), arrs = [];
                    for (var i = 0; i < chks.length; i++) {
                        if (chks.getAt(i).isChecked()) {
                            arrs.push(chks.getAt(i).getValue());
                        }
                    }
                    console.log(arrs);
                    console.log(JSON.stringify(arrs));
                    console.log(arrs.toString());
                    Common.setValue('txtPhoneNumbers', arrs.toString());
                    view.hide();
                    view.on('hide', function () {
                        view.destroy();
                    });
                }
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

                    labelWidth: '70%',
                    lableAlign: 'left',
                    cls: 'contact-mask',
                    xtype: 'checkboxfield'
                }
            }]
        }]
    }
});