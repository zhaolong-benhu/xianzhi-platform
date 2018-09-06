/**
 * Created by zhaolong on 2016/11/14.
 * File description:IHMA详情
 */
'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {ihmaDetail,ihmaEnroll} from 'redux/modules/ihma';
import {comment_list} from '../../api/common/Global';
import {commentList} from 'redux/modules/comment';
import {Header,Introduction,Float_Bottom,CourseCatalog,Login_Box,CommitInfo_Box,CommitSuccess_Box,Warning} from 'components';
import {push} from 'react-router-redux';
import {imageUrl} from '../../api/common/Global';
const styles = require('./IhmaDetail.scss');

@connect(
  state => ({
    detail:state.ihma.detail
  }),
  {ihmaDetail,ihmaEnroll,push}
)
export default class IhmaDetail extends React.Component{

  static propTypes = {
      detail: PropTypes.object,
      ihmaDetail: PropTypes.func.isRequired,
      ihmaEnroll:PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      show_menu:false,
  }
  state={
    classification_select_index:0,//菜单选择索引
    btnText:"证书报名",//静态文本
    tips_box:false,//文字弹框
    bomb_box:false,//弹框
    login_box:false,//登录弹框
    msg:'',//文本弹框文字内容
    mp4_url:"",//视频地址
    pageNum:0,//页数
    total_num:0,//总评论数
    bLock:false,//翻页枷锁标识
    commentlist:[],//评论数据
    commentOne:[],
    index:0,//索引
    me_star:0,//用户是否评价
    commitok_box:false,//评价成功弹框标识
    comment_params:{
      id:this.props.params.id || 0,
      type:4
  },//评价请求参数
    can_move:true//屏幕是否可以移动
  };

