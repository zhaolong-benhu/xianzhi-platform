/**
 * Created by zhaolong on 2016/8/5.
 * File description:我的精品课
 */
'use strict';
import React from 'react';
import Helmet from 'react-helmet';
import { Link} from 'react-router';
import {Header,Warning} from 'components';
import { push } from 'react-router-redux';
const styles = require('./ExcellentCourse.scss');

export default class ExcellentCourse extends React.Component{
  state={
    tips:false
  }
  //跳转到学习中心
  onGotoPage(nStatus,nId){
    if(nStatus == 4){
      this.setState({tips:true});
    }else {
      window.location.href='https://m-study.9first.com/study/learnCourse?course_id='+nId;
    }
  }

  render(){
    var type = this.props.type;
    return(
      <div className={styles.course}>
        <ol className={this.props.type=="我的关注"?styles.follow:styles.list}>
          {
            this.props.data.map(function(data,i) {
              return(
                <div key={'ToLearn'+i}>
                      <div onClick={this.onGotoPage.bind(this,data.status,data.course_id)}>
                      <li key={'this.props.data.list'+ i}>
                        <div className={styles.pic}>
                          <img src={data.thumb==""?'/images/course_defaultbg.jpg':data.thumb}/>
                        </div>

                        <div className={styles.info}>
                          <div>
                            <span className={styles.title}>{data.title}</span>
                          </div>
                          <div>
                            <span className={styles.name}>{data.study_num}人学过</span>
                            {(()=>{
                              if(data.status==2 || data.status==1 || data.status==3){
                                return  <span className={styles.days}>{data.leave_days}天</span>
                              }
                            })()}
                          </div>

                          <div>
                            {(()=>{
                              if(data.status==1){
                                return <span className={styles.is_study_learn}>学习中</span>
                              }
                              if(data.status==2){
                                return <span className={styles.is_study_learn}>学习中</span>
                              }
                              if(data.status==3){
                                return <span className={styles.is_study_learn}>已完成</span>
                              }
                              if(data.status==4){
                                return <span className={styles.is_study_status}>已过期</span>
                              }
                            })()}

                            <span className={styles.fr}>{data.add_time}</span>
                          </div>
                        </div>

                      </li>
                    </div>

                </div>

              )
            }.bind(this))
          }
        </ol>
        {(()=>{
          if(this.state.tips){
            return <Warning visible="true" msg="课程已过期，请重新购买学习！"/>
          }
        })()}
      </div>
    )

  }

}
