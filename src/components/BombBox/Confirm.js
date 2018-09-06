/**
 * Created by same on 2016/10/28.
 * File description:多地登录提示弹框
 */
'use strict'
import React,{Component} from 'react'
const styles = require('./Confirm.scss');
import {Link} from 'react-router';

export default class Confirm extends Component{
  componentDidMount(){
    let mask=document.getElementById('mask');
    mask.style.display="block";
  }
  //点击取消按钮事件响应
  handleCancel(){
    let mask=document.getElementById('mask');
    mask.style.display="none";
    this.props.callbackParent(false);
  }
  render(){
    return(
      <div className={this.props.visible ? styles.bomb_box : styles.hide}>
        <div className={styles.info} dangerouslySetInnerHTML={{__html: this.props.text}}></div>
        <div className={styles.yesorno}>
           <a onClick={this.handleCancel.bind(this)}>取消</a>
           <a onClick={this.props.callbackParent.bind(this,true)}  className={styles.ok}>确定</a>
        </div>
      </div>
    )
  }
}
