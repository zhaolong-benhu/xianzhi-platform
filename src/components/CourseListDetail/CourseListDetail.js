/**
 * Created by zhaolong on 2016/6/24.
 * File description:线下公开课详情页
 */
'use strict'
import React,{Component,PropTypes} from 'react'
import Helmet from 'react-helmet';
import {Header,Float_Bottom,Share,AlreadySignup,CourseOverview,MoreRecommend,Comment,Payment_Box,Login_Box,Warning,Alert,CommitInfo_Box,EvaluationTutor_Box} from 'components';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {postData } from 'redux/modules/page';
import {openClassDetail as courseDetail} from 'redux/modules/activity';
import {commentList } from 'redux/modules/comment';
import {add_comment,comment_list} from '../../api/common/Global';
import {push} from 'react-router-redux';
import {creatactivityorder } from 'redux/modules/pay';
import {shallowEqualImmutable} from 'react-immutable-render-mixin';
import {imageUrl} from '../../api/common/Global';
const styles = require('./CourseListDetail.scss');
@connect(
  state => ({
    detail:state.activity.detail,
    user:state.auth.user,
    comments:state.comment.data,
    addcomment:state.page.result,
    pay:state.pay.result
  }),
  {courseDetail,postData,commentList,push,creatactivityorder}
)

export default class CourseListDetail extends Component{
  static propTypes = {
      detail: PropTypes.object,
      courseDetail: PropTypes.func.isRequired,
      user:PropTypes.object,
      commentList: PropTypes.func.isRequired,
      push:PropTypes.func.isRequired
  }
  state={
    visible:false,//是否可见
    bomb_box:false,//弹框
    cancel_clicked:false,//取消点击
    ok_clicked:true,//确定点击
    share_box:false,//分享框
    title:"更多推荐",//文本显示
    lookall:"查看全部",//文本显示
    tips_box:false,//提示信息弹框
    login_box:false,//登录框
    msg:"",//弹框提示文字
    commentlist:[],//评论数据
    iscomment:false,//是否可以评论
    btnText:'我要报名',//文本显示
    pageNum:0,//页数
    total_num:0,//总评论数
    index:1,//索引
    bLock:false,//翻页枷锁
    bHidden:false,//是否隐藏div
    can_move:true,//屏幕可移动标识
    nomore_comment:false//没有更多评论
  }

