/**
 * Created by zhaolong on 2016/7/13.
 * File description:其他活动详细页
 */

'use strict'
import React,{Component,PropTypes} from 'react'
import Helmet from 'react-helmet';
import {Header,Login_Box,Float_Bottom,Payment_Box,FreeSignup_Box,Share,CourseOverview,Warning,PlayVideo} from 'components';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {creatactivityorder } from 'redux/modules/pay';
import { detail as getDetail} from 'redux/modules/activity';
import {imageUrl} from '../../api/common/Global';
const styles = require('./OtherActivitiesDetail.scss');
var real_price = 0;

@connect(
  state => ({
    detail:state.activity.data,
    pay:state.pay.result
  }),
  {getDetail,creatactivityorder,push}
)

export default class OtherActivitiesDetail extends Component{
  static propTypes = {
      detail: PropTypes.object,
      pay: PropTypes.object,
      getDetail: PropTypes.func.isRequired,
      push:PropTypes.func.isRequired
  };
  state={
    visible:false,//是否可见
    bomb_box:false,//弹框标识
    cancel_clicked:false,//取消按钮点击判断
    ok_clicked:true,//确定按钮点击判断
    share_box:false,//分享框
    login_box:false,//提示登录框
    datas:[],//所有的数据
    isfree:false,//是否免费标识
    tips_box:false,//文本提示框
    title:"",//标题
    id:"",//id
    type:"",//类型判断
    btnText:"我要报名",//文本显示
    pay_box:false,//支付弹框
    msg:'',//静态弹框文本内容
    can_move:true//判断屏幕是否可以移动
  }
  constructor(props){
    super(props)
    this.back = null;
    this.touchmove = this.handleTouchMove.bind(this);
  }
  componentWillReceiveProps(nextProps){
      this.setState({pay_box:false});
      if(this.props.pay!=nextProps.pay){
        if(nextProps.pay.status==1){
            if(nextProps.pay.data.order_status==0){
              this.props.push('/Pay/'+nextProps.pay.data.order_id);
            }
        }else{
          this.setState({msg:nextProps.pay.errMsg});
          this.setState({pay_box:true});
        }
      }
  }
  componentDidMount(){
    const params={
      id:this.props.params.id
    }
    this.props.getDetail(params);
    if(localStorage.oldbackUrl){
      this.back=localStorage.oldbackUrl;
    }
    window.addEventListener('touchmove',this.touchmove);

    // setTimeout(() =>{
    //     var oMeta = document.getElementsByTagName("meta");
    //     oMeta[1]["content"] = this.props.detail.learn_object;
    //
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
    //
    // },2000);
  }
  componentWillUnmount(){
      window.removeEventListener('touchmove',this.touchmove);
  }

