/**
 * Created by zhaolong on 2016/8/5.
 * File description:我的钱包
 */
import React,{Component,PropTypes} from 'react';
import {Link} from 'react-router';
import {push} from 'react-router-redux';
import {isLoaded, load as loadUserInfo} from 'redux/modules/userInfo';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import {isExistsPassword} from 'redux/modules/wallet';

const styles = require('./WalletHead.scss');

// @asyncConnect([{
//   deferred: true,
//   promise: ({store: {dispatch, getState}}) => {
//     if(getState().apply.flag){
//       return dispatch(loadUserInfo());
//     }else{
//     //   if (!isLoaded(getState())) {
//         return dispatch(loadUserInfo());
//     //   }
//     }
//   }
// }])
@connect(
  state => ({
      isExist:state.wallet.isExist,
      userInfo: state.userInfo.data
  }),{isExistsPassword,push,loadUserInfo}
)
export default class WalletHead extends Component{

state={
  wallet_bg:'/images/wallet_bg.png',
  withdrawals:"/images/withdrawals.png",
  sum_consumption:"0.00",
  sum_income:"0.00",
  sum_withdrawals:"0.00",
}

static propTypes = {
    isExistsPassword: PropTypes.func,
    push: PropTypes.func.isRequired
}

componentWillMount(){
    this.props.loadUserInfo();
}

componentDidMount(){
  this.setState({sum_consumption:this.props.sum_consumption});
  this.setState({sum_income:this.props.sum_income});
  this.setState({sum_withdrawals:this.props.sum_withdrawals});
}
componentWillReceiveProps(nextProps){
     if(this.props.isExist!=nextProps.isExist){
          if(nextProps.isExist && nextProps.isExist.status == 1){
              if(nextProps.isExist.data.is_exists == 0){
                  this.props.push('/user/wallet/setpassword');
              }else {
                //   this.props.push('/user/wallet/withdraw');//后期支付宝提现方式开通打开即可
                var user_money = this.props.userInfo.user_money;
                this.props.push('/user/wallet/withdraw/'+user_money);
              }
          }else {
            //  this.setState({tips_box:true,msg:nextProps.isExist.errMsg});
         }
     }

}
//提现按钮
Withdraw(user_money){
    if(user_money != "0.00"){
        this.props.isExistsPassword();
    }
}
render() {
    var {userInfo} = this.props;
  return(
    <div className={styles.head_bg}>
      <div className={styles.head}>
          <Link to={'/user/wallet/detail/'+2}>
            <div className={styles.all}>总收入(元)</div>
          </Link>
          <Link to={'/user/wallet/detail/'+2}>
            <div className={styles.allmoney}>{this.state.sum_income}</div>
          </Link>
      </div>
      <ul className={styles.tab}>
        <li>
          <Link to={'/user/wallet/detail/'+1}><div className={styles.all}>总消费(元)</div></Link>
          <Link to={'/user/wallet/detail/'+1}><div className={styles.consume}>{this.state.sum_consumption}</div></Link>
        </li>
        <li>
          <Link to={'/user/wallet/detail/'+3}><div className={styles.all}>累计提现(元)</div></Link>
          <Link to={'/user/wallet/detail/'+3}><div className={styles.consume}>{this.state.sum_withdrawals}</div></Link>
        </li>
      </ul>
      {userInfo &&
      <div className={userInfo.user_money == "0.00" ? styles.operate:styles.operate2}>
          <button onClick={()=>this.Withdraw(userInfo.user_money)}>提现</button>
      </div>
     }
   </div>
  )
}
}
