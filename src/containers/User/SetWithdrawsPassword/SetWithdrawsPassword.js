/**
 * Created by zhaolong on 2017/01/17.
 * File description:个人中心-提现密码是设置
 */

'use strict';
import React, {Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header,SetPassword,Warning} from 'components';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {sendSms,checkSms} from 'redux/modules/withdrawals';
const styles = require('./SetWithdrawsPassword.scss');

@connect(
  state => ({sms:state.withdrawals.sms,verify:state.withdrawals.verify}),
  {sendSms,checkSms}
)
export default class SetWithdrawsPassword extends Component {
    static propTypes = {
	  sendSms: PropTypes.func,
	  checkSms: PropTypes.func,
	  sms:PropTypes.object,
	  verify:PropTypes.object,
    };
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
        bClicked:false,//判断是否点击发送了验证码
	};
	static defaultProps = {
		//定义密码键盘
	    pwd:[
	        {num:"1"},
	        {num:"2"},
	        {num:"3"},
	        {num:"4"},
	        {num:"5"},
	        {num:"6"}
	    ]
	};

    constructor(props){
        super(props);
        this.bLock = false;
    }
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
      				this.setState({curPage:2});
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

		var strPhone =this.refs.code.value;
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
        if(this.state.bClicked){
            if(this.state.bCanNext){
                var mobile = this.refs.phone.value;
                var code = this.refs.code.value;
                this.props.checkSms(mobile,code);
            }
        }else {
            this.setState({msg:"请先发送验证码！"});
            this.setState({tips:true});
        }
	}
	//显示密码键盘
	ShowKey(){
		this.setState({m_pwdbox:true});
	}
	//关闭密码键盘
	onCloseKey(){
		this.setState({m_pwdbox:false});
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
            this.setState({tips:true,msg:"手机号码格式有误！"});
        }else {
            if(!this.bLock){
                this.props.sendSms(mobile,1);
                this.bLock = true;
            }
            setTimeout(() =>{
                this.bLock = false;
            },2000);
        }
	}
	//短信倒计时
	handleSMS(){
        this.setState({bClicked:true});
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
    //显示提示框
    Showtips(msg){
		this.setState({msg:msg});
		this.setState({tips:true});
	}
		render(){
		var nPwdindex = this.state.nPwdindex;
		return(
			<div>
				<Helmet title="设置提现密码"/>
				<Header title="设置提现密码" type={true}/>
				{(()=>{
					if(this.state.curPage == 1){
						return <div>
						<div className={styles.containers}>
							<div className={styles.phone}>
								<div className={styles.text}>手机号码</div>
								<div className={styles.num}>
									<input className={styles.tel} ref="phone" placeholder="请输入手机号码" type="tel" onChange={()=>this.PhoneChange()}/>
								</div>
							</div>
							<div className={styles.phone}>
								<div className={styles.text}>手机验证码</div>
								<div className={styles.num}>
									<input className={styles.tel} ref="code" placeholder="请输入手机验证码" type="url" onChange={()=>this.CodeChange()}/>
								</div>
								<span onClick={this.state.number<0 ? this.handleSendSMS.bind(this) : ''} className={this.state.number<0 ? styles.send +" "+ styles.sendblue : styles.send}>{this.state.number>0 ?  this.state.number+'s' :  this.state.number==-2 ? '重新发送' : '发送验证码'}</span>
								{/* <div className={!this.state.bCanSendcode ? styles.btn:styles.btn2} onClick={()=>this.SendCode()}>{this.state.btnText}</div> */}
							</div>
						</div>
						<div className={!this.state.bCanNext?styles.next:styles.notnext} onClick={()=>this.GotoNext()}>下一步</div>
						</div>
					}else {
						return <SetPassword callbackParent={(msg)=>this.Showtips(msg)}/>
					}
				})()}

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
