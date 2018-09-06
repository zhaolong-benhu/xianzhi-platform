/**
 * Created by zhaolong on 2016/6/30.
 * File description:导师在线课程
 */
import React,{Component} from 'react';
import {Link} from 'react-router';
const styles = require('./TutorLineCourse.scss');

export default class TutorLineCourse extends Component{

  render(){
    return(
      <div className={styles.container}>

        <ol className={styles.list}>
          {
            this.props.data.map(function(data,index) {
              return(
              <Link to={'/kecheng/'+data.id} activeClassName="active">
                <li key={'data' + index}>
                  <div className={styles.pic}>
                    <img src={data.thumb}/>
                  </div>

                  <div className={styles.info}>
                    <div>
                      <span className={styles.title}>{data.title}</span>
                    </div>

                    <div className={styles.people}>{data.study_num}人学过</div>

                    {(()=>{
                      if(data.real_price == "0.00")
                      {
                        return <div className={styles.combination}>免费</div>
                      }
                      else{
                        return<div className={styles.combination}>
                          ¥{data.real_price}
                        </div>
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
