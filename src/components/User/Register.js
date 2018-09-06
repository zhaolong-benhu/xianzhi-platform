/**
 * Created by same on 2016/7/13.
 * File description:用户注册
 */

'use strict';
import React,{Component,PropTypes} from 'react';
import {Warning} from 'components';
import {connect} from 'react-redux';
import { sendCaptcha,verifyCaptcha } from 'redux/modules/register';
import { userReg } from 'redux/modules/auth';
import { push as pushState} from 'react-router-redux';
import { sso_captcha_api } from '../../api/common/Global';
import { shallowEqualImmutable } from 'react-immutable-render-mixin';
const styles = require('./User.scss');
@connect(
  state => ({user:state.auth.user,sms:state.register.sms,verify:state.register.verify}),
  {sendCaptcha,verifyCaptcha,userReg,pushState}
)

export default class Register extends Component {
  	state={
		captcha:sso_captcha_api,//图形验证码api接口
		number:0,//倒计时数字
		i:0,//索引
		msg:'',//提示框信息
      	visible:false,//是否显示
        tips:false,//是否显示接口返回信息
      	stage:false //注册流程显示
  	};
	  static propTypes = {
  		sendCaptcha: PropTypes.func,
  		verifyCaptcha:PropTypes.func,
  		userReg:PropTypes.func,
  		user:PropTypes.object,
  		sms:PropTypes.object,
  		verify:PropTypes.object
  	}
    constructor(props) {
        super(props);
        this.time=null;//倒计时时间
    }
	  componentWillReceiveProps(nextProps,nextState)
  	{
      this.setState({visible:false});
      this.setState({tips:false});
      //接口返回用户注册状态
      if(this.props.user!==nextProps.user)
  		{
          if(nextProps.user.status===0){
            if(nextProps.user.errCode===5002){
              this.setState({msg:'手机验证码错误'});
            }else if(nextProps.user.errCode===1091){
              this.setState({msg:'不能重复注册'});
            }else{
              this.setState({msg:'注册失败'});
            }
            this.setState({tips:true});
          }else{
            this.setState({msg:'注册成功，马上完善我的个人信息~'});
            this.setState({tips:true});
            setTimeout(() => {
              this.props.pushState('/user/info');
            }, 1000);
          }
  		}
      //接口返回用户手机验证码是否正确
  		if(this.props.verify!==nextProps.verify){
    		if(nextProps.verify.flag===0){
    			this.setState({stage:true});
    		}else{
          this.setState({msg:'手机验证码不正确'});
          this.setState({tips:true});
        }
      }
      //接口返回用户手机注册状态
      if(this.props.sms!==nextProps.sms){
        switch (nextProps.sms.flag)
        {
          case 0:
            this.handleSMS();
            break;
          case 5101:
            this.setState({captcha:sso_captcha_api+'?v='+Math.random()});
            this.setState({msg:'验证码错误'});
            this.setState({tips:true});
            break;
          case 5012:
            this.setState({msg:'该手机号已经注册过,请直接登录'});
            this.setState({tips:true});
            break;
          case 5000:
            this.setState({msg:'短信发送失败'});
            this.setState({tips:true});
            break;
          default:
        }
      }
  	}
  	//验证手机短信
  	handleSubmit(event){
      event.preventDefault();
  		var phone = this.refs.phone,
  	    	usercode = this.refs.usercode,
          password=this.refs.password,
    			captcha = this.refs.captcha;

  		if(!phone.value){
	    	this.setState({msg:'请输入手机号码'});
	    	this.setState({visible:true});
  		}else if(!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/i.test(phone.value)){
  			this.setState({msg:'手机号码格式有误'});
  	    this.setState({visible:true});
  		}else if(!usercode.value){
  			this.setState({msg:'请输入验证码'});
  	    this.setState({visible:true});
  		}else if(!/^[A-z0-9]{4,6}$/.test(usercode.value)){
  			this.setState({msg:'请输入正确的图片验证码'});
  	    this.setState({visible:true});
  		}else if(!captcha.value){
  	    	this.setState({msg:'请输入手机验证码'});
  	    	this.setState({visible:true});
  		}else{
        if(this.props.code){ //免密码注册
            this.props.userReg(phone.value,captcha.value,password.value,2,this.props.code);
        }else{
  			    this.props.verifyCaptcha(phone.value,captcha.value);
        }
  		}
  	}
  	//用户注册
  	handleRegister(event){
      event.preventDefault();
  		var phone = this.refs.phone,
  	    	captcha=this.refs.captcha,
  	    	password=this.refs.password,
  	    	verifypassword=this.refs.verifypassword;

	    if(!password.value){
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
  	   	  this.props.userReg(phone.value,captcha.value,password.value);
  		}
	}
	//获取手机验证码
	handleSendSMS(event){
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
			this.setState({msg:'请输入验证码'});
	    	this.setState({visible:true});
		}else if(!/^[A-z0-9]{4,6}$/.test(usercode.value)){
			this.setState({msg:'请输入正确的图片验证码'});
	    	this.setState({visible:true});
		}
		else{
			this.props.sendCaptcha(phone.value,usercode.value);
		}

	}

	//短信倒计时
	handleSMS(){
		var timeout = 59;
		this.time = setInterval(() => {
			this.setState({number:timeout});
			timeout--;
      this.state.tips ?  this.setState({tips:false}) : '';
      this.state.visible ?  this.setState({visible:false}) : '';
			if(timeout==-1){
			   clearInterval(this.time);
			   this.setState({number:-2});
		    }
		},1000)
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
        if(this.state.number==0){
          if(this.refs.usercode.value){
      		 	  this.setState({number:-1});
      		}else{
              this.setState({number:0});
          }
        }
        break;
      case 3://手机验证码
        var val = this.refs.captcha.value;
        if(this.state.number==0 || this.state.number==-1){
          this.refs.captcha.value ='';
        }else{
          if(isNaN(val)){
            this.refs.captcha.value=val.substr(0,val.length-1);
          }
          if(val.length>6)
          {
            this.refs.captcha.value =val.substr(0,6);
          }
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

	//输入状态
	handleFocus(i){
    if(i===this.state.i) return;
    this.setState({visible:false});
    this.setState({tips:false});
    this.setState({i:i});
	}
	//手机号码验证
	handleBlur(){
		if(!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/i.test(this.refs.phone.value)){
			  this.setState({msg:'请输入正确格式的手机号'});
	    	this.setState({visible:true});
		}
	}

	//图片验证码更新
	handleCaptcha(){
		this.setState({visible:false});
    this.setState({tips:false});
		this.setState({captcha:sso_captcha_api+'?v='+Math.random()});
	}
	render(){
	 	return(
        <div className={this.props.type ? styles.special : styles.user}>
		 			<form className={styles.form}>

			 				<div className={this.state.stage ? styles.hide : ''}>
					            <div className={styles.row}>
					              <i className={this.state.i==1 ? styles.blue : ''}>&#xe60f;</i>
					              <input type="tel" ref="phone" onFocus={this.handleFocus.bind(this,1)} onChange={this.handleConsole.bind(this,1)} placeholder="请输入您的手机号码"/>
					            </div>

					            <div className={styles.yzm}>
					              <i className={this.state.i==2 ? styles.blue : ''}>&#xe626;</i>
					              <input type="email" ref="usercode" placeholder="请输入验证码" onFocus={this.handleFocus.bind(this,2)} onChange={this.handleConsole.bind(this,2)}/>
					              <img src={this.state.captcha} onClick={this.handleCaptcha.bind(this)}  className={styles.code}/>
					            </div>

					            <div className={styles.yzm}>
                        <i className={this.state.i==3 ? styles.blue : ''}>&#xe626;</i>
					              <input type="email" ref="captcha" onFocus={this.handleFocus.bind(this,3)} onChange={this.handleConsole.bind(this,3)} placeholder="请输入手机验证码"/>
					              <span onClick={this.state.number<0 ? this.handleSendSMS.bind(this) : ''} className={this.state.number<0 ? styles.send +" "+ styles.sendblue : styles.send}>{this.state.number>0 ?  this.state.number+'s' :  this.state.number==-2 ? '重新发送' : '发送验证码'}</span>
					            </div>

					            <button className={styles.btn} onClick={this.handleSubmit.bind(this)}>{this.props.code ? '同意' : '下一步'}</button>
					        </div>

					        <div className={!this.state.stage ? styles.hide : ''}>
					            <div className={styles.row}>
					              <i>&#xe61f;</i>
					              <input type="password" ref="password" onChange={this.handleConsole.bind(this,4)}  placeholder="请输入密码,6-20位数字和字母组成"/>
					            </div>
					            <div className={styles.row}>
					              <i>&#xe627;</i>
					              <input type="password" ref="verifypassword" onChange={this.handleConsole.bind(this,5)} placeholder="再次确认密码"/>
					            </div>
					            <button className={styles.btn} onClick={this.handleRegister.bind(this)}>注册</button>
				            </div>


			        </form>
              {this.state.visible &&
                  <Warning visible={this.state.visible} msg={this.state.msg} />
              }
              {this.state.tips &&
                  <Warning visible={this.state.tips} msg={this.state.msg}/>
              }
		 		</div>
	 	)
	}
}
