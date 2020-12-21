var fl_cnzz = [];
try {
  fl_cnzz = _czc || []
} catch (error) {
  console.log(error);
}

// 公用埋点，多个页面会用到的埋点
var commonBuriedPoin = {
  // 友盟埋点，运营位点击
  operationBitClick(um_key_page_type = '', um_key_bit_type = '', um_key_value = '') {
    // 友盟埋点 category action label
    fl_cnzz.push(["_trackEvent", um_key_page_type, '运营位点击', um_key_bit_type, um_key_value]);
  },
  // 点击导航栏切换首页
  switchTab: function (um_key_buttonname = '') {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    let um_key_userid = userInfo.fuluId || '';
    // 友盟埋点 category action label
    fl_cnzz.push(["_trackEvent", um_key_buttonname, '下导航点击', um_key_userid]);
  },
  // 授权上报事件
  authLogin(obj = {}) {
    // 神策
    // app.globalData.uma.trackEvent('Um_Event_Login', {
    //     commodity_id: obj.proInfoId || '',
    //     commodity_name: obj.productName || '',
    //     first_commodity: obj.proOneClassName || '',
    //     second_commodity: obj.proTwoClassName || '',
    //     original_price: obj.original_price || 0,
    //     present_price: obj.present_price || 0,
    //     discount_price: obj.discount_price || 0,
    //     if_use_points: obj.if_use_points || false,
    //     number_of_integral: obj.number_of_integral || 0,
    // });
  },
};

// 首页埋点
var homeBuriedPoin = {
  // 首页 icon点击（点击一级分类）
  clickOneProClassList: function (obj = {}) {
    // 友盟埋点，运营位点击
    commonBuriedPoin.operationBitClick('首页', 'icon位');
  },
  // 点击导航栏切换首页
  switchTabHome: function () {
    // 点击导航栏切换
    commonBuriedPoin.switchTab('首页');
  },
  // 点击导航栏切换我的
  switchTabMy: function () {
    // 点击导航栏切换
    commonBuriedPoin.switchTab('我的');
  },
  // 首页-顶部banner点击
  homeTopBannerClick(obj = {}) {
    // 友盟埋点，运营位点击
    commonBuriedPoin.operationBitClick('首页', 'banner位');
  },
  // 首页-横通广告点击
  homeActiveBannerClick(obj = {}) {
    // 友盟埋点，运营位点击
    commonBuriedPoin.operationBitClick('首页', '横通位');
  },
  // 首页-瀑布流-分类点击
  homeProClassListClick: function (obj = {}) {
    // 友盟埋点，运营位点击
    commonBuriedPoin.operationBitClick('首页', '一级分类');
  },
  // 首页-瀑布流-商品点击
  homeProClassProductClick: function (obj = {}) {
    // 友盟埋点，运营位点击
    commonBuriedPoin.operationBitClick('首页', '二级分类');
  },
  // 首页-限时抢购1-商品点击
  homeFlashSaleFirstClick: function (obj = {}) {
    // 友盟埋点，运营位点击
    commonBuriedPoin.operationBitClick('首页', '限时活动位');
  },
  // 首页-限时抢购2-商品点击
  homeFlashSaleSecondClick: function (obj = {}) {
    // 友盟埋点，运营位点击
    commonBuriedPoin.operationBitClick('首页', '限时活动位');
  },
}

