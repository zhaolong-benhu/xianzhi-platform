/**
 * Created by same on 2016/8/10.
 * File description:申请申请为导师
 */
'use strict';
import React, { Component,PropTypes } from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {isLoaded,applyTeacher,load} from 'redux/modules/apply';
import {Header,Warning,Alert} from 'components';
import { push } from 'react-router-redux';
import {logout} from 'redux/modules/auth';
const styles = require('./User.scss');
@connect(
  state => ({
    flag: state.apply.flag,
    detail:state.apply.data,
    isout: state.auth.isout
  }),{applyTeacher,push,load,logout}
)

export default class Apply extends Component {
	static propTypes = {
		  flag:PropTypes.object,
      detail:PropTypes.object,
      isout:PropTypes.object,
    	applyTeacher: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      load: PropTypes.func.isRequired,
      logout:PropTypes.func.isRequired
	};
	state={
    data:[], //申请导师数据
    name:'', //姓名
    phone:'', //手机号码
		gender:1, //性别
		whether:1, //是否有授课经验
		teaching_type:[],//筛选授课方式
		adept_areare:[],//筛选擅长领域
    teaching_style:'',//授课风格
		msg:'',//提示信息
  	visible:false,//是否显示
    tips:false,//是否显示接口返回信息
    isApply:false,//是否申请
    bAlert:false,//申请成功提示框
	};
  componentWillMount(){
    this.props.load();
  }
  componentWillReceiveProps(nextProps,nextState){
    this.setState({tips:false});
    this.setState({visible:false});
    this.setState({bAlert:false});
    if(this.props.flag !== nextProps.flag){
      if(nextProps.flag.status==1){
        this.setState({bAlert:true});
      }else{
        this.setState({msg:nextProps.flag.errMsg});
        this.setState({tips:true});
      }
    }
    if(this.props.isout!==nextProps.isout){
      if(nextProps.isout.status==1){
          this.props.push('/');
      }
    }
    if(this.props.detail !== nextProps.detail){
        if(nextProps.detail.status==1){
            if(nextProps.detail.data.teacher_status>=2){ //审核状态(0未审核，1审核通过，2审核未通过)，3未申请
                this.setState({isApply:true});//是否可以申请
            }
            //姓名
            this.setState({name:nextProps.detail.data.name});
            //性别
            this.setState({gender:nextProps.detail.data.gender || 1});
            //手机号码
            this.setState({phone:nextProps.detail.data.phone});
            //是否有授课经验
            this.setState({whether:nextProps.detail.data.is_experience || 1});
            //授课风格
            this.setState({teaching_style:nextProps.detail.data.teaching_style});
            //筛选授课方式
            this.setState({teaching_type:nextProps.detail.data.teaching_type_array});
            //筛选擅长领域
            this.setState({adept_areare:nextProps.detail.data.adept_areare_array});
        }
        else{
            this.props.logout();
        }
    }
  }
  //返回上一页
  handleChangeBack(){
		history.go(-1);
	}
  //用户选择操作
	handleCheck(type,index){
		this.setState({visible:false});
		switch(type){
			case 1:
				this.setState({gender:index});
			break;
			case 2:
				this.setState({whether:index});
			break;
			case 4:
				let adept_areare=this.state.adept_areare;
        var selectAdept=0;
        if(adept_areare[index].status==0){
          for(let i=0;i<adept_areare.length;i++){
            if(adept_areare[i].status==1){
              selectAdept+=1;
            }
          }
          if(selectAdept<3){
            adept_areare[index].status=1;
    				this.setState({adept_areare:adept_areare});
          }else{
            this.setState({msg:'擅长领域最多选择3项'});
            this.setState({visible:true});
          }
        }
        else{
          adept_areare[index].status=0;
          this.setState({adept_areare:adept_areare});
        }
			break;
			case 3:
				let teaching_type=this.state.teaching_type;
        var selectType=0;
        if(teaching_type[index].status==0){
          for(let i=0;i<teaching_type.length;i++){
            if(teaching_type[i].status==1){
              selectType+=1;
            }
          }
          if(selectType<3){
            teaching_type[index].status=1;
    				this.setState({teaching_type:teaching_type});
          }else{
            this.setState({msg:'授课方式最多选择3项'});
            this.setState({visible:true});
          }
        }
        else{
          teaching_type[index].status=0;
          this.setState({teaching_type:teaching_type});
        }
			break;
		}
	}
  //申请导师
	handleApply(){
	    let adept_areare=this.state.adept_areare;
	    var selectAdept='';
	    for(let i=0;i<adept_areare.length;i++){
        if(adept_areare[i].status==1)
          selectAdept+=adept_areare[i].name+',';
	    }
      selectAdept=selectAdept.replace(/\,$/,"");
      let teaching_type=this.state.teaching_type;
	    var selectType='';
	    for(let i=0;i<teaching_type.length;i++){
        if(teaching_type[i].status==1)
          selectType+=teaching_type[i].name+',';
	    }
      selectType=selectType.replace(/\,$/,"");
	    const name = this.refs.username,
	          phone=this.refs.phone,
	          teaching_style=this.refs.teaching_style;
	  if(!name.value){
	    	this.setState({msg:'请输入您的姓名'});
	    	this.setState({visible:true});
		}
		else if(!phone.value){
	    	this.setState({msg:'请输入您的手机号码'});
	    	this.setState({visible:true});
		}
		else if(!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/i.test(phone.value)){
			   this.setState({msg:'请输入正确格式的手机号'});
	    	 this.setState({visible:true});
		}
    else if(selectType==0){
      this.setState({msg:'请选择您的授课方式'});
      this.setState({visible:true});
    }
		else if(!teaching_style.value){
	    	this.setState({msg:'请输入您的授课风格'});
	    	this.setState({visible:true});
		}
    else if(selectAdept==0){
      this.setState({msg:'请选择您的擅长领域'});
      this.setState({visible:true});
    }
		else{
		    this.props.applyTeacher(name.value,this.state.gender,phone.value,this.state.whether,teaching_style.value,selectType,selectAdept);
	  }
	}
  //验证姓名
  handleName(e){
    this.setState({visible:false});
    this.setState({name: e.target.value});
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
    this.setState({phone: this.refs.phone.value});
  }
  //验证授课风格
  handleStyle(e){
    this.setState({visible:false});
    var val = e.target.value;
    if(val.length>200)
    {
      this.refs.teaching_style.value =val.substr(0,200);
    }
    this.setState({teaching_style: e.target.value});
  }
	render(){
		return(
			<div>
				<Helmet title="申请为导师"/>
				<div className={styles.userApply}>
  				<div className={styles.apply}>
  						<div className={styles.header}>
  							<span onClick={this.handleChangeBack.bind(this)} className={styles.blue}>取消</span>
  							<span className={styles.title}>申请为导师</span>
  							<span onClick={this.state.isApply ? this.handleApply.bind(this) : ''} className={this.state.isApply ? styles.blue : ''}>申请</span>
  						</div>

    						<ul>
    							<li>
    								<label>姓&nbsp;&nbsp;&nbsp;&nbsp;名</label>
    								<input  type="text" ref="username" value={this.state.name}  onChange={this.handleName.bind(this)}  placeholder="请输入您的姓名"/>
    							</li>
    							<li>
    								<label>性&nbsp;&nbsp;&nbsp;&nbsp;别</label>
    								<div className={styles.tab}>
    									<p onClick={this.handleCheck.bind(this,1,1)}>
    										{(()=>{
    							              if(this.state.gender==1)
    							                return <i className={styles.select}>&#xe614;</i>
    							              else
    							                return <i>&#xe613;</i>
    							            })()}
    										男
    									</p>
    									<p onClick={this.handleCheck.bind(this,1,2)}>
    										{(()=>{
    							              if(this.state.gender==2)
                                  return <i className={styles.select}>&#xe614;</i>
    							              else
    							                return <i>&#xe613;</i>
    							            })()}
    										女
    									</p>
    								</div>
    							</li>
    							<li>
    								<label>手机号码</label>
    								<input  type="tel" ref="phone" value={this.state.phone}  onChange={this.handlePhone.bind(this)}   placeholder="请输入您的手机号码"/>
    							</li>
    						</ul>

    						<ul className={styles.tutor}>
    							<li>
    								<label>是否有授课经验</label>
    								<div className={styles.tab}>
    									<p onClick={this.handleCheck.bind(this,2,1)}>
    										{(()=>{
    							              if(this.state.whether==0)
    							                return <i>&#xe613;</i>
    							              else
    							                return <i className={styles.select}>&#xe614;</i>
    							            })()}
    										是
    									</p>
    									<p onClick={this.handleCheck.bind(this,2,0)}>
    										{(()=>{
    							              if(this.state.whether==1)
    							                return <i>&#xe613;</i>
    							              else
    							                return <i className={styles.select}>&#xe614;</i>
    							            })()}
    										否
    									</p>
    								</div>
    							</li>
    							<li>
    								<label>授课方式（可多选）</label>
    								<div className={styles.tab}>
    									{
    										this.state.teaching_type.map(function(v,i){
    											return(
    												<p onClick={this.handleCheck.bind(this,3,i)} key={'t'+i}>
    													{(()=>{
    										              if(v.status==1)
    										                return <i className={styles.select}>&#xe628;</i>
    										              else
    										                return <i>&#xe620;</i>
    										            })()}
    													{v.name}
    												</p>
    											)
    										}.bind(this))
    									}
    								</div>
    							</li>

    							<li className={styles.other}>
    								<label>授课风格</label>
    								<div className={styles.tab}>
    									<textarea rows="3" cols="20" ref="teaching_style"  value={this.state.teaching_style}  onChange={this.handleStyle.bind(this)}  placeholder="请输入您的授课风格"></textarea>
    								</div>
    							</li>
    							<li>
    								<label>擅长领域</label>
    								<div className={styles.tab}>
    									{
    										this.state.adept_areare.map(function(v,i){
    											return(
    												<p onClick={this.handleCheck.bind(this,4,i)} key={'s'+i}>
    													{(()=>{
    										              if(v.status==1)
    										                return <i className={styles.select}>&#xe628;</i>
    										              else
    										                return <i>&#xe620;</i>
    										            })()}
    													{v.name}
    												</p>
    											)
    										}.bind(this))
    									}
    								</div>
    							</li>
    						</ul>

  						<div className={styles.contact}>
  							<p className={styles.title}>联系我们</p>
  							<p><label className={styles.two}>联系人</label>：先之小九</p>
  							<p><label>联系电话</label>：0571-81023948</p>
  							<p><label className={styles.two}>微&nbsp;&nbsp;信</label>：xiao-nine</p>
  							<p><label className={styles.en}>Q&nbsp;&nbsp;Q</label>：3549125494</p>
  							<p><label className={styles.two}>邮&nbsp;&nbsp;箱</label>：Sunshine.Sun@veryeast.com</p>
  							<p><label>总部地址</label>：浙江省杭州市文一西路456号文新科技楼四楼</p>
  						</div>
  					</div>

          {this.state.visible &&
            <Warning visible={this.state.visible} msg={this.state.msg}/>
          }
          {this.state.tips &&
            <Warning visible={this.state.tips} msg={this.state.msg}/>
          }
          {(()=>{
            if(this.state.bAlert){
              return <Alert href='/user/seting' text="您好，你已申请先之教育导师，审核通过之后，我们将会在<font color=red>三个工作日之内</font>和您取得联系予以回复！"/>
            }
          })()}
				</div>
      </div>
		)
	}
}
