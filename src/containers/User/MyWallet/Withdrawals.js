/**
 * Created by zhaolong on 2016/11/18.
 * File description:我的钱包-提现
 */
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {Header,NumericalKey,WithdrawOk,Warning} from 'components';
import {connect} from 'react-redux';
import {createWithdrawals,withdrawalsMoney} from 'redux/modules/withdrawals';
import {isLoaded, load as loadUserInfo} from 'redux/modules/userInfo';
const styles = require('./Withdrawals.scss');

@connect(
  state => ({order:state.withdrawals.order,money:state.withdrawals.money,userInfo: state.userInfo.data}),
  {createWithdrawals,withdrawalsMoney,loadUserInfo}
)
export default class Withdrawals extends Component {
    static propTypes = {
	  createWithdrawals: PropTypes.func.isRequired,
	  withdrawalsMoney: PropTypes.func.isRequired,
	  order:PropTypes.object,
	  money:PropTypes.object
  }
    state={
        bShowClearBtn2:false,
        bInputAccount:false,
        bInputNum:false,
        bCanWithdraw:false,
        index:1,
        bInputPwd:false,
        bBombox:false,
        remaining:"50000",
        strInfo:"",
        bExcess:false,//超额
        tips:false,//消息弹框
        msg:"",//消息内容
        bClearPwd:false,//是否清空密码
    }
    // constructor(props){
    //     super(props);
    // }
    componentWillMount(){
        // this.props.loadUserInfo();
    }
    componentDidMount(){
        // var {userInfo} = this.props;
        // if(userInfo){
        //     this.setState({user_money:userInfo.user_money});
        // }
        this.setState({strInfo:"可用余额"+this.props.params.id+"元"});
    }
    componentWillReceiveProps(nextProps,nextState){
    //接口返回验证码
    if(this.props.order!==nextProps.order){
        if(nextProps.order.status === 0){
            this.setState({msg:nextProps.order.errMsg});
            this.setState({tips:true,bClearPwd:true});
       }else {
        window.location.href='//api.9first.com/pay/request/withdrawals?payid=3&order_id='+nextProps.order.data.order_id;
        //this.props.withdrawalsMoney(nextProps.order.data.order_id);
       }
    }

}
    //清除输入账户
    ClearInputText(id){
        this.setState({tips:false});

        this.refs.usernum.value = "";
        this.setState({bShowClearBtn2:false,bInputNum:false});
        this.setState({strInfo:"可用余额"+this.props.params.id+"元"});
        this.setState({bCanWithdraw:false});
    }
    //获取用户输入的提现金额
    OnUserNumInputChanged(){
        this.setState({tips:false});
          var inputText = Number(this.refs.usernum.value);
          if(inputText == ""){
              this.setState({bShowClearBtn2:false,bInputNum:false});
              this.setState({bExcess:false,strInfo:"可用余额"+this.props.params.id+"元"});
          }else {
              var reg = /^\d+\.?(\d{1,2})?$/;
              var strMoney = this.refs.usernum.value;
              var strMoney2 = inputText;
              if (!reg.test(strMoney) && strMoney != "") {
                     this.refs.usernum.value = strMoney.substring(0,strMoney.length-1);
                     strMoney2 = Number(strMoney.substring(0,strMoney.length-1));
                 }

              var counterFee =  (strMoney2*0.001).toFixed(2);
              if(counterFee<=0.00){
                  counterFee = 0.01;
              }
              this.setState({bShowClearBtn2:true,bInputNum:true});
              if(inputText>this.props.params.id){
                  this.setState({bExcess:true,bCanWithdraw:false,strInfo:"输入金额已超过可提现余额"});
              }else{
                  if(inputText<1){
                      this.setState({bExcess:true,bCanWithdraw:false,strInfo:"输入金额小于1元"});
                  }else{
                      var strInput = this.refs.usernum.value;

                      if(strInput.indexOf('+')>=0 || strInput.indexOf('-')>=0){
                          this.refs.usernum.value = '';
                      }
                    //   strInput.replace(/[^\d.]/g,"");
                    //   this.refs.usernum.value = strInput;

                      this.setState({bExcess:false,strInfo:"提现"+strMoney2+"元，手续费"+counterFee});
                  }
              }
          }
          this.CheckWithdrawIsEnable();
    }
    //输入框失去焦点
    onBlur(id){
        this.setState({tips:false});

        setTimeout(()=>{
            this.setState({bShowClearBtn2:false});
        },300)
    }
    //输入框得到焦点
    onFocus(id){
        this.setState({tips:false});

        if(this.state.index == 2){
            if(id == 2){
                var inputText = this.refs.usernum.value;
                if(inputText == ""){
                    this.setState({bShowClearBtn2:false});
                }else {
                    this.setState({bShowClearBtn2:true});
                }
            }
        }
        this.setState({index:2});
    }
    //设置提现按钮是否可用
    CheckWithdrawIsEnable(){
        setTimeout(() => {
            if(this.state.bInputNum && Number(this.refs.usernum.value)>=1 && Number(this.refs.usernum.value)<=this.props.params.id){
                this.setState({bCanWithdraw:true});
            }else {
                this.setState({bCanWithdraw:false});
            }
        },500);
    }
    //提现按钮点击
    onWithdraw(){
        if(this.state.bCanWithdraw){
            var str = this.refs.usernum.value;
            if(str.indexOf('.') == str.length-1){
                this.setState({tips:true,msg:'金额格式错误'});
            }else{
                var money = this.refs.usernum.value;
                let mask=document.getElementById('mask');
                mask.style.display="block";
                this.setState({bInputPwd:true});
            }
        }
    }
    //接收父级消息
    onCloseNumericalKey(str,pwd){
        this.setState({tips:false});
        if(-1 == str){
            let mask=document.getElementById('mask');
            mask.style.display="none";
            this.setState({bInputPwd:false});
        }
        if(1 == str){
             var money = this.refs.usernum.value;
             this.props.createWithdrawals(money,pwd);
        }
    }
    //关闭密码输入键盘
    onCloseWithdrawBox(){
        let mask=document.getElementById('mask');
        mask.style.display="none";
        this.setState({bBombox:false});
    }
    //全部提现
    WithdrawalsAll(){
        this.setState({tips:false});
        if(this.props.params.id<1) {
          this.setState({msg:'提现金额最低1元',tips:true});
          return
        }
        this.refs.usernum.value = this.props.params.id;
        var counterFee = (Number(this.props.params.id)*0.001).toFixed(2);
        if(counterFee<0.01){
            counterFee = 0.01;
        }
        this.setState({bExcess:false,strInfo:"提现"+this.props.params.id+"元，手续费"+counterFee,bInputNum:true});
        if(this.props.params.id == "0.00"){
            this.setState({bCanWithdraw:false});
        }else {
            this.setState({bCanWithdraw:true});
        }
    }
    render(){
        var title = "提现到微信账户";
        var name = "微信账户";
        var placeholder = "微信账户";

        if(this.props.params.id == "2"){
            title = "提现到微信账户";
            name = "微信账户";
            placeholder = "微信账户";
        }
        // var {userInfo} = this.props;
        return(
            <div>
                <Helmet title={title}/>
                <Header title={title} type={true}/>
                <div className={styles.container}>
                    {/* <div className={styles.account}>
                        <span className={styles.text}>{name}</span>
                        <input className={styles.input} ref="useraccount" placeholder={placeholder} autoFocus="true" onBlur={this.onBlur.bind(this,1)} onFocus={()=>this.onFocus(1)}  onChange={()=>this.OnUserAccountInputChanged()}/>
                        <span className={this.state.bShowClearBtn?styles.clear_btn:styles.hideclear_btn} onClick={()=>this.ClearInputText(1)}>&#xe616;</span>
                    </div> */}

                    <div className={styles.withdraw_info}>
                        <div className={styles.detail}>
                            <div className={styles.text}>提现金额</div>
                            <div className={styles.money}>
                                <span className={styles.renminbi}>¥</span>
                                <input className={styles.sum} type="number" ref="usernum" placeholder="0.00"  onBlur={()=>this.onBlur(2)} onFocus={()=>this.onFocus(2)} onChange={()=>this.OnUserNumInputChanged()}/>
                                <span className={this.state.bShowClearBtn2?styles.clear_btn:styles.hideclear_btn} onClick={()=>this.ClearInputText(2)}>&#xe616;</span>
                            </div>
                            <div className={styles.remarks}>
                             <span className={!this.state.bExcess?styles.money:styles.money2}>{this.state.strInfo}</span>
                             <span className={styles.all} onClick={()=>this.WithdrawalsAll()}>全部提现</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.explain}>
                        <span className={styles.note}>注：</span>
                        <span className={styles.text}>提现金额最低1元，提现会扣除0.1%手续费</span>
                    </div>
                    <div className={this.state.bCanWithdraw ? styles.withdraw : styles.nowithdraw} onClick={()=>this.onWithdraw()}>确认提现</div>
                </div>
                {(()=>{
                    if(this.state.bInputPwd){
                        return <NumericalKey bClearPwd={this.state.bClearPwd} callbackParent={this.onCloseNumericalKey.bind(this)}/>
                    }
                })()}
                {(()=>{
                    if(this.state.bBombox){
                        return <WithdrawOk text="提现成功！" callbackParent={()=>this.onCloseWithdrawBox()}/>
                    }
                })()}

                {(()=>{
                    if(this.state.tips){
                        return <Warning visible={true} msg={this.state.msg}/>
                    }
                })()}



            </div>
        )
    }
}
