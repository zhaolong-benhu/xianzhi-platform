/**
 * Created by zhaolong on 2016/8/31.
 * File description:学员评价
 */
'use strict';
import React,{Component} from 'react';
import {Star} from 'components';
import {imageUrl} from '../../api/common/Global';
const styles = require('./StudentEvaluation.scss');

export default class StudentEvaluation extends Component{
//查看所有评价
 LookAll(){
    this.props.callbackParent(3);
 }
  render(){
    return(
      <div>
        {(()=>{
          if(this.props.total_num == 0){
            return   <div className={styles.student_evaluation}>
                <div className={styles.empty}></div>
                <div className={styles.info2}>
                  <span className={styles.evaluation} onClick={this.LookAll.bind(this)}>学员评价({this.props.total_num})</span>
                  <span className={styles.look_all} onClick={this.LookAll.bind(this)}>暂无评价</span>
                </div>
              </div>
          }
          else
          {
            return <div>
            <div className={styles.student_evaluation}>
              <div className={styles.empty}></div>
              <div className={styles.info}>
                <span className={styles.evaluation}>学员评价({this.props.total_num})</span>
                <span className={styles.more}>&#xe619;</span>
                <span className={styles.look_all} onClick={this.LookAll.bind(this)}>查看全部</span>
              </div>
            </div>
            <div className={styles.comments}>
               <div className={styles.info}>
                 <div className={styles.pic}>
                 <img className={styles.img} src={this.props.data.user_thumb==""?imageUrl+'/images/user/head.jpg':this.props.data.user_thumb}/>
                 </div>
                 <div className={styles.account}>
                   <span className={styles.name}>{this.props.data.user_name}</span>
                   <span className={styles.date}>{this.props.data.add_time}</span>
                 </div>
                 <div className={styles.all_star}>
                    <Star num={this.props.data.star}/>
                 </div>
               </div>
               <div className={styles.description}>{this.props.data.description}</div>
            </div>
            </div>
          }
        })()}

      </div>
    )
  }


}
