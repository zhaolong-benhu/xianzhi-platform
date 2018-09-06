/**
 * Created by same on 2016/8/12.
 * File description:完善注册信息
 */

'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Warning,Header,Slider} from 'components';
import {connect} from 'react-redux';
import { updataUserInfo,loadUserInfo } from 'redux/modules/userInfo';
import { login } from 'redux/modules/auth';
import { push} from 'react-router-redux';
const styles = require('./User.scss');
const ishow=false;
@connect(
  state => ({flag:state.userInfo.flag,detail:state.userInfo.info}),
  {updataUserInfo,pushState: push,loadUserInfo}
)
export default class Info extends Component {
	static propTypes = {
		updataUserInfo: PropTypes.func.isRequired,
		flag:PropTypes.object,
    detail:PropTypes.object,
		pushState: PropTypes.func.isRequired,
    loadUserInfo:PropTypes.func.isRequired
	}
	state={
		sex:1,//性别
		visible:false,//是否显示
    tips:false,//是否显示接口返回信息
    name:'',//姓名
    phone:'',//手机号码
		msg:null//提示信息
	};
  constructor(props) {
      super(props);
      this.phone='';
  }
  componentWillMount(){
    this.props.loadUserInfo();
  }
	componentWillReceiveProps(nextProps,nextState){
      this.setState({visible:false});
      this.setState({tips:false});
      //接口返回用户信息
      if(this.props.detail!=nextProps.detail){
          this.setState({name:nextProps.detail.name});
          this.setState({phone:nextProps.detail.user_mobile});
          this.phone=nextProps.detail.user_mobile;
          this.setState({sex:nextProps.detail.gender});
      }
      //接口返回用户完善信息状态
			if(this.props.flag !==nextProps.flag){
        if(nextProps.flag.status==1){
          this.setState({msg:'个人信息完善成功!'});
          this.setState({tips:true});
          setTimeout(() => {
            this.props.pushState('/');
          }, 1000);
  			}else{
          this.setState({msg:'API失败错误~,码农正在抢修中!'});
          this.setState({tips:true});
        }
      }
	}
  //选择性别
	handleCheck(index) {
    this.setState({visible:false});
		this.setState({sex:index});
	}
  //完善个人信息
	handleSubmit(event){
		event.preventDefault();
		const name=this.refs.name;
    const  phone=this.refs.phone;

    if(!phone.value){
        this.setState({msg:'请输入您的手机号码'});
        this.setState({visible:true});
    }else if(!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/i.test(phone.value)){
        this.setState({msg:'手机号码格式有误'});
        this.setState({visible:true});
    }
		else if(!name.value){
				this.setState({msg:'请输入您的真实姓名'});
				this.setState({visible:true});
		}
    else if(name.value.length<=1){
        this.setState({msg:'姓名不合法'});
        this.setState({visible:true});
    }else if(/[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]/im.test(name.value)){
      this.setState({msg:'姓名不合法'});
      this.setState({visible:true});
    }
		else{
				this.props.updataUserInfo(phone.value,name.value,this.state.sex);
		}
	}
  //验证手机号码
  handlePhone(e){
    this.setState({visible:false});
    var val = e.target.value;
    if(isNaN(val)){
      this.refs.phone.value=val.substr(0,val.length-1);
    }
    if(val.length>11)
    {
      this.refs.phone.value =val.substr(0,11);
    }
    if(this.phone=='' || this.phone==null)
      this.setState({phone: this.refs.phone.value});
  }
  //验证姓名
  handleName(e){
    this.setState({visible:false});
    var val = e.target.value;
    var pattern=/[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]/im;
    if(pattern.test(val)){
        this.refs.name.value =val.substr(0,val.length-1);
    }
    if(val.length>10)
    {
      this.refs.name.value =val.substr(0,10);
    }
    this.setState({name:this.refs.name.value});
  }

	render(){
		const {flag} = this.props;
		return(
			<div>
		 		<Helmet title="完善个人信息"/>
	      <Header title="完善个人信息" type={true}/>
		 		<div className={styles.user}>
						<form className={styles.form}>
                  <div className={styles.row}>
                    <i className={this.state.i==1 ? styles.blue : ''}>&#xe60f;</i>
                    <input type="text" ref="phone" value={this.state.phone} onChange={this.handlePhone.bind(this)} placeholder="请输入您的手机号码"/>
                  </div>
			            <div className={styles.row}>
			              <i>&#xe604;</i>
			              <input type="text" ref="name" value={this.state.name} onChange={this.handleName.bind(this)} placeholder="请输入您的真实姓名"/>
			            </div>
			            <div className={styles.row}>
			              <i>&#xe625;</i>
										<span onClick={this.handleCheck.bind(this,1)}>
											{(()=>{
								              if(this.state.sex==1)
								                return <i className={styles.blue}>&#xe614;</i>
								              else
																return <i>&#xe613;</i>
								            })()}
											男
										</span>
										<span onClick={this.handleCheck.bind(this,2)}>
											{(()=>{
								              if(this.state.sex==2)
								                return <i className={styles.blue}>&#xe614;</i>
								              else
								                return <i>&#xe613;</i>
								            })()}
											女
										</span>
			            </div>
			            <button className={styles.btn} onClick={this.handleSubmit.bind(this)}>确定</button>
			        </form>
		 		</div>
				{this.state.visible &&
					<Warning visible={this.state.visible}  msg={this.state.msg}/>
				}
        {this.state.tips &&
  					<Warning visible={this.state.tips}  msg={this.state.msg}/>
  			}
		 	</div>
		)
	}
}
