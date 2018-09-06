/**
 * Created by same on 2016/7/23.
 * File description:视频播放
 */
'use strict';
import React,{Component,PropTypes} from 'react';
import {Link} from 'react-router';
import {Warning} from 'components';
import {connect} from 'react-redux';
const styles = require('./PlayVideo.scss');
@connect(
  state => ({
    user:state.auth.user
  }),{}
)
export default class PlayVideo extends Component {
  static propTypes = {
    user:PropTypes.object
  }
  state={
    visible:false,//是否显示
    isplay:false //是否播放
  }
  constructor(props) {
      super(props);
      this.isPlay = this.handleIsPlay.bind(this); //播放
      this.isPause = this.handleIsPause.bind(this);//暂停
      this.isEnded = this.handleIsEnded.bind(this); //结束
      this.islogin= this.props.user && this.props.user.user_ticket ?  true : false; //是否登录
  }
  componentDidMount(){
    let Media=document.getElementById("player");
    if(this.props.url){
      if(this.props.isfree){
            Media.addEventListener('play',this.isPlay);
      }else{
        if(this.props.isbuy==0){
            Media.addEventListener('play',this.isPlay);
            Media.addEventListener('pause',this.isPause);
            Media.addEventListener('ended',this.isEnded);
            Media.addEventListener('timeupdate',function(e){
              if(this.currentTime>300){
                this.pause();
              }
            })
        }
      }
    }
  }
  //播放
  handleIsPlay(e){
    let video=document.getElementById("player");
    this.setState({isplay:true});
  }
  //播放结束
  handleIsEnded(e){
    let video=document.getElementById("player");
    if(video && video.currentTime<=300){
      this.handleExitFullscreen();
      this.setState({visible:true});
      this.setState({isplay:false});
    }
  }
  //播放暂停
  handleIsPause(e){
      let video=document.getElementById("player");
      if(video && video.currentTime>=300){
        this.handleExitFullscreen();
        this.setState({visible:true});
        this.setState({isplay:false});
      }
  }
  //退出全屏
  handleExitFullscreen(){
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozExitFullScreen) {
      document.mozExitFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
  //回调父级函数
  handleClick(action){
    this.props.callbackParent(this.islogin,action);//tips
  }
  render(){
    return(
      <div className={styles.media} style={this.props.isfree ? {} : this.props.isbuy==1 ? {backgroundImage:'url('+this.props.poster+')',height:'216px'} : {}}>
          {(()=>{
             if(this.props.isfree){
                  return this.props.url ? <div className={this.state.isplay ? '' : styles.video_play} style={this.state.isplay ? {} : {backgroundImage:'url('+this.props.poster+')'}}>
                              <video className={this.state.isplay ? styles.video : styles.hide} src={this.props.url}  id="player" controls="controls" x5-video-player-type="h5" x5-video-player-fullscreen="true" webkit-playsinline="true" playsinline="true" width="100%" poster={this.props.poster}>
                                 your browser does not support the video tag
                              </video>
                              <div className={this.state.isplay ? styles.hide:styles.video_tips}>
                                  <i onClick={this.handleClick.bind(this,this.props.isbuy==0 ? "tips":"play")}>&#xe60d;</i>
                              </div>
                          </div>
                          :
                          <div className={this.state.isplay ? '' : styles.video_play} style={this.state.isplay ? {} : {backgroundImage:'url('+this.props.poster+')'}}></div>

             }else{
                if(this.props.isbuy==0){
                  return  this.props.url ? <div className={this.state.isplay ? '' : styles.video_play} style={this.state.isplay ? {} : {backgroundImage:'url('+this.props.poster+')'}}>
                              <video className={this.state.isplay ? styles.video : styles.hide} src={this.props.url}  id="player" controls="controls" x5-video-player-type="h5" x5-video-player-fullscreen="true" webkit-playsinline="true" playsinline="true" width="100%" poster={this.props.poster}>
                                 your browser does not support the video tag
                              </video>
                              <div className={this.state.visible ? styles.video_tips : styles.hide }>
                                  <p>试看结束，是否购买课程</p>
                                  <a onClick={this.handleClick.bind(this,"signup")}>马上购买</a>
                              </div>
                             <div className={this.state.isplay ? styles.hide : this.state.visible ?  styles.hide : styles.video_tips}>
                                  <i onClick={this.handleClick.bind(this,"play")}>&#xe60d;</i>
                              </div>
                          </div>
                          :
                          <div className={this.state.isplay ? '' : styles.video_play} style={this.state.isplay ? {} : {backgroundImage:'url('+this.props.poster+')'}}></div>
                }else{
                   return  <div className={styles.video_tips}>
                               <p>已购买该课程</p>
                               <Link to="/user">马上学习</Link>
                           </div>
                }

             }
          })()}

      </div>
    )
  }
}
