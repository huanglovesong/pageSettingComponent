'use strict';

// window.onload = function () {
/**
 * 识别设备终端，获取app相关信息
 */
window.terminal = function () {
    var u = navigator.userAgent; //app = navigator.appVersion;
    return { //浏览器版本信息
        trident: u.indexOf('Trident') > -1,
        presto: u.indexOf('Presto') > -1,
        webKit: u.indexOf('AppleWebKit') > -1,
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') > -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        iPhone: u.indexOf('iPhone') > -1,
        iPad: u.indexOf('iPad') > -1,
        webApp: u.indexOf('Safari') > -1,
        weixin: u.indexOf('MicroMessenger') > -1 && u.replace(/.*(MicroMessenger\/[^\s]*).*/, "$1").replace("MicroMessenger/", "") || false,
        appVersion: u.indexOf('bocapp(') > -1 ? u.match(/bocapp\(\S+\)/)[0].slice(7, -1) : '3.0.0'
    };
}();
/**
 * APP版本号比较方法
 * @param (String) version1 版本号1，当前版本号
 * @param (String) version2 版本号2，要求最低版本号
 * @returns {Number} 判断版本号1是否高于版本号2，高于为1,等于为0,低于为-1
 */
// APP当前版本号获取方法：window.terminal.appVersion
window.versionCompare = function (version1, version2) {
    if (!version1 || !version2) {
        return alert('版本号不存在');
    }
    var v1 = version1.split('.');
    var v2 = version2.split('.');
    for (var i = 0; i < v1.length; i++) {
        if (v1[i] * 1 > v2[i] * 1) {
            return 1; // 当前版本号大于要求最低版本号
        } else if (v1[i] * 1 < v2[i] * 1) {
            return -1; // 当前版本号小于要求最低版本号
        }
    }
    return 0; // 当前版本号等于要求最低版本号
};
/**
 * 引入cordova
 */
var script = document.createElement('script');
var pth = "https://ebsnew.boc.cn/bocphone/BocMerchant/"; // 生产环境
// 外网环境直接引用生产地址即可，若需新增cordova方法，另行提供DMZ区地址
if (window.terminal.iPhone) {
    script.src = pth + 'paylib/ios.js';
} else if (window.terminal.android) {
    script.src = pth + 'paylib/android.js';
} else {
    alert('无法识别终端类型');
}
document.getElementsByTagName('head')[0].appendChild(script);
// }