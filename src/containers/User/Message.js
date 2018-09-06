/**
 * Created by same on 2016/8/13.
 * File description:我的消息
 */
'use strict';
import React, {Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header} from 'components';
import {Link} from 'react-router';
import {isLoaded, load as loadmessage} from 'redux/modules/message';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import { push } from 'react-router-redux';
const styles = require('./User.scss');


@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    // if (!isLoaded(getState())) {
      return dispatch(loadmessage());
    // }
  }
}])

@connect(
  state => ({
    message: state.message.data
  }),{push}
)
export default class Message extends Component {
  static propTypes = {
      message: PropTypes.object,
      push:PropTypes.func.isRequired
  }
	render(){
    const {message} = this.props;
    if(message){
      if(message.status==0)
      {
        this.props.push('/');
      }else{
        var title = message.data.notice.title;
        var sys_title = message.data.system.title;
      }
    }
		return(
			<div>
				<Helmet title="消息中心"/>
				<Header title="消息中心" type={true}/>
				<div className={styles.user}>
					<div className={styles.msg}>
						<ul>
              <Link to={'/user/notice/2'}>
							<li>
								<div className={styles.icon}>
									<i>&#xe622;</i>
								</div>
								<div className={styles.info}>
									<p>通知</p>
									<p className={styles.gray}>{title}</p>
								</div>
							</li>
              </Link>
              <Link to={'/user/notice/1'}>
							<li>
								<div className={styles.icon +' '+ styles.blue}>
									<i>&#xe629;</i>
								</div>
								<div className={styles.info}>
									<p>系统提醒</p>
									<p className={styles.gray}>{sys_title}</p>
								</div>
							</li>
              </Link>
						</ul>
					</div>
				</div>
    	</div>
		)
	}
}
