/**
 * Created by zhaolong on 2016/7/22.
 * File description:平台支付接口定义
 */
'use strict';

let url_prefix = "//api.9first.com/mv1";
let url_suffix = "?format=jsonp";
let url_suffix2 = "&format=jsonp";

//线下活动订单接口（支付）
let alipay =  "/mv1/user/order/creatactivityorder";
//订单详情
let order_detail = "/mv1/user/order/detail";

export {
  alipay,
  order_detail
};
