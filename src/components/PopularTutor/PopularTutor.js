/**
 * Created by zhaolong on 2016/6/22.
 * File description:人气导师
 */

'use strict';
import React,{Component} from 'react';
const styles = require('./PopularTutor.scss');
import {Link} from 'react-router';

export default class PopularTutor extends Component {
  render(){
    return(
      <div className={styles.container}>
        <div className={styles.top_title}>
          <span className={styles.title}>人气导师</span>
          <div className={styles.more}>
            <Link to="/neixun" className={styles.more_text}  onClick="ga('send','event','gdrqdaoshi','sy','yketang')">更多人气导师</Link>
            <Link to="/neixun" className={styles.more_symbol}>&#xe619;</Link>
          </div>
        </div>
        <div className={styles.top_pic}>
          {this.props.data.map(function(value,index){
            if(0 == index)
            {
              return <div key={'this.props.data' + index} className={styles.tutor_box}>
                  <Link to={'/neixun/'+value.user_id}>
                  <img className={styles.top_img} src={value.thumb}>
                  </img>
                  </Link>
                {(()=>{
                  if(value.is_reserve == 1)
                  {
                    return <div  className={styles.canappointment}>可预约</div>
                  }
                })()}

                <Link to={'/neixun/'+value.user_id}>
                <div className={styles.tutor_info}>
                  <div className={styles.name}>
                    <div className={styles.names}>{value.name}</div>
                    <div className={styles.line}></div>
                  </div>

                  {(()=>{
                    var title = value.handle;
                    var pos1 = title.indexOf(',');
                    var han1 = title.substring(0,pos1);

                    var title2 = title.substring(pos1+1,title.length);
                    var pos2 = title2.indexOf(',');
                    var han2 = title2.substring(0,pos2);

                    var title3 = title2.substring(pos2+1,title.length);
                    var pos3 = title3.indexOf(',');
                    var han3 = title3.substring(0,pos3);

                    return <div>
                      <div className={styles.title}>{han1}</div>
                      <div className={styles.title}>{han2}</div>
                      <div className={styles.title}>{han3}</div>
                    </div>
                  })()}

                  <div className={styles.line}></div>
                  {/* <div className={styles.specialty}>
                    <span className={styles.num}>{value.apply_num} </span>
                    <span>次预约</span>
                  </div> */}
                  <div className={styles.specialty}>
                    <span className={styles.num}>{value.course_cum} </span>
                    <span>门精品课程</span>
                  </div>
                </div>
              </Link>

              </div>


            }
          })}


        </div>

        <div className={styles.certificates}>

          {this.props.data.map(function(value,index){
            if(index>0){
              return  <div className={styles.nav} key={'this.props.data' + index}>
                <Link to={'/neixun/'+value.user_id}>
                  <div>
                  <img src={value.thumb} className={styles.img}/>
                  </div>

                  <div className={styles.info}>
                    <span className={styles.name}>{value.name}</span>
                    <span className={styles.appointment}>次预约</span>
                    <span className={styles.num}>{value.apply_num}</span>
                  </div>
                </Link>
              </div>
            }

          })}


        </div>

      </div>
    )
  }

}
