/**
 * Created by same on 2016/9/21.
 * File description:个人中心-编辑头部
 */
 'use strict';
 import React ,{ Component } from 'react';
const styles = require('./Header.scss');
export default class Header extends Component {
  handleChangeBack(){
    history.go(-1);
  }
  render(){
	 	return(
        <div className={styles.header}>
          <span onClick={this.handleChangeBack.bind(this)} className={styles.blue}>取消</span>
          <span className={styles.title}>{this.props.title}</span>
          <span></span>
        </div>
      )
    }
}
