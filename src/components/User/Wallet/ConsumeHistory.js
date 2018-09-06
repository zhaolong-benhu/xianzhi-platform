/**
 * Created by same on 2016/8/5.
 * File description:用户消费记录
 */
'use strict';
import React from 'react';
const styles = require('./ConsumeHistory.scss');


export default class ConsumeHistory extends React.Component{
  state={
    NoData:false,
  }
  
  render(){
    var type = this.props.type;
    return(
        <div className={styles.container}>
            <div className={this.props.index==1?styles.hidetitle:styles.title}>{this.props.month}</div>
            {(()=>{
              if(0 == this.props.data.length){
                  return <div className={styles.nodata}>暂无数据</div>
              }
              else {
                return <div className={styles.list}>
                  {this.props.data.map(function(value,index){
                    return   <div className={styles.record} key={'data'+index}>
                        <div className={styles.detail}>
                            <div className={styles.date}>
                              <div className={styles.week}>{value.week}</div>
                              <div className={styles.week}>{value.add_time}</div>
                            </div>
                            <div className={styles.history}>
                              {(()=>{
                                if(value.user_money.substr(0,1) == "-"){
                                  return <div className={styles.plus}>{value.user_money}</div>
                                }
                                else {
                                  if(type == "carrymoney"){
                                  return <div className={styles.reduce}>{value.user_money}</div>
                                  }
                                  else {
                                  return <div className={styles.reduce}>+{value.user_money}</div>
                                  }
                                }
                              })()}
                              <div className={styles.foodname}>{value.change_desc}</div>
                            </div>
                        </div>
                      </div>
                  })}
                </div>

              }
            })()}

        </div>

    )
  }

}
