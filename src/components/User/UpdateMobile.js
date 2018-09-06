/**
 * Created by zhaolong on 2017/02/20.
 * File description:绑定手机号
 */

 'use strict';
 import React, {Component,PropTypes} from 'react';
 import Helmet from 'react-helmet';
 import {Header,SetPassword,Warning} from 'components';
 import {Link} from 'react-router';
 import {connect} from 'react-redux';
 import { push } from 'react-router-redux';
 import {sendSms,checkSms} from 'redux/modules/withdrawals';
 const styles = require('./UpdateMobile.scss');

 @connect(
   state => ({sms:state.withdrawals.sms,verify:state.withdrawals.verify}),
   {sendSms,checkSms,push}
 )
 export default class UpdateMobile extends Component {
 	static propTypes = {
 	  sendSms: PropTypes.func.isRequired,
 	  checkSms: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
 	  sms:PropTypes.object,
 	  verify:PropTypes.object
   }
 	state={
 		curPage:1,
 		bCanSendcode:false,
 		bPhone:false,
 		bCode:false,
 		nPwdindex:0,
 		m_pwdbox:true,
 		number:-1,
 		btnText:"发送验证码",
 		tips:false,//是否显示
 		visible:false,//是否显示接口返回信息
 	};

 	componentWillReceiveProps(nextProps,nextState){
 	this.setState({visible:false});
 	this.setState({tips:false});

 	//接口返回验证码
 	if(this.props.sms!==nextProps.sms){
 		 if(nextProps.sms.status === 0){
 			 this.setState({msg:nextProps.sms.errMsg});
             this.setState({tips:true});
 		}else {
 			this.handleSMS();
 		}
 	}
 	//接口返回用户手机验证码是否正确
 	  if(this.props.verify!==nextProps.verify){
 		  if(nextProps.verify.status === 0){
 			  this.setState({msg:nextProps.verify.errMsg});
 		      this.setState({tips:true});
 		  }else{
 			  if(this.state.bCanNext){
   				this.props.push('/user/BindMobile');
   			}
 	      }
 	}
   }
 	//监控输入手机号
 	PhoneChange(){
 		this.setState({visible:false});
 		this.setState({tips:false});

 		var strPhone =this.refs.phone.value;
 		if(strPhone && strPhone.length>11){
 			this.refs.phone.value = strPhone.substr(0,10);
 		}
 		if(!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/i.test(this.refs.phone.value)){
 			//手机号码格式有误
 			this.setState({bCanSendcode:false,bPhone:false});
 		}else{
 			this.setState({bCanSendcode:true,bPhone:true});
 		}
 		this.CheckUserInput();
 	}
 	//监听输入验证码
 	CodeChange(){
 		this.setState({visible:false});
 		this.setState({tips:false});

 		var strPhone = this.refs.code.value;
 		if(strPhone != ""){
            let len = strPhone.length;
            if(len>6){
                this.refs.code.value = strPhone.substr(0,6);
            }
 			this.setState({bCode:true});
 		}else {

 			this.setState({bCode:false});
 		}
 		this.CheckUserInput();
 	}


 	//校验用户综合输入
 	CheckUserInput(){
 		setTimeout(() => {
             if(this.state.bPhone && this.state.bCode){
                 this.setState({bCanNext:true});
             }else {
                 this.setState({bCanNext:false});
             }
         },500);
 	}
 	//下一步
 	GotoNext(){
 		if(this.state.bCanNext){
 			var mobile = this.refs.phone.value;
 			var code = this.refs.code.value;
 			this.props.checkSms(mobile,code);
 		}
 	}

 	//获取手机验证码
 	handleSendSMS(event){
 		event.preventDefault();
        var mobile = this.refs.phone.value;
        if('' == mobile){
            this.setState({tips:true,msg:"请输入手机号！"});
        }else if(mobile.length !=11){
            this.setState({tips:true,msg:"请输入正确的手机号！"});
        }else if(!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/i.test(mobile)){
            this.setState({tips:true,msg:"手机格式有误！"});
        }else{
            this.props.sendSms(mobile,2);
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
 		render(){
 		var nPwdindex = this.state.nPwdindex;
 		return(
 			<div>
 				<Helmet title="手机号码设置"/>
 				<Header title="手机号码设置" type={true}/>
				<div className={styles.containers}>
                    <div className={styles.tips}>请输入获取验证码后修改</div>
					<div className={styles.phone}>
						<div className={styles.text}>手机号码</div>
						<div className={styles.num}>
							<input className={styles.tel} ref="phone" placeholder="请输入手机号码" type="number" onChange={()=>this.PhoneChange()}/>
						</div>
					</div>
					<div className={styles.phone}>
						<div className={styles.text}>手机验证码</div>
						<div className={styles.num}>
							<input className={styles.tel} ref="code" placeholder="请输入手机验证码" onChange={()=>this.CodeChange()}/>
						</div>
						<span onClick={this.state.number<0 ? this.handleSendSMS.bind(this) : ''} className={this.state.number<0 ? styles.send +" "+ styles.sendblue : styles.send}>{this.state.number>0 ?  this.state.number+'s' :  this.state.number==-2 ? '重新发送' : '发送验证码'}</span>
						{/* <div className={!this.state.bCanSendcode ? styles.btn:styles.btn2} onClick={()=>this.SendCode()}>{this.state.btnText}</div> */}
					</div>
				</div>
				<div className={!this.state.bCanNext?styles.next:styles.notnext} onClick={()=>this.GotoNext()}>下一步</div>

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
