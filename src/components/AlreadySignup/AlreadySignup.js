/**
 * Created by zhaolong on 2016/6/27
 * File description:已报名用户
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router';
import superagent from 'superagent';
import jsonp from '../../jsonp/jsonp';
import {alreadsignup} from '../../api/common/Global';
import {imageUrl} from '../../api/common/Global';
const styles = require('./AlreadySignup.scss');

export default class AlreadySignup extends Component {

  state = {
      title:"已报名",
      num:"0",
      data:[]
  };

  componentDidMount(){
    var url_suffex = '?id='+this.props.id+'&format=jsonp';
    superagent.get(alreadsignup+url_suffex).use(jsonp).query({callbackParam:'callback'}).end(function(err,res){
      if(!err)
      {
        let result = res.body.data;
        if(result.length>0) {
          this.setState({data: result});
        }
      }
    }.bind(this))
  }

  render(){
      var strNum = "(" +this.state.data.length +  "人)";
      var already_num = this.state.data.length;
    return(
      <div className={styles.container}>
          <div className={styles.line}></div>
          <div className={styles.title}>
              <span>{this.state.title}</span>
              <span className={styles.num}>{strNum}</span>
          </div>

            <div className={styles.user_profile}>
              {this.state.data.map(function(value,index){
                if(index<=5){
                  return <div className={styles.pic} key={'data'+index}>
                    <img className={styles.img} src={value.thumb==""?imageUrl+'/images/user/head.jpg':value.thumb}/>
                   <div className={styles.name}>{value.name}</div>
                  </div>
                }
              })}
              {(()=>{
                if(already_num>6) {
                  return <Link to={'/SignupNumber/'+this.props.id} activeClassName="active">
                    <span className={styles.more}>&#xe60e;</span>
                  </Link>
                }
              })()}
            </div>

      </div>
    )
  }

}
