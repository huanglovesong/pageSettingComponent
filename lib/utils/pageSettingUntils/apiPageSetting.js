'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    // openAPI
    fuluusertoken: '/api/authorize/fuluusertoken', // 获取用户令牌 POST    
    getGameProTemp: '/api/Product/GetProductTemp', // 获取游戏商品模板内容 区服务器等信息GET
    getHotPro: '/api/Product/GetProductActivity', // 获取限时抢购列表GET
    getGoodsList: '/api/Product/GetProductList', // 获取商品集合    
    getProductById: '/api/Product/GetProductInfo', // 获取商品详情
    getPassCode: '/api/Product/GetPassCode', // 根据商品ID获取资格码
    getPassCodeStatus: '/api/Product/GetPassCodeStatus', //根据商品ID获取资格码状态

    unifiedOrder: '/api/merchantpay/UnifiedOrder', // 获取订单支付信息

    getCode: '/api/Other/Verificationcode', // 发送验证码
    touristlogin: '/api/Other/Touristlogincode', // 验证验证码

    getMerinfo: '/api/Merchant/GetMerinfo', //获取商户和模板信息
    getBanner: '/api/Advertisement/GetBanner', // 获取banner

    sendOrder: '/api/Order/SendOrder', // 直充下单 
    sendCardOrder: '/api/Order/SendCardOrder', // 卡密下单
    getOrderList: '/api/Order/GetOrderList', // 获取订单列表
    getOrderDetail: '/api/Order/GetOrderDetail', // 获取订单详情
    getSecretCard: '/api/Order/ExtractCard', // 获取卡密

    //中国银行抽奖
    // getPrizeNum : '/api/Boc/PrizeNum', //用户抽奖次数
    // prizeSendOrder: '/api/Boc/GetLuckDrawOrder',//下单
    // isPrizeRight: '/api/Boc/IsPrizeRight',//是否有抽奖资格
    // saveUserData: '/api/Boc/PostLuckDrawOrder',//保存用户下单信息
    // prizeResult: '/api/Mi/DrawnList',//用户中奖内容(我的奖品)
    // handlePrize:'/api/Boc/PostDraw',//点击抽奖,返回抽奖结果
    // activeOpen: '/api/Boc/GetEventList',//活动是否开启
    // prizeProList: '/api/Boc/GetPrizeList',//奖品商品列表
    // payInfo: '/api/Boc/PayOrderInfo',//获取支付信息
    // userPrizeList: '/api/Boc/MerDrawnList',//所有用户的中奖信息

    //小米
    getPrizeNum: '/api/Mi/PrizeNum', //用户抽奖次数
    prizeSendOrder: '/api/Mi/GetLuckDrawOrder', //下单
    isPrizeRight: '/api/Mi/IsPrizeRight', //是否有抽奖资格
    saveUserData: '/api/Mi/PostLuckDrawOrder', //保存用户下单信息
    prizeResult: '/api/Mi/DrawnList', //用户中奖内容(我的奖品)
    handlePrize: '/api/Mi/PostDraw', //点击抽奖,返回抽奖结果
    activeOpen: '/api/Mi/GetEventList', //活动是否开启
    prizeProList: '/api/Mi/GetPrizeList', //奖品商品列表
    payInfo: '/api/Mi/PayOrderInfo', //获取支付信息
    userPrizeList: '/api/Mi/MerDrawnList', //所有用户的中奖信息
    saveAddress: '/api/Mi/PostDrawnWinning', //保存用户地址信息
    getAddress: '/api/Mi/QueryDrawnWinning', //保存用户地址信息
    addPrizeNum: '/api/Mi/AddDrawCout', //添加抽奖次数


    ///自定义页面
    getHomeCategory: '/api/Category/GetHomeCategory', //获取首页推荐分类
    getHotCategory: '/api/Category/GetHotCategory', //获取热门充值分类集合 
    getFirstMenu: '/api/Category/GetCategory', //获取一级分类集合
    getsecondMenu: '/api/Category/GetChildCategory', //获取二级分类集合
    recommendProduct: '/api/Category/RecommendCategory', //获取商品推荐分类

    getPage: '/api/Page/GetPage',
    getPagePreview: '/api/Page/getPagePreview',
    // 优惠券
    CardActivityOvered: '/api/MerCouponActivity/CardActivityOvered', //卡券活动是否过期
    ObtainCard: '/api/MerCouponActivity/ObtainCard', // 取卡
    GetProInfoDetailCouponList: '/api/MerCouponActivity/GetProInfoDetailCouponList', // 获取商品详情优惠券列表
    GetUserCouponList: '/api/MerCouponActivity/GetUserCouponList', // 我的优惠券
    GetCouponProductList: '/api/MerCouponActivity/GetCouponProductList' // 获取优惠券对应商品 
};