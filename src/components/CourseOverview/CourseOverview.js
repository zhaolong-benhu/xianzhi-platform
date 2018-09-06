/**
 * Created by zhaolong on 2016/6/28.
 * File description:课程概述
 */
import React,{Component} from 'react';
import superagent from 'superagent';
import jsonp from '../../jsonp/jsonp';
import {classification_detail} from '../../api/common/Global';

const styles = require('./CourseOverview.scss');


export default class CourseOverview extends Component{

  state={
    title:"课程概述",
    isShowAll:false,
    tips:"点击展开更多",
    description:""
  }
  //控制文本显示内容多少
  ShowAllinfo(){
    this.setState({isShowAll:!this.state.isShowAll});
    if(this.state.isShowAll){
      this.setState({tips:"点击展开更多"})
    }
    else{
      this.setState({tips:"点击向上收起"})
    }
  }
//转译HTML代码
  HTMLEnCode(str)
  {
    let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
  }
  render(){
    return(
      <div className={this.props.type == "activity" ? styles.container2 : this.props.type == "teacher" ? styles.container3 : styles.container}>
        {(()=>{
          if(this.props.type != "teacher"){
            return <div className={styles.line}></div>
          }
        })()}
        {(()=>{
          if(this.props.type != "teacher"){
            return <div className={styles.title}>
              <span>{this.props.title}</span>
            </div>
          }
        })()}

        <div className={this.props.type == "activity" ? styles.overview:this.state.isShowAll ? styles.overview : styles.overview2}>
          {(()=>{
            if(this.props.description){
              var description = this.HTMLEnCode(this.props.description);
              return <p className={styles.description} dangerouslySetInnerHTML={{__html: description}}></p>
            }
          })()}
        </div>

        {(()=> {
          if(this.props.description && this.props.type!="activity"){
            if(this.props.description.length <= 68)
            {
              return <div></div>
            }
            else
            {
              return  <div className={styles.tips} onClick={this.ShowAllinfo.bind(this)}>
                <span>{this.state.tips}</span>
                {(()=>{
                  if(this.state.isShowAll){
                    return <span className={styles.down}>&#xe61c;</span>
                  }
                  else{
                    return <span className={styles.down}>&#xe61d;</span>
                  }
                })()}
              </div>
            }
          }
        })()}
      </div>
    )
  }
}
