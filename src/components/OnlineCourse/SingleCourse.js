/**
 * Created by zhaolong on 2016/8/10.
 * File description:单门课程
 */
'use strict';
import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {Header} from 'components';
const styles = require('./Common.scss');


export default class SingleCourse extends React.Component{
  state={
  }

  componentDidMount(){

  }
  //创建标记
  createMarkup() {
    return {__html: 'First &middot; Second'};
  }
  //转译HTML代码
  HTMLEnCode(str)
  {
    let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
  }
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
                 <Link to={'/kecheng/'+data.id} activeClassName="active" key={'data'+i}>
                  <li key={'data'+ i}>
                    <div className={styles.pic}>
                        <img src={data.thumb==""?'/images/course_defaultbg.jpg':data.thumb}/>
                    </div>

                    <div className={styles.info}>
                      <div>
                          {(()=>{
                              if(search_len>0){
                                return <span className={styles.title2} dangerouslySetInnerHTML={{__html: data.title.replace(search,'<font color=red>'+search+'</font>')}}></span>
                              }else {
                                return <span className={styles.title2}>{data.title}</span>
                              }
                          })()}
                      </div>
                      <div>
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
