/**
 * Created by zhaolong on 2016/8/5.
 * File description:我的精品包
 */
'use strict';
import React from 'react';
import Helmet from 'react-helmet';
import { Link} from 'react-router';
import {Header,Warning} from 'components';
const styles = require('./ExcellentPackage.scss');

export default class ExcellentPackage extends React.Component{
  state={
    tips:false,
    msg:""
  }
  //跳转到学习中心
 onGotoPage(is_time,cert_id,product_id,status){
    if(is_time == "1"){
       window.location.href='https://m-study.9first.com/home/courseList?cert_id='+cert_id+'&product_id='+product_id+'&sort=-2';
    }else {//已过期
      if(status == "2"){
        //已结业
        this.setState({tips:true,msg:"已获得证书，请勿重新购买~"});
      }else {
        this.setState({tips:true,msg:"课程已过期，请重新购买学习~"});
      }
    }
  }
  render(){
    return(
      <div className={styles.course}>
        <ol className={styles.list}>
          {
            this.props.data.map(function(data,i) {
              return(
              <div  key={'ToLearn'+i}>
                <li onClick={this.onGotoPage.bind(this,data.is_time,data.cert_id,data.product_id,data.status)}>
                  <div className={styles.pic}>
                    <img src={data.thumb==""?'/images/course_defaultbg.jpg':data.thumb}/>
                  </div>

                  <div className={styles.info}>
                    <div className={styles.head}>
                      <span className={styles.label}>证书</span>
                      <span className={styles.title}>{data.title}</span>
                    </div>
                    <div>
                      <span className={styles.count}>共{data.course_num}门课程</span>
                      <span className={styles.name}>|</span>
                      <span className={styles.name}>{data.study_num}人学过</span>
                      {(()=>{
                        if(data.is_time ==  1){
                          return  <span className={styles.days}>{data.leave_days}天</span>
                        }
                      })()}
                    </div>

                    <div>
                      {(()=>{
                          if(data.status == 0)
                          {
                            return <span className={styles.status_learning}>已报名</span>
                          }
                          else if(data.status == 1){
                            return <span className={styles.status_learning}>学习中</span>
                          }
                          else if(data.status == 2)
                          {
                            return <span className={styles.status_learning}>已结业</span>
                          }
                          else if(data.status == 3){
                            return <span className={styles.status_learning}>已通过</span>
                          }
                          else if(data.status == 4)
                          {
                            return <span className={styles.status_unfinish}>未通过</span>
                          }
                          else if(data.status == 5){
                            return <span className={styles.status_unfinish}>未完成</span>
                          }
                      })()}

                      <span className={styles.fr}>{data.add_time}</span>
                    </div>
                  </div>
                </li>
              </div>
              )
            }.bind(this))
          }
        </ol>
        {(()=>{
          if(this.state.tips){
            return <Warning visible="true" msg={this.state.msg}/>
          }
        })()}
      </div>
    )
  }
}