  static defaultProps = {
    classification:[
      {name:"简介"},
      {name:"课程目录(10门)"}
    ]
};//菜单选项
constructor(props) {
      super(props);
      this.totop = 0;
      this.back = null;
      this.scroll = this.handleScroll.bind(this);
      this.touchmove = this.handleTouchMove.bind(this);
  }
componentWillReceiveProps(nextProps){

  }
componentWillMount(){
  const params={
    id:this.props.params.id
  }
  this.props.ihmaDetail(params);
}
//点击分类事件
ClickedClassification(index){
    this.setState({tips_box:false,commitok_box:false});
    this.setState({classification_select_index:index});
}
componentDidMount(){
  window.addEventListener('scroll',this.scroll);
  window.addEventListener('touchmove',this.touchmove);
  // if(localStorage.oldbackUrl){
  //   this.back=localStorage.oldbackUrl;
  // }
  if(localStorage.oldbackUrl && localStorage.oldbackUrl){
    this.back=localStorage.backUrl!=localStorage.oldbackUrl ? localStorage.oldbackUrl :'/';
  }
  // if(localStorage.oldbackUrl && localStorage.oldbackUrl){
  //     this.back=localStorage.backUrl!=localStorage.oldbackUrl ? localStorage.oldbackUrl :'/';
  // }
}
componentWillUnmount(){
    window.removeEventListener('scroll',this.scroll);
    window.removeEventListener('touchmove',this.touchmove);
}
//屏幕按下移动事件
handleTouchMove(e){
    if(!this.state.can_move){
        e.preventDefault();
    }
}
//屏幕滚动事件
handleScroll(e){
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
//判断用户是否登录
Signup(bflag){
    this.setState({tips_box:false,can_move:false,commitok_box:false});
    //弹出灰化层
    let mask=document.getElementById('mask');
    mask.style.display="block";
    // if(bflag){
      //弹出报名框
       this.setState({bomb_box:true});
    // }
    // else
    // {
    //   //弹出登录框
    //   this.setState({login_box:true});
    // }
}
//判断用户登录选择是or否
UserIsSeclectedLogin(){
    let mask=document.getElementById('mask');
    mask.style.display="none";
    this.setState({login_box:false,can_move:true});
}
//接收用户输入内容判断
onCommitInfoBoxChanged(strResult,strName,strPhone){
    if("name_null" == strResult)
    {
      this.setState({tips_box:true});
      this.setState({msg:"姓名不能为空"});
    }
    else if("phone_null" == strResult)
    {
      this.setState({tips_box:true});
      this.setState({msg:"电话号码不能为空"});
    }
    else if("one" == strResult)
    {
      this.setState({tips_box:true});
      this.setState({msg:"姓名不能少于2个字"});
    }
    else if("lack" == strResult)
    {
      this.setState({tips_box:true});
      this.setState({msg:"电话号码格式不正确"});
    }
    else
    {
      let mask=document.getElementById('mask');
      mask.style.display="none";

      this.setState({bomb_box:false});
      this.setState({tips_box:false});
      this.setState({can_move:true});

      //此刻屏幕可以滑动
      document.documentElement.style.overflow='visible';
      document.body.style.overflow='visible';//手机版设置这个。

      if(strResult)//提交成功-ihma报名
      {
        const params={
          id:this.props.params.id,
          name:strName,
          tel:strPhone,
        }
        this.props.ihmaEnroll(params);
        // this.setState({btnText:"已完成"});
        this.setState({commitok_box: true});
      }
      else//取消
      {
        this.setState({commitok_box: false});
      }
    }
  }
 render(){
    const {detail,comments}=this.props;
    var name = "";
    if(detail){
        name = "课程目录("+detail.lecture.length+"门)";
    }
    return(
        <div className={styles.container}>
        <Helmet title="IHMA详情"/>
        <Header title="IHMA详情" back={this.back}/>
        {detail &&
        <div>
          <div className={styles.linecoursedetail}>
            <div className={styles.top_pic}>
               <img className={styles.img} src={detail.thumb==""?'/images/course_defaultbg.jpg':detail.thumb}/>
            </div>

            <div className={this.state.show_menu?styles.item2:styles.item}>
              {this.props.classification.map(function(value,index){
                if(1 == index){
                  return <div className={this.state.classification_select_index==index? styles.nav_selected:styles.nav} key={'classification'+index} onClick={this.ClickedClassification.bind(this,index)}>{name}
                    </div>
                }
                else {
                  return <div className={this.state.classification_select_index==index? styles.nav_selected:styles.nav} key={'classification'+index} onClick={this.ClickedClassification.bind(this,index)}>{value.name}
                  </div>
                }
              }.bind(this))}
            </div>
            <div id="main">
            {(()=>{
                if(0 == this.state.classification_select_index){
                  return <Introduction data={detail} comments={this.state.commentOne} not300="no" callbackParent={this.ClickedClassification.bind(this)} title="证书介绍" type="ihma"/>
                }
                if(1 == this.state.classification_select_index){
                  return <div className={styles.coursecatalog}>
                      <CourseCatalog data={detail.lecture}/>
                  </div>
                }
            })()}
            </div>
          </div>

          <div className={styles.float_bottom}>
          {(()=>{
            if(detail.is_buy == 0){
              return <Float_Bottom callbackParent={this.Signup.bind(this)} is_favorite={detail.is_favorite} btnText={this.state.btnText} id={this.props.params.id} type2="4"/>
            }
            else {
              return <Float_Bottom callbackParent={this.Signup.bind(this)} is_favorite={detail.is_favorite} btnText={detail.is_buy==1?"已完成":"证书报名"} id={this.props.params.id} type2="4"/>
            }
          })()}
          </div>

          {(()=>{
           if(this.state.bomb_box){
             return <CommitInfo_Box type="ihma" callbackParent={this.onCommitInfoBoxChanged.bind(this)}/>
           }
          })()}

         {(()=>{
           if(this.state.login_box){
             return <Login_Box callbackParent={()=>this.UserIsSeclectedLogin()}/>
           }
         })()}

         {(()=>{
           if(this.state.tips_box){
             return  <Warning visible="true" msg={this.state.msg}/>
           }
         })()}

         {(()=>{
            if(this.state.commitok_box)
            {
              return <CommitSuccess_Box msg="提交成功！" autoHide="true"/>
            }
         })()}

         </div>
        }
        </div>
    )
  }

}
