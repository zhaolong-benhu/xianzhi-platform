/**
 * Created by zhaolong on 2016/10/10
 * File description:个人中心-导师上传课程列表
 */

'use strict';
import React,{Component} from 'react';
import {Link} from 'react-router';
const styles = require('./TeacherCourseList.scss');

export default class TeacherCourseList extends Component {
  render(){
    return(
      <div className={styles.list}>
        {this.props.data.map(function(data,index){
          return <Link to={'/kecheng/'+data.id} activeClassName="active" key={'data'+index}>
                    <li key={'data' + index}>
                      <div className={styles.pic}>
                        <img src={data.thumb}/>
                      </div>

                      <div className={styles.info}>
                        <div>
                          <span className={styles.title}>{data.title}</span>
                        </div>

                        <div className={styles.people}>上传日期：{data.add_time}</div>

                        {(()=>{
                          if(data.real_price == "0.00")
                          {
                            return <div className={styles.combination}>免费</div>
                          }
                          else{
                            return<div className={styles.combination}>
                              <span className={styles.sellingprice}>售价：</span>
                              <span>¥{data.real_price}</span>
                              <span className={styles.sellingprice2}>人购买</span>
                              <span className={styles.buy_num}>{data.buy_num}</span>
                            </div>
                          }
                        })()}
                      </div>
                    </li>
            </Link>
        })}
      </div>

    )
  }
}
