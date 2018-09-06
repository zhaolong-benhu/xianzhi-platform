/**
 * Created by same on 2016/7/13.
 * File description:用户中心
 */

'use strict';
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {Header, Warning, Alert, UploadFile,ImageCut} from 'components';
import { Link } from 'react-router';
import {load,updateAvatar} from 'redux/modules/userInfo';
import { asyncConnect } from 'redux-async-connect';
import {logout} from 'redux/modules/auth';
import { push } from 'react-router-redux';
import {imageUrl} from '../../api/common/Global';
const styles = require('./User.scss');
@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    return dispatch(load());
  }
}])
@connect(
  state => ({
    userInfo: state.userInfo.data,
    user: state.auth.user,
    avatar:state.userInfo.avatar
  }),
  {load, push, logout,updateAvatar}
)
export default class Index extends Component {
	static propTypes = {
    userInfo: PropTypes.object,
    user: PropTypes.object,
    avatar: PropTypes.object,
    load: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    updateAvatar: PropTypes.func.isRequired,
	}
  state={
    tips_box: false, //提示信息弹框
    msg: '', //弹框提示文字
    bShowAlert: false, //导师审核通过提示框
    userHead: null,
    iscut:false
  };
  constructor(props) {
      super(props);
      this.bShowTips = true;
  }
  componentWillMount() {
    if (this.bShowTips) {
      if (this.props.userInfo && this.props.userInfo.register_teacher_notify === 1) {
        this.setState({bShowAlert:true});
        this.bShowTips = false;
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo !== this.props.userInfo) {
      if (nextProps.userInfo.status===0) {
        this.props.logout();
      }
    }
    this.setState({bShowAlert: false});
  }
  ClickedFollow() {
    this.setState({tips_box: true, msg: '您还没有关注哦'});
  }
  GotoLoginPage(user_name) {
    if (!user_name) {
      this.props.push('/login');
    }else{
      this.refs.head.click();
    }
  }
  //裁剪后获取图片
  getCutImage(base64,file){
    this.props.updateAvatar(base64);
    this.setState({
         userHead: base64,
         iscut: false
     })
  }
  //上传图片
  onImageDrop(t){
    this.setState({
        userHead: URL.createObjectURL(t.target.files[0]),
        iscut:true,
        screeWidth:screen.width
    })
  }
	render() {
		  const {userInfo} = this.props;
      const config = {
          url:this.state.userHead, // the image you want to cut
          frameScale:false,   // if true , user can scale the cutting frame
          frameWidth:200,     // the cutting frame's default width
          frameHeight:200,    // the cutting frame's default height
          minW:200,   //  the cutting frame's min width
          minH:200,   //  the cutting frame's min height
          width:this.state.screeWidth //screen.width  //Cut's component's width
      }
		  return (
			<div>
				<Helmet title="个人中心"/>
				<Header title="个人中心" back="/"/>
        {userInfo && !this.state.iscut &&
					<div className={styles.user}>
						<div className={styles.userInfo}>
							<div className={styles.banner}>
								<div className={styles.info}>
                  <img src={this.state.userHead || userInfo.thumb || imageUrl+'/images/user/head.jpg'} className={styles.head} onClick={this.GotoLoginPage.bind(this, userInfo.user_name)}/>
                  {userInfo.user_name &&
                    <div>
                      <input type="file" ref="head" style={{display:'none'}} accept="images/*"  onChange={this.onImageDrop.bind(this)}/>
          						<p>{userInfo.user_name}</p>
                    </div>
        					}
        					{!userInfo.user_name &&
        						<p>
        							<Link to="/login">登录</Link> / <Link to="/register">注册</Link>
        						</p>
        					}
								</div>
							</div>
							<div className={styles.message}>
								<Link to={userInfo.message_num ? '/user/message' : '/login'}><i>&#xe623;</i></Link>
                {userInfo.message_num > 0 &&
                  <em></em>
                }
							</div>
							<ul className={styles.tab}>
								<li>
									<pre><Link to={userInfo.user_money ? '/user/wallet' : '/login'}>￥{userInfo.user_money ? userInfo.user_money:'0.00'}</Link></pre>
									<p><Link to={userInfo.user_money ? '/user/wallet' : '/login'}>我的钱包</Link></p>
								</li>

              	<li>
                    <pre><Link to={userInfo.favorite_num ? '/user/follow' : '/login'}>{userInfo.favorite_num || 0}</Link></pre>
                    <p><Link to={userInfo.favorite_num ? '/user/follow' : '/login'}>我的关注</Link></p>
                </li>

							</ul>
						</div>
						<div className={styles.menu}>
							<ul>
                <Link to={userInfo.live_favorite_num ? '/user/live' : '/login'}>
                  <li className={styles.other+' '+styles.top2}>
                    <p>
                      主播关注
                      <em>{userInfo.live_user_favorite_num}</em>
                    </p>
                  </li>
                </Link>
                <Link to={userInfo.course_num ? '/user/excellentcourse' : '/login'}>
									<li>
										<p>
											我的精品课
											<em>{userInfo.course_num}</em>
										</p>
									</li>
								</Link>
                <Link to={userInfo.classroom_num ? '/user/excellentpackage' : '/login'}>
								<li>
									<p>
										我的专业证书
										<em>{userInfo.classroom_num}</em>
									</p>
								</li>
								</Link>
                <Link to={userInfo.cert_num ? '/user/ihma' : '/login'}>
								<li>
									<p>
										IHMA岗位胜任能力证书
										<em>{userInfo.cert_num}</em>
									</p>
								</li>
								</Link>
                <Link to={userInfo.opencourse_num ? '/user/openclass' : '/login'}>
								<li>
									<p>
										我的公开课
										<em>{userInfo.opencourse_num}</em>
									</p>
								</li>
								</Link>
                <Link to={userInfo.activity_num ? '/user/activity' : '/login'}>
								<li>
									<p>
										我的活动
										<em>{userInfo.activity_num}</em>
									</p>
								</li>
								</Link>
                <Link to={userInfo.papers_num ? '/user/thinktank' : '/login'}>
								<li className={styles.other}>
									<p>
										我的智库
										<em>{userInfo.papers_num}</em>
									</p>
								</li>
								</Link>

                {(()=>{
                  if (userInfo.teacher_status == 1) {
                    return   (<Link to={"/user/coursemanage"}>
                                <li className={styles.other}>
                                  <p>
                                    上传课程管理
                                    <em>{userInfo.upload_course_num}</em>
                                  </p>
                                </li>
                              </Link>)
                  }
                })()}
                <Link to={userInfo.invite_num ? "/user/makemoney/" + userInfo.invite_num : '/login'}>
								<li className={styles.other}>
									<p>
										我要赚钱
										<em>{userInfo.invite_num}</em>
									</p>
								</li>
								</Link>
                <Link to={userInfo.invite_num ? '/user/seting' : '/login'}>
								<li className={styles.other}>
									<p>
										设置
									</p>
								</li>
								</Link>
							</ul>
						</div>
            {(()=>{
              if (this.state.tips_box)
              {
                return <Warning visible="true" msg={this.state.msg}/>
              }
            })()}

            {(()=>{
              if (this.state.bShowAlert) {
                return <Warning visible="true" msg="恭喜您已成为先之导师,快去上传课程吧~"/>
              }
            })()}
          </div>
        }
        <div className={this.state.iscut ? styles.cutting : styles.hide}>
          <ImageCut config={config} getCutImage={this.getCutImage.bind(this)}></ImageCut>
          <i onClick={()=>this.setState({iscut:false,userHead:''})}></i>
        </div>
      </div>
		)
	}
}
