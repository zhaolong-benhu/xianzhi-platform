/**
 * Created by zhaolong on 2016/7/5.
 * File description用户未登录提示弹框
 */
'use strict'
import React,{Component} from 'react'
const styles = require('./Login_Box.scss');
import {Link} from 'react-router';

export default class Login_Box extends Component{
  render(){
    return(
      <div className={styles.bomb_box}>
        <div className={styles.info}>
          您还未登录，是否登录？
        </div>
        <div className={styles.yesorno}>
           <a onClick={this.props.callbackParent.bind(this)}>否</a>
           <Link to={'/login'} onClick={this.props.callbackParent.bind(this)} className={styles.ok}>是</Link>
        </div>
      </div>
    )
  }
}
