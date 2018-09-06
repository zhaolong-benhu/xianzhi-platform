/**
 * Created by zhaolong on 2016/11/18.
 * File description:我的钱包
 */
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {Header,WalletHead,Wallet,ConsumeHistory} from 'components';
const styles = require('./Withdraw.scss');

export default class Withdraw extends Component {
    state={
        tips_box:false,
        mgs:"",
    }
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div>
                <Helmet title="提现"/>
                <Header title="提现" type="withdraw"/>
                <div className={styles.container}>
                    <div className={styles.items}>
                        <Link to='/user/wallet/withdraw/1'>
                            <div className={styles.item}>
                                <span className={styles.pic}>&#xe62b;</span>
                                <span className={styles.text}>提现到我的支付宝</span>
                                <span className={styles.icon}>&#xe60e;</span>
                            </div>
                        </Link>
                        <Link to='/user/wallet/withdraw/2'>
                            <div className={styles.item2}>
                                <span className={styles.pic2}>&#xe61e;</span>
                                <span className={styles.text}>提现到我的微信</span>
                                <span className={styles.icon}>&#xe60e;</span>
                            </div>
                        </Link>
                    </div>
                </div>
                {(()=>{
                  if(this.state.tips_box){
                    return  <Warning visible={true} msg={this.state.msg}/>
                  }
                })()}
            </div>
        )
    }
}
