/**
 * Created by zhaolong on 2016/11/28.
 * File description:ihma 使用说明
 */
'use strict'
import React,{Component} from 'react'
import Helmet from 'react-helmet';
import {Header} from 'components';
const styles = require('./Instructions.scss');

export default class Instructions extends Component{

state={
    height:"480px",
    text1:"提供职位管理与发布、简历查询与下载、招聘统计与分析以及个性化定制企业招聘网站等服务，满足不同客户的招聘需求",
    text2:"提供职位管理与发布、简历查询与下载、招聘统计与分析以及个性化定制企业招聘网站等服务，满足不同客户的招聘需求",
};
componentDidMount(){
    var height = Number(document.body.scrollHeight)-60+"px";
    this.setState({height:height});
}
//跳转到百度商桥进行咨询
onContact(){
      window.location.href='//qiao.baidu.com/v3/?module=default&controller=im&action=index&ucid=6402298&type=n&siteid=3164266';
}
  render()
  {
    return(
      <div>
        <Helmet title="使用说明"/>
        <Header title="使用说明" type={true}/>
        <div className={styles.container} style={{height:this.state.height}}>
            <div className={styles.qusetion}>体现遇到的问题</div>
            <div className={styles.tips}>
                <div className={styles.ques}>1.提不出来怎么办</div>
                <div className={styles.text}>{this.state.text1}</div>
            </div>
            <div className={styles.tips2}>
                <div className={styles.ques}>2.要怎么体现啊</div>
                <div className={styles.text}>{this.state.text2}</div>
            </div>

            <div className={styles.contact}>
                <span className={styles.text1}>如有疑问，请联系</span>
                <span className={styles.text2} onClick={()=>this.onContact()}>客服</span>
            </div>

        </div>
      </div>
    )
  }
}
