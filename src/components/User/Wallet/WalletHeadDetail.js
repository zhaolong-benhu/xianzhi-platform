/**
 * Created by zhaolong on 2016/8/5.
 * File description:我的钱包
 */
import React,{Component} from 'react';
import {Link} from 'react-router';
const styles = require('./WalletHead.scss');


export default class WalletHeadDetail extends Component{

state={
  wallet_bg:'/images/wallet_bg.png',
  withdrawals:"/images/withdrawals.png",
  sum_consumption:"0.00",
  sum_income:"0.00",
  sum_withdrawals:"0.00",
}

componentDidMount(){
  this.setState({sum_consumption:this.props.sum_consumption});
  this.setState({sum_income:this.props.sum_income});
  this.setState({sum_withdrawals:this.props.sum_withdrawals});
}

render() {
  return(
    <div className={styles.head_bg}>
      <div className={styles.head}>
            <div className={styles.all}>{this.props.text}</div>
            <div className={styles.allmoney}>{this.props.money}</div>
      </div>
   </div>
  )
}
}
