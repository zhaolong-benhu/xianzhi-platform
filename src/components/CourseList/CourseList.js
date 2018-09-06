/**
 * Created by same on 2016/6/23.
 * File description:线下公开课列表
 */

'use strict';
import React,{Component} from 'react';
const styles = require('./CourseList.scss');
import { Link} from 'react-router';
import {Header} from 'components';
import Helmet from 'react-helmet';
import { is } from 'immutable';
import {imageUrl} from '../../api/common/Global';


export default class CourseList extends Component {

  state={
    classification:"",
    type:false,
    newsList:[{name:"aa"},{name:"bb"}],
  }
  constructor(props) {
      super(props);
      this.scroll = this.handleScroll.bind(this);
  }
  componentDidMount(){
    //添加滚动条事件
    window.addEventListener('scroll',this.scroll);
    this.setState({classification:this.props.classification});
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.scroll);
  }
  //滚动条事件
  handleScroll(e){
    var sel = document.body.scrollTop;
    var height = screen.height;
  }
 //添加一条新数据
  addNews(news) {
    this.setState({newsList: this.state.newsList.concat(news)});
  }

  render(){
    var  active_type = this.props.active_type;
    var goto = "";
    if("activity" == this.props.classification){
      goto = "/huodong/";
    }
    else {
      goto = "/gongkaike/";
    }
    var search = this.props.search;
    var search_len = 0;
    if(search){
         search_len = search.length;
    }
    return(
      <div className={styles.course}>
        <ol className={this.props.type=="我的关注"?styles.follow:styles.list}>
          {this.props.data.map(function(data,i){
              return(
              <Link to={goto+data.id} activeClassName="active">
                     <li key={'this.props.data.list'+ i}>
                      <div className={styles.pic}>
                        <img src={data.thumb==""?'/images/course_defaultbg.jpg':data.thumb}/>
                      </div>
                      {(()=>{
                        switch(this.props.classification){
                          case "curriculum"://课程
                          {
                            return<div className={styles.info}>
                              {(()=>{
                                if(search_len>0){
                                  return <span className={styles.title} dangerouslySetInnerHTML={{__html: data.title.replace(search,'<font color=red>'+search+'</font>')}}></span>
                                }
                                else {
                                  return <span className={styles.title}>{data.title}</span>
                                }
                              })()}
                              <div>
                                <span className={styles.name}>{data.teacher_name}</span>
                                <span className={styles.time}>{data.start_time}</span>
                                <span className={styles.time}>{data.city_abbreviation}</span>
                              </div>
                              {(()=>{
                                if("0.00" == data.real_price){
                                  return <div>
                                      <span className={styles.price}>免费</span>
                                      <span className={styles.text}>人报名</span>
                                      <span className={styles.apply_num}>{data.apply_num}</span>
                                    </div>
                                }
                                else {
                                  if(data.price == data.real_price){
                                    return <div>
                                        <div className={styles.price}>¥{data.real_price}</div>
                                        <span className={styles.text}>人报名</span>
                                        <span className={styles.apply_num}>{data.apply_num}</span>
                                      </div>
                                  }
                                  if(data.price != data.real_price)
                                  {
                                    return <div>
                                      <div className={styles.price}>¥{data.real_price}</div>
                                      <span className={styles.text}>人报名</span>
                                      <span className={styles.apply_num}>{data.apply_num}</span>
                                    </div>
                                  }
                                }

                              })()}

                            </div>
                          }break;

                          case "activity"://活动
                          {
                            return <div className={styles.info}>
                                <div className={styles.typeandtitle}>
                                  {(()=>{
                                      switch (data.type)
                                      {
                                        case "13":
                                          return <span className={styles.type}>峰会</span>
                                        break;
                                        case "14":
                                          return <span className={styles.type2}>展会</span>
                                          break;
                                        case "15":
                                          return <span className={styles.type3}>沙龙</span>
                                          break;
                                        case "16":
                                          return <span className={styles.type4}>学习考察</span>
                                          break;
                                      }
                                  })()}

                                  {(()=>{
                                    if(search_len>0){
                                      return <span className={styles.activitytitle}  dangerouslySetInnerHTML={{__html: data.title.replace(search,'<font color=red>'+search+'</font>')}}></span>
                                    }
                                    else {
                                      return <span className={styles.activitytitle}>{data.title}</span>
                                    }
                                  })()}
                              </div>
                              <div>
                                <span className={styles.name}>{data.teacher_name}</span>
                                <span className={styles.time}>{data.start_time}</span>
                                <span className={styles.time}>{data.city_abbreviation}</span>
                              </div>
                              <div>
                                {(()=>{

                                  if("0.00" == data.real_price){
                                    return <div>
                                        <span className={styles.price}>免费</span>
                                        <span className={styles.fr}>{data.view_num}人感兴趣</span>
                                      </div>
                                  }
                                  if(data.price == data.real_price){
                                    return <div>
                                        <span className={styles.price}>￥{data.real_price}</span>
                                        <span className={styles.fr}>{data.view_num}人感兴趣</span>
                                      </div>
                                  }
                                  if(data.price != data.real_price)
                                  {
                                    return <div>
                                      <span className={styles.price}>￥{data.real_price}</span>
                                      <span className={styles.fr}>{data.view_num}人感兴趣</span>
                                    </div>
                                  }


                                })()}
                              </div>
                            </div>
                          }
                        }
                      })()}
                     </li>
              </Link>
              )
            }.bind(this))}
        </ol>
      </div>
    )
  }
}
