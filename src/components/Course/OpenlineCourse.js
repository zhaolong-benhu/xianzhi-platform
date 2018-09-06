/**
 * Created by zhaolong on 2016/7/6.
 * File description:线下公开课
 */
import React,{Component} from 'react';
const styles = require('./Common.scss');
import {Link} from 'react-router';

export default class OnlineCourse extends Component {
  render(){
    return(
      <div className={styles.container}>

        <div className={styles.top_title}>
          <span className={styles.title}>{this.props.ModuleName}</span>
          <div className={styles.more}>
            <Link to={this.props.Link} onClick={this.props.statistics} className={styles.more_text}>更多{this.props.ModuleName}</Link>
            <Link to={this.props.Link} onClick={this.props.statistics} className={styles.more_symbol}>&#xe619;</Link>
          </div>
        </div>

        {this.props.data.open_course.map(function (value,index) {
          if(0 == index){
            return <div>
              <Link to={'/gongkaike/'+value.id}>
                  <div className={styles.content} key={'this.props.data'+index}>
                      <img className={styles.top_img} src={value.thumb}/>
                  </div>
              </Link>
            </div>
          }
        })}

        <div className={styles.details}>
          {this.props.data.open_course.map(function (value,index) {
            if(index>0){
              return <div className={styles.detail} key={value.id}>
                <div className={styles.bottom_price}>
                  <Link to={'/gongkaike/'+value.id} activeClassName="active"><img className={styles.top_img2} src={value.thumb}/></Link>
                  <div className={styles.content_title}>{value.title}</div>
                  <div className={styles.start_time}>{value.start_time}</div>
                  <span className={styles.price_text1}>￥{value.real_price}</span>
                </div>
              </div>
            }
          })}
        </div>
      </div>
    )
  }
}
