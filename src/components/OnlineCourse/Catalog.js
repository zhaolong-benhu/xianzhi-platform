/**
 * Created by zhaolong on 2016/8/10.
 * File description:在现课程目录
 */
'use strict';
import React from 'react';
import {Link} from 'react-router';
const styles = require('./Catalog.scss');

export default class Catalog extends React.Component{
    //播放视频
    PlayMp4(real_price,mp4_url){
      if("0.00" == real_price){
        this.props.callbackParent("free",mp4_url);
      }else {
        if(this.props.is_buy == 0){
          this.props.callbackParent("needbuy",mp4_url);
        }
      }
    }
    render(){
      var real_price = this.props.real_price;
      return(
          <div>
            {this.props.data.map(function(value,index){
              return <div>
                      <div className={styles.maintitle}>
                        {value.title}
                      </div>
                      {value.child.map(function(v,i){
                        return <div className={"0.00" == real_price? styles.title:styles.notstudy} onClick={this.PlayMp4.bind(this,real_price,v.mp4_url)}>
                        <span>{v.title}</span>
                        {(()=>{
                          var time = v.video_duration;
                          var ConversionTime = "";
                          var min = time/60;
                          var minute = Math.floor(min);
                          var second = 0;
                          if(minute<=9){
                            minute = '0'+minute;
                            second = v.video_duration-minute*60;
                            if(second>0 && second<9){
                              second = '0'+second;
                            }
                            if(second == 0){
                              second = "00";
                            }
                            ConversionTime = minute+':'+second;
                            return   <span className={styles.whenlong}>{ConversionTime}</span>
                          }
                          else {
                            second = v.video_duration-minute*60;
                            if(second>0 && second<9){
                              second = '0'+second;
                            }
                            if(second == 0){
                              second = "00";
                            }
                            ConversionTime = minute+':'+second;
                            return   <span className={styles.whenlong}>{ConversionTime}</span>
                          }

                        })()}

                        </div>
                      }.bind(this))}

              </div>
            }.bind(this))}
          </div>
      )
    }

}
