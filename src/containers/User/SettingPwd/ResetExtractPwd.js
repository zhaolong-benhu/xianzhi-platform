/**
 * Created by zhaolong on 2017/02/08.
 * File description:密码设置
 */

'use strict';
import React, { Component} from 'react';
import Helmet from 'react-helmet';
import {Header} from 'components';
import { Link } from 'react-router';
import {isLoaded, load as loadUserInfo} from 'redux/modules/userInfo';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
const styles = require('./SettingPwd.scss');

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if(getState().apply.flag){
      return dispatch(loadUserInfo());
    }else{
      if (!isLoaded(getState())) {
        return dispatch(loadUserInfo());
      }
    }
  }
}])
@connect(
  state => ({userInfo: state.userInfo.data})
)
export default class ResetExtractPwd extends Component {
	render(){
		var {userInfo} = this.props;
		return(
			<div>
				<Helmet title="密码设置"/>
				<Header title="密码设置" type={true}/>
				 {userInfo &&
                <div className={styles.containers}>
                    <div className={styles.tips}>
                        <span className={styles.text}>正在为</span>
						{(()=>{
							var fromAccountNick = userInfo.user_mobile;
                            if(!isNaN(fromAccountNick) && fromAccountNick.length==11){
                                fromAccountNick=fromAccountNick.split('');
                                fromAccountNick.splice(3,5,'*','*','*','*','*');
                                fromAccountNick=fromAccountNick.join('');
                                return <span className={styles.number}>{fromAccountNick}</span>
                            }else {
                                return <span className={styles.text}>当前账号</span>
                            }
						})()}
                        <span className={styles.text}>重置提现密码</span>
                    </div>
                    <Link to='/user/SettingPwd/ResetExtractPwd/Authentication'>
                        <div className={styles.menu}>
                            <span>我记得原提现密码</span>
                            <span className={styles.link}>&#xe619;</span>
                        </div>
                    </Link>
                    <Link to='/user/wallet/setpassword'>
                        <div className={styles.menu2}>
                            <span>我忘记提现密码了</span>
                            <span className={styles.link}>&#xe619;</span>
                        </div>
                    </Link>
                </div>
			    }
			</div>
		)
	}
}
