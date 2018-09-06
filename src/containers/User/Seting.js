/**
 * Created by same on 2016/7/13.
 * File description:用户设置
 */

'use strict';
import React, { Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header,Warning} from 'components';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import {logout} from 'redux/modules/auth';
import {isLoaded, load as loadUserInfo} from 'redux/modules/userInfo';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
const styles = require('./User.scss');

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
  state => (
		{
      isout: state.auth.isout,
      userInfo: state.userInfo.data
    }
	),
  {logout,push}
)
export default class Seting extends Component {
	state={
	 tips:false
	};
   static propTypes = {
	  isout:PropTypes.object,
      userInfo:PropTypes.object,
      logout: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired
   }
	componentWillReceiveProps(nextProps,nextState)
	{
		if(this.props.isout!==nextProps.isout){
			if(nextProps.isout.status==1){
        location.href="/";
        //this.props.push('/');
	      // this.setState({msg:'退出成功'});
	      // this.setState({tips:true});
	      // setTimeout(() => {
	      //   this.props.push('/');
	      // }, 1000);
	    }
		}
	}
  handleUserLogOut(){
    this.props.logout();
  }
	render(){
		const {logout,userInfo}=this.props;
		return(
			<div>
				<Helmet title="设置"/>
				<Header title="设置" back="/user/index"/>
				<div className={styles.user}>
					<div className={styles.menu}>
          {userInfo &&
						<ul>
            {(()=>{
              if(userInfo.teacher_status!==1){
                return   <Link to={userInfo.teacher_status==0 ? '/user/seting' : '/user/apply'}>
                            <li className={styles.top}>
                              <p>
                									申请为导师
                                  <em className={styles.gray}>{userInfo.teacher_status==0 ? '审核中' : userInfo.teacher_status==2 ? '审核未通过' :''}</em>
                              </p>
            							  </li>
                         </Link>
              }
            })()}
              <Link to="/user/SettingPwd">
  							<li>
                    <p>
    									  密码设置
                    </p>
  							</li>
	            </Link>


              <Link to={userInfo.user_mobile==null || userInfo.user_mobile=='' ? '/user/bindmobile':'/user/updatemobile'}>
                  <li>
                  {(()=>{
                     if(userInfo.user_mobile==null || userInfo.user_mobile==''){
                         return  <p>
                              绑定手机号
                              <em className={styles.gray}></em>
                          </p>
                     }else{
                         var phone = userInfo.user_mobile;
                         if(!isNaN(phone) && phone.length==11){
                            phone=phone.split('');
                            phone.splice(3,5,'*','*','*','*','*');
                            phone=phone.join('');
                        }
                         return  <p>
                              修改绑定手机号
                              <em className={styles.gray}>{phone}</em>
                          </p>
                     }
                  })()}

                  </li>
              </Link>
              <Link to="/user/help">
  							<li className={styles.other}>
  								<p>帮助</p>
  							</li>
              </Link>
							<li className={styles.out}>
								<a onClick={this.handleUserLogOut.bind(this)}>退出</a>
							</li>

						</ul>
          }
					</div>
				</div>
				{(()=>{
						if(this.state.tips){
							return <Warning visible={this.state.tips} msg={this.state.msg}/>
						}
				})()}
			</div>
		)
	}
}
