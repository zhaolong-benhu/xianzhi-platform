/**
 * Created by zhaolong on 2016/8/10.
 * File description:专业证书
 */
'use strict';
import React from 'react';
import {Link} from 'react-router';
const styles = require('./Common.scss');

export default class CoursePackage extends React.Component{

  render(){
    var search = this.props.search;
    var search_len = 0;
    if(search){
         search_len = search.length;
    }
    return(
      <div className={styles.course}>
        <ol className={this.props.type=="我的关注"?styles.follow:styles.list}>
          {
            this.props.data.map(function(data,i) {
              return(
                <Link to={'/kechengbao/'+data.id} activeClassName="active" key={"data"+i}>
                  <li key={'data'+ i}>
                    <div className={styles.pic}>
                      <img src={data.thumb==""?'/images/course_defaultbg.jpg':data.thumb}/>
                    </div>

                    <div className={styles.info}>
                      <div className={styles.head}>
                          <span className={styles.label}>证书</span>
                          {(()=>{
                              if(search_len>0){
                                return <span className={styles.title}  dangerouslySetInnerHTML={{__html: data.title.replace(search,'<font color=red>'+search+'</font>')}}></span>
                              }else {
                                return <span className={styles.title}>{data.title}</span>
                              }
                          })()}
                      </div>
                      <div>
                          <span className={styles.course_count}>共 {data.count} 门课程</span>
                          <span className={styles.seperator}>|</span>
                          <span className={styles.study_num}>{data.apply_num || data.study_num}人学过</span>
                      </div>

                      {(()=>{
                        if(data.real_price == "0.00"){
                          return <div>
                            <span className={styles.free}>免费</span>
                          </div>
                        }
                        else
                        {
                          if(data.real_price == data.price){
                            return <div>
                              <span className={styles.real_price}>¥{data.real_price}</span>
                            </div>
                          }
                          else {
                            return  <div>
                                <span className={styles.real_price}>¥{data.real_price}</span>
                              </div>
                          }
                        }
                      })()}


                    </div>
                  </li>
                </Link>
              )
            }.bind(this))
          }
        </ol>
      </div>
    )

  }

}
