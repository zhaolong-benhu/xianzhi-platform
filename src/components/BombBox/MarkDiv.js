/**
 * Created by zhaolong on 2016/10/17.
 * File description 遮罩层
 */

'use strict'
import React,{Component} from 'react'
const styles = require('./MarkDiv.scss');

export default class MarkDiv extends Component{
 //隐藏div    
  HideDiv(){
    this.props.callbackParent("hide");
  }
  render(){
    return(
      <div className={styles.mask} onClick={this.HideDiv.bind(this)}>
      </div>
    )
  }
}
