/**
 * Created by zhaolong on 2017/01/19.
 * File description:提现密碼設置数字键盘
 */
'use strict'
import React,{Component,PropTypes} from 'react'
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {setPwd} from 'redux/modules/withdrawals';
const styles = require('./SetPassword.scss');

@connect(
  state => ({
      set_pwd:state.withdrawals.pwd
  }),{setPwd,push}
)

export default class SetPassword extends Component{

    static propTypes = {
        setPwd: PropTypes.func,
        set_pwd:PropTypes.object,
        push: PropTypes.func.isRequired
    }
  state={
    bomb_box:false,
    cancel_clicked:false,
    width:0,
    nPwdindex:0,
    bShowKey:true,
    tips:"设置6位数字提现密码",
    password:false,
    repeat_password:false,
    user_money:"0.00",
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
      this.pwd = [];
      this.pwd2 = [];
      this.number = 1;
  }
  componentWillMount(){

  }
   componentDidMount(){

   }
   componentWillReceiveProps(nextProps,nextState){
        if(this.props.set_pwd!==nextProps.set_pwd){
            if(nextProps.set_pwd.status === 0){
                this.props.callbackParent(nextProps.set_pwd.errMsg);
           }else {
               this.props.push('/user/wallet');
           }
        }
    }
    //删除密码
    DeletePwd(){
        if(this.state.tips == "设置6位数字提现密码"){
            this.setState({password:false});
        }else {
            this.setState({repeat_password:false});
        }

        if(this.state.nPwdindex>0){
            this.setState({nPwdindex:this.state.nPwdindex-1});
        }else {
            this.setState({nPwdindex:0});
        }
    }
    //输入密码
    InputPwd(nPwd){
        var tips = this.state.tips;
        switch (this.state.nPwdindex) {
            case 0:
                {
                    this.setState({nPwdindex:1});
                    if(this.number == 1){
                        this.pwd[0] = nPwd;
                    }else {
                        this.pwd2[0] = nPwd;
                    }
                }break;
            case 1:
                {
                    this.setState({nPwdindex:2});
                    if(this.number == 1){
                        this.pwd[1] = nPwd;
                    }else {
                        this.pwd2[1] = nPwd;
                    }
                }break;
            case 2:
                {
                    this.setState({nPwdindex:3});
                    if(this.number == 1){
                        this.pwd[2] = nPwd;
                    }else {
                        this.pwd2[2] = nPwd;
                    }
                }break;
            case 3:
                {
                    this.setState({nPwdindex:4});
                    if(this.number == 1){
                        this.pwd[3] = nPwd;
                    }else {
                        this.pwd2[3] = nPwd;
                    }
                }break;
            case 4:
                {
                    this.setState({nPwdindex:5});
                    if(this.number == 1){
                        this.pwd[4] = nPwd;
                    }else {
                        this.pwd2[4] = nPwd;
                    }
                }break;
            case 5:
                {
                    this.setState({nPwdindex:6});
                    if(this.number == 1){
                        this.pwd[5] = nPwd;
                    }else {
                        this.pwd2[5] = nPwd;
                    }
                    this.setState({password:true});
                    if(tips == "请再次输入以确认"){
                        this.setState({repeat_password:true});
                    }
                    if(this.number == 1){
                        this.InputAgain();
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
         this.setState({bShowKey:false});
     }
     //再次输入
     InputAgain(){
         setTimeout(() => {
             this.setState({tips:"请再次输入以确认",nPwdindex:0});
             this.number = 2;
         },500)
     }
     //完成
     onCompleted(){
         var password = this.pwd.join("");
         var repeat_password = this.pwd2.join("");
         this.props.setPwd(password,repeat_password);
     }
  render(){
     var nPwdindex = this.state.nPwdindex;
    return(
        <div>
            <div className={styles.containers2}>
                <div className={styles.text}>{this.state.tips}</div>
                <div className={styles.root}>
                    <div className={styles.pwd}>
                        {this.props.pwd.map((value,index)=>{
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
                if(this.state.password && this.state.repeat_password)
                {
                    return <div className={styles.complete2} onClick={()=>this.onCompleted()}>完成</div>
                }else {
                    return <div className={styles.complete}>完成</div>
                }
            })()}
            {/* <div className={!this.state.password && !this.state.repeat_password ? styles.complete : styles.complete2} onClick={()=>this.onCompleted()}>完成</div> */}
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
        </div>

    )
  }
}
