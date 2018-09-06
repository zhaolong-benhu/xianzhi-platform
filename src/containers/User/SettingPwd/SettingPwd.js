/**
 * Created by zhaolong on 2017/02/08.
 * File description:密码设置
 */

'use strict';
import React, { Component} from 'react';
import Helmet from 'react-helmet';
import {Header} from 'components';
import { Link } from 'react-router';
const styles = require('./SettingPwd.scss');

export default class SettingPwd extends Component {
	render(){
		return(
			<div>
				<Helmet title="密码设置"/>
				<Header title="密码设置" type={true} back="/user/seting"/>
                <div className={styles.containers}>
                    <Link to='/user/UpdatePassWord'>
                        <div className={styles.menu2}>
                            <span>重置登录密码</span>
                            <span className={styles.link}>&#xe619;</span>
                        </div>
                    </Link>
                    <Link to='/user/SettingPwd/ResetExtractPwd'>
                        <div className={styles.menu2}>
                            <span>重置提现密码</span>
                            <span className={styles.link}>&#xe619;</span>
                        </div>
                    </Link>
                </div>
			</div>
		)
	}
}
