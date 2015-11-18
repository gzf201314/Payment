//主视图文件

var Color = {
    backgroundColor: 'rgb(230,84,35)',
    textColor: 'rgb(195,72,30)',
    buttonColor: 'rgb(239,85,35)'
}
var Border = {
    top: { 'border-top': '1px solid rgb(222, 223, 224)' },
    right: { 'border-right': '1px solid rgb(222, 223, 224)' }
};
var containers = {
    marginLeft: {
        'margin-left': '10px',
        'margin-top': '10px',
        'margin-right': '0px',
        'margin-bottom': '0px',
        'border-left': '1px solid #DEDFE0'
    },
    marginRight: {
        'background': 'rgb(255, 255, 255)',
        'margin-left': '0px',
        'margin-top': '0px',
        'margin-right': '10px',
        'margin-bottom': '10px'
    },
    paddingLeft: {
        'padding-left': '40px'
    }
};
var Radius = {
    defaultRadius: '50%',
    shouKuanRadius: '6px'
}


var buttonStyle = {
    defaultStyle: {
        'width': '100%',
        'height': '100%',
        'font-size': '1.3em',
        'font-weight': '500',
        'color': '#157efb',
        'border-radius': Radius.defaultRadius,
        'border': '0px solid rgb(222, 223, 224)',
        'background-color': '#fff',
        'background-image': 'none'
    },
    deleteStyle: {
        'width': '100%',
        'height': '100%',
        'font-size': '1.3em',
        'font-weight': '500',
        'color': '#157efb',
        'border-radius': Radius.defaultRadius,
        'border': '0px solid rgb(222, 223, 224)',
        'background-color': 'rgb(247, 239, 247)',
        'background-image': 'none'
    },
    clearStyle: {
        'width': '100%',
        'height': '100%',
        'font-size': '1.3em',
        'font-weight': '500',
        'color': '#157efb',
        'border-radius': Radius.defaultRadius,
        'border': '0px solid rgb(222, 223, 224)',
        'background-color': 'rgb(247, 239, 247)',
        'background-image': 'none'
    },
    shouKuanStyle: {
        'width': '100%',
        'height': '100%',
        'font-size': '1.3em',
        'font-weight': '500',
        'color': '#157efb',
        'border-radius': Radius.shouKuanRadius,
        'border': '0px solid rgb(222, 223, 224)',
        'background-color': Color.buttonColor,
        'background-image': 'none'
    }
}

