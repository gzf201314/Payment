Ext.define("util.Time", {
    alternateClassName: "Time",
    singleton: true,
    config: {
        description: '加加餐饮软件'
    },
    /*
    *  构造函数
    */
    constructor: function (config) {
        this.initConfig(config);
    },
    /*
    *  创建Date对象
    */
    create: function () {
        var date = new Date();
        var data = {};
        data.year = date.getFullYear();
        data.month = date.getMonth() + 1;
        data.day = date.getDate();
        data.hour = date.getHours();
        data.minute = date.getMinutes();
        data.second = date.getSeconds();
        data.milSecond = date.getMilliseconds();
        data.monthSTR = data.month > 9 ? data.month : ('0' + data.month); //月
        data.daySTR = data.day > 9 ? data.day : ('0' + data.day); //日
        data.hourSTR = data.hour > 9 ? data.hour : ('0' + data.hour); //时
        data.minuteSTR = data.minute > 9 ? data.minute : ('0' + data.minute); //分
        data.secondSTR = data.second > 9 ? data.second : ('0' + data.second);
        data.milSecondSTR = data.milSecond.toString().length > 2 ? data.milSecond : ('0' + data.milSecond);
        data.divid = data.year + "+" + data.monthSTR + "+" + data.daySTR + "+" + data.hourSTR + "+" + data.minuteSTR + "+" + data.secondSTR + "+" + data.milSecondSTR;

        // console.log(data);

        return data;
    },
    // 1个月之后的今天
    getDelayOneMonth: function (date) {
    var data_date = this.create(),
         data = date.split('-'), year = parseInt(data[0]), month = parseInt(data[1]) + 1, day = data[2];
        if (month > 12) {
            year += 1;
            month = month % 12;
        }
        var monthSTR = month > 9 ? month : ('0' + month); //月
        return year + "-" + monthSTR + "-" + day + " " + data_date.hourSTR + ":" + data_date.minuteSTR + ":" + data_date.secondSTR; ;
    },
    // 三个月之后的今天
    getDelayTime: function (argument) {
        var data = this.create(),
        year = data.year, month = data.month + argument;
        if (month > 12) {
            year += 1;
            month = month % 12;
        }
        var monthSTR = month > 9 ? month : ('0' + month); //月
        return year + "-" + monthSTR + "-" + data.daySTR + " " + data.hourSTR + ":" + data.minuteSTR + ":" + data.secondSTR;
    },
    // 获取时间字符串
    getTimeString: function () {
        var data = this.create(),
            dateTimeString = data.year + data.monthSTR + data.daySTR + data.hourSTR + data.minuteSTR + data.secondSTR + data.milSecondSTR;

        return dateTimeString;
    },
    // 长
    GetDateLongTime: function () {
        var data = this.create();
        return data.year + "-" + data.monthSTR + "-" + data.daySTR + " " + data.hourSTR + ":" + data.minuteSTR + ":" + data.secondSTR + ":" + data.milSecondSTR;
    },
    // 短
    GetDateShortTime: function () {
        var data = this.create();
        return data.year + "-" + data.monthSTR + "-" + data.daySTR + " " + data.hourSTR + ":" + data.minuteSTR + ":" + data.secondSTR;
    },
    GetDate: function () {//试用期限
        //  return trydate;
    }
});