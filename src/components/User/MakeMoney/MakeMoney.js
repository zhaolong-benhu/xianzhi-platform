/**
 * Created by same on 2016/8/5.
 * File description:我要赚钱
 */
 'use strict';
 import React,{Component,PropTypes} from 'react';
 import Helmet from 'react-helmet';
 import superagent from 'superagent';
 import {qcode} from '../../../api/common/user';
 import {Header,Warning,Share} from 'components';
 import {connect} from 'react-redux';
 import {userCode} from 'redux/modules/userInfo';
 import { push } from 'react-router-redux';
 const styles = require('./MakeMoney.scss');

 @connect(
   state => ({
     result:state.userInfo.code
   }),{userCode,push}
 )
export default class MakeMoney extends React.Component{
  static propTypes = {
    result:PropTypes.ojbect,
    userCode:PropTypes.func.isRequired,
    push:PropTypes.func.isRequired
  }
  state={
    title:"我的二维码",
    save:"长按二维码保存到相册",
    description:"分享可提成，人人得激励！亲，恭喜您注册成功！千万不要走开，意外收获等您去拿！凡注册成功的每位原用户，系统即自动生成个人专属二维码，在【我要赚钱】出现，当原用户把二维码分享出去时，通过扫描原用户二维码进来的用户就是原用户的子用户，同步显示已邀请多少人。每位子用户进来之后，完成注册、购买产品等操作，当交易完成后系统自动会给原用户进行业务提成，提成比例按照平台运营的具体要求进行提示及操作，么么哒，赶紧分享，告诉小伙伴去吧！",
    share:"分享到:",
    invitation_num:"0",
    tips_box:false,
    msg:"长按二维码保存到相册~",
  }
 //保存图片
  SavePhototoPhone(){
    this.setState({tips_box:true});
  }

  componentWillMount(){
       this.props.userCode();
  }
   render(){
    const {result} = this.props;
    if(result && result.status == 0){
      this.props.push("/");
    }
     return(
       <div className={styles.makemoney}>
          <Helmet title="我要赚钱"/>
          <Header title="我要赚钱"  back="/user" />

          {result && result.status==1 &&
            <div className={styles.info}>
               <div className={styles.subject}>

                  <div className={styles.title}>{this.state.title}</div>

                  <div className={styles.scan}>
                     <img src={result.data.qrcode} className={styles.pic}></img>
                  </div>

                  <div className={styles.save} >
                    <span className={styles.text} onClick={this.SavePhototoPhone.bind(this)}>{this.state.save}</span>
                  </div>

                  <div className={styles.description}>{this.state.description}</div>

                  <div className={styles.share}>{this.state.share}</div>
                  <Share title="不要抱怨没有钱赚 分享我就可以啦" pic={result.data.qrcode} url={"https://m.9first.com/share/"+result.data.key} style="mini"/>
               </div>
               <div className={styles.invitation}>
                 <span className={styles.text}>已邀请</span>
                 <span className={styles.num}>{this.props.params.id}</span>
                 <span className={styles.text}>人</span>
               </div>

               {(()=>{
                 if(this.state.tips_box)
                 {
                   return <div>
                     <Warning visible="true" msg={this.state.msg}/>
                   </div>
                 }
               })()}
            </div>
          }



       </div>
     )
   }
 }
