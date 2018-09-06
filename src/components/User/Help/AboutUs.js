/**
 * Created by zhaolong on 2016/8/5.
 * File description:个人中心-关于我们
 */
 'use strict';
 import React from 'react';
 import Helmet from 'react-helmet';
 import {Header} from 'components';
const styles = require('./AboutUs.scss');

export default class AboutUs extends React.Component{
  state={
    img:"/logo.png",
    height:'480',
  }
  componentDidMount(){
      var height = Number(document.body.scrollHeight)-60+"px";
      this.setState({height:height});
  }
     render(){
       return(
         <div className={styles.aboutus}>
           <Helmet title="关于我们"/>
           <Header title="关于我们" type={true}/>

           <div className={styles.picture} style={{height:this.state.height,backgroundColor:"#FFF"}}>
              <img src={this.state.img}/>
              <h3>酒店找工作上最佳东方，找培训上先之教育。好课，先之见！</h3>
              <p>先之教育是国内领先的酒店业学习网站，以“打造酒店业教育培训第一品牌”为目标，为酒店提供全面有效的培训方案和优质的学习资源。当前，先之旗下拥有先之酒店学习管理系统（Learning Management System,简称LMS）、先之IHMA岗位胜任能力证书、先之酒店公开课和先之酒店内训四大培训产品，针对个人学员和企业学员的不同特征，提供从网络到现场的酒店培训解决方案。</p>
              <div className={styles.text}>先之教育旨在通过研发和传播酒店实战课程，为中国酒店业培育专业人才，帮助中国酒店人走出培训的困境。</div>
           </div>
        </div>
       )
     }
   }
