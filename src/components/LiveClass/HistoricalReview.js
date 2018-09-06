/**
 * Created by zhaolong on 2017/11/24.
 * File description: 直播间-历史回看
 */
import React, {Component} from 'react';
import {imageUrl, url_prefix, } from '../../api/common/Global';
import {NoContent} from 'components';

const styles = require('./HistoricalReview.scss');

export default class HistoricalReview extends Component {
  state ={
    height:0,
    data:[
      {"name":1},
      {"name":1},
      {"name":1},
      {"name":1}
    ]
  }
  componentDidMount(){
    this.setState({height: window.screen.height-230-50-35-50+'px'});
  }

  render() {
    var face_url = imageUrl+"/images/course_defaultbg.jpg";
    var pwd_icon = imageUrl+"/images/liveClass/lock.png";
    var rmb_icon = imageUrl+"/images/liveClass/rmb.png";
    const list = this.props.data;
    return (
      <div className={styles.container} style={{height:this.state.height}}>
        {(()=>{
            if(list && list.length>0){
                return <div>
                            {list && list.map((v,i)=>{
                              return <div className={styles.list} key={i} onClick={()=>this.props.callbackParent()}>
                                <div className={styles.head}>
                                   <div className={styles.dates}>
                                     <div className={styles.point}></div>
                                     <span className={styles.date}>{v.start_time}</span>
                                   </div>
                                   <div className={styles.view_num}>
                                     <i className={styles.eye}>&#xe646;</i>
                                     <span className={styles.num}>{v.view_num}</span>
                                   </div>
                                </div>
                                <div className={styles.pic}>
                                 <img  className={styles.thumb} src={v.thumb && v.thumb !="" ? v.thumb:face_url} alt="" />
                                 {v.type != 0 &&
                                    <img className={styles.icon} src={v.type == "1" ? pwd_icon : rmb_icon} alt="" />
                                 }
                                 <div className={styles.title}>
                                     <div className={styles.course_name}>{v.course_name}</div>
                                     <div className={styles.course_detail}>{v.course_detail.length>20?v.course_detail.substr(0,20)+'...':v.course_detail}</div>
                                 </div>
                                </div>
                              </div>
                            })}
                </div>
            }else {
                return <NoContent text="主播比较懒，什么也没留下" background="#ffffff" type="live"/>
            }
        })()}
      </div>
    );
  }
}
