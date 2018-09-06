/**
 * Created by same on 2016/8/13.
 * File description:帮助
 */

'use strict';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Header} from 'components';
import { Link } from 'react-router';
const styles = require('./User.scss');

export default class Help extends Component {
	state={

	};
	render(){
		return(
			<div>
				<Helmet title="帮助"/>
				<Header title="帮助" type={true}/>
				<div className={styles.user}>
					<div className={styles.menu}>
						<ul>
							<li>
								<Link to="/user/aboutus">
									关于我们
								</Link>
							</li>
							<li  className={styles.other}>
								<Link to="/user/feedback">
									用户反馈
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}
