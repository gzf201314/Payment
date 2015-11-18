Ext.define('JajaApp.view.Modules', {
    extend: 'Ext.Container',
    xtype: 'modulesview',

    requires: [],

    config: {
        id: 'modulesview',
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
            title: '模块选择',
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
                text: '确定',
                handler: function () {
                    // 存储已选的模块编号以及名称 ---使用本地存储
                    var data = Ext.ComponentQuery.query('checkboxfield');
                    var moduleValues = "", moduleId = "";
                    var SysModules = {};
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].isChecked() && (data[i].getXTypes().indexOf('radiofield') < 0)) {
                            // component/field/checkboxfield/radiofield
                            moduleValues += data[i].getValue();
                            moduleValues += ",";

                            moduleId += data[i].getId();
                            moduleId += ",";
                            console.log(data[i].getId());
                        }
                    }

                    var str = moduleValues,
                        newStr = str.substring(0, str.length - 1),
                        newModuleID = moduleId.substring(0, moduleId.length - 1);

                    SysModules.ModuleID = newModuleID;
                    SysModules.Module = newStr;

                    // 使用本地存储来讲编号ID进行存储
                    localStorage.setItem("modules", JSON.stringify({
                        ModuleID: SysModules.ModuleID,
                        RegSystemID: localStorage.getItem("SysID")
                    }));

                    // 更新添加视图中的模块内容
                    if (Ext.getCmp('ModuleButton')) {
                        Ext.getCmp('ModuleButton').setValue(SysModules.Module);
                    }
                    
                    if (Ext.getCmp('txtProxyDetailModules')) {
                        Ext.getCmp('txtProxyDetailModules').setValue(SysModules.Module);
                    }

                    if (Ext.getCmp('txtAskDetailModules')) {
                        Ext.getCmp('txtAskDetailModules').setValue(SysModules.Module);
                    }


                    // 获取当前视图并将其隐藏然后销毁
                    var modules = this.getParent().getParent();
                    modules.hide();
                    modules.on('hide', function () {
                        modules.destroy();
                    });
                }
            }, {
                xtype: 'spacer'//空格
            }]
        }, {
            xtype: 'container',
            flex: 1,
            scrollable: {
                direction: 'vertical',
                indicators: false
            },
            items: [{
                xtype: 'fieldset',
                margin: 0,
                style: {
                    '-webkit-border-radius': '0',
                    'border-radius': '0'
                },
                defaults: {
                    xtype: 'checkboxfield',
                    labelWidth: '70%',
                    lableAlign: 'left',
                    inputCls: 'inputstyle'
                }
            }]
        }]
    }
});