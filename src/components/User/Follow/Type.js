/**
 * Created by zhaolong on 2016/8/5.
 * File description:关注内容头部+底部
 */
 'use strict';
 import React from 'react';
 const styles = require('./Type.scss');


export class Type extends React.Component{
     render(){
       return(
         <div className={styles.type}>
           <span className={styles.title}>{this.props.type}</span>
           <span className={styles.follow_date}>{this.props.follow_date}</span>
         </div>
       )
     }
   }


export class Separate extends React.Component{
    render(){
      return(
        <div className={styles.separate}>

        </div>
      )
    }

  }