// 页面加载埋点
var pageLoadPoin = {
  // 页面加载基础埋点
  pageLoad(um_key_pagecategory = '') {
    // 来源页面
    let um_key_sourcepage = localStorage.getItem('commodity_detail_souce') || '';
    // 友盟埋点 category action label
    fl_cnzz.push(["_trackEvent", um_key_pagecategory, '页面浏览', um_key_sourcepage]);
  },
  // 页面加载二期
  pageLoadSecond(um_key_pagecategory, um_key_label, um_key_value) {
    // 友盟埋点 category action label
    fl_cnzz.push(["_trackEvent", um_key_pagecategory, '页面加载', um_key_label, um_key_value]);
  },
  pageLoadDetail(obj = {}) {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    let um_key_userid = userInfo.fuluId || '';
    // 友盟埋点 category action label value
    fl_cnzz.push(["_trackEvent",
      obj.productName || '',
      '查看商品详情',
      um_key_userid,
      obj.proInfoId || obj.productId || ''
    ]);
  },
  // 订单结果页-加载
  pageLoadPaySuccess(obj = {}) {
    // 友盟埋点 category action label value
    fl_cnzz.push(["_trackEvent",
      obj.productName || '',
      '订单结果页',
      true,
      obj.proInfoId || obj.productId || ''
    ]);
  },
  // 支付详情页-加载
  pageLoadOrderStatus(obj = {}) {
    const ordetStatusObj = {
      11: '待付款',
      12: '扣款失败',
      15: '交易关闭',
      21: '充值中',
      31: '充值中',
      41: '充值中',
      51: '充值成功',
      61: '充值失败',
      71: '退款已到账',
    };
    // console.log('确认订单页-去支付-点击');
    // 友盟埋点 category action label value
    fl_cnzz.push(["_trackEvent",
      obj.productName || '',
      '支付订单详情',
      ordetStatusObj[obj.orderStatus],
      obj.proInfoId || obj.productId || ''
    ]);
  }
}

// 详情页埋点
var detailBuriedPoin = {
  // 立即兑换
  detailPageBuyRIghtAway(obj = {}) {
    // 友盟埋点 category action label value
    fl_cnzz.push(["_trackEvent",
      obj.productName || '',
      '立即兑换',
      obj.activityId || '',
      obj.proInfoId || obj.productId || ''
    ]);
  },
}
// 确认订单页
var sureOrderBuriedPoin = {
  // 去支付
  sureOrderPageToPay(obj = {}) {
    // 友盟埋点 category action label value
    fl_cnzz.push(["_trackEvent",
      obj.productName || '',
      '去支付',
      obj.is_success || false,
      obj.proInfoId || obj.productId || ''
    ]);
  },
  // 取消订单
  cancelOrder(obj = {}) {
    // let userInfo = my.getStorageSync({ key: 'userInfo' }).data;
    // // 用户id
    // let um_key_userid = userInfo ? userInfo.openId : '';
    // // 来源页面
    // let um_key_sourcepage =  localStorage.getItem('commodity_detail_souce'); || '';

    // // 来源位置
    // let um_key_sourcelocation = '';
    // // console.log('确认订单页-去支付-点击');
    // app.globalData.uma.trackEvent('Um_Event_CacelOrder', {
    //     um_key_ItemID: obj.proInfoId || obj.productId || '',
    //     um_key_Item_Name: obj.productName || '',
    //     um_key_first_ItemCategory: obj.oneClassName || obj.productCategoryOneName || '',
    //     um_key_second_ItemCategory: obj.twoClassName || obj.productCategoryTwoName || '',
    //     um_key_original_price: obj.original_price || 0,
    //     um_key_present_price: obj.present_price || 0,
    //     um_key_discount_price: obj.discount_price || 0,
    //     um_key_is_use_points: obj.if_use_points || false,
    //     um_key_number_of_integral: obj.number_of_integral || 0,
    //     um_key_sourcepage,
    //     um_key_sourcelocation,
    //     um_key_userid,
    //     um_key_recharge_quantity: obj.buyNum || 1,
    //     um_key_order_id: obj.orderNo,
    //     um_key_order_amount: obj.totalPrice,
    //     um_key_deduction_integral: obj.integral || 0,
    //     um_key_recharge_type: obj.chargeType === 3 ? '卡密' : '其他',
    //     um_key_is_success: obj.is_success || false,
    //     um_key_failure_reason: obj.failure_reason || ''
    // });
  }
};

export {
  commonBuriedPoin,
  pageLoadPoin,
  detailBuriedPoin,
  sureOrderBuriedPoin,
  homeBuriedPoin
}
