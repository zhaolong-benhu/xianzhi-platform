/**
 * Created by same on 2016/8/12.
 * File description:用户修改绑定手机号码
 */

'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {Warning,UserHeader} from 'components';
import { push as pushState} from 'react-router-redux';
import {phoneBind,sendCode} from 'redux/modules/register';
const styles = require('./User.scss');

@connect(
  state => ({
  	result: state.register.phone,
  	sms:state.register.sms
  }),
  {
  	phoneBind,
  	pushState,
  	sendCode
  }
)
export default class BindMobile extends Component{
	state={
      number:0,//倒计时数字
      i:0,//索引
      msg:'',//提示框信息
      visible:false,//是否显示
      tips:false,//是否显示接口返回信息
      stage:false //注册流程显示
	};
	static propTypes = {
	    result: PropTypes.object,
	    phoneBind: PropTypes.func.isRequired,
	    sendCode: PropTypes.func.isRequired,
	    pushState: PropTypes.func.isRequired,
	    sms:PropTypes.object
	}
  componentWillReceiveProps(nextProps,nextState)
  {
    this.setState({visible:false});
    this.setState({tips:false});
    //接口返回用户绑定手机号码状态
    if(this.props.result!==nextProps.result){
      if(nextProps.result.status==1){
        this.setState({msg:'绑定成功'});
        this.setState({tips:true});
        setTimeout(() => {
          this.props.pushState('/');
        }, 1000);
      }else{
        this.setState({msg:nextProps.result.errMsg});
        this.setState({tips:true});
      }
    }
    //接口返回绑定手机状态
    if(this.props.sms!==nextProps.sms){
      switch (nextProps.sms.status)
      {
        case 1:
          this.handleSMS();
          break;
        case 5012:
          this.setState({msg:'该手机号已经被绑定'});
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
	//短信倒计时
	handleSMS(){
		var timeout = 59;
		var idInt = setInterval(() => {
			this.setState({number:timeout});
      this.state.tips ?  this.setState({tips:false}) : '';
      this.state.visible ?  this.setState({visible:false}) : '';
			timeout--;
			if(timeout==-1){
			   clearInterval(idInt);
			   this.setState({number:-2});
		    }
		},1000)
	}
	//获取手机验证码
	handleSendSMS(event){
		event.preventDefault();
	    var phone = this.refs.phone;
	    if(!phone.value){
	    	this.setState({msg:'请输入新手机号码'});
	    	this.setState({visible:true});
		}
		else if(!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/i.test(phone.value)){
			this.setState({msg:'请输入正确格式的手机号'});
	    	this.setState({visible:true});
		}
		else{
			this.props.sendCode(phone.value);
		}

	}
  //绑定手机
	handleSubmit(event){
	    event.preventDefault();
	    const phone = this.refs.phone,
	          captcha=this.refs.captcha;
	   if(!phone.value){
	    	this.setState({msg:'请输入您的新手机号码'});
	    	this.setState({visible:true});
		}
		else if(!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/i.test(this.refs.phone.value)){
			   this.setState({msg:'手机号码格式有误'});
	    	this.setState({visible:true});
		}
		else if(!captcha.value){
	    	this.setState({msg:'请输入手机验证码'});
	    	this.setState({visible:true});
		}
		else{
		    this.props.phoneBind(phone.value,captcha.value);
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
        this.setState({visible:false});
        if(this.refs.phone.value){
            this.setState({number:-1});
        }else{
            this.setState({number:0});
        }
        break;
      case 2://手机验证码
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
      default:
    }
  }
	render(){
		const {result} = this.props;
	 	return(
	 		<div>
	 			 <Helmet title="绑定手机号码"/>
        	 	 <UserHeader title="绑定手机号码"/>
        		<div className={styles.user}>
		 			<form className={styles.form}>
			            <div className={styles.yzm}>
			              <i>&#xe60f;</i>
			              <input type="tel" ref="phone"  onChange={this.handleConsole.bind(this,1)} placeholder="输入新手机号码"/>
			              <span onClick={this.state.number<0 ? this.handleSendSMS.bind(this) : ''} className={this.state.number<0 ? styles.send +" "+ styles.sendblue : styles.send}>{this.state.number>0 ?  this.state.number+'s' :  this.state.number==-2 ? '重新发送' : '发送验证码'}</span>
			            </div>

			            <div className={styles.row}>
			              <i>&#xe626;</i>
			              <input type="url" ref="captcha" onChange={this.handleConsole.bind(this,2)} placeholder="请输入手机验证码" />
			            </div>

			            <button className={styles.btn} onClick={this.handleSubmit.bind(this)}>下一步</button>
			        </form>
			    </div>
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
