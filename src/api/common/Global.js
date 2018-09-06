/**
 * Created by zhaolong on 2016/7/6.
 File description:平台公共接口定义
 */
'use strict';


let url_prefix = "//api.9first.com/mv1";
let url_suffix = "?format=jsonp";
let url_suffix2 = "&format=jsonp";

//首页搜索
let home_search = "/mv1/home/search";
//首页广告
let homepage_banner="/mv1/home/topad";
//活动广告
let activity_banner="/mv1/home/topad";//listad
//直播广告
let live_banner="/mv1/home/topad";//ad


//活动详情页
let classification_detail = "/mv1/activity/detail";
//活动详情页浏览量更新
let classification_detailupdateview = "/mv1/activity/updateview";
//线下公开课更多推荐
let openclass_morerecommend = url_prefix + "/activity/morerecommend";

//内训详情
let train = url_prefix+"/activity/detail";

//在线课程详细页
let onlinecourse_detail = "/mv1/course/detail";
let onlinecoursepackage_detail = "/mv1/certificate/detail";


//报名
let signup = "/mv1/user/index/apply";
//是否报名
let issignup = url_prefix + "/user/index/isapply";
//已报名用户
let alreadsignup = url_prefix + "/activity/userlist";

//导师详情
let teacher_detail = "/mv1/teacher/detail";
//内训-导师
let teacher = url_prefix + "/class/teachersearch?class_id=0" + url_suffix2;
//导师内训课程
let teacher_trainingcourse = url_prefix + "/teacher/training/";
//导师内训课程详细页
let teacher_trainingdetail = url_prefix + "/activity/detail/";
//导师内训课程所有
let teacher_trainingcourses = "/mv1/teacher/activitylist";
//导师在线课程
let teacher_linecourse = url_prefix + "/teacher/course/";
//导师在线课程详细页
let teacher_linedetail = url_prefix + "/teacher/course/";
//导师在线课程所有
let teacher_linecourses =  "/mv1/teacher/courselist";



//图片验证码
let xz_captcha_api='//api.9first.com/authorization/client/captcha';
let sso_captcha_api='//sso.9first.com/user/captcha';

//智库列表
let xz_document_list_api="/mv1/papers/list";
//智库详情页面
let xz_document_detail_api="/mv1/papers/detail";

//线下公开课分类
let xz_search_api="/mv1/class/search";
//内训导师分类
let xz_teachersearch_api="/mv1/class/teachersearch";
//在线课程分类
let xz_courselist_api="/mv1/class/courselist";
/*
评论
*/
//添加评论
let add_comment = "/mv1/user/reviews/add";
//评论列表
let comment_list = "/mv1/reviews/list";
//是否可以评论
let iscomment = "/mv1/user/reviews/isreview";

//我的精品课
let myexcellcourse = "/mv1/user/index/courselist";

//个人中心搜索
let follow_search = "/mv1/user/favorite/search";


export const imageUrl = "//f3-xz.veimg.cn/m";
export {
  homepage_banner,
  activity_banner,
  live_banner,
  classification_detail,
  classification_detailupdateview,
  openclass_morerecommend,
  alreadsignup,
  signup,
  issignup,

  teacher,
  teacher_trainingcourse,
  teacher_linecourse,
  teacher_detail,
  teacher_trainingdetail,
  teacher_linedetail,
  teacher_trainingcourses,
  teacher_linecourses,
  xz_captcha_api,
  sso_captcha_api,
  xz_search_api,
  xz_teachersearch_api,
  xz_courselist_api,
  add_comment,
  comment_list,
  iscomment,
  xz_document_list_api,
  xz_document_detail_api,
  home_search,
  follow_search,
  url_prefix,
  onlinecourse_detail,
  onlinecoursepackage_detail,
  train,
  myexcellcourse
};
