/**
 * Created by zhaolong on 2016/6/30.
 * File description:导师内训课程
 */
import React,{Component} from 'react';

import {Link} from 'react-router';
const styles = require('./TutorTrainingCourse.scss');


export default class TutorTrainingCourse extends Component{

  state={
    lookall:"查看全部",
    data:[],
    isnull:false,
  };

  render(){
    var id = this.props.id;
    var search = this.props.search;
    var search_len = 0;
    if(search){
         search_len = search.length;
    }
    return(
      <div className={styles.container}>
        {(()=>{
            return <div>
              <ol className={this.props.type=="我的关注"?styles.follow:styles.list}>
                {
                  this.props.data.map(function(data,index) {
                    return(
                    <Link to={'/TrainingDetail/'+data.id} activeClassName="active" key={index}>
                      <li key={'data' + index}>
                        <div className={styles.pic}>
                        <img src={data.thumb}/>
                        </div>
                        <div className={styles.info}>
                          <div>
                          {(()=>{
                            if(search_len>0){
                              return <span className={styles.title}  dangerouslySetInnerHTML={{__html: data.title.replace(search,'<font color=red>'+search+'</font>')}}></span>
                            }
                            else {
                              return <span className={styles.title}>{data.title}</span>
                            }
                          })()}
                          </div>

                          <div className={styles.combination}>
                            已累计内训{data.apply_num}家企业
                          </div>
                        </div>
                      </li>
                      </Link>
                    )
                  }.bind(this))
                }
              </ol>
            </div>

        })()}

      </div>
    )
  }
}
