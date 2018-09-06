/**
 * Created by zhaolong on 2016/8/5.
 * File description:我的智库
 */
 'use strict';
 import React from 'react';
 import Helmet from 'react-helmet';
 import { Link} from 'react-router';
 import {Header,CourseList} from 'components';
 import {imageUrl} from '../../../api/common/Global';
 const styles = require('./ThinkTank.scss');

 export default class ThinkTank extends React.Component{

   render(){
     var search = this.props.search;
     var search_len = 0;
     if(search){
          search_len = search.length;
     }
    return(
        <div className={styles.thinktank}>
          <ol className={this.props.type=="我的关注" ? styles.follow:styles.list}>
          {(()=>{
              return(
                  <div>
                    {this.props.data.map(function(data,i) {
                      return(
                            <Link to={'/papers/'+data.id} key={"data"+i} activeClassName="active">
                            <li key={'list'+ i}>
                              <div className={styles.pic}>
                                <img src={imageUrl+"/images/icon/icon_"+data.extension+".png"}/>
                              </div>

                              <div className={styles.info}>
                                <div className={styles.title}>
                                  {(()=>{
                                    if(search_len>0){
                                      return <span className={styles.title}  dangerouslySetInnerHTML={{__html: data.title.replace(search,'<font color=red>'+search+'</font>')}}></span>
                                    }
                                    else{
                                      return <span className={styles.title}>{data.title}</span>
                                    }
                                  })()}
                                </div>
                                <div>
                                  <span className={styles.count}>{data.view_count}人阅读</span>
                                  <span className={styles.seperator}>|</span>
                                  <span className={styles.name}>上传时间: {data.add_time}</span>
                                </div>

                              </div>
                            </li>
                           </Link>
                        )
                      }.bind(this))
                    }
                  </div>
                )
              })()}
          </ol>
        </div>
    )
   }
 }
