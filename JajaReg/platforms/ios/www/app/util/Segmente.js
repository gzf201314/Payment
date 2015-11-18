Ext.define("util.Segmente", {
    alternateClassName: "Color",
    singleton: true,
    dfontColor: {
        'background': '#579FDD',
        'color': 'white'
    },
    hfontColor: {
        'background': 'white',
        'color': '#579FDD'
    },
    blueColor: {
        'font-size': '1em',
        'font-weight': '400',
        'font-family': '"Helvetica Neue", Helvetica, Arial',
        'color': '#157efb',
        'border-radius': '6px',
        'border': '1px solid #157efb',
        'background-color': 'rgb(238, 238, 238)',
        'background-image': 'none',
        'margin-left': 'auto',
        'margin-right': 'auto'
    },
    redColor: {
        'font-size': '1em',
        'font-weight': '400',
        'font-family': '"Helvetica Neue", Helvetica, Arial',
        'color': '#fc3e39',
        'border-radius': '6px',
        'border': '1px solid #fc3e39',
        'background-color': 'rgb(238, 238, 238)',
        'background-image': 'none',
        'margin-left': 'auto',
        'margin-right': 'auto'
    },
    defaultCls: 'width:72px;margin:0px;background:#579FDD;color:white;border-top-left-radius:0px;border-bottom-left-radius:0px;border-bottom-right-radius:9px;border-top-right-radius:9px;',
    heightCls: 'width:72px;margin:0px;background:white;color:#579FDD;border-bottom-right-radius:0px;border-top-right-radius:0px;border-bottom-left-radius: 5px;border-top-left-radius: 5px;',
    config: {
        description: '加加餐饮软件'
    },
    constructor: function (config) {
        this.initConfig(config);
    }
});