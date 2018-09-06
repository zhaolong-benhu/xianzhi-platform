/**
 * Created by zhaolong on 2016/9/9
 * File description:我要赚钱扫码落脚页
 */

'use strict';
import React, { Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {UserRegister} from 'components';
import Helmet from 'react-helmet';
import {recommendUserInfo} from 'redux/modules/userInfo';
import {imageUrl} from '../../api/common/Global';
const styles = require('./Shared.scss');

@connect(
  state => ({
    user:state.userInfo.info,
  }),{recommendUserInfo}
)
export default class Shared extends Component{
    static propTypes = {
      user:PropTypes.object,
      recommendUserInfo:PropTypes.func.isRequired
    }
    state={
      bg:"/images/share.jpg",
      screenHight:"",
    };
    componentWillMount(){
      if(this.props.params.id){
        this.props.recommendUserInfo(this.props.params.id);
      }
    }
    componentDidMount(){
      var height = screen.height;
      this.setState({screenHight:height+"px"});
    }
  render(){
    const {user}=this.props;
    return(
      <div>
        <Helmet title="邀请您一起加入先之躺着赚钱吧"/>
        <div className={styles.shared} style={{height:this.state.screenHight,background:'url('+this.state.bg+') #fdfbef no-repeat',backgroundSize:"100%"}}>
          <div className={styles.sharedbox}>
            {user &&
              <div className={styles.user}>
                <span className={styles.name}>我是</span>
                <img className={styles.user_head} src={user.thumb || imageUrl+"/images/user/head.jpg"}/>
                <span className={styles.name2}>{user.user_name}</span>
              </div>
            }
              <div className={styles.tips}>邀请您一起加入先之躺着赚钱吧！</div>
              <UserRegister type="true" code={this.props.params.id}/>
          </div>
        </div>
      </div>
    )
  }
}
