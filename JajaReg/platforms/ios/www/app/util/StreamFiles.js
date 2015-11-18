Ext.define("util.StreamFiles", {
    alternateClassName: "SysFile",
    singleton: true,
    config: {
        description: '加加餐饮软件',
        rootFolder: 'JajaCy'//在移动设备中的根文件夹
    },
    constructor: function (config) {
        this.initConfig(config);
    },
    /**
    *  文件路径
    */
    getPath: function (path) {
        var filePath = this.getRootFolder();
        if (path != "" || path != null) {
            filePath += "/" + path;
        }
        return filePath;
    },
    /**
    * 读取保存之后的数据
    * @param path     文件存放位置
    * @param fileName 需要读取的文件名称
    */
    read: function (path, fileName, fn) {
        var me = this;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        function gotFS(fileSystem) {
            // fileSystem.root.getFile("dataFile.json", null, gotFileEntry, fail);
            readFile = fileSystem.root.getDirectory(me.getPath(path), { create: false }, readerFile, fail);
        }

        function readerFile(readFile) {
            readFile.getFile(fileName + ".json", { create: false }, gotFileEntry, fail);
        }

        function gotFileEntry(fileEntry) {
            fileEntry.file(gotFile, fail);
        }

        function gotFile(file) {
            //readDataUrl(file);
            readAsText(file);
        }

        function readDataUrl(file) {
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                // navigator.notification.alert(evt.target.result, null, '提示信息', 'OK');
                console.log("Read as data URL");
                console.log(evt.target.result);

            };
            reader.readAsDataURL(file);
        }

        function readAsText(file) {
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                //console.log(evt.target.result);
                fn(JSON.parse(evt.target.result));
                //me.setStorage('resultData', evt.target.result);
                //navigator.notification.alert(me.getStorage('resultData'), null, '提示信息', 'OK');
            };
            reader.readAsText(file);
        }

        function fail(evt) {
            //navigator.notification.alert(evt.target.error.code, null, '提示信息', 'OK');
            console.log(evt.target.error.code);
        }
    },
    /**
    * 保存模板数据
    * @param path     文件存放位置
    * @param fileName 文件名称
    * @param data 	  文件数据
    */
    save: function (path, fileName, data, callback) {//保存模板数据
        var me = this;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        //获取newFile目录，如果不存在则创建该目录  
        function gotFS(fileSystem) {
            newFile = fileSystem.root.getDirectory(me.getPath(path), { create: true, exclusive: false }, writerFile, fail);
        }
        //获取newFile目录下面的dataFile.txt文件，如果不存在则创建此文件  
        function writerFile(newFile) {
            newFile.getFile(fileName + ".json", { create: true, exclusive: false }, gotFileEntry, fail);
        }

        function gotFileEntry(fileEntry) {
            fileEntry.createWriter(gotFileWriter, fail);
        }

        function gotFileWriter(writer) {
            writer.onwrite = function (evt) {
                //navigator.notification.alert('保存成功', null, '提示信息', 'OK');
            };
            writer.write(JSON.stringify(data), null, 2);
            writer.onwriteend = function (e) {
                //Ext.Msg.alert('配置完成');
                callback();
                //navigator.notification.alert('配置完成', null, '提示信息', 'OK');
            }
        }

        function fail(error) {
            Ext.Msg.alert("Failed to retrieve file:" + error.code);
        }
    }
});