/**
 * Created by zhaolong on 2016/11/27.
 * File description提现弹框
 */
'use strict'
import React,{Component,PropTypes} from 'react'
const styles = require('./WithdrawOk.scss');

export default class WithdrawOk extends Component{
    state={
        img:"/images/commitsuccess.png",
    }
  static propTypes = {
      push: PropTypes.func.isRequired
  }
  componentDidMount(){
    let mask=document.getElementById('mask');
    mask.style.display="block";
  }
  //点击ok
  onClickedOk(){
    this.props.callbackParent();
  }
  render(){
    return(
      <div className={styles.bomb_box}>
        <div className={styles.info}>
          <img className={styles.img} src={this.state.img}/>
          <div className={styles.tips}>{this.props.text}</div>
        </div>
        <div className={styles.yesorno} onClick={this.onClickedOk.bind(this)}>
            朕知道了
        </div>
      </div>
    )
  }
}
