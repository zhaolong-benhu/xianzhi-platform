/**
 * Created by zhaolong on 2016/8/31.
 * File description:在线课程-导师介绍
 */
'use strict';
import React,{Component} from 'react';
import {Link} from 'react-router';
import {imageUrl} from '../../api/common/Global';
const styles = require('./TutorIntroduce.scss');

export default class TutorIntroduce extends Component{

  render(){
    return(
      <div>
        <div className={styles.student_evaluation}>
          <div className={styles.empty}></div>
          <div className={styles.info}>
            <span className={styles.evaluation}>导师介绍</span>
            <Link to={'/neixun/'+this.props.data.teacher_id} onClick="ga('send','event','jieshao','detail-3','zxkecheng')"><span className={styles.more}>&#xe619;</span></Link>
            <Link to={'/neixun/'+this.props.data.teacher_id} onClick="ga('send','event','jieshao','detail-3','zxkecheng')"><span className={styles.look_all}>进入导师页面</span></Link>
          </div>
        </div>
        <div className={styles.comments}>
           <div className={styles.info}>
             <div className={styles.pic}>
             <img className={styles.img} src={this.props.data.teacher_thumb==""?imageUrl+'/images/user/head.jpg':this.props.data.teacher_thumb}/>
             </div>
             <div className={styles.account}>
               <span className={styles.name}>{this.props.data.teacher_name}</span>
               <span className={styles.introduce}>{this.props.data.teacher_handle}</span>
             </div>
           </div>
        </div>
      </div>
    )
  }


}
