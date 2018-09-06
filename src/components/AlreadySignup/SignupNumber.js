/**
 * Created by zhaolong on 2016/6/28.
 * File description:已报名全部用户
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import {Header} from 'components';
const styles = require('./SignupNumber.scss');
import superagent from 'superagent';
import jsonp from '../../jsonp/jsonp';
import {alreadsignup} from '../../api/common/Global';
import {imageUrl} from '../../api/common/Global';

export default class SignupNumber extends Component {

  state={
    all_user:[]
  }

  constructor(props){
      super(props);
      this.back = null;
  }
  //半匿名用户名
  ProtectedUserName(index){
    var result;
    result = value.user_name.substring(0,2);
    return result;
  }

  componentDidMount() {
    var url_suffex = '?id='+this.props.params.id+'&format=jsonp';
    superagent.get(alreadsignup+url_suffex).use(jsonp).query({callbackParam:'callback'}).end(function(err,res){
      if(!err)
      {
          let result = res.body.data;
          this.setState({all_user: result});
      }
    }.bind(this))
    if(localStorage.oldbackUrl && localStorage.oldbackUrl){
      this.back=localStorage.backUrl!=localStorage.oldbackUrl ? localStorage.oldbackUrl :'/';
    }
  }
  render(){
    var titile = "已报名("+this.state.all_user.length+"人)";
    return(
      <div className={styles.sign_number}>
        <Helmet title="已报名"/>
        <Header title={titile} back={this.back}/>
        <div className={styles.seperator}></div>
        {this.state.all_user.map(function (value,index) {
          return <div className={styles.users} key={'all_user'+index} >
            <div className={styles.nav}>
              <img className={styles.img} src={value.thumb==""?imageUrl+'/images/user/head.jpg':value.thumb}/>
            </div>
           <span className={styles.name}>{value.name}</span>
          </div>
        }.bind(this))}
      </div>
    )
  }
}
