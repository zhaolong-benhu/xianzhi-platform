/**
 * Created by zhaolong on 2016/6/27
 * File description:整站路由配置
 */
import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    Course,
    Category,
    OtherActivities,
    Training,
    TrainingCourseDetail,
    NotFound,
    Search,
    Index,
    Seting,
    Apply,
    Message,
    Help,
    MyExcellentCourse,
    MyExcellentPackage,
    MyOpenClass,
    MyIhma,
    MyThinkTank,
    MyLive,
    MyActivity,
    MyFollow,
    SysMessage,
    MyWallet,
    MyWalletDetail,
    Withdraw,
    Withdrawals,
    LineCourse,
    LineCourseDetail,
    CoursePackageDetail,
    Document,
    DocumentDetail,
    Lms,
    Ihma,
    IhmaIntroduce,
    Instructions,
    Shared,
    Register,
    CourseManage,
    CourseDetail,
    FreePromotion,
    LiveClass,
    LiveClassEnroll,
    LiveClassContract,
    LiveClassDetail,
    PersonalRegister,
    CareerInfo,
    TutorRegisterVerify,
    SetWithdrawsPassword,
    SettingPwd,
    ResetExtractPwd,
    Authentication,
  } from 'containers';

import {
  SignupNumber,
  Tutor,
  TrainingDetail,
  TutorDetail,
  TutorTrainingCourses,
  TutorLineCourses,
  Login,
  GetPassWord,
  Pay,
  PayResult,
  CourseListDetail,
  OtherActivitiesDetail,
  StudentAllEvaluate,
  XianzhiMap,
  Wallet,
  ExcellentCourse,
  ExcellentPackage,
  ThinkTank,
  MakeMoney,
  Follow,
  UpdatePassWord,
  Info,
  BindMobile,
  UpdateMobile,
  OnlineCourses,
  Detail,
  AboutUs,
  FeedBack,
  IhmaDetail,
  Withdrawalsresult,
  LiveShare,
} from 'components';

  /**
   * Please keep routes in alphabetical order
   */
