/**
 * Created by zhaolong on 2016/6/29.
 * File description:导师内训
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Star} from 'components';
import { Link} from 'react-router';
const styles = require('./Tutor.scss');

export default class Tutor extends Component {
  render(){
    var search = this.props.search;
    var search_len = 0;
    if(search){
         search_len = search.length;
    }
    return(
      <div>
        <ol className={this.props.type=="我的关注"?styles.follow:styles.list}>
          {
            this.props.data.map(function(data,index) {
              return(
              <Link to={'/neixun/' + data.id} activeClassName="active">
                <li key={'data' + index}>
                  <div className={styles.pic}>
                    <img src={data.thumb==""?'/images/course_defaultbg.jpg':data.thumb}/>
                  </div>

                        <div className={styles.info}>
                          <div>
                            {(()=>{
                              var name = data.name;
                              if(name && name.length>6){
                                name = name.substr(0,6)+"...";
                              }
                              if(search_len>0){
                               return <span className={styles.title}  dangerouslySetInnerHTML={{__html: name.replace(search,'<font color=red>'+search+'</font>')}}></span>
                              }
                              else {
                                return <span className={styles.title}>{name}</span>
                              }
                            })()}
                            <div className={styles.all_star}>
                              <Star num={data.star}/>
                            </div>
                          </div>
                          <div>
                              <span className={styles.name}>{data.description}</span>
                          </div>



                          <div className={styles.combination}>
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
