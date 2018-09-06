/**
 * Created by zhaolong on 2016/7/23.
  File description:个人中心-我的专业证书
 */

'use strict';
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {ExcellentPackage,Header,NoContent} from 'components';
import {isLoaded, load as loadExcellentpackage} from 'redux/modules/excellentpackage';
import { asyncConnect } from 'redux-async-connect';
import { push } from 'react-router-redux';
const styles = require('../User.scss');

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadExcellentpackage());
    }
  }
}])

@connect(
  state => ({
    user:state.auth.user,
    excellentpackage: state.excellentpackage.data
  }),{push}
)


export default class MyExcellentPackage extends Component {
  static propTypes = {
      user:PropTypes.object,
      excellentpackage: PropTypes.array,
      push:PropTypes.func.isRequired
  }

  componentDidMount(){
      if(this.props.user && this.props.user.user_ticket){
      }else {
          this.props.push("/login");
      }
  }
  	render(){
      const {excellentpackage} = this.props;
      if(excellentpackage && excellentpackage.status == 0){
        this.props.push("/login");
      }
		  return (
  			   <div>
             <Helmet title="我的专业证书"/>
             <Header title="我的专业证书" back="/user" line="1"/>
             {excellentpackage && excellentpackage.data &&
               <div className={styles.course}>
                 {(()=>{
                   if(excellentpackage.data.length == 0)
                   {
                     return <NoContent text="您还没有专业证书哦，快去查看学习哟！"/>
                   }else{
                    return <ExcellentPackage data={excellentpackage.data}/>
                   }
                 })()}
               </div>
             }
  		    </div>
  		)
  	}
}
