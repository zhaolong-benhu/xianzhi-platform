/**
 * Created by zhaolong on 2016/9/24.
 * File description:LMS证书放大
 */
'use strict'
import React,{Component} from 'react'
const styles = require('./AmplifyImg_Box.scss');

export default class AmplifyImg_Box extends Component{

  imgClicked(){
    this.props.callbackParent();
  }
  render(){
    return(
      <div className={styles.bomb_box}>
          <img src={this.props.img} onClick={this.imgClicked.bind(this)}/>
      </div>
    )
  }
}
