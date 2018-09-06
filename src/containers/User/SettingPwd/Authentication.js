/**
 * Created by zhaolong on 2017/01/17.
 * File description:个人中心-提现密码是设置
 */

'use strict';
import React, {Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header,SetPassword,Warning,WithdrawOk} from 'components';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {authenticationPwd,resetPassword} from 'redux/modules/withdrawals';
const styles = require('./Authentication.scss');

@connect(
  state => ({check_pwd:state.withdrawals.check_pwd,reset_pwd:state.withdrawals.reset_pwd}),
  {authenticationPwd,resetPassword,push}
)
export default class Authentication extends Component {
	static propTypes = {
	  authenticationPwd: PropTypes.func.isRequired,
      resetPassword: PropTypes.func.isRequired,
      push:PropTypes.func.isRequired,
	  check_pwd:PropTypes.object,
      reset_pwd:PropTypes.object,
  }
	state={
		curPage:1,
		bCanSendcode:false,
		nPwdindex:0,
		m_pwdbox:true,
		tips:false,//是否显示
        title:"身份验证",
        bShowKey:true,
        tips_text:"输入提现密码，完成身份验证",
        bCanNext:false,
        bBombox:false,
	};
    static defaultProps = {
      //定义数字键盘
      all_nums:[
        {num:"1",character:""},
        {num:"2",character:"ABC"},
        {num:"3",character:"DEF"},
        {num:"4",character:"GHI"},
        {num:"5",character:"JKL"},
        {num:"6",character:"MNO"},
        {num:"7",character:"PQRS"},
        {num:"8",character:"TUV"},
        {num:"9",character:"WXYZ"},
        {num:"",character:""},
        {num:"0",character:""},
        {num:"",character:""}
    ],
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
    constructor(props) {
        super(props);
        this.old_pwd = [];
        this.pwd = [];
        this.pwd2 = [];
        this.number = 0;
    }
	componentWillReceiveProps(nextProps,nextState){
	this.setState({tips:false});
	//接口返回校验旧密码
	if(this.props.check_pwd!==nextProps.check_pwd){
		 if(nextProps.check_pwd.status === 0){
			 this.setState({msg:nextProps.check_pwd.errMsg});
             this.setState({tips:true});
		}else {
            this.number = 1;
            this.setState({tips_text:"设置6位数字提现密码"});
            this.setState({curPage:2,nPwdindex:0});
		}
	}
	//接口返回重置系统密码
	  if(this.props.reset_pwd!==nextProps.reset_pwd){
		  if(nextProps.reset_pwd.status === 0){
			  this.setState({msg:nextProps.reset_pwd.errMsg});
		      this.setState({tips:true});
		  }else{
              let mask=document.getElementById('mask');
              mask.style.display="true";
              this.setState({bBombox:true});
	      }
	}
  }

	//下一步
	GotoNext(){
		if(this.state.bCanNext){
			if(this.number == 0){
                var password = this.old_pwd.join("");
                this.props.authenticationPwd(password);
            }else {
                var password = this.pwd.join("");
                var repeat_password = this.pwd2.join("");
                this.props.resetPassword(password,repeat_password);
            }
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
    //删除密码
    DeletePwd(){
        // if(this.state.tips_text == "设置6位数字提现密码"){
        //     this.setState({password:false});
        // }else {
        //     this.setState({repeat_password:false});
        // }
        this.setState({tips:false,bCanNext:false});

        if(this.state.nPwdindex>0){
            this.setState({nPwdindex:this.state.nPwdindex-1});
        }else {
            this.setState({nPwdindex:0});
        }
    }
    //输入密码
    InputPwd(nPwd){
        this.setState({tips:false});
        switch (this.state.nPwdindex) {
            case 0:
                {
                    this.setState({nPwdindex:1});
                    if(this.number == 0){
                        this.old_pwd[0] = nPwd;
                    }else if(this.number == 1){
                        this.pwd[0] = nPwd;
                    }else {
                        this.pwd2[0] = nPwd;
                    }
                }break;
            case 1:
                {
                    this.setState({nPwdindex:2});
                    if(this.number == 0){
                        this.old_pwd[1] = nPwd;
                    }else if(this.number == 1){
                        this.pwd[1] = nPwd;
                    }else {
                        this.pwd2[1] = nPwd;
                    }
                }break;
            case 2:
                {
                    this.setState({nPwdindex:3});
                    if(this.number == 0){
                        this.old_pwd[2] = nPwd;
                    }else if(this.number == 1){
                        this.pwd[2] = nPwd;
                    }else {
                        this.pwd2[2] = nPwd;
                    }
                }break;
            case 3:
                {
                    this.setState({nPwdindex:4});
                    if(this.number == 0){
                        this.old_pwd[3] = nPwd;
                    }else if(this.number == 1){
                        this.pwd[3] = nPwd;
                    }else {
                        this.pwd2[3] = nPwd;
                    }
                }break;
            case 4:
                {
                    this.setState({nPwdindex:5});
                    if(this.number == 0){
                        this.old_pwd[4] = nPwd;
                    }else if(this.number == 1){
                        this.pwd[4] = nPwd;
                    }else {
                        this.pwd2[4] = nPwd;
                    }
                }break;
            case 5:
                {
                    this.setState({nPwdindex:6});
                    if(this.number == 0){
                        this.old_pwd[5] = nPwd;
                        this.setState({bCanNext:true});
                    }
                    if(this.number == 1){
                        this.pwd[5] = nPwd;
                        this.setState({bCanNext:false});
                        this.setState({password:true});
                        this.InputAgain();
                    }
                    if(this.number == 2) {
                        this.pwd2[5] = nPwd;
                        this.setState({bCanNext:true});
                        this.setState({repeat_password:true});
                    }
                }break;
            case 6:
                {
                    this.setState({nPwdindex:6});
                }break;

            default:
        }
    }
    //显示密码框
    onShowKey(){
        this.setState({bShowKey:true});
    }
    //隐藏密码框
     onHideKey(){
         this.setState({tips:false,bShowKey:false});
     }
     //再次输入
     InputAgain(){
         setTimeout(() => {
             this.setState({curPage:3,tips_text:"请再次输入以确认",nPwdindex:0});
             this.number = 2;
         },500)
     }
     //完成
     onCompleted(){
         var password = this.pwd.join("");
         var repeat_password = this.pwd2.join("");
         this.props.setPwd(password,repeat_password);
     }
     //关闭弹框
     onCloseWithdrawBox(){
         let mask=document.getElementById('mask');
         mask.style.display="none";
         this.setState({bBombox:false});
         this.props.push('/user/wallet');
     }
		render(){
		var nPwdindex = this.state.nPwdindex;
		return(
			<div>
				<Helmet title={this.state.title}/>
				<Header title={this.state.title} type={true}/>
				<div className={styles.containers}>
                     <div className={styles.tips}>{this.state.tips_text}</div>
                     <div className={styles.inputs}>
                         <div className={styles.pwd}>
                             {this.props.pwd.map( (value,index)=>{
                                 return <div className={index != 5 ? styles.nav :styles.nav2} onClick={()=>this.onShowKey()}>
                                 {(()=>{
                                     switch (nPwdindex) {
                                         case 0:
                                             break;
                                         case 1:
                                         {
                                             if(index == 0){
                                                 return <div className={styles.spot}>&#xe62e;</div>
                                             }
                                         }break;
                                         case 2:
                                         {
                                             if(index <= 1){
                                                 return <div className={styles.spot}>&#xe62e;</div>
                                             }
                                         }break;
                                         case 3:
                                         {
                                             if(index <= 2){
                                                 return <div className={styles.spot}>&#xe62e;</div>
                                             }
                                         }break;
                                         case 4:
                                         {
                                             if(index <= 3){
                                                 return <div className={styles.spot}>&#xe62e;</div>
                                             }
                                         }break;
                                         case 5:
                                         {
                                             if(index <= 4){
                                                 return <div className={styles.spot}>&#xe62e;</div>
                                             }
                                         }break;
                                         case 6:
                                         {
                                             if(index <= 5){
                                                 return <div className={styles.spot}>&#xe62e;</div>
                                             }
                                         }break;
                                         default:
                                     }
                                 })()}
                                 </div>
                             })}
                         </div>
                     </div>
				</div>
                {(()=>{
                    if(this.state.curPage !=2){
                        return <div className={this.state.bCanNext?styles.next:styles.notnext} onClick={()=>this.GotoNext()}>下一步</div>
                    }
                })()}
                <div className={this.state.bShowKey?styles.key:styles.hidekey}>
                        <div className={styles.row}>
                        <div className={styles.head}>输入密码</div>
                        <div className={styles.close} onClick={()=>this.onHideKey()}>&#xe779;</div>

                           {this.props.all_nums.map(function(value,index){
                               if(index == 9 ){
                                   return <div className={styles.nav2}>
                                      </div>
                               }
                               if(index == 11){
                                   return <div className={styles.nav2} onClick={()=>this.DeletePwd()}>
                                         <div className={styles.num}>&#xe62d;</div>
                                      </div>
                               }
                               if(index == 10){
                                   return <div className={styles.nav3} onClick={()=>this.InputPwd(value.num)}>
                                         <div className={styles.num}>{value.num}</div>
                                      </div>
                               }else {
                                   return <div className={styles.nav} onClick={()=>this.InputPwd(value.num)}>
                                             <div className={styles.num}>{value.num}</div>
                                             <div className={styles.character}>{value.character}</div>
                                      </div>
                               }
                           }.bind(this))}
                        </div>
                </div>

				{this.state.tips &&
					<Warning visible={this.state.tips} msg={this.state.msg}/>
				}
                {(()=>{
                    if(this.state.bBombox){
                        return <WithdrawOk text="密码重置成功！" callbackParent={()=>this.onCloseWithdrawBox()}/>
                    }
                })()}
			</div>
		)
	}
}
