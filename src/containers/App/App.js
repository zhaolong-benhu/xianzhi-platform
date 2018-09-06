/**
 * Created by same on 2016/6/12.
 * File description:项目框架
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';

import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import {Header} from 'components';
import ImmutableRenderMixin from 'react-immutable-render-mixin';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

   if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user,pathname:state.routing.locationBeforeTransitions.pathname}),
  {logout, pushState: push}
)
export default class App extends Component {
  mixins=[ImmutableRenderMixin];
  constructor(props){
    super(props)
  }
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    pathname:PropTypes.string.isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    type:0,
    isload:false,
    height:''
  };

  componentWillReceiveProps(nextProps) {
    this.handleMask(false);
    if(this.props.pathname!=nextProps.pathname){
      if(nextProps.pathname.indexOf('/login')==0 || nextProps.pathname.indexOf('/search')==0){
        return;
      }
      else{
        if(localStorage.backUrl){
          const backUrl=localStorage.backUrl;
          // console.log("url:",nextProps.pathname);
          if(localStorage.oldbackUrl && localStorage.oldbackUrl==nextProps.pathname){
            localStorage.setItem("backUrl",'/');
          }else if(backUrl!==nextProps.pathname){
            localStorage.setItem("oldbackUrl",backUrl);
          }
          localStorage.setItem("backUrl",localStorage.backUrl==nextProps.pathname ? '/' : nextProps.pathname);
        }
      }
    }
  }

  componentDidMount(){
    let height = screen.height+"px";
    this.setState({height:height});
    this.handleMask(false);
    if(this.props.pathname.indexOf('/login')==0 || this.props.pathname.indexOf('/search')==0){
      return;
    }
    else{
      if(localStorage.backUrl){
        const backUrl=localStorage.backUrl;
        if(backUrl!==localStorage.oldbackUrl){
          localStorage.setItem("oldbackUrl",backUrl);
        }
      }
      localStorage.setItem("backUrl",this.props.pathname);
    }
  }
  //用户退出
  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };
  //显示遮罩层
  handleMask(visible){
    let mask=document.getElementById('mask');
    if(visible)
      mask.style.display="blank";
    else
      mask.style.display="none";
  }
  render() {
    const {user} = this.props;
    const styles = require('./App.scss');
    const userbg={
      height:this.state.height,
      backgroundColor:"#ECECEC"
    }
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <article className={styles.appContent} style={this.props.pathname.indexOf("/user")==0 || this.props.pathname.indexOf("/Pay/")==0 || this.props.pathname.indexOf("/user/")==0 ? userbg : {}}>
          {this.props.children}
        </article>
        <div className={styles.mask} id="mask"></div>
		<script src="https://static-xz.veimg.cn/js/plus/2013/ga.js"></script>
        <script src="https://cdn.bootcss.com/es6-promise/4.0.5/es6-promise.auto.min.js"></script>
        <script src="https://tb1.bdstatic.com/tb/libs/rnwi-browser.js"></script>
      </div>
    );
  }
}
