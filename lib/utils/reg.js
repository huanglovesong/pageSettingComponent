"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  Mobile: function Mobile(str) {
    var reg = /^[1][3,4,5,6,7,8,0][0-9]{9}$/;
    if (!reg.test(str)) {
      return false;
    } else {
      return true;
    }
  },
  Code: function Code(str) {
    var reg = /^[0-9]{4}$/;
    if (!reg.test(str)) {
      return false;
    } else {
      return true;
    }
  }

};