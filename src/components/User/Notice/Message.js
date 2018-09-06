/**
 * Created by zhaolong on 2016/8/12.
 * File description:通知消息内容
 */
 'use strict';
 import {Link} from 'react-router';
 import React from 'react';
 const styles = require('./Message.scss');

export default class Message extends React.Component{

     render(){
       var msg = this.props.data.message;
       if(msg.length>40){
         msg = msg.substring(0,50)+'...';
       }
       return(
         <div className={styles.info}>
           <Link to={'/user/message/detail/'+this.props.data.id} activeClassName="active">
           <div className={this.props.index==0?styles.info_detail:styles.info_detail2}>
             <div className={styles.title}>
              <div className={this.props.data.is_read == "1"?styles.name:styles.name2}>{this.props.data.title}</div>
               <div className={styles.msg}>{this.props.data.message}</div>
             </div>
             <div className={styles.look}>
               <span className={this.props.data.is_read==1?styles.lookdetail:styles.lookdetail2}>查看详情</span>
               <i>&#xe619;</i>
             </div>
           </div>
           </Link>
         </div>
       )
     }
   }
