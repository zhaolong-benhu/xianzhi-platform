/**
 * Created by zhaolong on 2016/8/5.
 * File description:个人中心-用户反馈
 */
'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header,Warning} from 'components';
import superagent from 'superagent';
import {feedback} from '../../../api/common/user';
import {isLoaded, load as loadfeedback} from 'redux/modules/feedback';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
const styles = require('./FeedBack.scss');


@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    // if (!isLoaded(getState())) {
      return null; //dispatch(loadfeedback());
    // }
  }
}])

@connect(
  state => ({
    wallet: state.feedback.data
  }),{loadfeedback}
)

export default class FeedBack extends React.Component{
  static propTypes = {
      wallet: PropTypes.array,
      loadfeedback:PropTypes.func.isRequired
  }
state={
  msg:"",
  tips_box:false,
}
//反馈数据校验
  SubmitFeedBack = (event) =>{
    event.preventDefault();
    var strEmail = this.refs.email.value;
    var strMsg = this.refs.msg.value;
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

    if(0 == strEmail.length){
        this.setState({msg:"邮箱不能为空~"});
        this.setState({tips_box:true});
    }
    else if(strEmail.length>50)
     {
       this.setState({msg:"邮箱不得超过50位~"});
       this.setState({tips_box:true});
    }
    else if(!myreg.test(strEmail))
     {
       this.setState({msg:"邮箱格式不正确~"});
       this.setState({tips_box:true});
    }
    else if(0 == strMsg.length){
        this.setState({msg:"建议不能为空~"});
        this.setState({tips_box:true});
    }
    else {
      var type = 3;
      this.props.loadfeedback(type,strEmail,strMsg);
      this.setState({msg:"感谢您的反馈"});
      this.setState({tips_box:true});
     }

  }
 //限制文本框内容长度限制
  LimitTextInput(){
      var strMsg = this.refs.msg.value;
      if(strMsg.length>200)
      {
        this.refs.msg.value = strMsg.substr(0,200);
      }
  }
     render(){
       return(

           <div>
             <Helmet title="用户反馈"/>
             <Header title="用户反馈" type={true}/>

               <div className={styles.email}>
                   <span>邮箱</span>
                   <input type="email" placeholder="请输入您的邮箱" ref="email" name="email" id="email"/>
               </div>
               <div className={styles.msg}>
                 <textarea className={styles.idear} type="text"  ref="msg" onChange={this.LimitTextInput.bind(this)} name="idear" id="idear" placeholder="请输入您的意见"></textarea>
               </div>
               <div className={styles.footer}>
                   <div className={styles.submit} onClick={this.SubmitFeedBack.bind(this)}>提交</div>
                   <div className={styles.tel}>学习过程中遇到任何问题请致电</div>
                   <div className={styles.tel}>客服电话：<a href="tel:057181023940" className={styles.tel1}>0571-81023940</a></div>
                   <div className={styles.tel}>工作日：8:30-18:00</div>
               </div>

               {(()=>{
                 if(this.state.tips_box)
                 {
                   return <div>
                     <Warning visible="true" msg={this.state.msg}/>
                   </div>
                 }
               })()}
           </div>


       )
     }

   }
