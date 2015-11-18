/**
*  https://github.com/brodysoft/Cordova-SQLitePlugin
*/
Ext.define("util.DB", {
    alternateClassName: "DBFactory",
    singleton: true,
    config: {
        db: null,
        version: '1.0',
        dbName: 'JajaCy01',
        description: '加加餐饮软件',
        error: null,
        size: 1024 * 1024 * 5
    },

    constructor: function (config) {
        this.initConfig(config);
    },

    connectionDB: function () {
        var me = this,
            dbName = me.getDbName(),
            version = me.getVersion(),
            description = me.getDescription(),
            size = me.getSize(),
            platform = Ext.device.Device.platform,
            suportPlatform = [],
            db = null;

        if (!(window.openDatabase || window.sqlitePlugin)) {
            Ext.Msg.alert('不支持sqlite');
            return;
        }
        //console.log(platform);
        //console.log(suportPlatform.indexOf(platform));
        if (window.sqlitePlugin && suportPlatform.indexOf(platform) == -1) {
            console.log(platform);
            // Ext.toast('数据库插件创建成功');
            console.log('数据库插件创建成功');
            db = window.sqlitePlugin.openDatabase({ name: dbName + '.db' });
        } else {
            // Ext.toast('数据库插件创建失败');
            console.log('数据库插件创建失败');
            db = window.openDatabase(dbName, version, description, size, function () {
                //数据库若存在  不会执行这句
                me.createTable();
            });
        }


        if (!db) {
            Ext.Msg.alert('不支持sqlite');
            return;
        }

        me.setDb(db);
        me.createTable();
    },
    /**
    创建表
    */
    createTable: function () {
        var me = this,
            db = me.getDb();
        db.transaction(function (tx) {
            //tx.executeSql('DROP TABLE IF EXISTS test_table');
            //tx.executeSql('create table if not exists T_MOBILE_TRANSLOG (blockList TEXT)', [], me.success, me.failure);
            tx.executeSql('create table if not exists T_MOBILE_TplPage (PageIndex INTEGER PRIMARY KEY,PageID TEXT,ClassID TEXT,PageConfig TEXT)', [], me.success, me.failure);
            tx.executeSql('create table if not exists T_MOBILE_Temp (PageIndex INTEGER PRIMARY KEY,PageID TEXT,ClassID TEXT,PageConfig TEXT)', [], me.success, me.failure); //临时表
            /*
            菜品表：mn_Menu
            菜品编号  菜品名称   编码   菜品类别编号  单位      原价          现价        是否显示  备注
            MenuID   MenuName  BianMa  ClassID     MenuUnit NormalPrice  MemberPrice    IsShow   Remark
            01001    糖醋排骨    TCPG     01          份        10            5           true     描述
            */
            tx.executeSql('create table if not exists mn_Menu (listIndex INTEGER PRIMARY KEY,MenuID TEXT,MenuName TEXT,BianMa TEXT,ClassID TEXT,MenuUnit TEXT,NormalPrice TEXT,MemberPrice TEXT,Remark TEXT,IsShow BOOL)', [], me.success, me.failure); //菜品表---mn_Menu

            /*
            菜品类别表：mn_SmallClass
            listIndex  类别编号    类别名称     编码   
            1          ClassID   ClassIName   BianMa  isStop
            主键         01         热菜         RC    true
            */
            tx.executeSql('create table if not exists mn_SmallClass (listIndex INTEGER PRIMARY KEY,ClassID TEXT,ClassName TEXT,BianMa TEXT,isStop BOOL)', [], me.success, me.failure); //菜品类表---mn_SmallClass

            /*
            菜品订单表mn_Orders
            序号   菜品编号   菜品名称   编码  类别名称  数量    单位  只数MenuCount     单价  （MenuOperation）  备注
            index  MenuID    MenuName  BianMa ClassID   10      份    2                10       等叫操作     口味
            */
            tx.executeSql('create table if not exists mn_Orders (listIndex INTEGER PRIMARY KEY,MenuID TEXT,MenuName TEXT,BianMa TEXT,ClassName TEXT,Numbers INTEGER,MenuUnit TEXT,MenuCount TEXT,UnitPrice TEXT,MenuOperation TEXT,Remark TEXT)', [], me.success, me.failure); //菜品订单表---mn_Orders

            /*
            客户要求表mn_Request
            序号   Request编号   Request名称  RequestTypeID  编码  
            index  RequestID     RequestName       1         BianMa 
            */
            tx.executeSql('create table if not exists mn_Request (listIndex INTEGER PRIMARY KEY,RequestID TEXT,RequestName TEXT,RequestTypeID INTEGER,BianMa TEXT)', [], me.success, me.failure); //菜品订单表---mn_Request

            /*
            桌台表tb_Table
            */
            tx.executeSql('create table if not exists tb_Table (TableID TEXT PRIMARY KEY,TableName TEXT,TableTypeID TEXT,TableAreaID TEXT,TableState INTEGER,AllowPeople INTEGER)', [], me.success, me.failure); //桌台表---tb_Table

            /**
            菜品轮播表:mn_Carousel
            序号   编号          文本
            index  CarouselID    CarouselData
            1      002           02
            */
            tx.executeSql('create table if not exists mn_Carousel (listIndex INTEGER PRIMARY KEY,CarouselID TEXT,CarouselData TEXT)', [], me.success, me.failure); //菜品轮播表---mn_Carousel

            /**
            mn_Images:用来存储图片
            序号        编号      取向            二进制文本
            listindex   ImageID  Orientation     ImageData
            */
            // tx.executeSql('create table if not exists mn_Images (listIndex INTEGER PRIMARY KEY,ImageID TEXT,ClassID TEXT,Orientation TEXT,ImageData TEXT)', [], me.success, me.failure); //菜品轮播表---mn_Images

            /**
            *使用临时表进行存储一点菜品
            *mn_Order_temp：订单临时表
            *listIndex		tb_name			tb_data
            *1				第一批			"[{}]"
            */
            tx.executeSql('create table if not exists mn_Order_temp (listIndex INTEGER PRIMARY KEY,tb_name TEXT,tb_data TEXT)', [], me.success, me.failure); //订单临时表---mn_Order_temp

            //{"MenuID":"01001","ClassID":"01","PageID":"1","LocationID":1,"TemplateID":"1001"}
            tx.executeSql('create table if not exists mn_Config (MenuID TEXT PRIMARY KEY,ClassID TEXT,PageID TEXT,LocationID INTEGER,TemplateID TEXT)', [], me.success, me.failure); //配置临时表---mn_Config
            //mn_ConfigTemp:配置临时文件表
            //MenuID,MenuName,ClassID,PageID,TemplateID,LocationID, ImgID, ImgSrc, NormalPrice, MemberPrice, MenuUnit,MenuRemark
            tx.executeSql('create table if not exists mn_ConfigTemp (MenuID TEXT PRIMARY KEY,ClassID TEXT,PageID TEXT,LocationID INTEGER,TemplateID TEXT)', [], me.success, me.failure); //配置临时表---mn_ConfigTemp
            //tx.executeSql('create table if not exists T_MOBILE_HISTORY (blockList TEXT,part TEXT,times INTEGER,USERID text)', [], me.success, me.failure);

            //tx.executeSql('DROP TABLE IF EXISTS test_table');
            // tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');
        });
    },
    /**
    *  
    *  forms  :　object对象,el. {name : '张三',age : 15}
    *  fn     :  回调方法
    */
    login: function (forms, fn) {
        var me = this,
            db = me.getDb(),
            sql = "select * from T_SYSTEM_SYSUSER where USER_NAME=? and PASSWORD=?";
        db.transaction(function (tx) {
            tx.executeSql(sql, [forms.USER_NAME, forms.PASSWORD], (function (tx, result) {
                var arrs = me.querySuccess(tx, result);
                fn(arrs);
            }), function () {
                Ext.toast('请更新数据');
            });
        });
    },
    excute: function (sqls, success, failure) {
        var me = this,
            db = me.getDb();
        db.transaction(function (tx) {
            for (var i = 0, len = sqls.length; i < len; i++) {
                tx.executeSql(sqls[i].sqlContent, sqls[i].values, me.success, me.failure);
            }
        }, failure, success);
        /*var count = sqls.length/1000;
        var out = sqls%1000;
        var len = 0;
        for(var i = 1;i<=count+1;i++){
        db.transaction(function(tx){
        for(var j = 0;j<1000;j++){
        if(len<sqls.length){
        tx.executeSql(sqls[len].sqlContent,sqls[len].values,me.success,me.failure);      
        len++;
        }                    
        }
        },failure,success);
        }*/
    },
    excuteError: function (sqls, success, failure) {
        var me = this,
            db = me.getDb();
        for (var i = 0, len = sqls.length; i < len; i++) {
            (function (j) {
                db.transaction(function (tx) {
                    me.setError(sqls[j].sqlContent + "," + sqls[j].values.length);
                    /*if(sqls[j].sqlContent.indexOf('INSERT INTO T_SLPC_P303')!=-1){
                    var arr = [];
                    for(var y=0;y<39;y++){
                    arr.push('1');
                    }*/
                    tx.executeSql(sqls[j].sqlContent, sqls[j].values, me.success, me.failure);
                    //}
                }, failure, function () { });
            })(i);
        }
    },
    /**
    *  向数据库插入数据
    * table : 表名
    * arrs  : object 数组 
    */
    insert: function (table, arrs) {
        var me = this, db = me.getDb();
        Ext.Array.each(arrs, function (obj, index) {
            var keys = [], values = [];
            Ext.Object.each(obj, function (key, value) {
                keys.push(key);
                values.push(value);
            });
            db.transaction(function (tx) {
                me.singleInsert(table, keys, values, tx);
            }, function () {
                Ext.Msg.alert(null, '数据库操作失败!!!');
                alert('数据库操作失败!!!');
            }, function () {
            });
        });
    },
    singleInsert: function (table, fields, values, tx) {
        //console.log(fields);
        //console.log(values);
        var me = this,
            db = me.getDb(),
            sql = "insert into " + table + "(" + fields.join(',') + ") ";
        sql += "values(";

        //        for (var field in fields) {
        //            sql += "?,";
        //        }
        for (var i = 0; i < fields.length; i++) {
            sql += "?,";
        }
        sql = sql.slice(0, sql.length - 1);
        sql += ")";
        //console.log(sql);
        tx.executeSql(sql, values, function () { }, me.failure);
    },
    select: function (table, whereStr, objs, fn) {
        var me = this,
            db = me.getDb(), sql;
        sql = "select * from " + table + " ";
        if (whereStr != null) {
            sql += whereStr;
        }
        if (objs.length > 0) {
            sql += "  ORDER BY " + objs[0] + " " + objs[1];
        }
        //console.log(sql);
        db.transaction(function (tx) {
            tx.executeSql(sql, [], (function (tx, result) {
                var arrs = me.querySuccess(tx, result);
                fn(arrs);
            }), me.failure);
        });
    },
    /**
    *  查询
    *  table :  表名
    *  field :  对应的字段字符串,没有可为空
    *  id : [] 为数组,数组长度最大为1,为空传null
    *  fn : 回调方法
    */
    query: function (table, field, id, fn) {
        var me = this,
            db = me.getDb(),
            sql = "select * from " + table + (id && field ? " where " + field + " = ?" : "");
        Log.i(sql);
        db.transaction(function (tx) {
            id ? tx.executeSql(sql, [id], (function (tx, result) {
                var arrs = me.querySuccess(tx, result);
                fn(arrs);
            }), me.failure)
            : tx.executeSql(sql, [], (function (tx, result) {
                var arrs = me.querySuccess(tx, result);
                fn(arrs);
            }), me.failure);
        });
    },
    querySuccess: function (tx, results) {
        var arrs = [], rows = results.rows;
        for (var i = 0, len = rows.length; i < len; i++) {
            arrs.push(rows.item(i));
        }
        return arrs;
        //fn = DB.getFn();
        //if(fn){
        //    fn(arrs);
        //}
    },
    selectSuccess: function (tx, results, length) {//自定义查询成功后返回的数组类型
        var arrs = [], rows = results.rows;

        for (var i = 0, len = rows.length; i < len; i++) {
            var pageid = rows.item(i).PageID.split('_');
            if (pageid.length == length) {
                arrs.push(rows.item(i));
            }
        }
        return arrs;
    },
    selectQuery: function (table, field, orderby, length, fn) {//自定义
        var me = this,
            db = me.getDb(), sql;
        if (orderby != null) {
            sql = "select * from " + table + "  ORDER BY " + field + " " + orderby;
        }
        //console.log(sql);
        db.transaction(function (tx) {
            tx.executeSql(sql, [], (function (tx, result) {
                var arrs = me.selectSuccess(tx, result, length);
                fn(arrs);
            }), me.failure);
        });
    },
    /**
    *   查询字段值在某个范围内
    *   table : 表名
    *   field :　字段名
    *   values : 某个范围内的值,数组内的值可能要用''或""包围
    *   fn : 回调方法
    */
    queryIn: function (table, field, values, fn) {
        var me = this,
            db = me.getDb(),
            sql = "select * from " + table + " where " + field + " in(" + values.join(',') + ")";
        Log.i(sql);
        db.transaction(function (tx) {
            tx.executeSql(sql, [], (function (tx, result) {
                var arrs = me.querySuccess(tx, result);
                fn(arrs);
            }), me.failure);
        });
    },
    /**
    *   连接查询
    *   sql : 执行成sql语句
    *   values : 数组
    *   fn : 回调方法
    */
    excuteSql: function (sql, values, fn) {
        var me = this,
            db = me.getDb();
        //Log.d(sql);
        db.transaction(function (tx) {
            tx.executeSql(sql, values, (function (tx, result) {
                var arrs = me.querySuccess(tx, result);
                fn(arrs);
            }), me.failure);
        });
    },
    /**
    *  更新数据库中的数据
    * table : 表名
    * arrs  : object 数组 
    * objs  : object 对象
    */
    setUpdate: function (table, arrs, objs) {
        //        var arrs = [{ 'PageConfig': 'asdasd'}]; //需要更新的字段与值
        //        var objwhere = { 'PageID': '1_01' }; //更新需要的条件

        var me = this;
        Ext.Array.each(arrs, function (obj, index) {
            var fields = [];
            Ext.Object.each(obj, function (key, value) {
                var updateFields = key + '=' + "'" + value + "'";
                fields.push(updateFields);
            });
            me.whereUpdate(table, fields, objs);

        });
    },
    whereUpdate: function (table, fields, objs) {
        var me = this,
         whereKeys = [];
        Ext.Object.each(objs, function (key, value) {
            var keyfield = key + '=' + "'" + value + "'";
            whereKeys.push(keyfield);
        });
        me.singleUpdate(table, fields, whereKeys);
    },
    singleUpdate: function (table, fields, whereKeys) {
        var me = this,
        strWhere = "",
        querys = whereKeys.join().split(','),
        db = me.getDb(),
        sql = "update " + table + " set " + fields.join(',');

        for (var i = 0; i < querys.length; i++) {
            strWhere += querys[i];
            if (i != querys.length - 1) {
                strWhere += " and ";
            }
        }
        console.log(strWhere);
        sql += " where " + strWhere;

        db.transaction(function (tx) {
            tx.executeSql(sql, [], function (a) {
                console.log(a);
                console.log(sql);
            }, me.failure);
        });
    },
    /**
    * 删除某一条数据
    */
    singleDelete: function (table, queryStr) {
        var me = this,
            db = me.getDb(),
            sql = "delete from " + table;
        if (queryStr != null) {
            sql += " where " + queryStr;
        }
        db.transaction(function (tx) {
            tx.executeSql(sql, [], me.success, me.failure);
        });
    },
    /**
    *  清空表数据
    *  table : 表名
    *  id : [] 为数组,数组长度最大为1,为null则删除全部数据
    */
    deleteData: function (table, field, id) {
        var me = this,
            db = me.getDb(),
            sql = "delete from " + table + (id && id.length > 0 ? " where " + field + " = ?" : "");
        db.transaction(function (tx) {
            tx.executeSql(sql, id, me.success, me.failure);
        });
    },
    /**
    *  删除表
    */
    drop: function (table) {
        var me = this,
            db = me.getDb(),
            sql = 'drop table if exists ' + table;
        db.transaction(function (tx) {
            tx.executeSql(sql, [], me.success, me.failure);
        });
    },
    /**
    * 获取当前地区的最上级组织
    * area : 当前区域的DEP_AREA
    * fn : 回调方法
    */
    getTopDep: function (area, fn) {
        var me = this,
            db = me.getDb(),
            sql = "select ID from T_SYSTEM_DEPARTMENT where DEP_AREA=? and PARENT_ID=?";
        db.transaction(function (tx) {
            tx.executeSql(sql, [area, ""], (function (tx, result) {
                var arrs = me.querySuccess(tx, result);
                fn(arrs);
            }), me.failure);
        });
    },
    success: function () {
        //Ext.Msg.alert('创建数据库成功');
    },
    failure: function (arg1, arg2) {
        //        Log.i(arg1);
        //        Log.i(arg2);
        //        Log.i(DB.getError());
        console.log(arg1);
        console.log(arg2);
        //console.log(DB.getError());
        //Ext.Msg.alert('执行当前任务失败');  
        throw new Error('执行错误');
    }
});