export default(store) => {
    return (
      <Route path="/" component={App}>
        { /* Home (main) route */ }
        <IndexRoute component={Home}/>

        { /* Routes */ }
        //线下版块
        <Route path="category" component={Category}/> //先之类别
        <Route path="category/:id" component={Category}/>//线下共开课
        <Route path="gongkaike" component={Course}/>//线下共开课
        <Route path="gongkaike/list/:id" component={Course}/>//线下共开课类型列表
        <Route path="gongkaike/:id" component={CourseListDetail}/>//公开课详细页面
        <Route path="huodong" component={OtherActivities}/>//其他活动
        <Route path="huodong/list/:id" component={OtherActivities}/>//其他活动列表页面
        <Route path="huodong/:id" component={OtherActivitiesDetail}/>//其他活动详情
        <Route path="neixun" component={Training}/>//导师列表
        <Route path="neixun/list/:id" component={Training}/>//导师类型列表
        <Route path="neixun/:id" component={TutorDetail}/>//导师详情页TutorDetailTutorDetail
        <Route path="TutorTrainingCourses/:id" component={TutorTrainingCourses}/> //导师全部内训课程
        <Route path="TutorLineCourses/:id" component={TutorLineCourses}/> //导师全部在线课程
        <Route path="Tutor" component={Tutor}></Route> //内训
        <Route path="TrainingDetail/:id" component={TrainingCourseDetail}/>//內训详情页
        <Route path="SignupNumber/:id" component={SignupNumber}/>//已报名

        //线上版块
        <Route path="OnlineCourses" component={OnlineCourses}/>//在线课程(课程+专业证书)
        <Route path="kecheng" component={LineCourse}/>//在线课程(课程+专业证书)
        <Route path="kecheng/list/:id" component={LineCourse}/>//在线课程(课程+专业证书)
        <Route path="detail/:id" component={CourseDetail}/>//课程介绍页（不在先之云课堂的课程详情）
        <Route path="kecheng/:id" component={LineCourseDetail}/>//在线课程详情
        <Route path="kechengbao/:id" component={CoursePackageDetail}/>//在线课程详情
        //上传课程管理
        <Route path="user/coursemanage" component={CourseManage}/>//上传课程管理

        //智库
        <Route path="papers" component={Document}/>//智库列表
        <Route path="papers/list/:id" component={Document}/>//智库列表
        <Route path="papers/:id" component={DocumentDetail}/>//智库详情页面
        //LMS
        <Route path="lms" component={Lms}/>//lms
        //IHMA
        <Route path="ihma" component={Ihma}/>//ihma
        <Route path="ihma/:id" component={Ihma} /> //IHMA列表
        <Route path="ihmaDetail/:id" component={IhmaDetail}/>//IhmaDetail
        <Route path="ihma/detail/ihmaIntroduce" component={IhmaIntroduce}/>//IhmaIntroduce

        //公共版块
        <Route path="Pay/:id" component={Pay}/>//支付
        <Route path="PayResult/:id" component={PayResult}/>//支付结果
        <Route path="Xianzhi/:id" component={XianzhiMap}/>//地图
        <Route path="share/:id" component={Shared} /> //分享
        <Route path="search" component={Search} /> //搜索
        <Route path="Login" component={Login} /> //登陆
        <Route path="Register" component={Register}  name="注册"/> //注册
        <Route path="GetPassWord" component={GetPassWord} /> //找回密码
        <Route path="user/SettingPwd" component={SettingPwd} /> //密码设置
        <Route path="user/SettingPwd/ResetExtractPwd" component={ResetExtractPwd} /> //密码设置
        <Route path="user/SettingPwd/ResetExtractPwd/Authentication" component={Authentication} /> //身份验证
        <Route path="withdrawalsresult/:id" component={Withdrawalsresult} /> //提现结果页

        //用户中心
        <Route path="User/Index" component={Index} /> //用户中心
        <Route path="User" component={Index} /> //用户中心
        <Route path="User/Seting" component={Seting} /> //设置
        <Route path="User/Apply" component={Apply} /> //申请导师
        <Route path="User/seting" component={Seting} /> //设置
        <Route path="User/UpdatePassWord" component={UpdatePassWord} /> //修改密码
        <Route path="User/BindMobile" component={BindMobile} /> //绑定手机号码
        <Route path="User/UpdateMobile" component={UpdateMobile} /> //修改绑定手机
        <Route path="User/info" component={Info} /> //完善个人信息
        <Route path="User/message" component={Message} /> //用户消息
        <Route path="user/help" component={Help} /> //帮助
        <Route path="user/wallet" component={MyWallet} /> //我的钱包
        <Route path="user/wallet/withdraw" component={Withdrawals} /> //我的钱包-提现 //Withdraw
        <Route path="user/wallet/withdraw/:id" component={Withdrawals} /> //我的钱包-提现至支付宝or微信账户
        <Route path="user/wallet/instructions" component={Instructions}/>//我的钱包-提现说明
        <Route path="user/wallet/setpassword" component={SetWithdrawsPassword}/>//我的钱包-提现设置提现密码
        <Route path="user/wallet/detail/:id" component={MyWalletDetail} /> //我的钱包详情
        <Route path="user/excellentcourse" component={MyExcellentCourse} /> //我的精品课
        <Route path="user/excellentpackage" component={MyExcellentPackage} /> //我的精品包
        <Route path="user/ihma" component={MyIhma} /> //我的IHAME

        <Route path="user/openclass" component={MyOpenClass} /> //我的公开课
        <Route path="user/activity" component={MyActivity} /> //我的活动
        <Route path="user/thinktank" component={MyThinkTank} /> //我的智库
        <Route path="user/live" component={MyLive} /> //直播间
        <Route path="user/makemoney/:id" component={MakeMoney} /> //我要赚钱
        <Route path="user/follow" component={MyFollow} /> //我的关注
        <Route path="user/notice/:id" component={SysMessage} /> //我的通知
        <Route path="user/message/detail/:id" component={Detail} /> //我的通知详情
        <Route path="user/aboutus" component={AboutUs} /> //关于我们
        <Route path="user/feedback" component={FeedBack} /> //用户反馈


        <Route path="seckill" component={FreePromotion} />//零元砍价
        <Route path="seckill/:id" component={FreePromotion} />//零元砍价
        {/*直播*/}
        <Route path="live" component={LiveClass} />//直播课程
        <Route path="live/enroll" component={LiveClassEnroll} />//直播报名
        <Route path="/live/contract" component={LiveClassContract} />//直播报名
        <Route path="live/:id" component={LiveClassDetail} />//直播详情
        <Route path="liveshare/:id" component={LiveShare} />//直播详情
        <Route path="/tutorregister/personalinfo" component={PersonalRegister} />//直播审核
        <Route path="/tutorregister/verify" component={TutorRegisterVerify} />//直播审核
        <Route path="/tutorregister/verify/:id" component={TutorRegisterVerify} />//直播审核

        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404}/>
      </Route>
    );
  };
