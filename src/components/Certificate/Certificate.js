/**
 * Created by zhaolong on 2016/8/31.
 * File description:专业证书-证书
 */
import React,{Component} from 'react';
import {Link} from 'react-router';
const styles = require('./Certificate.scss');


export default class Certificate extends Component{
  //放大显示图片
  AmplifyImg(){
    this.props.callbackParent();
  }
  render(){
    return(
      <div className={styles.container}>
        <div className={styles.line}></div>
        <div className={styles.title}>
          <span>证书</span>
        </div>
        <div className={styles.item}>
          <div className={styles.certificates}>
            <div className={styles.text}>
              专业证书开通学习 <span className={styles.redtext}>60天 </span>内，学员完成课程学习并通过考核者，将获得<span className={styles.redtext}>“先之国际酒店管理学院（SHMC）专业证书”</span>。
            </div>
            <img src={this.props.img} onClick={this.AmplifyImg.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}
