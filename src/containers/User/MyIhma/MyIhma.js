/**
 * Created by zhaolong on 2016/7/23.
  File description:个人中心-我的IHMA证书
 */

'use strict';
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Header,IhmaList,NoContent} from 'components';
import {isLoaded, load as loadihma} from 'redux/modules/ihma';
import {asyncConnect } from 'redux-async-connect';
import { push } from 'react-router-redux';
const styles = require('../User.scss');

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    // if (!isLoaded(getState())) {
      return dispatch(loadihma());
    // }
  }
}])

@connect(
  state => ({
    user:state.auth.user,
    ihma: state.ihma.data
  }),{push}
)

export default class MyIhma extends Component {
  static propTypes = {
      ihma: PropTypes.object,
      user:PropTypes.object,
      push:PropTypes.func.isRequired
  }
  state={
    screenHight:0,
    toleft:0,
    isdata:false,
  }
  constructor(props) {
    super(props);
}
componentDidMount(){
  var width = screen.width;
  var height = screen.height-30;
  this.setState({screenHight:height+"px"});
  this.setState({toleft:(width-35)/2+"px"});
  if(this.props.user && this.props.user.user_ticket){
  }else {
      this.props.push("/login");
  }
}
  	render(){
     const {ihma} = this.props;
     if(ihma && ihma.status == 0){
       this.props.push("/login");
     }
		  return (
  			   <div>
             <Helmet title="IHMA证书"/>
             <Header title="IHMA证书" back="/user" line="1"/>
              {ihma && ihma.data &&
                <div className={styles.course}>
                       {(()=>{
                         if(ihma.data.length == 0)
                         {
                           return <NoContent text="立刻去IHMA证书" type="ihma" goToIhmalist={()=> this.props.push("/ihma")}/>
                         }else{
                          return <IhmaList data={ihma.data} type='user'/>
                         }
                       })()}
                </div>
              }
  		    </div>
  		)
  	}
}
