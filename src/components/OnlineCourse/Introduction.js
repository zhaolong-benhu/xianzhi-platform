/**
 * Created by zhaolong on 2016/8/10.
 * File description:在线课程简介
 */
'use strict';
import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import {CourseOverview,LearningTarget,StudentEvaluation,TutorIntroduce,Share,Certificate,AmplifyImg_Box,Star,AuthenticationCondition} from 'components';
const styles = require('./Introduction.scss');


export default class Introduction extends React.Component{

state={
  view_num:"100",
  star:"",
  real_price:"100",
  price:"200",
  discount:"5",
  share_box:false,
  amplify_img:false,
}
//分享
Share(){
  //弹出灰化层
  let mask=document.getElementById('mask');
  mask.style.display="block";
  //弹出分享框
  this.setState({share_box:true});
  //此刻屏幕不能在滑动
  document.documentElement.style.overflow='hidden';
  document.body.style.overflow='hidden';//手机版设置这个。
}
//取消分享
Shared(str){
    if(str == "yes" && this.props.type !== "ihma"){
        this.props.callbackParent(-1);
    }else if(str=="cancel"){
        let mask=document.getElementById('mask');
        mask.style.display="none";
        //隐藏分享框
        this.setState({share_box:false});
        //此刻屏幕可以滑动
        document.documentElement.style.overflow='visible';
        document.body.style.overflow='visible';//手机版设置这个。

        this.props.callbackParent(0);
    }
}
//获取用户选择
GetTableSelected(nIndex){
  this.props.callbackParent(2);
}
//放大证书图片
AmplifyImg(){
  //弹出灰化层
  let mask=document.getElementById('mask');
  mask.style.display="block";
  //放大证书
  this.setState({amplify_img:true});
}
//缩小证书图片
Received(){
  //弹出灰化层
  let mask=document.getElementById('mask');
  mask.style.display="none";
  //放大证书
  this.setState({amplify_img:false});
}
render(){
  return(
    <div>
         <div className={styles.detail}>
           <div className={styles.name}>
             <span className={styles.coursetitle}>{this.props.data.title || this.props.data.name}</span>
             {(()=>{
               if(this.props.not300 == "yes" || this.props.type == "ihma"){
                 return <span className={styles.share} onClick={this.Share.bind(this)}>&#xe60c;</span>
               }
             })()}
           </div>
           <div className={styles.applynum_star}>
           {(()=>{
              if(this.props.type == "专业证书"){
                return <span className={styles.interest}>共{this.props.data.course.course_num}门课程</span>
              }
           })()}
           {(()=>{
              if(this.props.type == "专业证书"){
                return <span className={styles.seperator}>|</span>
              }
           })()}
            {(()=>{
                if(this.props.type!="ihma"){
                    return <span className={styles.interest}>{this.props.data.study_num}人学过</span>
                }
            })()}
              {/* <div className={this.props.type=="ihma"?styles.star2:styles.star}>
                <Star num={this.props.data.star}/>
              </div> */}
              {/* {(()=>{
                 if(this.props.type == "ihma"){
                   return <span className={styles.seperator}>|</span>
                 }
              })()} */}
              {(()=>{
                  if(this.props.type == "ihma"){
                    return <span className={styles.num}>已有{this.props.data.enroll}人报考</span>
                  }
              })()}
           </div>

           {(()=>{
             if(this.props.not300 == "yes"){
               if(this.props.data.real_price == "0.00"){
                 return  <div className={styles.status}>
                    <span className={styles.now_price}>免费</span>
                  </div>
               }
               else if(this.props.data.real_price == this.props.data.price){
                 return   <div className={styles.status}>
                     <span className={styles.now_price}>¥{this.props.data.real_price}</span>
                  </div>
               }
               else {
                 return  <div className={styles.status}>
                    <span className={styles.now_price}>¥{this.props.data.real_price}</span>
                    <span className={styles.original_price}>¥ {this.props.data.price}</span>
                    <span className={styles.discount}>{this.props.data.discount}折</span>
                  </div>
               }
             }
           })()}
         </div>
         {(()=>{
             if(this.props.type != "ihma"){
                 return <CourseOverview description={this.props.type=="单门课程"?this.props.data.description:this.props.data.intro} title={this.props.title}/>
             }else {
                 return <AuthenticationCondition title="证书介绍" description={this.props.data.cert_intro} type="1"/>
             }
         })()}

          {(()=>{
              if(this.props.type=="ihma"){
                  return <AuthenticationCondition title="证书申请条件" description={this.props.data.apply_condition}/>
              }
          })()}
          {(()=>{
          if(this.props.data.earning){
            return <LearningTarget target={this.props.data.earning}/>
          }
          if(this.props.data.learn_income){
            return <LearningTarget target={this.props.data.learn_income}/>
          }
         })()}
         {(()=>{
           if(this.props.not300 == "yes"){
               return <StudentEvaluation total_num={this.props.comments.total_num} data={this.props.comments.total_num>0?this.props.comments.list[0]:[]} callbackParent={this.GetTableSelected.bind(this)}/>
           }
         })()}
         {/* {(()=>{
           if(this.props.type == "ihma"){
               return <StudentEvaluation total_num={this.props.comments.total_num} data={this.props.comments.total_num>0?this.props.comments.list[0]:[]} callbackParent={this.GetTableSelected.bind(this)}/>
           }
         })()} */}
         {(()=>{
           if(this.props.type == "ihma"){
               return <Link to="/ihma">
                   <div className={styles.lookmore}>
                       <span>查看更多证书</span>
                       <span className={styles.icon}>&#xe60e;</span>
                   </div>
               </Link>
           }
         })()}
         {(()=>{
           if(this.props.type == "单门课程")
           {
              if(this.props.data.teacher_id && this.props.not300=="yes"){
                return <TutorIntroduce data={this.props.data} not300={this.props.not300}/>
              }
           }
         })()}
         {/* {(()=>{
           if(this.props.type == "专业证书"){
             return <Certificate img={this.props.data.cert_pic} callbackParent={this.AmplifyImg.bind(this)}/>
           }
         })()} */}
         {(()=>{
             var title = "";
             if(this.props.data.title){
                 title  = this.props.data.title+',每天学习一小时，成就月入过万梦想';
             }else {
                 title  = this.props.data.name+',每天学习一小时，成就月入过万梦想';
             }
           if(this.state.share_box){
             return <div className={styles.float_share}>
                <Share callbackParent={this.Shared.bind(this)} title={title} pic={this.props.data.thumb}/>
             </div>
           }
         })()}
         {(()=>{
           if(this.state.amplify_img){
             return <AmplifyImg_Box callbackParent={this.Received.bind(this)} img={this.props.data.cert_pic}/>
           }
         })()}
   </div>
  )
}
}