Ext.define('JajaApp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',

    requires: [
       'Ext.XTemplate'
       ],

    config: {
        id: 'mainview',
        fullscreen: true,
        layout: 'vbox', //布局
        width: '100%',
        height: '100%',
        autoDestroy: true,
        items: [{
            xtype: 'toolbar',
            cls: 'toolbar',
            ui: 'light',
            docked: 'top',
            title: '收款宝手机版',
            height: 44,
            style: {
                'background': Color.backgroundColor,
                'border-top': '0px',
                'border-bottom-width': '0px'
            }, items: [{
                xtype: 'button',
                id: 'UserCenterButton',
                iconCls: 'user p-ico p-roseRed',
                style: {
                    'background': Color.backgroundColor,
                    'margin-left': '-3px',
                    'color': '#fff'
                }
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                id: 'RecordButton',
                iconCls: 'record p-ico p-roseRed',
                style: {
                    'background': Color.backgroundColor,
                    'margin-right': '-3px',
                    'color': '#fff'
                }
            }]
        }, {
            xtype: 'container',
            id: 'tabContainer',
            autoDestroy: true,
            flex: 1,
            layout: 'vbox',
            items: [{
                xtype: 'container',
                style: {
                    'background': Color.backgroundColor
                },
                flex: 1,
                items: [{
                    xtype: 'fieldset',
                    margin: 0,
                    width: '100%',
                    style: {
                        '-webkit-border-radius': '0',
                        'border-radius': '0',
                        'padding': '10px'
                    },
                    defaults: {
                        labelWidth: '37%',
                        height: 55,
                        labelCls: 'reg-lable',
                        inputCls: 'inputstyle'
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'txtPosName',
                        id: "txtPos",
                        readOnly: true,
                        clearIcon: false,
                        label: '消费总金额',
                        style: {
                            'background': Color.textColor,
                            'line-height': '55px',
                            'color': 'white'
                        },
                        placeHolder: '请输入'
                    }]
                }]
            }, {
                xtype: 'container',
                id: 'resultcontainer',
                style: containers.marginRight,
                layout: 'vbox',
                flex: 2,
                items: [{
                    xtype: 'container',
                    flex: 1,
                    layout: 'hbox',
                    items: [{
                        xtype: 'container',
                        flex: 1,
                        style: containers.marginLeft,
                        items: [{
                            xtype: 'button',
                            centered: true,
                            id: 'seven',
                            pressedCls: 'one-button-pressing',
                            pressedDelay: true,
                            labelCls: 'bao-lable-button',
                            style: buttonStyle.defaultStyle,
                            text: '7'
                        }]

                    }, {
                        xtype: 'container',
                        flex: 1,
                        style: containers.marginLeft,
                        items: [{
                            xtype: 'button',
                            centered: true,
                            id: 'eight',
                            labelCls: 'bao-lable-button',
                            style: buttonStyle.defaultStyle,
                            text: '8'
                        }]
                    }, {
                        xtype: 'container',
                        flex: 1,
                        style: containers.marginLeft,
                        items: [{
                            xtype: 'button',
                            centered: true,
                            id: 'nine',
                            labelCls: 'bao-lable-button',
                            style: buttonStyle.defaultStyle,
                            text: '9'
                        }]
                    }, {
                        xtype: 'container',
                        flex: 1,
                        style: containers.marginLeft,
                        items: [{
                            xtype: 'button',
                            centered: true,
                            id: 'delete',
                            labelCls: 'bao-lable-button',
                            style: buttonStyle.deleteStyle,
                            text: '删除'
                        }]
                    }]
                }, {
                    xtype: 'container',
                    flex: 1,
                    layout: 'hbox',
                    style: Border.top,
                    items: [{
                        xtype: 'container',
                        flex: 1,
                        style: containers.marginLeft,
                        items: [{
                            xtype: 'button',
                            centered: true,
                            id: 'four',
                            labelCls: 'bao-lable-button',
                            style: buttonStyle.defaultStyle,
                            text: '4'
                        }]
                    }, {
                        xtype: 'container',
                        flex: 1,
                        style: containers.marginLeft,
                        items: [{
                            xtype: 'button',
                            centered: true,
                            id: 'five',
                            labelCls: 'bao-lable-button',
                            style: buttonStyle.defaultStyle,
                            text: '5'
                        }]
                    }, {
                        xtype: 'container',
                        flex: 1,
                        style: containers.marginLeft,
                        items: [{
                            xtype: 'button',
                            centered: true,
                            id: 'six',
                            labelCls: 'bao-lable-button',
                            style: buttonStyle.defaultStyle,
                            text: '6'
                        }]
                    }, {
                        xtype: 'container',
                        flex: 1,
                        style: containers.marginLeft,
                        items: [{
                            xtype: 'button',
                            centered: true,
                            id: 'clear',
                            labelCls: 'bao-lable-button',
                            style: buttonStyle.clearStyle,
                            text: '清空'
                        }]
                    }]
                }, {
                    xtype: 'container',
                    flex: 2,
                    layout: 'hbox',
                    style: Border.top,
                    items: [{
                        xtype: 'container',
                        flex: 3,
                        id: 'pointContiner',
                        style: containers.paddingLeft,
                        layout: 'vbox',
                        items: [{
                            xtype: 'container',
                            flex: 1,
                            layout: 'hbox',
                            items: [{
                                xtype: 'container',
                                flex: 1,
                                style: containers.marginLeft,
                                items: [{
                                    xtype: 'button',
                                    centered: true,
                                    id: 'one',
                                    labelCls: 'bao-lable-button',
                                    style: buttonStyle.defaultStyle,
                                    text: '1'
                                }]
                            }, {
                                xtype: 'container',
                                flex: 1,
                                style: containers.marginLeft,
                                items: [{
                                    xtype: 'button',
                                    centered: true,
                                    id: 'two',
                                    labelCls: 'bao-lable-button',
                                    style: buttonStyle.defaultStyle,
                                    text: '2'
                                }]
                            }, {
                                xtype: 'container',
                                flex: 1,
                                style: containers.marginLeft,
                                items: [{
                                    xtype: 'button',
                                    centered: true,
                                    id: 'three',
                                    labelCls: 'bao-lable-button',
                                    style: buttonStyle.defaultStyle,
                                    text: '3'
                                }]
                            }]
                        }, {
                            xtype: 'container',
                            flex: 1,
                            layout: 'hbox',
                            style: Border.top,
                            items: [{
                                xtype: 'container',
                                flex: 1,
                                style: containers.marginLeft,
                                items: [{
                                    xtype: 'button',
                                    centered: true,
                                    id: 'zero',
                                    labelCls: 'bao-lable-button',
                                    style: buttonStyle.defaultStyle,
                                    text: '0'
                                }]
                            }, {
                                xtype: 'container',
                                flex: 1,
                                style: containers.marginLeft,
                                items: [{
                                    xtype: 'button',
                                    centered: true,
                                    id: 'point',
                                    labelCls: 'bao-lable-button',
                                    style: buttonStyle.defaultStyle,
                                    text: '.'
                                }]
                            }, {
                                xtype: 'container',
                                flex: 1,
                                style: containers.marginLeft,
                                items: [{
                                    xtype: 'button',
                                    centered: true,
                                    id: 'add',
                                    labelCls: 'bao-lable-button',
                                    style: buttonStyle.defaultStyle,
                                    text: '+'
                                }]
                            }]
                        }]
                    }, {
                        xtype: 'container',
                        flex: 1,
                        style: containers.marginLeft,
                        items: [{
                            xtype: 'button',
                            id: 'collection',
                            centered: true,
                            iconAlign: 'top',
                            iconCls: 'sao p-ico p-roseRed',
                            labelCls: 'bao-lable-button-sum',
                            style: buttonStyle.shouKuanStyle,
                            text: '收款'
                        }]
                    }]
                }]
            }]
        }]
    }
});