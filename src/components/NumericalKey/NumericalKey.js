/**
 * Created by zhaolong on 2016/7/5.
 * File description:提现数字键盘
 */
'use strict'
import React,{Component} from 'react'
import { Link } from 'react-router';
const styles = require('./NumericalKey.scss');

export default class NumericalKey extends Component{

  state={
    bomb_box:false,
    cancel_clicked:false,
    width:0,
    nPwdindex:0
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
  }
   componentDidMount(){
   }
   componentWillReceiveProps(){
    //    if(this.props.bClearPwd){
    //
    //    }else{
    //
    //    }
       this.setState({nPwdindex:0});
   }
   //向父级发送退出密码输入框
    onCloseNumericalKey(){
        this.props.callbackParent("-1");
    }
    //删除密码
    DeletePwd(){
        if(this.state.nPwdindex>0){
            this.setState({nPwdindex:this.state.nPwdindex-1});
        }else {
            this.setState({nPwdindex:0});
        }
    }
    //输入密码
    InputPwd(nPwd){
        switch (this.state.nPwdindex) {
            case 0:
                {
                    this.setState({nPwdindex:1});
                    this.pwd[0] = nPwd;
                }break;
            case 1:
                {
                    this.setState({nPwdindex:2});
                    this.pwd[1] = nPwd;
                }break;
            case 2:
                {
                    this.setState({nPwdindex:3});
                    this.pwd[2] = nPwd;
                }break;
            case 3:
                {
                    this.setState({nPwdindex:4});
                    this.pwd[3] = nPwd;
                }break;
            case 4:
                {
                    this.setState({nPwdindex:5});
                    this.pwd[4] = nPwd;
                }break;
            case 5:
                {
                    this.setState({nPwdindex:6});
                    this.pwd[5] = nPwd;
                    //进行密码验证
                    var password = this.pwd.join("");
                    this.props.callbackParent("1",password);
                }break;
            case 6:
                {
                    this.setState({nPwdindex:6});
                }break;

            default:
        }
    }

  render(){
     var nPwdindex = this.state.nPwdindex;
    return(
      <div className={styles.bomb_box}>
        <div className={styles.head}>输入密码</div>
        <div className={styles.close} onClick={()=>this.onCloseNumericalKey()}>&#xe779;</div>

        <div className={styles.pwd}>
            {this.props.pwd.map(function(value,index){
                return <div className={index != 5 ? styles.nav :styles.nav2}>
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
        <Link to='/user/SettingPwd/ResetExtractPwd'><div className={styles.forgetpwd}>忘记密码？</div></Link>
       <div className={styles.row}>
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
    )
  }
}
