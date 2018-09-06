/**
 * Created by same on 2016/10/20.
 * File description:课程详情页面
 */
'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {courseDetail} from 'redux/modules/excellentcourse';
import {Header,Introduction,Float_Bottom,Login_Box,Warning,ApplyLms} from 'components';
import {push} from 'react-router-redux';
const styles = require('./Course.scss');

@connect(
  state => ({
    detail:state.excellentcourse.detail
  }),
  {courseDetail,push}
)
export default class Detail extends React.Component{
  static propTypes = {
      detail: PropTypes.object,
      courseDetail: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired
  }
  state={
    btnText:"免费学习",
    login_box:false,
    msg:'',
    tips_box:false,
    show_menu:false,
    autoplay:false,
    buyed:false,
    me_star:0
  };
  componentWillReceiveProps(nextProps){
      this.setState({tips_box:false});
  }
  componentWillMount(){
    const params={
      id:this.props.params.id
    }
    this.props.courseDetail(params);
  }
  ClickedClassification(index){
      this.setState({tips_box:false});
  }
  //判断用户是否登录
  Signup(bflag,str){
    this.setState({tips_box:false});
    if(bflag){
      if("signup" == str){
        //弹出灰化层
        let mask=document.getElementById('mask');
        mask.style.display="block";
      }
      if("free" == str){
        this.setState({btnText:"开始学习"});
        this.setState({buyed:true});
      }
    }
    else
    {
      //弹出灰化层
      let mask=document.getElementById('mask');
      mask.style.display="block";
      //弹出登录框
      this.setState({login_box:true});
    }
  }


  //判断用户登录选择是or否
  UserIsSeclectedLogin(){
      let mask=document.getElementById('mask');
      mask.style.display="none";
      this.setState({login_box:false});
  }


  render(){
    const {detail}=this.props;
    return(
        <div className={styles.container}>
        <Helmet title="课程详情"/>
        <Header title="课程详情"/>
        {detail &&
        <div>
          <div className={styles.linecoursedetail}>
            <div className={styles.top_pic}>
                <img className={styles.img} src={detail.thumb}/>
            </div>
            <Introduction data={detail} not300="no" callbackParent={this.ClickedClassification.bind(this)} title="课程概述" type="单门课程"/>
          </div>
          {/* {(()=>{
              return  <div className={styles.float_bottom}>
                <Float_Bottom callbackParent={this.Signup.bind(this)} is_favorite={detail.is_favorite} btnText="敬请期待" id={this.props.params.id} type2="2"/>
                </div>
          })()} */}
          </div>
        }

          <div className={styles.float_bottom}>
            <ApplyLms  btnText="敬请期待"/>
          </div>

        {(()=>{
          if(this.state.login_box){
            return <Login_Box callbackParent={this.UserIsSeclectedLogin.bind(this)}/>
          }
        })()}

        {(()=>{
          if(this.state.tips_box){
            return  <Warning visible="true" msg={this.state.msg}/>
          }
        })()}
        </div>
    )
  }

}
