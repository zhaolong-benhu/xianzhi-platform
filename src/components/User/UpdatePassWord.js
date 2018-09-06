/**
 * Created by same on 2016/8/12.
 * File description:用户修改密码
 */

'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {Warning,UserHeader,CommitSuccess_Box} from 'components';
import { push as pushState} from 'react-router-redux';
import {resetPassWord} from 'redux/modules/password';
import {logout} from 'redux/modules/auth';

const styles = require('./User.scss');

@connect(
  state => ({result: state.password.result,isout:state.auth.isout}),
  {resetPassWord,pushState,logout}
)
export default class UpdatePassWord extends Component {
	state={
		msg:'',//提示信息
  	visible:false,//是否显示
    tips:false //是否显示接口返回信息
	};
	static propTypes = {
	    result: PropTypes.object,
	    resetPassWord: PropTypes.func,
	    pushState: PropTypes.func,
	    logout: PropTypes.func,
      isout: PropTypes.object
	}

	componentWillReceiveProps(nextProps,nextState){
    this.setState({visible:false});
    this.setState({tips:false});
    //接口返回用户修改密码状态
    if(this.props.isout!== nextProps.isout){
			if(nextProps.isout.status==1){
	      this.setState({msg:'密码修改成功，请重新登录~'});
	      this.setState({tips:true});
	      setTimeout(() => {
	        this.props.pushState('/login');
	      }, 1000);
	    }
    }
    //接口返回用户原密码状态
		if(this.props.result !== nextProps.result){
      if(nextProps.result.status==1){
        this.props.logout();
      }else{
        if(nextProps.result.errCode==1033){
          this.setState({msg:'原密码错误'});
          this.setState({tips:true});
        }else{
          this.setState({msg:'请重新登录'});
          this.setState({tips:true});
        }
      }
		}
	}
  //修改密码
	handleSubmit= (event) => {
	    event.preventDefault();
	    const password = this.refs.password,
	          newpassword=this.refs.newpassword,
	          confirmpassword=this.refs.confirmpassword;
	   if(!password.value){
	    	this.setState({msg:'请输入原密码'});
	    	this.setState({visible:true});
		}
		else if(!newpassword.value){
	    	this.setState({msg:'请输入新密码'});
	    	this.setState({visible:true});
		}
    else if(!/^[A-z0-9]{6,20}$/.test(newpassword.value)){
      this.setState({msg:'请输入密码包含6-20位的字母或数字组成'});
      this.setState({visible:true});
    }
		else if(!confirmpassword.value){
	    	this.setState({msg:'请输入确认密码'});
	    	this.setState({visible:true});
		}
		else if(newpassword.value != confirmpassword.value){
	    	this.setState({msg:'两次密码不一致'});
	    	this.setState({visible:true});
		}
		else{
		    this.props.resetPassWord(password.value,newpassword.value);
	    }
	}
  //验证用户输入信息
  handleConsole(i){
    var obj = this.refs.password;
    switch (i) {
      case 1: //新密码
        obj = this.refs.newpassword;
        break;
      case 2://确认密码
        obj = this.refs.confirmpassword;
        break;
      default:
    }
    if(obj.value.length>20)
    {
      obj.value =obj.value.substr(0,20);
    }
  }
	render(){
		const {result} = this.props;
		return(
			<div>
		 		<Helmet title="修改密码"/>
	      <UserHeader title="修改密码"/>
		 		<div className={styles.user}>
		 			<form className={styles.form}>
			            <div className={styles.row}>
			              <i>&#xe61f;</i>
			              <input type="password" ref="password"  onChange={this.handleConsole.bind(this,0)}  placeholder="请输入原密码"/>
			            </div>
			            <div className={styles.row}>
			              <i>&#xe627;</i>
			              <input type="password" ref="newpassword"  onChange={this.handleConsole.bind(this,1)}  placeholder="请输入新密码，6-20位数字和字母组成"/>
			            </div>
			            <div className={styles.row}>
			              <i>&#xe627;</i>
			              <input type="password" ref="confirmpassword"  onChange={this.handleConsole.bind(this,2)} placeholder="确定新密码"/>
			            </div>
			            <button className={styles.btn} onClick={this.handleSubmit}>保存</button>
			        </form>
		 		</div>
		 		{(()=>{
        			if(this.state.visible){
	        				return <Warning visible={true} msg={this.state.msg} />
              }
        })()}
        {(()=>{
            if(this.state.tips){
              return <Warning visible={this.state.tips} msg={this.state.msg}/>
            }
        })()}
		 	</div>
		)
	}
}
