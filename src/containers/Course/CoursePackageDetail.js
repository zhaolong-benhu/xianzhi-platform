/**
 * Created by zhaolong on 2016/8/10.
 * File description:专业证书详情
 */
'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {courseDetail} from 'redux/modules/excellentpackage';
import {comment_list} from '../../api/common/Global';
import {commentList} from 'redux/modules/comment';
import {Header,Introduction,Catalog,Evaluate,TutorEvaluate,CourseCatalog,Float_Bottom,Login_Box,Payment_Box,Warning} from 'components';
import {push} from 'react-router-redux';
import {createcourseorder } from 'redux/modules/pay';
const styles = require('./Course.scss');

@connect(
  state => ({
    detail:state.excellentpackage.detail,
    comments:state.comment.data,
    pay:state.pay.result
  }),
  {courseDetail,commentList,push,createcourseorder}
)
export default class
 extends React.Component{

  static propTypes = {
      detail: PropTypes.object,
      courseDetail: PropTypes.func.isRequired,
      commentList: PropTypes.func.isRequired,
      comments:PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      createcourseorder:PropTypes.func.isRequired,
      pay: PropTypes.object,
      show_menu:false,
      nomore_comment:false
  }
  state={
    classification_select_index:0,//菜单选择值
    btnText:"购买课程",//静态文本
    tips_box:false,//弹框
    bomb_box:false,//弹框
    login_box:false,//弹框
    msg:'',//弹框文字
    mp4_url:"",//视频地址
    pageNum:0,//页数
    total_num:0,//总评论数
    bLock:false,//翻页加锁标识
    commentlist:[],//评论列表
    commentOne:[],//评论列表
    index:0,//索引
    me_star:0,//我的评论
    //评论请求参数
    comment_params:{
      id:this.props.params.id || 0,
      type:3
    },
    can_move:true//屏幕是否可以移动
  };

  static defaultProps = {
    classification:[
      {name:"简介"},
      {name:"课程目录(10门)"},
      {name:"评价"}
    ]
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
//菜单选择事件
ClickedClassification(index){
    this.setState({tips_box:false});
    this.setState({classification_select_index:index});
}
constructor(props) {
    super(props);
    this.totop = 0;
    this.array=[];
    this.addarray=[];
    this.back = null;
    this.scroll = this.handleScroll.bind(this);
    this.touchmove = this.handleTouchMove.bind(this);
}
componentDidMount(){
  //添加滚动条事件
  window.addEventListener('scroll',this.scroll);
  window.addEventListener('touchmove',this.touchmove);
  // if(localStorage.oldbackUrl){
  //   this.back=localStorage.oldbackUrl;
  // }
  if(localStorage.oldbackUrl && localStorage.oldbackUrl){
    this.back=localStorage.backUrl!=localStorage.oldbackUrl ? localStorage.oldbackUrl :'/';
  }
  if(this.props.detail){
    setTimeout(() =>{
        var oMeta = document.getElementsByTagName("meta");
        oMeta[1]["content"] = this.props.detail.title+",先之云平台、先之教育、在线课程、酒店培训";
        var description = this.HTMLEnCode(this.props.detail.intro);
        if(description && description.length >200){
            oMeta[2]["content"] = description.substr(0,200);
        }else {
            oMeta[2]["content"] = description;
        }
    },2000);
  }
  //获取url参数 进入评价菜单子页
  var url = window.location.href; //获取url中"?"符后的字串
  if(url.indexOf("tab") != -1){
      this.setState({classification_select_index:2});
  }
}
componentWillUnmount(){
  window.removeEventListener('scroll',this.scroll);
  window.addEventListener('touchmove',this.touchmove);
}

HTMLEnCode(str)
{
  let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
}

//屏幕按下移动事件
handleTouchMove(e){
    if(!this.state.can_move){
        e.preventDefault();
    }
}
//屏幕移动事件
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
                  type:3
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
//判断用户是否登录
Signup(bflag){
  this.setState({tips_box:false,can_move:false});
  //弹出灰化层
  let mask=document.getElementById('mask');
  mask.style.display="block";
  if(bflag){
    //弹出报名框
     this.setState({bomb_box:true});
  }
  else
  {
    //弹出登录框
    this.setState({login_box:true});
  }
}
//弹出灰化层
CheckUserIsLogined(str,star){
  if(str === "购买过该专业证书才可以评价！"){
      this.setState({tips_box:true,msg:str});
  }
  if(str == "在线课程不可以重复评价！"){
    this.setState({tips_box:true,msg:str});
  }
  if(str=="unlogin") {
    //弹出灰化层
    let mask=document.getElementById('mask');
    mask.style.display="block";
    this.setState({login_box:true,can_move:false});
  }
  if(star>=1 && star<=5){
    this.setState({me_star:star});
    this.props.commentList(this.state.comment_params,comment_list);
  }
}
//判断用户登录选择是or否
UserIsSeclectedLogin(){
    let mask=document.getElementById('mask');
    mask.style.display="none";
    this.setState({login_box:false,can_move:true});
}
//判断用户支付选择取消或者立即支付
UserSelected(str){
    this.setState({can_move:true});
    if("cancel" == str){
      let mask=document.getElementById('mask');
      mask.style.display="none";
      this.setState({bomb_box:false});
    }
    else if("ok" == str){
      let mask=document.getElementById('mask');
      mask.style.display="none";
      this.setState({bomb_box:false});

      this.setState({tips_box:true,msg:"购买成功~",btnText:"已购买"});
    }
    else {
        this.props.createcourseorder(this.props.params.id,3);
    }
}

 render(){
    const {detail,comments}=this.props;
    var name = "";
    var title = "";
    if(detail){
        name = "课程目录("+detail.course.course_num+"门)";
        title = detail.title;
    }
    return(
        <div className={styles.container}>
        <Helmet title={title}/>
        <Header title={title} back={this.back}/>
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
                  return <Introduction data={detail}  comments={this.state.commentOne} not300="yes" callbackParent={this.ClickedClassification.bind(this)} title="证书简介" type="专业证书"/>
                }
                if(1 == this.state.classification_select_index){
                  return <div className={styles.coursecatalog}>
                      <CourseCatalog data={detail.course.list}/>
                  </div>
                }
                if(2 == this.state.classification_select_index){
                  if(comments){
                    return <TutorEvaluate total_num={comments.total_num} nomore_comment={this.state.nomore_comment} data={this.state.commentlist} callbackParent={this.CheckUserIsLogined.bind(this)} type={detail.type} id={this.props.params.id} name={detail.title} isbuy={detail.is_buy} star={detail.star} me_star={this.state.me_star==0 ? detail.me_star : this.state.me_star} title="专业证书" />
                  }
                }
            })()}
            </div>
          </div>

          <div className={styles.float_bottom}>
          {(()=>{
            if(detail.is_buy == 0){
              return <Float_Bottom callbackParent={this.Signup.bind(this)} is_favorite={detail.is_favorite} btnText="购买课程" id={this.props.params.id} type2="3"/>
            }
            else {
              return <Float_Bottom callbackParent={this.Signup.bind(this)} is_favorite={detail.is_favorite} btnText={detail.is_buy==1?"已购买":"已结业"} id={this.props.params.id} type2="3"/>
            }
          })()}
          </div>

          {(()=>{
           if(this.state.bomb_box){
             return <Payment_Box callbackParent={this.UserSelected.bind(this)} id={this.props.params.id} type="在线课程" goodsname={detail.title} payPrice={detail.real_price}/>
           }
          })()}

         {(()=>{
           if(this.state.login_box){
             return <Login_Box callbackParent={this.UserIsSeclectedLogin.bind(this)}/>
           }
         })()}

         {(()=>{
           if(this.state.tips_box){
             return  <Warning visible="true" msg={this.state.msg}/>
           }
         })()}
         </div>
        }
        </div>
    )
  }

}