  componentWillMount() {
    //获取公开课评论
    const comment_params={
      id:this.props.params.id,
      type:12
    }
    this.props.commentList(comment_params,comment_list);
  }
  constructor(props) {
      super(props);
      this.array=[];
      this.addarray=[];
      this.real_price = 0;
      this.back=null;
      this.scroll = this.handleScroll.bind(this);
      this.touchmove = this.handleTouchMove.bind(this);
  }
  componentDidMount(){
    //获取公开课详细
    const id=this.props.params.id;
    this.props.courseDetail(id);
    //添加滚动条事件
    window.addEventListener('scroll',this.scroll);
    window.addEventListener('touchmove',this.touchmove);

    if(localStorage.oldbackUrl && localStorage.oldbackUrl){
        this.back=localStorage.backUrl!=localStorage.oldbackUrl ? localStorage.oldbackUrl :'/';
    }
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
  //滚动条加载数据
  handleScroll(e){
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
              type:12
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
      if(this.state.iscomment){
          const comment_params={
            id:this.props.params.id,
            type:12
          }
          this.props.commentList(comment_params,comment_list);
       }

      if(this.props.comments!=nextProps.comments && nextProps.comments){
         if(this.state.iscomment){
           this.addarray.push(nextProps.comments.list[0]);
         }else{
           if(this.addarray.length>0){
             this.array[0].splice(0,0,this.addarray[0]);
             this.addarray.length=0;
           }else{
             this.array.push(nextProps.comments.list);
           }
         }
        this.setState({pageNum:nextProps.comments.total_page})
        this.setState({total_num:nextProps.comments.total_num})
        this.setState({commentlist:this.array});
        this.setState({bLock:false});
        this.setState({iscomment:false});
      }
  }
//判断用户是否登录
  Signup(bflag){
    this.setState({tips_box:false,can_move:false});//设置屏幕不可以滑动
    document.documentElement.style.overflow='hidden';
    document.body.style.overflow='hidden';//手机版设置这个。
    if(bflag){
        let mask=document.getElementById('mask');
        mask.style.display="block";
        this.setState({bomb_box:true});
    }
    else {
      let mask=document.getElementById('mask');
      mask.style.display="block";
      //弹出登录框
      this.setState({login_box:true});
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

      this.setState({btnText:"已报名"});
      this.props.creatactivityorder(this.props.params.id);
    }
    else if("pay"==str) {
        this.props.creatactivityorder(this.props.params.id);
    }
    this.setState({can_move:true});
    //设置屏幕可以滑动
    document.documentElement.style.overflow='visible';
    document.body.style.overflow='visible';//手机版设置这个。
  }

//判断用户登录选择是or否
  UserIsSeclectedLogin(){
    //弹出灰化层
    let mask=document.getElementById('mask');
    mask.style.display="none";
    this.setState({login_box:false,can_move:true});
    document.documentElement.style.overflow='visible';
    document.body.style.overflow='visible';//手机版设置这个。
  }

//分享按钮
  Share(e){
    e.nativeEvent.stopImmediatePropagation();
    //弹出灰化层
    let mask=document.getElementById('mask');
    mask.style.display="block";
    //弹出分享框
    this.setState({share_box:true,can_move:false});
    //此刻屏幕不能在滑动
    document.documentElement.style.overflow='hidden';
    document.body.style.overflow='hidden';//手机版设置这个。
  }

//取消分享按钮
  Shared(str){
    if(this.state.share_box && str=="cancel"){
      let mask=document.getElementById('mask');
      mask.style.display="none";
      //隐藏分享框
      this.setState({share_box:false,can_move:true});
      //此刻屏幕可以滑动
      document.documentElement.style.overflow='visible';
      document.body.style.overflow='visible';//手机版设置这个。
    }
  }

  //进入地图详情页
  GotoQQMap(map_xy){
    //this.props.push('/Xianzhi/'+map_xy);
    window.location.href='/Xianzhi/'+map_xy;
  }

  //接受子组件传递过来的值 发送到后台
  GetUserCommitComment(strComment){
    if(this.props.user && this.props.user.user_ticket){
      var id = this.props.params.id;
      var type = 12;
      var resource_name = this.props.detail.title;
      var description = strComment;
      if(!strComment){
          this.setState({msg:"请输入内容！"});
          this.setState({tips_box:true});
      }else{
        const params={
          id:id,
          type:type,
          resource_name:resource_name,
          description:description
        }
        this.setState({iscomment:true});
        this.props.postData(params,add_comment);
      }
    }
    else {
        let mask=document.getElementById('mask');
        mask.style.display="block";
        this.setState({login_box:true});
    }
  }
  //进入课程详情页
  ChangeCourse(id){
    this.props.push("/gongkaike/"+id);
    window.location.reload();
  }
  render() {
    const {detail}=this.props;
    if(detail){
      this.real_price = detail.real_price;
    }

    return(
      <div className={styles.container}>
          <Helmet title="线下公开课详情"/>
          <Header title="线下公开课详情" back={this.back}/>
          {detail &&
              <div>
                <div className={styles.top_pic}>
                   <img className={styles.img} src={detail.thumb==""?'/images/course_defaultbg.jpg':detail.thumb}/>
                </div>

                <div className={styles.detail}>
                 <div>
                   <span className={styles.coursetitle}>{detail.title}</span>
                   <span className={styles.share} onClick={this.Share.bind(this)}>&#xe60c;</span>
                 </div>

                 <div>
                  <span className={styles.interest}>{detail.view_num}人感兴趣</span>
                 </div>

                 <div className={styles.status}>
                   {(()=>{
                     if("0.00" == detail.real_price)
                     {
                       return  <div>
                         <span className={styles.free}>免费</span>
                         {(()=>{
                           if(detail.is_apply == 1){
                             return  <span className={styles.signup}>报名中</span>
                           }
                           else {
                             return  <span className={styles.signupover}>报名结束</span>
                           }
                         })()}

                       </div>
                     }
                     else
                     {
                        if(detail.real_price == detail.price){
                           return  <div>
                             <span className={styles.now_price}>¥{detail.real_price}</span>
                             {(()=>{
                               if(detail.is_apply == 1){
                                 return  <span className={styles.signup}>报名中</span>
                               }
                               else {
                                 return  <span className={styles.signupover}>报名结束</span>
                               }
                             })()}
                           </div>
                        }else {
                            return <div>
                            <span className={styles.now_price}>¥{detail.real_price}</span>
                            <span className={styles.original_price}>¥{detail.price}</span>
                            <span className={styles.discount}>{detail.discount}折</span>
                            {(()=>{
                              if(detail.is_apply == 1){
                                return  <span className={styles.signup}>报名中</span>
                              }
                              else {
                                return  <span className={styles.signupover}>报名结束</span>
                              }
                            })()}
                            </div>
                        }
                     }
                   })()}
                 </div>

                 <div>
                   <span className={styles.key1}>时间</span>
                   <span className={styles.colon}>:</span>
                   <span className={styles.value}>{detail.start_time+" - "}{detail.end_time}</span>
                 </div>

                 <div>
                   <span className={styles.key1}>讲师</span>
                   <span className={styles.colon}>:</span>
                   <span className={styles.value}>{detail.teacher_name}</span>
                 </div>

                 <div>
                   <span className={styles.key1}>地址</span>
                   <span className={styles.colon}>:</span>
                   <span className={styles.value}>{detail.address}</span>
                   {(()=>{
                     if(detail.map_xy!=""){
                       return <span className={styles.pos} onClick={this.GotoQQMap.bind(this,detail.map_xy)}>&#xe602;</span>
                     }
                   })()}
                 </div>

                 <div>
                   <span className={styles.key2}>联系人</span>
                   <span className={styles.colon2}>:</span>
                   <span className={styles.value}>{detail.contact_name}</span>
                   {(()=>{
                      var telNumber = detail.contact_tel;
                      telNumber = telNumber.replace(/(\s*$)/g,"");
                      return <a href={'tel:'+telNumber} className={styles.phone}><img style={{width:'18px',height: '18px'}} src={imageUrl+"/images/tel.png"} /></a>
                   })()}
                 </div>

                 <div>
                   <span className={styles.key2}>发起人</span>
                   <span className={styles.colon2}>:</span>
                   <span className={styles.value}>{detail.initiator}</span>
                 </div>
                 <div>
                   <span className={styles.key}>适合对象</span>
                   <span className={styles.colon3}>:</span>
                   <span className={styles.value}>{detail.learn_object}</span>
                 </div>
                </div>

                <AlreadySignup id={this.props.params.id}/>
                <div className={styles.recommend}>
                {(()=>{
                  if(detail.is_apply == 1){
                    //报名中 此时不显示更多推荐
                  }
                  else
                  {
                    //报名结束
                    return <div>
                    <div className={styles.line}></div>
                    <div className={styles.title}>
                      <span className={styles.text}>{this.state.title}</span>
                      {(()=>{
                        if(0 == detail.more_recommend.length){
                          return<span className={styles.lookall}>暂无更多推荐</span>
                        }
                      })()}

                      {(()=>{
                        if(detail.is_more==1){
                          return  <Link to={'/gongkaike/list/0-1-12'} onClick="ga('send','event','tuijian','detail-3','zxkecheng')">
                               <span className={styles.lookall_icon}>&#xe60e;</span>
                               <span className={styles.lookall}>{this.state.lookall}</span>
                             </Link>
                        }
                      })()}
                    </div>

                  <div className={styles.empty}></div>
                  {detail.more_recommend.map(function(data,index){
                    return <li key={'data' + index} onClick={this.ChangeCourse.bind(this,data.id)}>
                      <div className={styles.pic}>
                          <img src={data.thumb}/>
                      </div>
                      <div className={styles.info} key={'data' + index}>
                        <div>
                          <span className={styles.title2}>{data.title}</span>
                        </div>
                        <div>
                          <span className={styles.name}>{data.teacher_name}</span>
                          <span className={styles.time}>{data.start_time}</span>
                          <span className={styles.time}>{data.city_name}</span>
                        </div>
                        {(()=>{
                            if(data.real_price == "0.00"){
                              return  <div>
                                  <span className={styles.price}>免费</span>
                                  <span className={styles.fr}>{data.apply_num}人报名</span>
                                </div>
                            }
                            else if(data.real_price == data.price){
                                return  <div>
                                    <span className={styles.price}>￥{data.real_price}</span>
                                    <span className={styles.fr}>{data.apply_num}人报名</span>
                                  </div>
                            }
                            else {
                                return  <div>
                                    <span className={styles.price}>￥{data.real_price}</span>
                                    <span className={styles.sale}>￥{data.price}</span>
                                    <span className={styles.discount}>{data.discount}折</span>
                                    <span className={styles.fr}>{data.apply_num}人报名</span>
                                  </div>
                            }
                        })()}

                        {(()=>{
                          if(index == 0){
                            return <div className={styles.seperator}></div>
                          }
                        })()}
                      </div>
                    </li>
                  }.bind(this))}
                    </div>
                  }
                })()}
                </div>

                 <CourseOverview description={detail.description} title="课程概述"/>
                 <Comment total_num={this.state.total_num} type="12" data={this.state.commentlist} nomore_comment={this.state.nomore_comment} callbackParent={this.GetUserCommitComment.bind(this)}/>
                 {(()=>{
                  if(this.state.bomb_box){
                     return  <Payment_Box callbackParent={this.UserSelected.bind(this)} id={this.props.params.id} type="公开课" goodsname={detail.title} payPrice={detail.real_price}/>
                  }
                })()}

                {(()=>{

                  if(detail.is_apply == 1){
                    //报名中
                      if("0.00"  == detail.real_price){
                      //1免费
                        if(1 == detail.is_buy){
                          return  <div className={styles.float_bottom}>
                            <Float_Bottom callbackParent={this.Signup.bind(this)} btnText="已报名" is_favorite={detail.is_favorite} id={this.props.params.id} type2="12" type="公开课"/>
                          </div>
                        }
                        else {
                          return  <div className={styles.float_bottom}>
                            <Float_Bottom callbackParent={this.Signup.bind(this)} btnText={this.state.btnText} is_favorite={detail.is_favorite} id={this.props.params.id} type2="12" type="公开课"/>
                          </div>
                        }
                      }
                      else{
                          //2收费
                          if(1 == detail.is_buy){
                            return  <div className={styles.float_bottom}>
                              <Float_Bottom callbackParent={this.Signup.bind(this)} btnText="再次购买" is_favorite={detail.is_favorite} id={this.props.params.id} type2="12" type="公开课"/>
                            </div>
                          }
                          else
                          {
                            return  <div className={styles.float_bottom}>
                              <Float_Bottom callbackParent={this.Signup.bind(this)} is_favorite={detail.is_favorite} btnText="我要报名" id={this.props.params.id} type2="12" type="公开课"/>
                            </div>
                          }
                      }
                  }
                  else
                  {
                    return  <div className={styles.float_bottom}>
                      <Float_Bottom callbackParent={this.Signup.bind(this)} is_favorite={detail.is_favorite} btnText="活动超时" id={this.props.params.id} type2="12" type="公开课"/>
                    </div>
                  }


                })()}

                {(()=>{
                  if(this.state.share_box){
                    return <div className={styles.float_share}>
                       <Share callbackParent={this.Shared.bind(this)} title={detail.title+',现场与导师互动，感受酒店培训课程的魅力与激情'} pic={detail.thumb}/>
                    </div>
                  }
                })()}

                {(()=>{
                  if(this.state.login_box){
                    return <Login_Box callbackParent={this.UserIsSeclectedLogin.bind(this)}/>
                  }
                })()}


                {(()=>{
                  if(this.state.tips_box){
                    return  <Warning visible={true} msg={this.state.msg}/>
                  }
                })()}
              </div>
          }
      </div>
    )
  }
}
