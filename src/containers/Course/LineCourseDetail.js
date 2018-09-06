/**
 * Created by zhaolong on 2016/8/10.
 * File description:单门课程详情
 */
'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {courseDetail} from 'redux/modules/excellentcourse';
import {comment_list} from '../../api/common/Global';
import {commentList} from 'redux/modules/comment';
import {Header,Introduction,Catalog,Evaluate,TutorEvaluate,Float_Bottom,Login_Box,Payment_Box,PlayVideo,Warning} from 'components';
import {push} from 'react-router-redux';
import { createcourseorder } from 'redux/modules/pay';
const styles = require('./Course.scss');

@connect(
  state => ({
    detail:state.excellentcourse.detail,
    comments:state.comment.data,
    pay:state.pay.result
  }),
  {courseDetail,commentList,push,createcourseorder}
)
export default class LineCourseDetail extends React.Component{
  static propTypes = {
      detail: PropTypes.object,
      courseDetail: PropTypes.func.isRequired,
      commentList: PropTypes.func.isRequired,
      comments:PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      createcourseorder:PropTypes.func.isRequired,
      pay: PropTypes.object
  }
  state={
    classification:[
      {name:"简介"},
      {name:"目录"},
      {name:"评价"}
    ],
    //评价参数
    comment_params:{
      id:this.props.params.id || 0,
      type:1
    },
    commentOne:[],//评价数据
    classification_select_index:0,//菜单选择
    btnText:"免费学习",//静态文本
    login_box:false,//登录框
    msg:'',//弹框文本内容
    tips_box:false,//弹框
    mp4_url:"",//视频地址
    pageNum:0,//页数
    total_num:0,//总个数
    bLock:false,//翻页加锁标识
    commentlist:[],//评论列表数据
    index:1,//索引
    show_menu:false,//是否显示菜单
    autoplay:false,//自动播放
    buyed:false,//判断是否购买
    me_star:0,//我的评论
    can_move:true,//屏幕是否可以移动
    nomore_comment:false,//没有更多评价
    bHidevideo:false,//是否显示video标签
    bShowevaluation_box:false,//是否显示评价框
  };
componentWillReceiveProps(nextProps){
    this.setState({tips_box:false});
    if(this.props.pay!=nextProps.pay){
      if(nextProps.pay.status==1){
        if(nextProps.pay.data.order_status==0){
          this.props.push('/Pay/'+nextProps.pay.data.order_id);
        }
      }else{
        this.setState({msg:nextProps.pay.errMsg});
        this.setState({tips_box:true});
      }
    }

    if(this.props.comments!==nextProps.comments){
      if(nextProps.comments.current_page==1){
        this.array.length=0;
        this.setState({index:1});
        this.setState({pageNum:nextProps.comments.total_page});
        this.setState({total_num:nextProps.comments.total_num});
        this.setState({commentOne:nextProps.comments});
      }
      this.array.push(nextProps.comments.list);
      this.setState({commentlist:this.array});
      this.setState({bLock:false});
    }
  }
componentWillMount(){
  const params={
    id:this.props.params.id
  }
  this.props.courseDetail(params);
  this.props.commentList(this.state.comment_params,comment_list);
}
constructor(props) {
    super(props);
    this.array=[];
    this.addarray=[];
    this.totop = 0;
    this.bPlayed = 0;
    this.type = 1;
    this.back = null;
    this.scroll = this.handleScroll.bind(this);
    this.touchmove = this.handleTouchMove.bind(this);
}
componentDidMount(){
  //添加滚动条事件
  window.addEventListener('scroll',this.scroll);
  window.addEventListener('touchmove',this.touchmove);
  if(localStorage.oldbackUrl && localStorage.oldbackUrl){
    this.back=localStorage.backUrl!=localStorage.oldbackUrl ? localStorage.oldbackUrl :'/';
  }
  // setTimeout(() =>{
  //     var oMeta = document.getElementsByTagName("meta");
  //     if(this.props.detail.teacher_name){
  //         oMeta[1]["content"] = this.props.detail.title+","+this.props.detail.teacher_name+",先之云课堂,先之教育";
  //     }else {
  //         oMeta[1]["content"] = this.props.detail.title+",先之云课堂,先之教育";
  //     }
  //     var a = document.getElementsByClassName('meta_description')[0];
  //     a.innerHTML = a.innerText;
  //     var strResult = a.innerText;
  //     strResult=strResult.replace(/&nbsp;/ig, "");
  //
  //     if(strResult && strResult.length > 200){
  //         oMeta[2]["content"] = strResult.substr(0,200);
  //     }else {
  //         oMeta[2]["content"] = strResult;
  //     }
  // },2000);

  //获取url参数 进入评价菜单子页
  var url = window.location.href; //获取url中"?"符后的字串
  if(url.indexOf("tab") != -1){
      this.setState({classification_select_index:2});
  }

  document.getElementById('mask').addEventListener('touchstart', this.menu, true);
}
componentWillUnmount(){
  window.removeEventListener('scroll',this.scroll);
  window.removeEventListener('touchmove',this.touchmove);
}
HTMLEnCode(str){
  let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
}
//屏幕按下移动
handleTouchMove(e){
    if(!this.state.can_move){
        e.preventDefault();
    }
}
//屏幕滚动
handleScroll(e){
    if(this.state.classification_select_index==2){
        let srollPos = window.pageYOffset; //滚动条距顶部距离(页面超出窗口的高度)
        let totalheight = parseFloat(document.documentElement.clientHeight) + parseFloat(srollPos); //屏幕高度+滚动条距顶部距离
        if((document.body.scrollHeight-10) <= totalheight){//屏幕高度+滚动条距顶部距离>页面高度
          //加锁处理
          if(!this.state.bLock){
            if(this.state.index<this.state.pageNum){
                this.setState({bLock:true});
                this.setState({index:this.state.index+1});
                const params={
                  id:this.props.params.id,
                  page:this.state.index,
                  type:this.type
                }
                this.props.commentList(params,comment_list);
            }else {
                if(this.state.total_num>10){
                    this.setState({nomore_comment:true});
                }
            }
        }
        }
    }
    if(document.getElementById("main")){
      this.totop = document.getElementById("main").offsetTop;
      var srollPos = window.pageYOffset; //滚动条距顶部距离(页面超出窗口的高度)
      if(srollPos>this.totop-40){//滚动条往下滑
          if(!this.state.show_menu){
            this.setState({tips_box:false});
            this.setState({show_menu:true});
          }
      }
      else{
          if(this.state.show_menu){
            this.setState({tips_box:false});
            this.setState({show_menu:false});
          }
      }
    }
  }
  //菜单点击事件
ClickedClassification(index){
    if(-1 == index){
        if(this.bPlayed == 1){
            this.setState({bHidevideo:true});
        }
    }else {
        this.setState({tips_box:false,bHidevideo:false});
        this.setState({classification_select_index:index});
    }
}
//判断用户是否登录
Signup(bflag,str){
  this.setState({tips_box:false});
  if(bflag){
      this.setState({can_move:true});
    switch (str) {
      case "play": //播放视频
        let p=document.getElementById('player');
        p.play();
        this.bPlayed = 1;
        break;
      case "signup": //购买课程
        //弹出灰化层
        let mask=document.getElementById('mask');
        mask.style.display="block";
        //弹出报名框
        this.setState({bomb_box:true,can_move:false});
        //设置屏幕不可以滑动
        document.documentElement.style.overflow='hidden';
        document.body.style.overflow='hidden';//手机版设置这个。
        break;
      case "free": //开始学习
        this.setState({classification_select_index:1});
        this.setState({btnText:"开始学习"});
        this.setState({buyed:true});
        this.bPlayed = 1;
        //创建订单
        this.props.createcourseorder(this.props.params.id,1);
        break;
      case "tips": //提示
        if(bflag){ //免费课程登录用户直接看视频学习
          this.setState({classification_select_index:1});
          this.setState({btnText:"开始学习"});
          this.bPlayed = 1;
          this.setState({buyed:true});
          //创建订单
          this.props.createcourseorder(this.props.params.id,1);
          let p=document.getElementById('player');
          p.play();
        }else{
          this.setState({tips_box:true,msg:'请先点击免费学习'});
        }
        break;
      case "study": //学习课程
        this.setState({classification_select_index:1});
        if(this.props.detail){
          if(this.props.detail.lecture.length>0){
            let p=document.getElementById('player');
            p.play();
            this.bPlayed = 1;
          }else{
            this.setState({tips_box:true,msg:'该课程暂时视频'});
          }
        }
        break;
      default:

    }
  }
  else
  {
    //弹出灰化层
    let mask=document.getElementById('mask');
    mask.style.display="block";
    //弹出登录框
    this.setState({login_box:true,can_move:false});
    //设置屏幕不可以滑动
    document.documentElement.style.overflow='hidden';
    document.body.style.overflow='hidden';//手机版设置这个。
  }

}
//判断用户是否登录
CheckUserIsLogined(str,star){
  if(str == "购买过该课程才可以评价！"){
      this.setState({tips_box:true,msg:str});
  }
  if(str == "在线课程不可以重复评价！"){
    this.setState({tips_box:true,msg:str});
  }
  if(str == "unlogin") {
    //弹出灰化层
    let mask=document.getElementById('mask');
    mask.style.display="block";
    this.setState({login_box:true,can_move:false});
    //设置屏幕不可以滑动
    document.documentElement.style.overflow='hidden';
    document.body.style.overflow='hidden';//手机版设置这个。
  }
  if(str == "评价"){
      if(this.bPlayed == 1){
          this.setState({bHidevideo:true,bShowevaluation_box:true});
      }
  }
  if(str == "visible"){
      if(this.bPlayed == 1){
          this.setState({bHidevideo:false,bShowevaluation_box:false});
      }
  }
  if(str == "comment"){
      this.setState({bShowevaluation_box:false,bHidevideo:false});
  }
  if(star>=1 && star<=5){
    this.setState({me_star:star});
    this.props.commentList(this.state.comment_params,comment_list);
  }
}
//判断用户支付选择取消或者立即支付
UserSelected(str){
    if("cancel" == str){
      let mask=document.getElementById('mask');
      mask.style.display="none";
      this.setState({bomb_box:false});
    }
    else if("ok" == str){
      let mask=document.getElementById('mask');
      mask.style.display="none";
      this.setState({bomb_box:false});
      this.setState({classification_select_index:1});
      this.setState({btnText:"开始学习"});
      this.setState({buyed:true});

      this.setState({tips_box:true,msg:"购买成功~"});
    }
    else {
        this.props.createcourseorder(this.props.params.id,2);
    }
    this.setState({can_move:true});
    //设置屏幕不可以滑动
    document.documentElement.style.overflow='visible';
    document.body.style.overflow='visible';//手机版设置这个。
}
//判断用户登录选择是or否
UserIsSeclectedLogin(){
      let mask=document.getElementById('mask');
      mask.style.display="none";
      this.setState({login_box:false,can_move:true});
      //设置屏幕可以滑动
      document.documentElement.style.overflow='visible';
      document.body.style.overflow='visible';//手机版设置这个。
  }
//接收用户点击目录 播放对应的视频
Play(str,mp4_url){
    if("free" == str){
      let isbuy=!this.state.buyed ? this.props.detail.is_buy : 1;
      if(isbuy==1){
        //直接播放视频
        if(this.props.detail){
          if(this.props.detail.lecture.length>0){
              let p=document.getElementById('player');
              p.src=mp4_url;
              p.play();
              this.bPlayed = 1;
          }else{
              this.setState({tips_box:true,msg:'该课程暂时视频'});
          }
        }
      }else{
        this.setState({tips_box:true,msg:'请先点击免费学习'});
      }
    }
    if("needbuy" == str){
       this.setState({tips_box:true,msg:"本课程不可预览,请购买此课程"});
    }
}
//隐藏和显示视频
hideVideo(bFlag){
    if(bFlag){
          if(this.bPlayed == 1){
              this.setState({bHidevideo:true});
          }
    }else {
        this.setState({bHidevideo:false});
    }
}
  render(){
    const {detail,comments}=this.props;
    var title = "";
    if(detail){
        this.type = detail.type;
        title = detail.title;
    }
    return(
        <div className={styles.container}>
        <Helmet title={title}/>
        <Header title={title} back={this.back} callbackParent={this.hideVideo.bind(this)}/>
        {detail &&
        <div>
          <div className={styles.linecoursedetail}>
            <div className={this.state.bHidevideo?styles.hidetop_pic:styles.top_pic}>
               <PlayVideo isfree={"0.00" == detail.real_price ?  true : false} isbuy={!this.state.buyed ? detail.is_buy : 1}
               callbackParent={this.Signup.bind(this)} url={detail.mp4_url!="" ? detail.mp4_url : detail.lecture.length>0 ? detail.lecture[0].child[0].mp4_url : ""}  poster={detail.thumb} />
            </div>
            <div className={this.state.show_menu?styles.item2:styles.item}>
              {this.state.classification.map(function(value,index){
                return <div className={this.state.classification_select_index==index? styles.nav_selected:styles.nav} key={'classification'+index} onClick={this.ClickedClassification.bind(this,index)}>{value.name}
                </div>
              }.bind(this))}
            </div>
            <div id="main">
            {(()=>{
              if(0 == this.state.classification_select_index && comments){
                return <Introduction data={detail} comments={this.state.commentOne} not300="yes" callbackParent={this.ClickedClassification.bind(this)} title="课程概述" type="单门课程"/>
              }
              if(1 == this.state.classification_select_index){
                return <Catalog data={detail.lecture} real_price={detail.real_price} is_buy={detail.is_buy} callbackParent={this.Play.bind(this)}/>
              }
              if(2 == this.state.classification_select_index){
                 if(comments){
                   return <TutorEvaluate bShowevaluation_box={this.state.bShowevaluation_box} source={"kecheng"} total_num={comments.total_num} nomore_comment={this.state.nomore_comment} data={this.state.commentlist} callbackParent={this.CheckUserIsLogined.bind(this)} type={detail.type} id={this.props.params.id} name={detail.title} isbuy={!this.state.buyed ? detail.is_buy : 1} buyed={this.state.buyed} title="课程" star={detail.star} me_star={this.state.me_star==0 ? detail.me_star : this.state.me_star} />
                 }
              }
            })()}
            </div>
          </div>

          {(()=>{
            var btnText = "购买课程";
            if("0.00" == detail.real_price){//免费课程
                if(detail.is_buy==1){//已购买过
                    btnText = "开始学习";
                }
                else {
                  btnText = "免费学习";
                  if(this.state.btnText == "开始学习"){
                    btnText = "开始学习";
                  }
                }
              return  <div className={styles.float_bottom}>
                <Float_Bottom callbackParent={this.Signup.bind(this)} is_favorite={detail.is_favorite} btnText={btnText} id={this.props.params.id} type2="1"/>
                </div>
            }
            else {//收费课程
              if(detail.is_buy == 1){//已购买过
                  btnText = "已购买";
              }
              else {
                  btnText = "购买课程";
              }
              return  <div className={styles.float_bottom}>
                <Float_Bottom callbackParent={this.Signup.bind(this)} is_favorite={detail.is_favorite} btnText={btnText} id={this.props.params.id} type2="2"/>
                </div>
            }
          })()}

          <div className="meta_description" style={{display:"none"}}>
              {detail.description}
          </div>

          </div>
        }

        {(()=>{
          if (this.state.bomb_box) {
            return <Payment_Box callbackParent={this.UserSelected.bind(this)} id={this.props.params.id} type="在线课程" goodsname={detail.title} payPrice={detail.real_price}/>
         }
       })()}

        {(()=>{
          if (this.state.login_box) {
            return <Login_Box callbackParent={this.UserIsSeclectedLogin.bind(this)}/>
          }
        })()}

        {(()=>{
          if (this.state.tips_box) {
            return  <Warning visible="true" msg={this.state.msg}/>
          }
        })()}
        </div>
    )
  }

}
