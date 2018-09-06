/**
 * Created by qzy on 2016/12/6.
 * File description:直播详情页
 */
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {LiveVideo, LiveUser, LiveChat, LiveChatInput, Warning,Login_Box,Areward_Box,NoContent,Header,Download,Download_Box,HistoricalReview} from 'components';
import {detail, reward, wxAuth,quitOnlineNum,getOnlineNum,redPocketNum,historyList} from 'redux/modules/live';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { push } from 'react-router-redux';
import base from '../../components/LiveClass/base'
const styles = require('./LiveClassDetail.scss');
var isFirst = 0;
@connect(
  state => ({
    data:state.live.detail,
    pay:state.live.data,
    quitNum:state.live.quit,
    lineNum:state.live.onlineNum,
    user:state.auth.user,
    search:state.routing.locationBeforeTransitions.search,
    money:state.live.money,
    liveHistoryList:state.live.liveHistoryList,
  }),
  {detail,reward,wxAuth,quitOnlineNum,push,getOnlineNum,redPocketNum,historyList}
)
export default class LiveClassDetail extends Component {

  static propTypes = {
    data: PropTypes.object,
    quitNum:PropTypes.object,
    liveHistoryList:PropTypes.object,
    detail: PropTypes.func.isRequired,
    historyList:PropTypes.func.isRequired,
    pay:PropTypes.object,
    reward: PropTypes.func.isRequired,
    wxAuth:PropTypes.func.isRequired,
    user: PropTypes.object,
    push:PropTypes.func.isRequired,
    lineNum:PropTypes.Number,
    money:PropTypes.Number,
  };
  constructor(props) {
    super(props);
    this.pwdtip = "当前直播间为密码直播间，请下载App进行观看直播";
    this.rmbtip = "当前直播间为收费直播间，请下载App进行观看直播";
    this.state = {
      tabSelected: 0,
      tips_box:false,//提示信息弹框
      msg:'',
      login_box:false, //是否显示用户登录框
      download_box:false,//是否显示app下载提示框
      can_move:true, //屏幕是否可以滚动
      input_box:false,//打赏金额输入框
      isLogin:false,
      money:0,
      bodyHeight: '480',
      classification_select_index:0,//索引判断
      classification:[
        {name:"聊天"},
        {name:"历史回看"}
      ],
      msg:"",
      hideChat:false
    };
    this.touchmove = this.handleTouchMove.bind(this);
  }
  componentWillMount(){
    //加载直播详细信息
    if(isFirst == 0){
        this.props.detail(this.props.params.id);

        //获取直播间历史回看数据
        this.props.historyList(this.props.params.id);

        isFirst = 1;
    }

  }
  componentWillReceiveProps(nextProps){
      this.setState({login_box:false,tips_box:false});
      if(this.props.pay!==nextProps.pay){
          if(nextProps.pay.status==1){
            //调用微信JS api 支付
            this.WeChatApiCall(nextProps.pay.data,this.money);
          }else{
            this.setState({msg:'打赏失败，码农正在抢修中~',tips_box:true});
          }
      }
      //获取用户是否登录
      if(this.props.data != nextProps.data){
          if(nextProps.data.data){
              this.setState({isLogin:nextProps.data.data.user_id==0 ? false : true});
          }
      }
      if(this.props.quitNum != nextProps.quitNum){
          location.href='/live';
      }
      //获取直播间历史回看数据
      if(this.props.liveHistoryList != nextProps.liveHistoryList){
      }

  }
  componentDidMount(){
    //监听屏幕滚动
    window.addEventListener('touchmove',this.touchmove);
    let bodyHeight = Number(document.body.scrollHeight)+"px";
    this.setState({bodyHeight:bodyHeight});
  }
  componentWillUnmount(){
    //退出直播间-1
    //   this.props.quitOnlineNum(this.user_name,this.channel_id);
  }
  //切换页面
  handleTabClick(index) {
    this.setState({
      tips_box:false,
      tabSelected: index,
    });
  }
  // 获取参数
  getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  }
  //打赏
  handleUserPay(type){
    // if(this.state.isLogin){
    //   if(this.isWeiXin()){
    //       let mask=document.getElementById('mask');
    //       mask.style.display="block";
    //       this.setState({input_box:true,can_move:false});
    //   }else{
    //      this.setState({msg:'亲，请在微信中进行打赏哦~',tips_box:true});
    //   }
    // }else{
    //   //弹出灰化层
    //   let mask=document.getElementById('mask');
    //   mask.style.display="block";
    //   //弹出登录框
    //   this.setState({login_box:true,can_move:false});
    // }
    //弹出灰化层
    let mask=document.getElementById('mask');
    mask.style.display="block";
    this.setState({can_move:false});

    if(type == "send"){
      //弹出登录框
      this.setState({login_box:true});
    }
    if(type == "emotion"){
      //弹出下载提示框
      this.setState({download_box:true,msg:"Web端暂不支持表情互动，请下载官方App"});
    }
    if(type == "pay"){
      //弹出下载提示框
      this.setState({download_box:true,msg:"Web端暂不支持打赏功能，请下载官方App进行打赏"});
    }
  }

  //调用微信JS api 支付
  WeChatApiCall(data,money)
  {
      WeixinJSBridge.invoke(
         'getBrandWCPayRequest',
         data,
         function(res){
            if(res.err_msg == 'get_brand_wcpay_request:ok'){
              base.sendRedPacketMsg(money);//发送打赏信息
            }else{
              this.setState({tips_box:true,msg:"打赏失败~"});
            }
         }
      );
  }
  //判断是否是微信
  isWeiXin(){
      const ua = window.navigator.userAgent.toLowerCase();
      var iswx=false;
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          iswx=true;
      }
      return iswx;
  }
  //屏幕滚动设置
  handleTouchMove(e){
      if(!this.state.can_move){
          e.preventDefault();
      }
  }
  //用户取消登录
  handleLoginCancel(){
      let mask=document.getElementById('mask');
      mask.style.display="none";
      //设置屏幕可以滑动
      this.setState({login_box:false,can_move:true});
  }

  //打赏框接受子组件传递数据
  Areward(bFlag,strResult,nMoney){
      this.setState({tips_box:false});
      if(!bFlag){
            this.setState({input_box:false});
      }else {
          switch (strResult) {
              case "isEmpty": //验证打赏金额
                  {
                      this.setState({tips_box:true,msg:"打赏金额不能为空~"});
                  } break;
              case "Formaterror"://验证打赏金额格式
                  {
                      this.setState({tips_box:true,msg:"打赏金额格式不正确~"});
                  } break;
              case "Moneyless"://提升打赏金额
                  {
                      this.setState({tips_box:true,msg:"亲，最低打赏1元哦~"});
                  } break;
              case "Valid": //通过验证
                  {
                      //调用api打赏接口
                      this.money=nMoney;
                      this.props.reward(this.props.params.id, nMoney, this.getQueryString('openid'));
                      this.setState({input_box:false,can_move:true});
                  } break;
              default:
          }
      }
  }
  //用户是否登录
  handleIsLogin(){
      if(!this.state.isLogin){
        //弹出灰化层
        let mask=document.getElementById('mask');
        mask.style.display="block";
        //弹出登录框
        this.setState({login_box:true,can_move:false});
      }
  }
  //退出房间
  exitRoom(user_name,channel_id){
      this.props.quitOnlineNum(user_name,channel_id);
      base.quitBigGroup();
      //base.logout();
      location.href='/live';
  }
  //菜单点击事件
  ClickedClassification(index){
      this.setState({classification_select_index:index});
      if(0 == index){
        this.setState({hideChat:false});
      }else {
        this.setState({hideChat:true});
      }
  }
  //隐藏下载提示框
  UserIsSeclectedDownload(){
    let mask=document.getElementById('mask');
    mask.style.display="none";
    this.setState({download_box:false,can_move:true});
    document.documentElement.style.overflow='visible';
    document.body.style.overflow='visible';//手机版设置这个。
  }
  //下载App
  downloadApp(){
    window.location.href = "/web/index.html";
  }

  //点击历史回看列表
  onClickHistoryList(){
    let mask=document.getElementById('mask');
    mask.style.display="block";
    this.setState({download_box:true,can_move:false,msg:"Web端暂不支持视频回看功能，请下载官方App进行观看"});
    document.documentElement.style.overflow='hidden';
    document.body.style.overflow='hidden';//手机版设置这个。
  }
  render() {
    const {data,liveHistoryList,lineNum}=this.props;
    // console.log("lineNum:"+lineNum);
    return (
      <div className={styles.container}>
      <Helmet title={this.props.data && this.props.data.status==1 ? `${this.props.data.data.live_user_name}的直播间` : '直播间'}
        script={[
                    {"src": "//qzonestyle.gtimg.cn/open/qcloud/video/live/h5/live_connect.js", "type": "text/javascript","charset": "utf-8"},
                    {"type": "application/ld+json", "innerHTML": `{ "@context": "http://schema.org" }`}
                ]}
        meta={[
            {"name": "format-detection", "content": "telephone=no, email=no"}
        ]}
        />
        {data && data.status==0 &&
          <div>
            <Header line="true"  title="直播间" back={'/live'} />
            <NoContent text="亲，没有此直播间！" height={this.state.bodyHeight}/>
          </div>
        }
        {data && data.status==1 &&
          <div className={styles.videopage}>
                {/*直播视频组件*/}
                {(()=>{
                    switch (data.data.type) {//0：无验证，1：密码，2：门票
                        case "0":
                            return <LiveVideo {...this.props.data} callbackParent={()=>this.onClickHistoryList()}/>
                            break;
                        case "1":
                            return <div className={styles.novideo}>
                                <div className={styles.tips}>{this.pwdtip}</div>
                                <div className={styles.downloadBtn} onClick={()=>this.downloadApp()}>立即下载</div>
                            </div>
                            break;
                        case "2":
                            return <div className={styles.novideo}>
                                <div className={styles.tips}>{this.rmbtip}</div>
                                <div className={styles.downloadBtn} onClick={()=>this.downloadApp()}>立即下载</div>
                            </div>
                            break;
                        default:
                    }
                })()}

                <div className={styles.anchorinfos}>
                    <div className={styles.infos}>
                      <div className={styles.info}>
                        <span className={styles.name}>{data.data.live_user_name}</span>
                        <i className={styles.people_icon}>&#xe828;</i>
                        <span className={styles.onlineNum}>{lineNum}</span>
                      </div>
                      <div className={styles.label}>
                        {data.data.live_user_label.map((v,i)=>{
                          return <span className={styles.lab} key={i}>{v}</span>
                        })}
                      </div>
                    </div>
                    <div className={styles.app}><div className={styles.btn} onClick={()=>this.downloadApp()}>App观看</div></div>
                </div>

                <div className={styles.item}>
                  {this.state.classification.map((v,i)=>{
                    return  <div className={this.state.classification_select_index==i? styles.nav_selected:styles.nav} key={'classification'+i} onClick={this.ClickedClassification.bind(this,i)}>{v.name}
                    </div>
                  })}
                </div>
                {(()=>{
                    if(this.state.classification_select_index == 1){
                      return <HistoricalReview callbackParent={()=>this.onClickHistoryList()} data={liveHistoryList.data.historyList}/>
                    }
                })()}

                <div>
                  <LiveChat hideChat={this.state.hideChat} redPocketNum={(money)=>this.props.redPocketNum(money)} getLineNum={(params)=>this.props.getOnlineNum(params)} UserPay={(type)=>this.handleUserPay(type)} isWeiXin={()=>this.isWeiXin()} isLogin={this.state.isLogin} {...this.props.data}/>
                </div>

             {(()=>{
                   if(this.state.tips_box){
                      return  <Warning visible={true} msg={this.state.msg}/>
                   }
             })()}
             {(()=>{
                   if(this.state.login_box){
                     return <Login_Box callbackParent={this.handleLoginCancel.bind(this)}/>
                   }
             })()}
             {(()=>{
                   if(this.state.download_box){
                     return <Download_Box callbackParent={()=>this.UserIsSeclectedDownload()} msg={this.state.msg}/>
                   }
             })()}

             {(()=>{
                 if(this.state.input_box){
                     return <Areward_Box callbackParent={(bFlag,strResult,nMoney)=>this.Areward(bFlag,strResult,nMoney)}/>
                 }
             })()}
            </div>
        }
      </div>
    );
  }
}
