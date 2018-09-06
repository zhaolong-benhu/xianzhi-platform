/**
 * Created by same on 2016/6/28.
 * File description:公共头部
 */

'use strict';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {load as loadAuth} from 'redux/modules/auth';
import {imageUrl} from '../../api/common/Global';
const styles = require('./Header.scss');
import {push} from 'react-router-redux';
import {Share} from 'components';

@connect(
  state => ({
      user: state.auth.user,
      pathname: state.routing.locationBeforeTransitions.pathname
  }),{loadAuth, push}
)
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    pathname: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props);
    this.touchmove = this.handleTouchMove.bind(this);
    this.menu = this.handleHideMenu.bind(this);
  }
  state = {
    visible: false, //是否显示
    index: 0, //索引
    share_box: false, //分享显示框
    can_move: true,//滚动设置
  };

  //返回上一页
  handleChangeBack() {
    try{
      console.log(this.prpos.back);
      if (this.props.back) {
          this.props.push(this.props.back);
      }else if(this.props.href){
          location.href=this.props.href;
      }else {
          history.go(-1);
      }
    }catch(e){
        history.go(-1);
    }
  }
  //搜索事件处理
  handleSearch() {
    this.props.push('/search');
  }
  //菜单URL跳转
  handleToUrl(url){
    this.setState({visible: false});
    this.props.push(url);
  }
  //菜单
  handleChangeMenu(e) {
    e.preventDefault();
    const mask = document.getElementById('mask');
    this.setState({visible: this.state.visible ? false : true});
    if (mask.style.zIndex > 100) {
      mask.style.zIndex = this.state.visible ? 101 : 103;
      document.getElementById('header').style.zIndex = 110;
    } else {
      mask.style.display = this.state.visible ? 'none' : 'block';
      document.getElementById('header').style.zIndex = this.state.visible ? 99 : 110;
    }
    this.props.callbackParent && this.props.callbackParent(this.state.visible ? false:true);
  }

  //隐藏菜单
  handleHideMenu(e) {
    if (this.state.visible) {
      e.preventDefault();
      let mask = document.getElementById('mask');
      if (mask.style.zIndex > 100) {
        mask.style.zIndex = 101;
      } else {
        mask.style.display = 'none';
        mask.style.zIndex = 100;
        document.getElementById('header').style.zIndex = 99;
      }
      this.setState({visible: false});
      this.props.callbackParent && this.props.callbackParent(false);
    }
  }
  componentDidMount() {
    //添加滚动条事件
    document.getElementById('mask').addEventListener('touchstart', this.menu, true);
    window.addEventListener('touchmove', this.touchmove);
  }

  componentWillUnmount() {
    window.removeEventListener('touchstart', this.menu);
    window.removeEventListener('touchmove', this.touchmove);
  }
  //刷新
  RefreshHomepage() {
    window.location.reload();
  }
  //弹出分享框
  Share(e) {
    e.nativeEvent.stopImmediatePropagation();
    //弹出分享框
    this.setState({share_box: true, can_move: false});
    //此刻屏幕不能在滑动
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';//手机版设置这个。
  }
  //隐藏分享框
  Shared(str) {
     if (this.state.share_box && str=="cancel") {
       //隐藏分享框
       this.setState({share_box: false, can_move: true});
       //此刻屏幕可以滑动
       document.documentElement.style.overflow = 'visible';
       document.body.style.overflow = 'visible';//手机版设置这个。
     }
  }
  //按下移动
  handleTouchMove(e) {
    if (!this.state.can_move) {
      e.preventDefault();
    }
  }
  render() {
    const {user, pathname} = this.props;
    var user_thumb =  this.props.user_thumb;
    return (
      <header id="header" className={this.props.type && !this.props.liveclass ? styles.user : ''}
              style={this.props.line ? {borderBottom: '1px solid #ececec'} : {}}>
        {(() => {
          if (pathname === '/') {
            return <img className={styles.logo} src={imageUrl+"/images/logo.png"} onClick={this.RefreshHomepage.bind(this)}/>;
          } else {
            return <i onClick={this.handleChangeBack.bind(this)} className={styles.back}>&#xe609;</i>;
          }
        })()}
        <div className={pathname == '/' ? styles.search : styles.title} onClick={pathname == '/' ? this.handleSearch.bind(this) : ''}>
          <span>{this.props.title}</span>
          {!this.props.type ?
            <Link to="/search"><i style={this.props.type == "liveclass" ? {display:"none"} : {display:"none"}}>&#xe603;</i></Link> :
            this.props.type === 'share' ?
              <span onClick={(e) => {this.Share(e);}} className={styles.shareBtn}><i>&#xe60c;</i></span> :
              this.props.type === 'liveclass' ?
                <div onClick={()=>this.props.isLogin(1)}>
                  <div className={styles.toLiveShow}><i>&#xe632;</i>我要直播</div>
                </div> :
                <div></div>}
        </div>
        {(() => {
          if (pathname === '/') {
            return user && user.user_ticket ? <Link to="/user" className={styles.user}><i>&#xe604;</i></Link> :
              <Link to='/login' className={styles.login}>登录</Link>;
          } else {
            if (this.props.type && this.props.type !== 'withdraw' && this.props.type !== 'liveclass') {
              return <div></div>;
            } else {
              switch (this.props.type) {
                case 'withdraw' : {
                  return (<div className={styles.pr}>
                    <i onClick={this.handleChangeMenu.bind(this)}>&#xe634;</i>
                    <div className={this.state.visible ? styles.menu2 + ' ' + styles.show : styles.menu2}>
                      <ol>
                        <li><Link to="/user/wallet/detail/3">提现记录</Link></li>
                        <li><Link to="/user/wallet/instructions">使用说明</Link></li>
                      </ol>
                    </div>
                  </div>);
                }
                  break;
                case 'liveclass' : {
                  return (<div className={styles.rounded} onClick={()=>this.props.isLogin(2)}>
                    <img src={user_thumb} alt=""/>
                  </div>);
                }
                  break;
                default: {
                  return (<div className={styles.pr}>
                      <i onClick={this.handleChangeMenu.bind(this)}>&#xe601;</i>
                      <div className={this.state.visible ? styles.menu + ' ' + styles.show : styles.menu}>
                        <ol>
                          <li><Link to="/"><i>&#xe615;</i>首页</Link></li>
                          <li onClick={()=>this.handleToUrl(user && user.user_ticket ? '/user/follow' : '/login')}><i>&#xe600;</i>关注</li>
                          <li onClick={()=>this.handleToUrl('/user')}><i>&#xe604;</i>我的</li>
                        </ol>
                      </div>
                    </div>
                  );
                }
              }
            }
          }
        })()}
        <div style={{zIndex: '1000', position: 'fixed', left: '0', bottom: '0'}}>
          {(() => {
            if (this.state.share_box) {
              return (<div className={styles.float_share}>
                <Share callbackParent={this.Shared.bind(this)} title={'精品酒店课程，0元购，准点限量开抢。'}/>
                {/*pic={detail.thumb}*/}
              </div>);
            }
          })()}
          {(() => {
            if (this.state.share_box) {
              return (<div className={styles.mask}></div>);
            }
          })()}
        </div>
      </header>
    );
  }
}
