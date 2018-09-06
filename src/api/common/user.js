
/**
 * Created by zhaolong on 2016/7/22.
 * File description:用户中心接口
 */
'use strict';

let url_prefix = "//api.9first.com/mv1";
let url_suffix = "?format=jsonp";
let url_suffix2 = "&format=jsonp";

//线下活动订单接口（支付）
let feedback =  url_prefix + "/user/info/addfeedback";
let invitenum = url_prefix + "/user/info/invitenum";
let notice = url_prefix + "/user/message/list";
let noticedetail = "/mv1/user/message/detail";
let wallet = url_prefix + "/user/index/wallet";
let qcode = "/mv1/user/account/qcode";
let coursemanage = "mv1/user/teacher/courselist";

export {
  feedback,
  invitenum,
  notice,
  noticedetail,
  wallet,
  qcode,
  coursemanage,
};
