/**
 * Created by zhaolong on 2016/6/21.
 * File description:职业考证
 */
'use strict';
import React,{Component} from 'react';
const styles = require('./ProfessionalCertificate.scss');
import {Link} from 'react-router';

export default class ProfessionalCertificate extends Component {
    //页面跳转+ga统计代码
    MoreProfessional(){
      window.location.href='https://m.9first.com/ihma';
      ga('send','event','gdihma','sy','yketang');
    }
  render(){
    return(
      <div className={styles.container}>
        <div className={styles.top_title}>
          <span className={styles.title}>职业考证</span>
          <div className={styles.more}>
            <Link to='/ihma' className={styles.more_text}>更多职业考证</Link>
            <Link to='/ihma' className={styles.more_symbol}>&#xe619;</Link>
          </div>
        </div>

        <div className={styles.certificates}>
          {this.props.data.map(function(value,index){
            return  <div className={styles.nav} key={'all_plates' + index}>
            <Link to={'/ihmaDetail/'+value.id}>
              <div>
                <img src={value.thumb} className={styles.img}/>
              </div>
              <div className={styles.name}>{value.name}</div>
           </Link>
            </div>
          })}
        </div>

        </div>
    )
  }

}
