

Array.prototype.max = function () {   //最大值
    return Math.max.apply({}, this)
}

Array.prototype.min = function () {   //最小值
    return Math.min.apply({}, this)
}

Array.prototype.remove = function (value) { // 删除数组中指定的数组元素
    var len = this.length;
    for (var i = 0, n = 0; i < len; i++) {
        if (this[i] != value) {
            this[n++] = this[i]; // 把除了要删除的数组元素都赋给新数组
        }
    }
    this.length = n;
}


Array.prototype.merge = function (arrs) { // 两个数组进行合并并去除重复的内容
    var len = this.length;
    var arr1 = this;
    for (var i = 0, n = 0; i < len; i++) {
        this[n++] = this[i];
    }
    this.length = n;

    var flag;
    for (var j = 0, g = this.length; j < arrs.length; j++) {
        flag = false;
        for (var m = 0; m < arr1.length; m++) {
            if (arrs[j] == arr1[m]) {
                flag = true;
                break;
            }
        }

        if (!flag) {
            this[g++] = arrs[j];
        }
    }
    this.length = g;
}

//[1, 2, 3].max()// => 3 
//[1, 2, 3].min()// => 1

Array.max = function (array) {
    return Math.max.apply(Math, array);
}

Array.min = function (array) {
    return Math.min.apply(Math, array);
}


//var testArray = [1, 2, 3, 4];
//Array.min(testArray);   //==>1
//Array.max(testArray);   //==>4 


/**
*  String
*/
String.format = function () {
    if (arguments.length == 0) return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

/**
*  判断一个对象是否为数组
*/

//Object.prototype.isObject = function () {
//    console.log(this);
//   // return Object.prototype.toString.call(this);
//}
//Object.foo = function () {
//    alert("f00 Object");
//};

//Object.prototype.toString = function () {
//    alert("d");
//}



