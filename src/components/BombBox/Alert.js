/**
 * Created by zhaolong on 2016/10/18.
 * File description:文本弹框提示
 */
'use strict'
import React,{Component,PropTypes} from 'react'
const styles = require('./Alert.scss');
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
@connect(
  state => ({}),{push}
)
export default class Alert extends Component{
  static propTypes = {
      push: PropTypes.func.isRequired
  }
  componentDidMount(){
    let mask=document.getElementById('mask');
    mask.style.display="block";
  }
  //点击确定世界响应
  onClickedOk(){
    let mask=document.getElementById('mask');
    mask.style.display="none";
    if(this.props.href!='/')
      this.props.push(this.props.href);
  }

  render(){
    return(
      <div className={styles.bomb_box}>
        <div className={styles.info}>
          <div className={styles.tips} dangerouslySetInnerHTML={{__html: this.props.text}}></div>
        </div>
        <div className={styles.yesorno} onClick={this.onClickedOk.bind(this)}>
            确定
        </div>
      </div>
    )
  }
}
