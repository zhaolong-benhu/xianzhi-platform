/**
 * Created by same on 2016/7/4.
 * File description:用户登录
 */

'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header} from 'components';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import { login,validticket } from 'redux/modules/auth';
import {Warning,Confirm} from 'components';
import { shallowEqualImmutable  } from 'react-immutable-render-mixin';
import { push } from 'react-router-redux';
import { xz_captcha_api } from '../../api/common/Global';
const styles = require('./User.scss');
@connect(
  state => ({
    user: state.auth.user,
    valid:state.auth.valid
  }),
  {login,pushState:push,validticket}
)
export default class Login extends Component {
	 state={
	    check:false, //是否选中免登录
	    captcha:xz_captcha_api,//图形验证码api接口
	    msg:'',//提示框信息
    	visible:false,//是否显示
      tips:false,//是否显示接口返回信息
      confirm:false //提示对话框
  	};
    static propTypes = {
         user: PropTypes.object,
         valid:PropTypes.object,
         login: PropTypes.func,
         validticket: PropTypes.func,
        pushState: PropTypes.func
     }
	componentWillReceiveProps(nextProps,nextState){
      this.setState({visible:false});
      this.setState({tips:false});
      this.setState({confirm:false});
      //验证用户是否处于登录状态
      if(this.props.valid!==nextProps.valid){
          if(nextProps.valid && nextProps.valid.status==1){
             if(nextProps.valid.data.islogin==1){
                  this.setState({msg:'本账号已处于登录状态，是否需要继续登录？'});
                  this.setState({confirm:true});
             }else{
                this.handleLogin(true);
             }
          }
      }
      //接口返回用户登录状态
      if(this.props.user !== nextProps.user && nextProps.user){
          if(nextProps.user && nextProps.user.status==0){
            if(nextProps.user.errCode==-1){
              this.setState({captcha:xz_captcha_api+'?v='+Math.random()});
            }
            this.setState({msg:nextProps.user.errMsg});
            this.setState({tips:true});
          }else{
            if(nextProps.user.perfection==0){ //0 未完善 1已完善
                this.setState({msg:'登录成功,请完善您的个人信息~'});
                this.backUrl='/user/info';
                setTimeout(() => {
                  this.props.pushState(this.backUrl);
                }, 1000);
            }else{
              this.setState({msg:'登录成功'});
              this.setState({tips:true});
              if(localStorage.backUrl){
                this.backUrl=localStorage.backUrl;
                if(this.backUrl.indexOf('/user/UpdatePassWord')==0 || this.backUrl.indexOf('/getpassword')==0){
                  this.backUrl='/';
                }else if(this.backUrl.indexOf('/live/')==0){
                  this.backUrl=this.backUrl.split('/').length>1 ? '/liveshare/'+this.backUrl.split('/')[2] : '/';
                }
                location.href=this.backUrl;
              }
            }
          }
      }
	}
    constructor(props) {
      super(props);
      this.url='';
      this.backUrl='/';
  }
	componentDidMount(){
		// if(this.props.user && this.props.user.user_ticket){
		// 	this.props.pushState('/');
		// }
    this.url=localStorage.backUrl ? localStorage.backUrl.indexOf('/live/')==0 ? localStorage.backUrl : '' :'';
  }
  //用户登录
  handleSubmit = (event) => {
	    event.preventDefault();
	    const username = this.refs.username,
	          userpwd=this.refs.userpwd,
	          usercode=this.refs.usercode;
	    if(!username.value){
	    	this.setState({msg:'请输入用户名/邮箱/已验证手机号码'});
	    	this.setState({visible:true});
  		}
  		else if(!userpwd.value){
  	    	this.setState({msg:'请输入密码'});
  	    	this.setState({visible:true});
  		}
  		// else if(!usercode.value){
  	  //   	this.setState({msg:'请输入验证码'});
  	  //   	this.setState({visible:true});
  		// }
  		else{
          this.props.validticket(username.value);
	    }
	}
  //是否需要登录
  handleLogin(islogin){
    if(islogin){
      const username = this.refs.username,
            userpwd=this.refs.userpwd,
            usercode=this.refs.usercode;
      let store_login_time=this.state.check ? 7 : 30;
      this.props.login(username.value,userpwd.value,usercode.value,store_login_time);
    }else{
      this.setState({confirm:false});
    }
  }
  //是否免登录
	handleCheck = (event) => {
		this.setState({visible:false});
    this.setState({tips:false});
    this.setState({confirm:false});
	  this.setState({check:this.state.check? false : true});
	}
  //更新图形验证码
	handleCaptcha = (event) => {
	   this.setState({visible:false});
     this.setState({tips:false});
     this.setState({confirm:false});
	   this.setState({captcha:xz_captcha_api+'?v='+Math.random()});
	}
  //验证用户输入信息
  handleConsole(i){
    switch (i) {
      case 1: //username
        var val = this.refs.username.value;
        if(val.length>30)
        {
          this.refs.username.value =val.substr(0,30);
        }
        break;
      case 2://图片验证码
        var val = this.refs.usercode.value;
        if(val.length>6)
        {
          this.refs.usercode.value =val.substr(0,6);
        }
        break;
      case 3://密码
        var val = this.refs.userpwd.value;
        if(val.length>20)
        {
          this.refs.userpwd.value =val.substr(0,20);
        }
        break;
      default:

    }

  }
  //第三方授权登录
  authEntication=(type) =>{
      const url=localStorage.backUrl.indexOf('/live/')==0 && localStorage.backUrl.split('/').length>1 ? '/liveshare/'+localStorage.backUrl.split('/')[2] : localStorage.backUrl;
      if("wechat" == type){
        //   var ua = navigator.userAgent.toLowerCase();
        //    if(ua.match(/MicroMessenger/i)=="micromessenger") {
             window.location.href='//api.9first.com/weChat/wechat-login/wechat-login?appid=2&redirectUrl=https://m.9first.com'+url;
        //    } else {
        //        this.setState({tips:true,msg:"请在微信中打开"});
        //    }
      }else {
          window.location.href='https://sso.veryeast.cn/connect/link/qq?target=touch&appid=2&redirect=https://m.9first.com'+url;
      }
  }

