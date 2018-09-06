/**
 * Created by zhaolong on 2016/7/5.
  * File description:内训填写信息弹框提示
 */

'use strict'
import React,{Component} from 'react'
const styles = require('./CommitInfo_Box.scss');

export default class CommitInfo_Box extends Component{

  state={
    bomb_box:false,
    cancel_clicked:false,
    ok_clicked:true,
  };

  //鼠标点击取按钮事件响应
  onClickedNo(str){
    this.props.callbackParent(false);
  }
  //鼠标点击确定按钮事件响应
  onClickedYes(str){
    var strName = this.refs.name.value;
    var strPhone = this.refs.phone.value;
    if(0 == strName.length)
    {
      this.props.callbackParent("name_null","1","2");
    }
    else if(0 == strPhone.length)
    {
      this.props.callbackParent("phone_null");
    }
    else if(strName.length == 1){
      this.props.callbackParent("one");
    }
    else if(strPhone.length != 11&&strPhone.length>0){
      this.props.callbackParent("lack");
    }
    else if(!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/i.test(strPhone)){
      this.props.callbackParent("lack");
    }
    else{
      this.props.callbackParent(true,strName,strPhone);
    }
  }
  // //截取超限文字
  LimitTextInput(str){

    if( "name" == str){
      var strName = this.refs.name.value;
      if(strName.length>10)
      {
        this.refs.name.value = strName.substr(0,10);
      }
    }
    if( "phone" == str){
      var strPhone = this.refs.phone.value;
      if(strPhone.length>11)
      {
        this.refs.phone.value =strPhone.substr(0,11);
      }
    }
  }

  render(){
    return(
        <div>
        {(()=>{
            if(this.props.type == "ihma"){
                return  <div className={styles.bomb_box}>
                   <div className={styles.info}>
                     <div className={styles.tips}>请留下您的信息，便于我们联系您：</div>
                     <input className={styles.name} type="text"  id="name" ref="name" onChange={this.LimitTextInput.bind(this,"name")} placeholder="请输入您的姓名"/>
                     <input className={styles.name} type="tel" id="phone" ref="phone" onChange={this.LimitTextInput.bind(this,"phone")} placeholder="请输入您的电话"/>
                   </div>
                   <div className={styles.yesorno}>
                     <a onClick={this.onClickedNo.bind(this,"no")}>取消</a>
                     <a className={styles.ok} onClick={this.onClickedYes.bind(this,"yes")}>提交报名</a>
                   </div>
                 </div>
            }else {
                return  <div className={styles.bomb_box}>
                   <div className={styles.info}>
                     <div className={styles.tips}>请留下您的信息，便于我们联系您：</div>
                     <input className={styles.name} type="text" id="name" ref="name" onChange={this.LimitTextInput.bind(this,"name")} placeholder="请输入您的姓名"/>
                     <input className={styles.name} type="tel" id="phone" ref="phone" onChange={this.LimitTextInput.bind(this,"phone")} placeholder="请输入您的电话"/>
                   </div>
                   <div className={styles.yesorno}>
                     <a onClick={this.onClickedNo.bind(this,"no")}>取消</a>
                     <a className={styles.ok} onClick={this.onClickedYes.bind(this,"yes")}>提交</a>
                   </div>
                 </div>
            }
        })()}
        </div>
    )
  }
}
