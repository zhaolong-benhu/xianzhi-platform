/**
 * Created by same on 2016/8/26.
  File description:slider 轮播组件
 */
'use strict';
import React,{Component} from 'react';
import {Link} from 'react-router';
const styles = require('./Slider.scss');
export default class Slider extends Component {
  state={
      activeSlide: 0 //当前幻灯片
  };
  //滑动幻灯片
  touch (event){
        var event = event || window.event;
        if(this.direction>0) return;
        switch(event.type){
            case "touchstart":
                this.nextevent=event.touches[0].clientX;
                break;
            case "touchend":
                break;
            case "touchmove":
                event.preventDefault();
                this.direction=this.nextevent>event.touches[0].clientX ? 1 : 2;
                clearInterval(this.time);
                if(this.direction==1){
                  this.previousSlide();
                }
                else{
                   this.nextSlide();
                }
                break;
        }
    }
  constructor(props) {
        super(props);
        this.time=''; //自动滚动时间
        this.nextevent=0; //下一张
        this.direction=0; //滑动方向
  }
  componentDidMount(){
    this.time=setInterval(()=>this.nextSlide(),this.props.time);
  }
  componentWillUnmount(){
    clearInterval(this.time);
  }
  //下一张幻灯片
  nextSlide(){
    var slide = this.state.activeSlide + 1 < this.props.data.length ? this.state.activeSlide + 1 : 0;
    if(this.state.activeSlide!=slide){
      this.setState({
          activeSlide: slide
      })
    }
    setTimeout(() => {
      this.direction=0;
    }, 350);
  }
  //上一张幻灯片
  previousSlide(){
    var slide = this.state.activeSlide - 1 < 0 ? this.props.data.length - 1 : this.state.activeSlide - 1;
    if(this.state.activeSlide!=slide){
      this.setState({
          activeSlide: slide
      });
    }
    setTimeout(() => {
      this.direction=0;
    }, 350);
  }
  //跳转webview
  goWebview(type,linkurl,live_id){
     //url来源 http://www.jb51.net/article/76585.htm

     window.location.href = linkurl;

    // if(type == 1 || type == 2){
    //     window.location.href = linkurl;
    // }
    // if(type == 3){
    //     var u = navigator.userAgent;
    //     var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    //     var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //     if(isAndroid){
    //         window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.antourong.itouzi';
    //         // window.location.href = 'https://itunes.apple.com/cn/app/先之学院/id1096449679?mt=8';
    //     }
    //     if(isiOS){
    //         window.location.href = 'https://itunes.apple.com/cn/app/先之学院/id1096449679?mt=8';
    //     }
    // }
  }
  render(){
    return(
      <div className={styles.slider} id="slider">
        <div>
        {(()=>{
            if(this.props.type == "lms"){
                return <div>
                {
                  this.props.data && this.props.data.map(function(v,i){
                    const background={
                      backgroundImage:'url('+v.imageurl+')'
                  }
                  return (
                    <div onClick={() => this.props.callbackParent()} key={"slider"+i}>
                      <div className={styles.slider__slide} data-active={i===this.state.activeSlide}  onTouchStart={this.touch.bind(this)} onTouchMove={this.touch.bind(this)}  style={background} >
                      </div>
                    </div>
                  )
                  }.bind(this))
                }
                </div>
            }else {
                return <div>
                    {
                     this.props.data && this.props.data.map(function(v,i){
                          const background={
                            backgroundImage:'url('+v.imageurl+')'
                          }
                          return (
                            <a onClick={()=>{this.goWebview(v.type,v.linkurl,v.live_id)}} key={"slider"+i} title={v.alt}>
                              <div className={styles.slider__slide} data-active={i===this.state.activeSlide}  onTouchStart={this.touch.bind(this)} onTouchMove={this.touch.bind(this)}  style={background} >
                              </div>
                            </a>
                          )
                    }.bind(this))
                }
                </div>
            }
        })()}
        {
          this.props.data.map(function(v,i){
            const background={
              backgroundImage:'url('+v.imageurl+')'
            }
            {(()=>{
                if(this.props.type == "lms"){
                    return (
                      <div onClick={() => this.props.callbackParent()} key={"slider"+i}>
                        <div className={styles.slider__slide} data-active={i===this.state.activeSlide}  onTouchStart={this.touch.bind(this)} onTouchMove={this.touch.bind(this)}  style={background} >
                        </div>
                      </div>
                    )
                }else {
                    return (
                      <a href={v.linkurl} key={"slider"+i} title={v.alt}>
                        <div className={styles.slider__slide} data-active={i===this.state.activeSlide}  onTouchStart={this.touch.bind(this)} onTouchMove={this.touch.bind(this)}  style={background} >
                        </div>
                      </a>
                    )
                }
            })()}
          }.bind(this))
        }
        </div>
        <div className={styles.slideWrap}>
            <ul>
            {
              this.props.data && this.props.data.map(function(v,i){
                return <li key={'wrapli'+i}  className={i===this.state.activeSlide ? styles.current : ''} onClick={i<this.state.activeSlide ? this.previousSlide.bind(this) : this.nextSlide.bind(this)}><em>{i}</em></li>
              }.bind(this))
            }
            </ul>
        </div>
     </div>

    )
  }
}
