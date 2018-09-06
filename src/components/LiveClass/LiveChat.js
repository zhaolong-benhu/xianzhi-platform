/**
 * Created by zhaolong on 2016/12/7.
 * File description: 直播间聊天互动
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Warning} from 'components';
import webim from './webim';
import base from './base';
import {Link} from 'react-router';

const styles = require('./LiveChat.scss');
@connect(
  state => ({
    datas: state.live.detail,
  })
)
export default class LiveChat extends Component {
  state = {
    msgs: [],
    value:null,
    emotions:false,
  }
  static propTypes = {
    datas: PropTypes.object,
  }
  static defaultProps = {};
  constructor(props) {
    super(props)
    const me=this;
    if(!webim.checkLogin(null, true)){
      base.initIM(this.props.data,(data)=>{
        if(typeof(data)=='boolean'){
          setTimeout(function(){
            base.onSendMsg('进入房间',null)
            base.onSendMsg(JSON.stringify({headurl: me.props.data.user_thumb || '//f3-xz.veimg.cn/m/images/user/head.jpg'}),null)
          },500)
        }else{
          this.receiveMsgs(data)
        }
      })
    }else{
      console.log('已经登录');
    }
  }
  //显示聊天内容
  receiveMsgs = (data,order=false) => {
    // console.log(data);
    const msgs = this.state.msgs || []
    const message = data.content.replace(/&quot;/g, '"')
    var jsonMsg = null,
        isShow = true;
    switch (data.subType) {
      case 0://普通消息
        try {
          jsonMsg = JSON.parse(message)
          //纯数字
          if(message>=0){
          }else if(jsonMsg.type === "PushingStop"){
            data.content = `主播已经退出直播，本次直播已结束~`
            data.fromAccountNick = "系统消息"
          }else{
            isShow = false
          }
        }catch(e) {}
        break;
      case 1://弹幕
        jsonMsg = JSON.parse(message)
        data.content = `${data.fromAccountNick}: ${jsonMsg.barrageTxt}`;
        data.fromAccountNick = "弹幕消息"
        break;
      case 2://群提示消息
        const params={
          // channel_id: this.props.data.channel_id
          id: this.props.data.id
        }
        this.props.getLineNum(params)
        isShow = false
        data.fromAccountNick = "系统消息"
        break;
      case 3://红包
        jsonMsg = JSON.parse(message)
        if (jsonMsg.type === "PushingStop") {
          isShow = false
          // 停止推流消息
          // IOS退出视频观看
        }else if (jsonMsg.type === "barragePriceChanged") {
          // 修改弹幕价格
        }else {
          // 红包消息
          data.content = `${jsonMsg.userName} 向主播打赏了 ${jsonMsg.redPocketNum}元`
          data.fromAccountNick = "系统消息"
          this.props.redPocketNum(jsonMsg.redPocketNum)
        }
        break;
      default:
    }
    //是否显示消息
    if(isShow){
      order ? msgs.unshift(data) : msgs.push(data)
      this.setState({
        msgs: msgs
      })
      this._scrollTop()
    }
  }
  // 发消息
  _onSendMsg = () =>{
      const that = this,
            content=this.refs.sendMsg.value;
      if (this.props.isLogin) {
        if(!content.replace(/^\s*|\s*$/g,'') ) return
        base.onSendMsg(content,function(msgs){
            that.refs.sendMsg.value=''
            that.setState({emotions:false})
        })
      }else {
        this.refs.sendMsg.blur();
        this.props.UserPay("send");
      }
  }
  //发表情
  onChange = (value,type=false) => {
    if (value.replace(/^\s*|\s*$/g, '').length < 30) {
        this.refs.sendMsg.value=type ? this.refs.sendMsg.value + value : value;
    }
  }

  // 屏幕底部
  _scrollTop = ( type=true ) => {

    var msgflow = type ? document.getElementById("liveChatWrapper") : document.getElementsByTagName('body')[0];
    setTimeout(function () {
        msgflow.scrollTop = msgflow.scrollHeight;
    }, 300);
  }

  //打开或显示表情
  handleShowEmotionDialog() {
    // if (this.props.isLogin) {
    //   this.setState({emotions:!this.state.emotions})
    // } else {
    //   this.props.UserPay();
    // }
    this.props.UserPay("emotion");
  }

  //回车键按下开始搜索
  handleSend(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      this._onSendMsg()
    }
  }

  //用户打赏
  handleUserPay() {
    this.props.UserPay("pay");
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={this.props.hideChat ? styles.videodiscuss2 : styles.videodiscuss} id="liveChatWrapper">
          <ul className={styles.videosmslist} id="smsList">
            {this.state.msgs.map((item, index,v) => {
              return(
                <li key={index}>
                  <div className={styles.smspane}>
                    <div className={styles.smstext}>
                      <span className={item.subType>0 || item.fromAccountNick=='系统消息' ? styles.user_name_red : styles.user_name_blue}>{item.fromAccountNick}:</span>
                      <span dangerouslySetInnerHTML={{__html:item.content}}></span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.sendbox}>
          <div className={styles.sms}>
            <i style={{color: '#157eda'}} onClick={() => {this.handleShowEmotionDialog();}}>&#xe638;</i>
            <div className={styles.chatinput}>
              <Link to="/login" className={this.props.isLogin ? styles.logined : styles.login}>登录</Link>
              <input
                type="text"
                ref="sendMsg"
                className={this.props.isLogin ? styles.input2 : styles.input}
                id="sendMsg"
                onKeyDown={this.handleSend.bind(this)}
                maxLength="30"
                onFocus={()=>this._scrollTop(false)}
                placeholder="快来跟老师互动吧~"
              />
              <i className={styles.send} onClick={() => {this._onSendMsg()}}>&#xe64e;</i>
            </div>
            <i className={styles.redpaper} onClick={() => this.handleUserPay()}>&#xe63f;</i>

            <div className={this.state.emotions ? styles.emotion : styles.hide} id="emotion">
              <div className={styles.pane}>
                <ul id="emotionUL">
                {
                  webim.Emotions.map((v,index)=>{
                    return (
                      <li key={index} onClick={() => this.onChange(v.text,true)}>
                        <img src={v.pic} />
                      </li>
                    )
                  })
                }
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
