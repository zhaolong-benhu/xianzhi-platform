/**
 * Created by same on 2016/7/18.
 * File description:用户找回密码
 */

'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { sendCaptcha } from 'redux/modules/register';
import { getPassword } from 'redux/modules/password';
import {Warning,Contactus,Header} from 'components';
import { push } from 'react-router-redux';
import { sso_captcha_api } from '../../api/common/Global';


@connect(
  state => ({password:state.password.password,sms:state.register.sms}),
  {sendCaptcha,getPassword,pushState: push}
)
export default class GetPassWord extends Component {
	state={
		captcha:sso_captcha_api,//图形验证码api接口
		number:0,//倒计时数字
		msg:'',//提示框信息
  	    visible:false,//是否显示
        tips:false,//是否显示接口返回信息
  	    stage:false//找回密码流程显示
	};
	static propTypes = {
		sendCaptcha: PropTypes.func,
		register:PropTypes.func,
		password:PropTypes.object,
		sms:PropTypes.object
	}
  componentWillReceiveProps(nextProps,nextState){
    this.setState({visible:false});
    this.setState({tips:false});
    //接口返回找回手机状态
    if(this.props.sms!==nextProps.sms){
      switch (nextProps.sms.flag) {
        case 0:
          this.setState({stage:true});
          break;
        case 5101:
          this.setState({captcha:sso_captcha_api+'?v='+Math.random()});
          this.setState({msg:'验证码错误'});
          this.setState({tips:true});
          break;
        case 5001:
          this.setState({msg:'该手机号码尚未注册'});
          this.setState({tips:true});
          break;
        case 5011:
          this.setState({msg:'该手机号码尚未注册'});
          this.setState({tips:true});
          break;
        case 5000:
          this.setState({msg:'短信发送失败'});
          this.setState({tips:true});
          break;
        default:
      }
    }
    //接口返回用户找回密码状态
    if(this.props.password!==nextProps.password){
      if(nextProps.password.flag==0){
        this.setState({msg:'密码找回成功，请重新登录~'});
        this.setState({tips:true});
        setTimeout(() => {
          this.props.pushState('/login');
        }, 1000);
      }else{
        this.setState({msg:'验证码错误'});
        this.setState({tips:true});
      }
    }
  }
	//图片验证码更新
	handleCaptcha(){
		this.setState({captcha:sso_captcha_api+'?v='+Math.random()});
	}
	//获取手机验证码
	handleSendSMS(event) {
		event.preventDefault();
	    var phone = this.refs.phone,
	    	usercode=this.refs.usercode;
    if(!phone.value){
    	this.setState({msg:'请输入手机号码'});
    	this.setState({visible:true});
    }else if(!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/i.test(phone.value)){
			this.setState({msg:'手机号码格式有误'});
	    this.setState({visible:true});
		}else if(!usercode.value){
			this.setState({msg:'请输入图形验证码'});
	    this.setState({visible:true});
		}else if(!/^[A-z0-9]{4,6}$/.test(usercode.value)){
			this.setState({msg:'请输入正确的图片验证码'});
	    this.setState({visible:true});
		}
		else{
			this.props.sendCaptcha(phone.value,usercode.value,1);
		}
	}
  //找回密码
	handleSubmit(event){
		event.preventDefault();
		var phone = this.refs.phone,
	    	captcha=this.refs.captcha,
	    	password=this.refs.password,
	    	verifypassword=this.refs.verifypassword;

	  if(!captcha.value){
	    	this.setState({msg:'请输入手机验证码'});
	    	this.setState({visible:true});
		}
		else if(!/^[0-9]{6}$/.test(captcha.value)){
			   this.setState({msg:'请输入正确的手机验证码'});
	    	 this.setState({visible:true});
		}
		else if(!password.value){
	    	this.setState({msg:'请输入密码，包含6-20位字母或数字组成'});
	    	this.setState({visible:true});
		}
    else if(password.value.length<6){
	    	this.setState({msg:'密码不得少于6位'});
	    	this.setState({visible:true});
		}
    else if(!/^[A-z0-9]{6,20}$/.test(password.value)){
        this.setState({msg:'请输入密码包含6-20位的字母或数字组成'});
        this.setState({visible:true});
    }
		else if(!verifypassword.value){
	    	this.setState({msg:'请输入确认密码'});
	    	this.setState({visible:true});
		}
		else if(password.value != verifypassword.value){
	    	this.setState({msg:'两次密码不一致'});
	    	this.setState({visible:true});
		}else{
	   		this.props.getPassword(phone.value,captcha.value,password.value);
		}
	}
	//手机号码验证
	handleBlur(){
		if(!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/i.test(this.refs.phone.value)){
			  this.setState({msg:'手机号码格式有误'});
	    	this.setState({visible:true});
	    	this.refs.phone.focus();
		}
	}
  //验证用户输入信息
  handleConsole(i){
    switch (i) {
      case 1: //手机
        var val = this.refs.phone.value;
        if(isNaN(val)){
          this.refs.phone.value=val.substr(0,val.length-1);
        }
        if(val.length>11)
        {
          this.refs.phone.value =val.substr(0,11);
        }
        break;
      case 2://图片验证码
        this.setState({visible:false});
        this.setState({tips:false});
        var val = this.refs.usercode.value;
        if(val.length>6)
        {
          this.refs.usercode.value =val.substr(0,6);
        }
        if(this.refs.usercode.value){
    		 	this.setState({number:-1});
    		}else{
          this.setState({number:0});
        }
        break;
      case 3://手机验证码
        var val = this.refs.captcha.value;
        if(isNaN(val)){
          this.refs.captcha.value=val.substr(0,val.length-1);
        }
        if(val.length>6)
        {
          this.refs.captcha.value =val.substr(0,6);
        }
        break;
      case 4://密码
        var val = this.refs.password.value;
        if(val.length>20)
        {
          this.refs.password.value =val.substr(0,20);
        }
        break;
      case 5://确认密码
        var val = this.refs.verifypassword.value;
        if(val.length>20)
        {
          this.refs.verifypassword.value =val.substr(0,20);
        }
        break;

      default:

    }

  }
	render(){
		const {sms,password} = this.props;
		const styles = require('./User.scss');
	 	return(
	 		<div>
		 		<Helmet title="找回密码"/>
	        	<Header title="找回密码" type={true}/>
		 		<div className={styles.user}>

		 			<form className={styles.form}>
		 				<div className={this.state.stage ? styles.hide : ''}>
				            <div className={styles.row}>
				              <i>&#xe604;</i>
				              <input type="tel" ref="phone"  onChange={this.handleConsole.bind(this,1)} placeholder="请输入手机号码"/>
				            </div>
				            <div className={styles.yzm}>
				              <i>&#xe626;</i>
				              <input type="url" ref="usercode" onChange={this.handleConsole.bind(this,2)} placeholder="请输入图形验证码"/>
				              <img src={this.state.captcha}  onClick={this.handleCaptcha.bind(this)} className={styles.code}/>
				            </div>
				            <button className={styles.btn} onClick={this.handleSendSMS.bind(this)}>发送</button>
				        </div>
			        	<div className={!this.state.stage ? styles.hide : ''}>
				            <div className={styles.row}>
				              <i>&#xe626;</i>
				              <input type="email" ref="captcha" onChange={this.handleConsole.bind(this,3)}  placeholder="请输入手机验证码"/>
				            </div>
				            <div className={styles.row}>
				              <i>&#xe61f;</i>
				              <input type="password" ref="password" onChange={this.handleConsole.bind(this,4)} placeholder="请输入密码,6-20位数字和字母组成"/>
				            </div>
				            <div className={styles.row}>
				              <i>&#xe627;</i>
				              <input type="password" ref="verifypassword" onChange={this.handleConsole.bind(this,5)} placeholder="再次确认密码"/>
				            </div>
				            <button className={styles.btn} onClick={this.handleSubmit.bind(this)}>保存</button>
				        </div>
			        </form>
			        {this.state.visible &&
						      <Warning visible={this.state.visible} msg={this.state.msg} />
		        	}
		        	{this.state.tips &&
			       		  <Warning visible={this.state.tips} msg={this.state.msg}/>
			       	}
		 		</div>
        <Contactus text="找回密码失败请联系我们："/>
		 	</div>
	 	)
	}
}