    render(){
    const {user}=this.props;
	 	return(
	 		<div>
		 		<Helmet title="登录"/>
	            <Header title="登录" type={true} href={this.url}/>
		 		<div className={styles.user}>
	      			<form className={styles.form} onSubmit={this.handleSubmit}>
			            <div className={styles.row}>
			              <i>&#xe604;</i>
			              <input type="text" ref="username"  onChange={this.handleConsole.bind(this,1)} placeholder="请输入用户名/邮箱/已验证手机号码"/>
			            </div>
			            <div className={styles.row}>
			              <i>&#xe61f;</i>
			              <input  type="password" ref="userpwd"  onChange={this.handleConsole.bind(this,3)} placeholder="请输入密码"/>
			            </div>
			            <div className={styles.hide}>
			              <i>&#xe626;</i>
			              <input type="text" ref="usercode"  onChange={this.handleConsole.bind(this,2)} placeholder="请输入验证码"/>
			              <img src={this.state.captcha}  onClick={this.handleCaptcha} className={styles.code}/>
			            </div>
			            <p onClick={this.handleCheck} className={styles.sm}>
			            {(()=>{
			              if(this.state.check)
			                return <i>&#xe620;</i>
			              else
			                return <i className={styles.blue}>&#xe628;</i>
			            })()}
			              <span>一个月内免登录</span>
			            </p>
			            <button className={styles.btn} onClick={this.handleSubmit}>登录</button>
			        </form>
                    <div className={styles.introduce}><Link to="/register">快速注册</Link> </div>
		        	<div className={styles.getpassword}><Link to="/getpassword">找回密码</Link></div>
                    <div className={styles.otherlogin}>
                        <span className={styles.wechar} onClick={()=>this.authEntication("wechat")}>&#xe61e;</span>
                        <span className={styles.qq} onClick={()=>this.authEntication("qq")}>&#xe617;</span>
                    </div>

              {(()=>{
  	        			if(this.state.visible){
  		        			return <Warning visible={this.state.visible} msg={this.state.msg}/>
  						    }
  	        	})()}
              {(()=>{
      	        			if(this.state.tips){
  		        			return <Warning visible={this.state.tips} msg={this.state.msg}/>
  						    }
  	        	})()}
              {(()=>{
                  if(this.state.confirm){
                    return <Confirm  visible={this.state.confirm} text={this.state.msg} callbackParent={this.handleLogin.bind(this)}/>
                  }
              })()}

	        	</div>
	        </div>
	 	)
	}
}
