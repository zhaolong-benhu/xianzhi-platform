/**
 * Created by zhaolong on 2016/7/5.
 * File description:导师评价成功弹框提示
 */
'use strict'
import React,{Component} from 'react'
import {imageUrl} from '../../api/common/Global';
const styles = require('./CommitSuccess_Box.scss');

export default class CommitSuccess_Box extends Component{

  state={
    img:"/images/commitsuccess.png",
    bShowDiv:true,
  };

 //隐藏div
  _handleDisappear(){
    this.setState({bShowDiv:false});
  }

  componentWillReceiveProps()
  {
    if(this.props.autoHide){
      this.setState({bShowDiv:true});
      setTimeout(() => {
        this.setState({bShowDiv:false});
      }, 1500);
    }
  }
  componentDidMount(){
    if(this.props.autoHide){
      this.setState({bShowDiv:true});
      setTimeout(() => {
        this.setState({bShowDiv:false});
      }, 1500);
    }
  }

  render(){
    return(
      <div>
        {(()=>{
          if(this.state.bShowDiv){
          return <div className={styles.bomb_box}>
            <div className={styles.pic}>
              <img className={styles.img} src={imageUrl+this.state.img} />
            </div>
            <div className={styles.text}>{this.props.msg}</div>
          </div>
        }
          else {
          }
        })()}
      </div>

    )
  }
}
