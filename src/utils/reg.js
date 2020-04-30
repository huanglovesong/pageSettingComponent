export default {
  Mobile: function (str) {
    var reg = /^[1][3,4,5,6,7,8,0][0-9]{9}$/;
    if (!reg.test(str)) {
      return false;
    } else {
      return true;
    }
  },
  Code: function (str) {
    var reg = /^[0-9]{4}$/;
    if (!reg.test(str)) {
      return false;
    } else {
      return true;
    }
  },

}


