"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getParam: function getParam(paramName) {
    // 获取参数
    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
  },
  clearNoNum: function clearNoNum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
    if (obj.value.indexOf(".") < 0 && obj.value != "") {
      //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
      obj.value = parseFloat(obj.value);
    }
  },
  // 加
  accAdd: function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (Math.round(arg1 * m) + Math.round(arg2 * m)) / m;
  },

  // 除
  accDiv: function accDiv(arg1, arg2) {
    var t1 = 0,
        t2 = 0,
        r1,
        r2;
    var t1 = 0,
        t2 = 0,
        r1,
        r2;
    try {
      t1 = arg1.toString().split(".")[1].length;
    } catch (e) {}
    try {
      t2 = arg2.toString().split(".")[1].length;
    } catch (e) {}
    try {
      r1 = Number(arg1.toString().replace(".", ""));
      r2 = Number(arg2.toString().replace(".", ""));
    } catch (e) {}
    return r1 / r2 * Math.pow(10, t2 - t1);
  },

  // 减
  Subtr: function Subtr(arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },

  // 乘
  accMul: function accMul(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();

    try {
      m += s1.split(".")[1].length;
    } catch (e) {}

    try {
      m += s2.split(".")[1].length;
    } catch (e) {}

    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },
  // 数组移动
  swapItems: function swapItems(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  },
  latestTime: function latestTime(v, nowServerTime, that) {
    // 倒计时
    function leftTimer(enddate) {
      var leftTime = new Date(enddate) - new Date(); //计算剩余的毫秒数
      var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
      var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
      var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟
      var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
      days = checkTime(days);
      hours = checkTime(hours);
      minutes = checkTime(minutes);
      seconds = checkTime(seconds);
      var latestTextArr = [days, hours, minutes, seconds];
      if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0) return that.setState({
        latestTextArr: latestTextArr
      });
      if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
        clearInterval(that.timer);
      }
    }
    function checkTime(i) {
      //将0-9的数字前面加上0，例1变为01
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
    function latestTime() {
      if (that.timer) clearInterval(that.timer);
      var date1 = nowServerTime,
          data2 = new Date(v.getFullYear() + '-' + (v.getMonth() + 1) + '-' + v.getDate() + ' ' + v.getHours() + ':' + v.getMinutes() + ':' + v.getSeconds());
      if (data2 < date1) return; //设置的时间小于现在时间退出
      that.timer = setInterval(function () {
        leftTimer(data2);
      }, 1000);
    }
    latestTime();
  },
  stringCutOut: function stringCutOut(str, num) {
    if (str.length > num) return str.substring(0, num) + '...';
    return str;
  },
  isAlipayOrWechat: function isAlipayOrWechat() {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.match(/Alipay/i) == "alipay") {
      // 支付宝
      return 0;
    } else if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
      // 微信
      return 1;
    } else {
      // 浏览器
      return 2;
    }
  },
  secondToDate: function secondToDate(second_time) {
    var time = parseInt(second_time) > 9 ? parseInt(second_time) + "秒" : '0' + parseInt(second_time) + "秒";
    if (parseInt(second_time) > 60) {
      var second = parseInt(second_time) % 60;
      var min = parseInt(second_time / 60);
      time = '00:' + (min > 9 ? min : '0' + min) + ":" + (second > 9 ? second : '0' + second) + "";

      if (min > 60) {
        min = parseInt(second_time / 60) % 60;
        var hour = parseInt(parseInt(second_time / 60) / 60);
        time = (hour > 9 ? hour : '0' + hour) + ":" + (min > 9 ? min : '0' + min) + ":" + (second > 9 ? second : '0' + second) + "";
        if (hour > 24) {
          hour = parseInt(parseInt(second_time / 60) / 60) % 24;
          var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
          time = day + "天 " + (hour > 9 ? hour : '0' + hour) + ":" + (min > 9 ? min : '0' + min) + ":" + (second > 9 ? second : '0' + second) + "";
        }
      }
    }
    return time;
  },
  secondToDate1: function secondToDate1(second_time) {
    var time = parseInt(second_time) > 9 ? parseInt(second_time) + "秒" : '0' + parseInt(second_time) + "秒";
    if (parseInt(second_time) > 60) {
      var second = parseInt(second_time) % 60;
      var min = parseInt(second_time / 60);
      time = '00:' + (min > 9 ? min : '0' + min) + ":" + (second > 9 ? second : '0' + second) + "";

      if (min > 60) {
        min = parseInt(second_time / 60) % 60;
        var hour = parseInt(parseInt(second_time / 60) / 60);
        time = (hour > 9 ? hour : '0' + hour) + ":" + (min > 9 ? min : '0' + min) + ":" + (second > 9 ? second : '0' + second) + "";
        if (hour > 24) {
          hour = parseInt(parseInt(second_time / 60) / 60) % 24;
          var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
          time = day + "天 " + (hour > 9 ? hour : '0' + hour) + ":" + (min > 9 ? min : '0' + min) + ":" + (second > 9 ? second : '0' + second) + "";
        }
      }
    }
    return [day, hour, min, second];
  }
};