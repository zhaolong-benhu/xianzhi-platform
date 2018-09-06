/**
 * Created by zhaolong on 2016/9/13
  File description:导师上传课程联系我们
 */
'use strict';
import React,{Component} from 'react';
const styles = require('./Contactus.scss');

export default class Contactus extends Component {

  render(){
    return(
      <div className={styles.contactus}>
        <span>{this.props.text}</span>
        <span className={styles.phone}>
          <a className={styles.tel} href="tel://057181023940">
            <i className={styles.icon}>&#xe60f;</i>
            0571-81023940
          </a>
        </span>
      </div>
    )
  }
}
