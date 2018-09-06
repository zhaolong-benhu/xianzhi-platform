/**
 * Created by qzy on 2016/11/24.
 * File description:直播列表页
 */
import React, {Component,PropTypes}from 'react';
import {Link,browserHistory} from 'react-router';
import {addFollow,cancelFollow} from 'redux/modules/live_follow';
import {connect} from 'react-redux';
import {Login_Box,Download_Box,Warning} from 'components';
import {imageUrl, url_prefix, } from '../../api/common/Global';
const styles = require('./OneLiveClass.scss');

@connect(
  state => ({
    addResult:state.live_follow.add_data,
    cancelResult:state.live_follow.cancel_data
}),{addFollow,cancelFollow}
)
export default class OneLiveClass extends Component {
    static propTypes = {
      addFollow: PropTypes.func,
      cancelFollow: PropTypes.func,
      user:PropTypes.object
    }
    state={
        login_box:false,
        can_move:true,
        tips_box:false,
        bDownloadBox:false,
        nClicked:-1,
        msg:"",
        list:[],
    }
    constructor(props){
        super(props);
        this.bClickedBtn = 0;
        this.touchmove = this.handleTouchMove.bind(this);
    }
    componentDidMount(){
        window.addEventListener('touchmove',this.touchmove);
        this.setState({list:this.props.data});
    }
    componentWillUnmount(){
        window.removeEventListener('touchmove',this.touchmove);
    }
    componentWillReceiveProps(nextProps){
         if(this.props.addResult!=nextProps.addResult){
              if(nextProps.addResult && nextProps.addResult.status == 1){
                  var list = this.state.list;
                  list[this.state.nClicked].remind = "1";
                  this.setState({list:list});
              }else {
                 this.setState({tips_box:true,msg:nextProps.addResult.errMsg});
             }
         }
         if(this.props.cancelResult!=nextProps.cancelResult){
              if(nextProps.cancelResult && nextProps.cancelResult.status == 1){
                  var list = this.state.list;
                  list[this.state.nClicked].remind = "0";
                  this.setState({list:list});
             }else {
                 this.setState({tips_box:true,msg:nextProps.cancelResult.errMsg});
             }
         }
    }
    //按下移动
    handleTouchMove(e){
          if(!this.state.can_move){
              e.preventDefault();
          }
      }
   //点击进入直播间
   liveHandle(type,status,id){
     if(this.bClickedBtn == 1){
       this.bClickedBtn = 0;
      //  e.preventDefault();
      return;
     }
    //  browserHistory.push("/live/"+id);
    if(type == 0){
      window.location.href = url_prefix+ "/live/getopenid?live_id="+id;
    }else {
      document.documentElement.style.overflow='none';
      document.body.style.overflow='none';//手机版设置这个。
      let mask=document.getElementById('mask');
      mask.style.display="block";
      this.setState({bDownloadBox:true,can_move:false});
    }
   }
  //添加和取消关注
   AddFollow(type,live_id,index){
       this.bClickedBtn = 1;
       this.setState({tips_box:false});
      if(this.props.isLogined){
          this.setState({nClicked:index});
          if(type == 0){
              this.props.cancelFollow(live_id);
          }else {
              this.props.addFollow(live_id);
          }
      }
      else{
          document.documentElement.style.overflow='none';
          document.body.style.overflow='none';//手机版设置这个。
          let mask=document.getElementById('mask');
          mask.style.display="block";
          this.setState({login_box:true,can_move:false});
      }
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
    //隐藏下载提示框
    UserIsSeclectedDownload(){
      let mask=document.getElementById('mask');
      mask.style.display="none";
      this.setState({bDownloadBox:false,can_move:true});
      document.documentElement.style.overflow='visible';
      document.body.style.overflow='visible';//手机版设置这个。
    }

  render() {
      var pic = imageUrl+"/images/user/head.jpg";
      var face_url = imageUrl+"/images/course_defaultbg.jpg";
      var pwd_icon = imageUrl+"/images/liveClass/lock.png";
      var rmb_icon = imageUrl+"/images/liveClass/rmb.png";

    return (
      <div className={styles.container}>
        {this.state.list.map((val,i)=>{
            return <div key={"list"+i}>
            <div className={styles.header}>
              <div className={styles.avatar}>
                <img src={val.pic==""?pic:val.pic} alt=""/>
              </div>
              <div className={styles.info}>
                <div className={styles.name}>
                  {val.teacher_name}
                </div>
                {val.teacher_label.length > 0 &&
                  <div className={styles.subtitle}>
                     {val.teacher_label.map((v,i)=>{
                       return <div className={styles.label} key={i}>{v}</div>
                     })}
                  </div>
                }
              </div>
              <div className={styles.people}>
                  <i className={styles.people_icon}>&#xe828;</i>
                  <span className={styles.online_num}>{val.live_status == 1 ? val.online_num : val.favorite_num}</span>
              </div>

            </div>

             <div className={styles.content}>
               <div onClick={()=>{this.liveHandle(val.type,val.live_status,val.id)} }>
                 <img className={styles.face_url} src={val.face_url == "" ? face_url : val.face_url} alt=""/>
                 <div className={styles.tags}>
                     {(()=>{
                       if(val.type == 1){
                         return <img className={styles.type} src={pwd_icon} alt=""/>
                       }
                       if(val.type == 2){
                         return <img className={styles.type} src={rmb_icon} alt=""/>
                       }
                     })()}

                   {(()=>{//1直播中 2预告 3直播结束 4已过预告时间，但未开播
                       if(val.live_status == 1){
                        return <div className={styles.living}>直播中</div>
                       }
                  })()}
                  {(()=>{
                    if(val.live_status == 2){
                     return <div className={styles.liveRemind}>
                              <div className={val.type=="0"?styles.start_time2:styles.start_time}>开播时间：{val.start_time}</div>
                              <div className={styles.remindText}>即将开播</div>
                            </div>
                   }
                  })()}
                </div>
                <div className={styles.actions}>
                  <div className={styles.start_time}>{val.title}</div>
                  {/* <div className={styles.action_follow}>
                  {(()=>{
                      if(val.live_status == 2 || val.live_status == null){//22
                          if(val.remind == 1) {
                              return <div className={styles.followed} onClick={()=>this.AddFollow(0,val.id,i)}>取消提醒</div>
                          }else {
                              return <div className={styles.follow} onClick={()=>this.AddFollow(1,val.id,i)}>直播提醒</div>
                          }
                      }
                  })()}
                  </div> */}
                </div>
              </div>
             </div>
            </div>
        })}

        {(()=>{
            if(this.state.tips_box){
                return <Warning msg={this.state.msg} visible={true}/>
            }
        })()}
        {(()=>{
            if(this.state.login_box){
                return <Login_Box callbackParent={()=>this.UserIsSeclectedLogin()}/>
            }
        })()}
        {(()=>{
            if(this.state.bDownloadBox){
                return <Download_Box callbackParent={()=>this.UserIsSeclectedDownload()} msg="Web端暂不支持付费/加密直播间，请下载官方App进行观看"/>
            }
        })()}
      </div>
    );
  }
}
