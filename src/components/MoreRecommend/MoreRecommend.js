/**
 * Created by zhaolong on 2016/6/29.
 * File description:更多推荐
 */
import React ,{ Component } from 'react';
import {Link} from "react-router";
const styles = require('./MoreRecommend.scss');
import superagent from 'superagent';
import jsonp from '../../jsonp/jsonp';
import {openclass_morerecommend} from '../../api/common/Global';

export default class MoreRecommend extends Component {

  state = {
    title:"更多推荐",
    data:[],
  };
  componentDidMount(){
    //得到父级传递过来的数据并更新state
    this.setState({data:this.props.data});
  }
  render(){

    return(
      <div className={styles.container}>
        <div className={styles.line}></div>
        <div className={styles.title}>
          <span>{this.state.title}</span>
        </div>

        <div className={styles.empty}></div>
        {this.state.data.map(function(data,index){
          return<li key={'data' + index}>
                  <div className={styles.pic}>
                    <Link to="/Detail" activeClassName="active">
                      <img src={data.thumb}/>
                    </Link>
                  </div>
                  <div className={styles.info} key={'data' + index}>
                    <div>
                      <span className={styles.title2}>{data.title}</span>
                    </div>
                    <div>
                      <span className={styles.name}>{data.teacher_name}</span>
                      <span className={styles.time}>{data.start_time}</span>
                      <span>{data.city}</span>
                    </div>
                    <div>
                      <div className={styles.price}>￥{data.real_price}</div>
                      <span className={styles.sale}>￥{data.price}</span>
                      <span className={styles.discount}>{data.discount}</span>
                      <span className={styles.fr}>{data.apply_num}人报名</span>
                    </div>
                    {(()=>{
                      if(index == 0){
                      return <div className={styles.seperator}></div>
                    }
                    })()}
                  </div>
           </li>
        }.bind(this))}


      </div>
    )
  }
}
