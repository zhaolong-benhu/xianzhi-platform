/**
 * Created by zhaolong on 2016/8/13.
 * File description:我的IHMA
 */
'use strict';
import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {Header,Warning} from 'components';
const styles = require('./Ihma.scss');

@connect(
  state => ({
  }),{push}
)
export default class Ihma extends React.Component{
  state={
      tips_box:false,
      msg:""
  };
  //列表选项点击
  GotoIhma(cert_id,id,is_study_status){
    if(is_study_status == 0){
      this.setState({tips_box:true,msg:"该课程已过期，不能再学哦~"});
    }else {
        if(this.props.type == "我的关注"){
            this.props.push('/ihmaDetail/'+id);
        }else {
            window.location.href="https://m-study.9first.com/home/courseList?cert_id="+cert_id;
        }
    }
  }
  //跳转到最佳东方支付页面
  Pay(){
      window.location.href="http://wams.veryeast.cn/activity/9first_pay/?a=pay";
  }
  render(){
    var type = this.props.type;
    return(
      <div className={styles.course}>
        <ol className={this.props.type=="我的关注"?styles.follow:styles.list}>
          {
            this.props.data.map(function(data,i) {
              return(
                <li key={'this.props.data.list'+ i} key={i} onClick={this.GotoIhma.bind(this,data.cert_id,data.id,data.is_study_status)}>
                  <div className={styles.pic}>
                      <img src={data.picture}/>
                  </div>

                  <div className={styles.info}>
                    <div>
                      <span className={styles.title}>{data.name}</span>
                    </div>
                    <div>
                      <span className={styles.name}>{data.study_num}人学过</span>
                    </div>

                    {(()=>{
                      if(this.props.type == "我的关注"){
                        return <div>
                          <span className={styles.is_study_status}>{data.favorite_time}</span>
                        </div>
                      }
                      else {
                        return <div>
                          {(()=>{
                            switch (data.status) {
                              case 1:
                              {
                                return <span className={styles.status_learning}>进行中</span>
                              }break;
                              case 2:
                              {
                                return <span className={styles.status_finish}>已通过</span>
                              }break;
                              case 3:
                              {
                                return <span className={styles.status_unfinish}>未通过</span>
                              }break;
                              case 4:
                              {
                                return <span className={styles.status_unfinish}>未完成</span>
                              }break;

                              default:

                            }
                            // if(data.status == 1)
                            // {
                            //   return <span className={styles.is_study_status}>已过期</span>
                            // }
                            // else {
                            //
                            //   if(data.course_rate>0 && data.course_rate<100){
                            //     return <span className={styles.status_learning}>学习进度 {data.course_rate}%</span>
                            //   }
                            //   if(data.course_rate == 100){
                            //     return <span className={styles.status_finish}>学习完毕</span>
                            //   }
                            // }
                          })()}
                          <span className={styles.fr}>{data.add_time}</span>
                        </div>
                      }
                    })()}

                  </div>

                </li>

              )
            }.bind(this))
          }
        </ol>
        <div className={this.props.type=="我的关注"?styles.pay2:styles.pay} onClick={()=>this.Pay()}>
            <span className={styles.text}>线上支付</span>
            <span className={styles.icon}>&#xe60e;</span>
        </div>
        {(()=>{
          if(this.state.tips_box){
            return  <Warning visible="true" msg={this.state.msg}/>
          }
        })()}
      </div>
    )

  }

}
