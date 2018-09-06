/**
 * Created by qzy on 2016/11/30.
 * File description:提交审核结果
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import {Header} from 'components';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import { get as getUserState } from 'redux/modules/live';
const styles = require('./TutorRegisterVerify.scss');

@connect(
  state => ({
    userStatus: state.live.status,
  }), {getUserState}
)

export default class TutorRegisterVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
    };
  }
  componentWillMount() {
    this.props.getUserState();
  }
  componentDidMount() {
    const detectBack = {
      initialize: () => {
        //监听hashchange事件
        window.addEventListener('hashchange', function() {
          //为当前导航页附加一个tag
          this.history.replaceState('hasHash', '', '');
        }, false);

        window.addEventListener('popstate', function(e) {
          if (e.state) {
            //侦测是用户触发的后退操作, dosomething
            //这里刷新当前url
            browserHistory.push('/live')
          }
        }, false);
      },
    }

    detectBack.initialize();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.userStatus !== nextProps.userStatus) {
      this.setState({
        time: nextProps.userStatus.data[0].add_time,
      });
    }
  }
  static propTypes = {};
  static defaultProps = {};
  stateHandle() {
    switch (this.props.params.id) {
      case '0' :
        return (
          <div className={styles.submitted}>
            <i>&#xe606;</i>
            <p>申请已提交</p>
            <p>您的主播资格申请已经提交，请耐心等待审核结果</p>
            <p>提交申请时间：{this.state.time}</p>
          </div>
        );
      case '1' :
        return (
          <div className={styles.success}>
            <div><i>&#xe60b;</i></div>
            <p>申请已通过</p>
            <p>您的主播资格申请已通过</p>
            <p>提交申请时间：{this.state.time}</p>
          </div>
        );
      case '2' :
        return (
          <div className={styles.failure}>
            <div><i>&#xe63c;</i></div>
            <p>申请未通过</p>
            <p>您的主播资格申请未通过，请重新提交</p>
            <p>提交申请时间：{this.state.time}</p>
          </div>
        );
      default :
        return (
          <div className={styles.submitted}>
            <i>&#xe606;</i>
            <p>申请已提交</p>
            <p>您的主播资格申请已经提交，请耐心等待审核结果</p>
            <p>提交申请时间：{this.state.time}</p>
          </div>
        );
    }
  }
  render() {
    return (
      <div>
        <Helmet title={'提交审核'} />
        <Header title={'提交审核'} type={true} back={'/live'}/>
        <div className={styles.container}>
          {this.stateHandle()}
        </div>
        <div className={styles.service}>如有疑问，请联系 <a href="tel:057181023948"> 客服</a></div>
      </div>
    );
  }
}
