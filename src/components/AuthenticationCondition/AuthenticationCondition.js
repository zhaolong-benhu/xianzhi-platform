/**
 * Created by zhaolong on 2016/11/14.
 * File description:证书申请条件
 */
 'use strict';
 import React from 'react';
 import {Link} from 'react-router';
 const styles = require('./AuthenticationCondition.scss');

export default class AuthenticationCondition extends React.Component{
    //转译HTML代码
    HTMLEnCode(str)
    {
      let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
    }
     render(){
       return(
           <div className={styles.container}>
             {(()=>{
               if(this.props.type != "teacher"){
                 return <div className={styles.line}></div>
               }
             })()}
             {(()=>{
               if(this.props.type != "teacher"){
                 return <div className={styles.title}>
                   <span>{this.props.title}</span>
                 </div>
               }
             })()}

              <div className={styles.text}>
                {(()=>{
                    if(this.props.description){
                    var description = this.HTMLEnCode(this.props.description);
                    return <p className={styles.description} dangerouslySetInnerHTML={{__html: description}}></p>
                 }
                })()}
              </div>

             {(()=>{
                 if(this.props.type == "1"){
                     return <Link to="/ihma/detail/ihmaIntroduce">
                         <div className={styles.link}>
                             <span>点击了解证书详情</span>
                             <span className={styles.icon}>&#xe61d;</span>
                         </div>
                     </Link>
                 }
             })()}

           </div>
       )
     }
   }
