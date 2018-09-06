/**
 * Created by zhaolong on 2016/7/6.
 * File description:在线课程
 */
'use strict';
import React,{Component} from 'react';
import {Link} from 'react-router';
const styles = require('./Common.scss');

export default class OnlineCourse extends Component {

  render(){
    return(
      <div className={styles.container}>

        <div className={styles.top_title}>
          <span className={styles.title}>{this.props.ModuleName}</span>
          <div className={styles.more}>
            <Link to={this.props.Link}  className={styles.more_text}>更多{this.props.ModuleName}</Link>
            <Link to={this.props.Link}  className={styles.more_symbol}>&#xe619;</Link>
          </div>
        </div>

        {this.props.data.classroom.map(function (value,index) {
          if(0 == index){
            return  <div className={styles.content} key={'this.props.data.classroom'+index}>
            <Link to={'/kechengbao/'+value.id}>
              <img className={styles.top_img} src={value.thumb}/>
              <div className={styles.content_nums}>共{value.course_num}门课程</div>
              </Link>
            </div>
          }

        })}


        <div className={styles.details}>
          {this.props.data.course.map(function (value,index) {
              return <div className={styles.detail} key={'this.props.data.course' + index}>
                      <div className={styles.bottom_price}>
                      <Link to={'/kecheng/'+value.id}>
                        <img className={styles.top_img2} src={value.thumb}/>
                        <div className={styles.content_title}>{value.title}</div>
                        <div>
                          <div className={styles.content_free}>￥{value.real_price}</div>
                          <div className={styles.right_people}>
                            <span className={styles.content_peoplecount2}>{value.view_num}</span>
                            <span className={styles.content_people}>&#xe604;</span>
                          </div>
                        </div>
                      </Link>
                     </div>
              </div>
          })}
        </div>


      </div>
    )
  }
}
