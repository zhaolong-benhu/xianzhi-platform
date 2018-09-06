/**
 * Created by zhaolong on 2016/8195.
 * File description:个人中心-消息列表
 */
'use strict';
import React,{Component} from 'react';
import {Message,NoContent} from 'components';
const styles = require('./MessageList.scss');
var str = "";

export default class MessageList extends React.Component{
  state={
    pageNum:0,
    total_num:0,
    bLock:false,
    index:0,
    bMove:false
  }
    render(){
      return(
          <div>
                <div className={styles.list}>
                    {this.props.data.map(function(value,index){
                        return <div key={index}>
                                {(()=>{
                                  if(str != value.date){
                                    str = value.date;
                                    return <div className={styles.date}><span className={styles.date_detail}>{value.date}</span></div>
                                  }else {
                                    return <div className={styles.line}></div>
                                  }
                                })()}
                                {value.list.map(function(v,i){
                                  return  <Message data={v} key={i} index={i}/>
                                }.bind(this))}
                        </div>
                    }.bind(this))}

                  {(()=>{
                    if(0 == this.props.data.length){
                      return <NoContent text="  暂无消息内容"/>
                    }
                  })()}
                </div>


                {/* <div className={styles.wrapper}>
                    <div className={!this.state.bMove ?styles.container:styles.container2} id="zl">左右滑动
                        <div className={styles.delete} onClick={this.DeleteItem.bind(this)}>
                            <i className={styles.iconfon}></i>
                            删除
                        </div>
                    </div>
                </div> */}


         </div>
      )
    }
  }
