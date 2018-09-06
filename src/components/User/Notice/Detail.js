/**
 * Created by zhaolong on 2016/8/5.
 * File description:关注内容头部+底部
 */
 'use strict';
 import React,{Component,PropTypes} from 'react';
 import Helmet from 'react-helmet';
 import {Header} from 'components';
 import {noticedetail} from '../../../api/common/user';
 import {connect} from 'react-redux';
 import {postData } from 'redux/modules/page';
 const styles = require('./Detail.scss');

 @connect(
   state => ({
     user:state.auth.user,
     result:state.page.result
   }),{postData}
 )

export default class Detail extends React.Component{
    static propTypes = {
      user:PropTypes.object,
      postData:PropTypes.func.isRequired
    }
    state={
      height:''
    }
    constructor(props){
      super(props);
      this.back = null;
    }
    componentWillMount(){
      if(this.props.user){
        var id = this.props.params.id;
        this.props.postData({id:id},noticedetail);
      }
    }
    componentDidMount(){
      this.setState({height:screen.height+"px"});
      if(localStorage.oldbackUrl){
        this.back=localStorage.oldbackUrl;
      }
    }
     render(){
       const {user,result}=this.props;
       var title = ""
       if(result){
         if(1 == result.data.type){
           title = "系统提醒详情";
         }
         else {
           title = "通知详情";
         }
       }
       return(
         <div className={styles.messagedetail}  style={{height:this.state.height,backgroundColor:"#FFF"}}>
           <Helmet title={title}/>
           <Header title={title} line="1" back={this.back}/>
           {result &&
             <div>
                   <div className={styles.message}>
                         <div className={styles.title}>{result.data.title}</div>

                         <div>
                           <span className={styles.sendname}>发 送 人:</span>
                           <span className={styles.name}>{result.data.send_user}</span>
                         </div>

                         <div>
                           <span className={styles.sendname}>发送时间:</span>
                           <span className={styles.name}>{result.data.add_time}</span>
                         </div>
                   </div>

                   <div className={styles.detail}>
                     <div className={styles.username}>亲爱的{user ? user.username : ''}学员:</div>
                     <div className={styles.text}>{result.data.message}</div>
                   </div>
             </div>
           }

         </div>
       )
     }
   }
