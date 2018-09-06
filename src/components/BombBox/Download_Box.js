/**
 * Created by zhaolong on 2017/11/23.
 * File description用户未登录下载框
 */
'use strict'
import React,{Component} from 'react'
const styles = require('./Download_Box.scss');
import {Link} from 'react-router';

export default class Download_Box extends Component{
  render(){
    return(
      <div className={styles.bomb_box}>
        <div className={styles.info}>
          {this.props.msg}
        </div>
        <div className={styles.yesorno}>
           <a onClick={this.props.callbackParent.bind(this)}>返回</a>
           <a href="/web/index.html" onClick={this.props.callbackParent.bind(this)} className={styles.ok}>立即下载</a>
        </div>
      </div>
    )
  }
}
