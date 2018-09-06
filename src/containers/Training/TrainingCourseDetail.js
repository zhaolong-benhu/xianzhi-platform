/**
 * Created by zhaolong on 2016/6/30.
 * File description:导师内训课程(在线课程)详情
 */
import React,{Component} from 'react';
import {Header,TrainingDetail} from 'components';
import Helmet from 'react-helmet';

export default class TrainingCourseDetail extends Component {

constructor(props){
  super(props);
  this.back = null;
}
componentDidMount()
{
  if(localStorage.oldbackUrl && localStorage.oldbackUrl){
    this.back=localStorage.backUrl!=localStorage.oldbackUrl ? localStorage.oldbackUrl :'/';
  }
}
render(){
  var divStyle = {
    paddingTop: '60px'
  };
  return(
    <div>
      {/* <Helmet title="内训详情"/>
      <Header title="内训详情" back={this.back}/> */}
      <div style={divStyle}>
          <TrainingDetail id={this.props.params.id}/>
      </div>
    </div>
  )
}

}