  HTMLEnCode(str)
  {
    let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
  }

//报名
  Signup(bFlag)
  {
    this.setState({commitok_box: false,tips_box:false,can_move:false});
    let mask=document.getElementById('mask');
    mask.style.display="block";
    if(bFlag){
        this.setState({bomb_box:true});
    }
    else {
      //弹出登录框
      this.setState({login_box:true});
    }
  }
//屏幕按下移动事件
  handleTouchMove(e){
      if(!this.state.can_move){
          e.preventDefault();
      }
  }
  //判断用户登录选择是or否
  UserIsSeclectedLogin(){
    let mask=document.getElementById('mask');
    mask.style.display="none";
    this.setState({bomb_box:false,login_box:false,can_move:true});
  }
//用户选择事件
  UserSelected(str){
      this.setState({tips_box:false,can_move:true});
      if("ok" == str ){
        let mask=document.getElementById('mask');
        mask.style.display="none";
        this.setState({bomb_box:false});
        this.setState({tips_box:true});
        this.setState({btnText:"再次报名"});
        this.props.creatactivityorder(this.props.params.id);
      }
      else if("pay" == str){
        this.props.creatactivityorder(this.props.params.id);
      }
      else {
        let mask=document.getElementById('mask');
        mask.style.display="none";
        this.setState({bomb_box:false});
      }
  }
  //隐藏遮罩层
  Countdown(){
    let mask=document.getElementById('mask');
    mask.style.display="none";
  }
  //分享
  Share(){
    //弹出灰化层
     let mask=document.getElementById('mask');
     mask.style.display="block";

    //弹出分享框
    this.setState({share_box:true,can_move:false});
    //此刻屏幕不能在滑动
    document.documentElement.style.overflow='hidden';
    document.body.style.overflow='hidden';//手机版设置这个。
  }
 //取消分享
  Shared(str)
  {
    if(str=="cancel"){
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
  Play(){
      let p=document.getElementById('player');
      p.play();
  }

  render() {
    const {detail}=this.props;
    var title = "";
    if(detail){
        title = detail.title;
        real_price = detail.real_price;
          }
    return(
        <div className={styles.container}>
          <Helmet title={title}/>
          <Header title={title} back={this.back}/>
          {detail &&
          <div>
           <div className={styles.top_pic}>
            {(()=>{
                  if("" == detail.mp4_url){
                    return  <img className={styles.img} src= {detail.thumb==""?'/images/course_defaultbg.jpg':detail.thumb}/>
                  }else{
                    return <PlayVideo isfree={true} callbackParent={()=>this.Play()} isbuy={1} url={detail.mp4_url}  poster={detail.thumb} />
                  }
            })()}
           </div>

          <div className={styles.detail}>
            <div>
              <span className={styles.title}>{detail.title}</span>
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
                    {(()=>{
                      if(detail.is_apply == 0){
                        return <div>
                        <span className={styles.free}>免费</span>
                        <span className={styles.signup2}>报名结束</span>
                        </div>
                      }
                      else {
                        return <div>
                         <span className={styles.free}>免费</span>
                         <span className={styles.signup}>报名中</span>
                       </div>
                      }
                    })()}
                  </div>
                }
                else
                {
                  return  <div>
                  {(()=>{
                    if(detail.real_price == detail.price){
                      return <div>
                        <span className={styles.now_price}>¥{detail.real_price}</span>
                        {(()=>{
                          if(detail.is_apply == 0){
                            return <span className={styles.signup2}>报名结束</span>
                          }
                          else {
                            return <span className={styles.signup}>报名中</span>
                          }
                        })()}
                      </div>
                    }
                    else {
                      return <div>
                        <span className={styles.now_price}>¥{detail.real_price}</span>
                        <span className={styles.original_price}>¥{detail.price}</span>
                        <span className={styles.discount}>{detail.discount}折</span>
                        {(()=>{
                          if(detail.is_overdue == 0){
                            return <span className={styles.signup2}>报名结束</span>
                          }
                          else {
                            return <span className={styles.signup}>报名中</span>
                          }
                        })()}
                      </div>
                    }
                  })()}


                  </div>
                }

              })()}
            </div>

            <div>
              <span className={styles.key1}>时间</span>
              <span className={styles.colon}>:</span>
              <span className={styles.value}>{detail.start_time + " - "}{detail.end_time}</span>
            </div>

            <div>
              <span className={styles.key1}>机构</span>
              <span className={styles.colon}>:</span>
              <span className={styles.value}>{detail.teacher_name}</span>
            </div>


              {(()=>{
                var address = detail.address;
                if(address){
                  if(address.length<12){
                  }
                  else{
                    address = address.substr(0,13)+"...";
                  }
                }
                return  <div>
                    <span className={styles.key1}>地址</span>
                    <span className={styles.colon}>:</span>
                    <span className={styles.value}>{detail.address}</span>
                    {(()=>{
                      if(detail.map_xy!=""){
                        return <span className={styles.pos} onClick={this.GotoQQMap.bind(this,detail.map_xy)}>&#xe602;</span>
                      }
                    })()}
                  </div>
              })()}


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
              <span className={styles.key}>适合对象</span>
              <span className={styles.colon3}>:</span>
              <span className={styles.value}>{detail.learn_object}</span>
            </div>

          </div>

          {(()=>{
            if(this.state.bomb_box){
              return  <Payment_Box callbackParent={this.UserSelected.bind(this)} id={this.props.params.id} type="" goodsname={detail.title} payPrice={detail.real_price}/>
            }
          })()}

          <CourseOverview description={detail.description} title={detail.type_name+"主题"} type="activity"/>

          <div className={styles.float_bottom}>
            {(()=>{
              if(detail.is_apply == 1){

                  if(1 == detail.is_buy){
                      return <Float_Bottom callbackParent={this.Signup.bind(this)} is_favorite={detail.is_favorite} btnText="再次报名" id={this.props.params.id} type2={detail.type}/>
                  }
                  else
                  {
                    if(this.state.btnText == "我要报名"){
                      return <Float_Bottom callbackParent={this.Signup.bind(this)} is_favorite={detail.is_favorite} btnText="我要报名" id={this.props.params.id} type2={detail.type}/>
                    }
                    else{
                      return <Float_Bottom callbackParent={this.Signup.bind(this)} is_favorite={detail.is_favorite} btnText="再次报名" id={this.props.params.id} type2={detail.type}/>
                    }
                  }

              }
              else {
                return <Float_Bottom callbackParent={this.Signup.bind(this)} is_favorite={detail.is_favorite} btnText="活动超时" id={this.props.params.id} type2={detail.type}/>
              }
            })()}
          </div>

          {(()=>{
            if(this.state.share_box){
              return <div className={styles.float_share}>
                <Share callbackParent={this.Shared.bind(this)} title={detail.title+',共享才能共赢，各种线下活动期待您的参与'}  pic={detail.thumb}/>
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
              // return <FreeSignup_Box name={detail.title} callbackParent={this.Countdown.bind(this)}/>
            }
          })()}

          {(()=>{
            if(this.state.pay_box){
              return  <Warning visible="true" msg={this.state.msg}/>
            }
          })()}

          <div className="meta_description" style={{display:"none"}}>
              {detail.description}
          </div>
            </div>
          }


        </div>


    )
  }
}
