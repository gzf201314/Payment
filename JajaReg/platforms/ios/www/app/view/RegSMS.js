var contactButton = {
    'background-image': 'none',
    'background-color': 'rgb(255, 255, 255)',
    'text-align': 'left',
    'border': '0px solid',
    'border-bottom': '1px solid rgb(221, 221, 221)',
    'border-radius': '0px',
    'font-weight': '400'
};
var sendButton = {
    'font-size': '1.2em',
    'font-weight': '500',
    'color': '#fff',
    'border-radius': '6px',
    'border': '0px',
    'border-right': '1px solid rgb(228, 228, 228)',
    // 'background-color': '#45c01a',
    'background-color': 'rgb(133,209,109)',
    'background-image': 'none',
    'margin-top': '20px',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'width': '93%'
};


Ext.define('JajaApp.view.RegSMS', {
    extend: 'Ext.Container',
    xtype: 'sms',

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
            title: '短信',
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
                    Common.back(this.getParent().getParent()); // 隐藏当前视图并返回
                }
            }, {
                xtype: 'spacer'//空格
            }]
        }, {

            xtype: 'formpanel',
            width: '100%',
            height: 180,
            scrollable: false,
            style: {
                'background-color': 'rgb(44, 153, 210)'
            },
            items: [{
                xtype: 'fieldset',
                margin: 0,
                width: '100%',
                style: {
                    '-webkit-border-radius': '0',
                    'border-radius': '0'
                },
                items: [{
                    xtype: 'container',
                    height: 40,
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        id: 'txtPhoneNumbers',
                        flex: 1,
                        name: 'name',
                        placeHolder: '选择联系人'
                    }, {
                        xtype: 'button',
                        style: {
                            'font-size': '1.2em',
                            'font-weight': '500',
                            'color': 'rgb(115, 116, 114)',
                            'border-radius': '0px',
                            'border': '1px solid rgb(114, 193, 255)',
                            'background-color': '#fff',
                            'background-image': 'none'
                        },
                        labelCls: 'sendCls',
                        text: '选择',
                        handler: function () {
                            var contacts = new JajaApp.view.RegContact();
                            Ext.Viewport.add(contacts);
                            contacts.show();
                            var contact_list = contacts.query('fieldset')[0];

                            contacts.on({
                                delegate: 'checkboxfield',
                                check: function () {
                                    var chks = contact_list.getItems();
                                    var chkSum = 0;
                                    for (var i = 0; i < chks.length; i++) {

                                        if (chks.getAt(i).isChecked())
                                            chkSum += 1;
                                    }
                                    if (chkSum > 0) {
                                        Ext.getCmp('ChkContactButton').setHidden(false);
                                    }

                                }
                            });
                            contacts.on({
                                delegate: 'checkboxfield',
                                uncheck: function () {
                                    var chks = contact_list.getItems();
                                    var sum = 0;
                                    for (var i = 0; i < chks.length; i++) {

                                        if (!chks.getAt(i).isChecked()) {
                                            sum += 1;
                                        }
                                    }

                                    if (sum == (chks.length - 1)) {
                                        console.log(sum);
                                        Ext.getCmp('ChkContactButton').setHidden(true);
                                    }
                                }
                            });

                            Progress.start("正在加载,请稍后...");
                            setTimeout(function () {
                                /*
                                // 测试
                                var arrs = [1, 2, 3, 4, 5, 6];
                                for (var i = 0; i < arrs[i]; i++) {
                                var temp = {
                                name: 'color',
                                labelAlign: 'left',
                                label: "姓名:刘总</br>电话:13305329822",
                                value: "13305329822" + arrs[i]
                                };

                                contact_list.add(temp);
                                }
                                Progress.close();
                                */
                                // 加在电话薄
                                Contact.find(function (list) {
                                    //迭代获取 联系人和号码
                                    for (var i = 0; list[i]; i++) {
                                        var temp = {
                                            name: 'color'
                                        };

                                        for (var j = 0; list[i].phone[j]; j++) {
                                            temp.label = "姓名:" + list[i].name + " </br> 电话:" + list[i].phone[j].value
                                            temp.value = list[i].phone[j].value;
                                            // alert(list[i].name + "--" + list[i].phone[j].type + "--" + list[i].phone[j].value);
                                            // items.push(temp);
                                            contact_list.add(temp);
                                        };
                                    };
                                    Progress.close();
                                });
                            }, 200);
                        }
                    }]
                }, {
                    labelWidth: '31%',
                    inputCls: 'inputstyle',
                    readOnly: true,
                    xtype: 'textareafield',
                    id: 'txtRegSMS',
                    name: 'name',
                    label: '注册码',
                    maxRows: 6,
                    placeHolder: '永和豆浆\\新乡市银马口家乐福楼下\\41717965413620919080940000320575\\2用户试用增强版'
                }]
            }]
        }, {
            xtype: 'button',
            border: 0,
            'color': '#fff',
            style: sendButton,
            labelCls: 'sendCls',
            text: '发送',
            handler: function () {

                var txtPhones = Ext.getCmp('txtPhoneNumbers').getValue();
                console.log(txtPhones);
                if (txtPhones == null || txtPhones == "") {
                    // notification.alert("提示", "联系人不能为空!");
                    navigator.notification.alert("联系人不能为空!", function () { }, '提示', '确定');
                    return;
                }

                /*
                if(SMS) SMS.sendSMS("+8613612345678", "hello, raymond", function(){}, function(){});

                if(SMS) SMS.sendSMS(["+8613612345678", "+8613987654321"], "hello, raymond", function(){}, function(){});
                */


                if (txtPhones.indexOf(',') >= 0) {
                    var phones = txtPhones.split(',');
                    if (SMS) SMS.sendSMS(phones, "永和豆浆\\新乡市银马口家乐福楼下\\41717965413620919080940000320575\\2用户试用增强版", function () {
                        //notification.alert("提示", "发送成功");
                        navigator.notification.alert("注册码发送成功", function () { }, '提示', '确定');
                    }, function () {

                        navigator.notification.alert("注册码发送失败", function () { }, '提示', '确定');
                    });
                }
                else {
                    if (SMS) {
                        SMS.sendSMS(txtPhones, "永和豆浆\\新乡市银马口家乐福楼下\\41717965413620919080940000320575\\2用户试用增强版", function () {

                            navigator.notification.alert("注册码发送成功", function () { }, '提示', '确定');
                        }, function () {
                            navigator.notification.alert("注册码发送失败", function () { }, '提示', '确定');
                        });
                    }
                }
                notification.alert("提示", "发送成功");
                Common.back(this.getParent()); // 隐藏当前视图并返回
            }
        }]
    }
});