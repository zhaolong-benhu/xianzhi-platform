/**
 * Created by zhaolong on 2016/7/5.
 * File description:直播打赏弹框
 */

'use strict'
import React,{Component} from 'react'
import {imageUrl} from '../../api/common/Global';
const styles = require('./Areward_Box.scss');

export default class Areward_Box extends Component{

  state={
    bomb_box:false,
    cancel_clicked:false,
    ok_clicked:true,
    img:"/images/shang.png",
    show:true,
  };
  constructor(props){
      super(props);
  }
  componentDidMount(){
      this.refs.money.value = "2.00";
  }
  //按钮点击事件响应
  onClickedBtn(str){
      if(str == "no"){
          let mask=document.getElementById('mask');
          mask.style.display="none";
          this.setState({show:false});
          this.props.callbackParent(false,null,-1);
          setTimeout(() => {
              this.setState({show:true});
          },800);
      }else {
          var strMoney = this.refs.money.value;
          if(0 == strMoney.length)
          {
            this.props.callbackParent(true,"isEmpty",-1);
          }
          else{
            if(!/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(strMoney)){
                this.props.callbackParent(true,"Formaterror",-1);
            }else if(Number(strMoney)<0){
                this.props.callbackParent(true,"Moneyless",-1);
            }else {
                let mask=document.getElementById('mask');
                mask.style.display="none";
                strMoney = Number(strMoney).toFixed(2);
                this.props.callbackParent(true,"Valid",strMoney);
             }
          }
      }
  }
  //截取超限文字
  LimitTextInput(){
  }

  render(){
    return(
          <div className={this.state.show?styles.bomb_box:styles.bomb_box2}>
           <div className={styles.info}>
             <div>
                 <img src={imageUrl+this.state.img} style={{width:"80%"}}/>
             </div>
             <div className={styles.item}>
                 <span className={styles.text}>金额：</span>
                 <span className={styles.text2}>¥</span>
                 <input className={styles.money} type="number" id="money" ref="money" onChange={()=>this.LimitTextInput()} placeholder="请输入打赏金额"/>
             </div>
             {/* <div className={styles.item}>
                <span className={styles.text}>留言：</span>
                <input className={styles.money} type="text" id="phone" ref="phone" onChange={this.LimitTextInput.bind(this,"phone")} placeholder="请输入您的电话"/>
             </div> */}
           </div>
           <div className={styles.yesorno}>
             <a onClick={this.onClickedBtn.bind(this,"no")}>取消</a>
             <a className={styles.ok} onClick={this.onClickedBtn.bind(this,"yes")}>确定支付</a>
           </div>
         </div>
    )
  }
}
