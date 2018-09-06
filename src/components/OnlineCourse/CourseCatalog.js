/**
 * Created by zhaolong on 2016/8/10.
 * File description:单门课程
 */
'use strict';
import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {Header} from 'components';
import {imageUrl} from '../../api/common/Global';
const styles = require('./Common.scss');


export default class CourseCatalog extends React.Component{
  render(){
    return(
      <div className={styles.course}>
        <ol className={this.props.type=="我的关注"?styles.follow:styles.list}>
          {
            this.props.data.map(function(data,i) {
              return(
                 <Link to={data.m_status==1?'/kecheng/'+data.id:'/detail/'+data.id} activeClassName="active" key={'data'+i}>
                  <li key={'data'+ i}>
                    <div className={styles.pic}>
                        <img src={data.thumb != "" ? data.thumb : "/images/course_defaultbg.jpg"}/>
                    </div>

                    <div className={styles.info}>
                      <div>
                        <span className={styles.name}>{data.title}</span>
                      </div>
                      <div>
                          <span className={styles.study_num}>时长：{data.hours}分钟</span>
                      </div>
                      <div>
                          <span className={styles.study_num}></span>
                      </div>

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
