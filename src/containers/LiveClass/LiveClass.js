/**
 * Created by qzy on 2016/11/24.
 * File description:直播页面
 */
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {browserHistory} from 'react-router';
import {Header, Login_Box, NoContent, OneLiveClass, Slider} from 'components'
import {get as getUserState, getUserThumb, isLoaded, load as loadliveclass} from 'redux/modules/live';
import {loadBanner} from 'redux/modules/home';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {asyncConnect} from 'redux-async-connect';
import {imageUrl, live_banner} from '../../api/common/Global';

const styles = require('./LiveClass.scss');

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    return dispatch(loadBanner(live_banner));
  }
}])

@connect(
  state => ({
    data: state.live.list,
    banner: state.home.banner,
    user: state.auth.user,
    userStatus: state.live.status,
    thumb: state.live.thumb
  }), {push, loadliveclass, getUserState, getUserThumb}
)

export default class LiveClass extends Component {
  state = {
    isdata: false,
    pageNum: 0,
    index: 1,
    bLock: false,
    height: '480px',
    bodyHeight: '480',
    login_box: false,
    tips_box: false,
    user_thumb: '/images/user/head.jpg',
    can_move: true,
  }

  static propTypes = {
    data: PropTypes.object,
    loadliveclass: PropTypes.func.isRequired,
    banner: PropTypes.array,
    push: PropTypes.func.isRequired,
    user: PropTypes.object,
    userStatus: PropTypes.object,
    thumb: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.array = [];
    this.scroll = this.handleScroll.bind(this);
    this.touchmove = this.handleTouchMove.bind(this);
  }

  componentWillMount() {
    this.props.loadliveclass(1);//首次获取数据
    // if (this.props.user && this.props.user.user_ticket) {
    //   this.props.getUserThumb();//获取用户头像
    // }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scroll);
    var height = Number(document.body.scrollHeight) + "px";
    var bodyHeight = Number(document.body.scrollHeight) - 150 - 45 - 12 + "px";
    this.setState({height: height, bodyHeight: bodyHeight});
    window.addEventListener('touchmove', this.touchmove);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.data != nextProps.data) {
        var result = JSON.stringify(nextProps.data);
      if (nextProps.data.status == 0) {
        this.props.push('/');
      } else {
        if (nextProps.data.data.current_page == 1)
          this.array.length = 0;
        this.array.push(nextProps.data.data.list);
        this.setState({pageNum: nextProps.data.data.total_page});
        this.setState({data: this.array});
        this.setState({bLock: false});
      }
    }
    if (this.props.userStatus !== nextProps.userStatus) {
      if (nextProps.userStatus.status == '1') {
        switch (nextProps.userStatus.data[0].reviewed) {
          case 0 :
            browserHistory.push('/live/enroll');
            break; //未填写
          case 1 :
            this.props.push('/tutorregister/verify/0');
            break; //未审核
          case 2 :
            this.props.push('/tutorregister/verify/1');
            break; //通过
          case 3 :
            this.props.push('/tutorregister/verify/2');
            break; //不通过
        }
      }
    }
    if (this.props.thumb != nextProps.thumb) {
      if (nextProps.thumb.status == 1 && nextProps.thumb.data.user_thumb != "") {
        this.setState({user_thumb: nextProps.thumb.data.user_thumb});
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll);
    window.removeEventListener('touchmove', this.touchmove);
  }

  //按下移动
  handleTouchMove(e) {
    if (!this.state.can_move) {
      e.preventDefault();
    }
  }

  //滚动条加载数据
  handleScroll(e) {
    let srollPos = window.pageYOffset; //滚动条距顶部距离(页面超出窗口的高度)
    let totalheight = parseFloat(document.documentElement.clientHeight) + parseFloat(srollPos); //屏幕高度+滚动条距顶部距离
    if ((document.body.scrollHeight - 10) <= totalheight) {//屏幕高度+滚动条距顶部距离>页面高度
      //加锁处理
      if (!this.state.bLock) {
        this.setState({bLock: true});
        if (this.state.index < this.state.pageNum) {
          let index = Number(this.state.index) + 1;
          this.setState({index: index});
          this.props.loadliveclass(index);
        } else {
        }
      }
    }
  }

  // 是否登录
  isLogin(id) {
    if (this.props.user && this.props.user.user_ticket) {
      if (id == "2") {
        browserHistory.push('/user');
      } else {
        browserHistory.push('/live/enroll');
      }
    } else {
      document.documentElement.style.overflow = 'none';
      document.body.style.overflow = 'none';//手机版设置这个。
      const mask = document.getElementById('mask');
      mask.style.display = 'block';
      this.setState({login_box: true, can_move: false});
    }
  }

  UserIsSeclectedLogin() {
    let mask = document.getElementById('mask');
    mask.style.display = "none";
    this.setState({login_box: false, can_move: true});
    document.documentElement.style.overflow = 'visible';
    document.body.style.overflow = 'visible';//手机版设置这个。
  }

  render() {
    const {data, banner, thumb} = this.props;
    var isLogined = false;
    if (this.props.user && this.props.user.user_ticket) {
      isLogined = true;
    }
    var user_thumb = this.state.user_thumb;
    return (
      <div>
        <Helmet title="直播"/>
        {/* <Header type="liveclass" line="true" back={'/'} isLogin={(id) => this.isLogin(id)} user_thumb={user_thumb}/>*/}
        <div className={styles.head}>直播大厅</div>
        {data && this.state.data &&
        <div className={styles.container}>
          {/* <div className={styles.slider}>
            <Slider data={banner} time="3000"/>
          </div> */}
          {(() => {
            if (this.state.data.length == 0) {
              return <NoContent text="暂时没有任何直播！敬请关注~" type="live" height={this.state.bodyHeight} background="#ECECEC"/>
            } else {
              return <div>
                {this.state.data.map((val, i) => {
                  return <OneLiveClass key={"key" + i} data={this.state.data[i]} isLogined={isLogined}/>;
                })}
              </div>
            }
          })()}
        </div>
        }
        {(() => {
          if (this.state.login_box) {
            return <Login_Box callbackParent={this.UserIsSeclectedLogin.bind(this)}/>
          }
        })()}

        {(() => {
          if (this.state.tips_box) {
            return <Warning msg={this.state.msg} visible={true}/>
          }
        })()}
      </div>
    );
  }
}
