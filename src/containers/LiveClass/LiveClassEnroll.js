/**
 * Created by qzy on 2016/11/25.
 * File description:报名页面
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import { Link, browserHistory } from 'react-router';
import { push } from 'react-router-redux';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Header, Warning} from 'components';
import { get as getUserState} from 'redux/modules/live';
import {imageUrl} from '../../api/common/Global';
const styles = require('./LiveClassEnroll.scss');

@connect(
  state => ({
    user: state.auth.user,
    userStatus: state.live.status,
  }), {push, getUserState}
)
export default class LiveClassEnrool extends Component {
 state={
     left: 0,
 }
  static propTypes = {};
  static defaultProps = {
    bg: '/images/liveCLass/enrollBg.jpg',
    check: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      tips_box: false,
      msg: '',
    };
  }
  componentWillMount() {
    this.setState({
      check: this.props.check,
    });
  }
  componentDidMount(){
     var width = (screen.width-93)/2+"px";
     this.setState({left:width});
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.userStatus !== nextProps.userStatus) {
      if (nextProps.userStatus.status == '1') {
        switch (nextProps.userStatus.data[0].reviewed) {
          case 0 : browserHistory.push('/tutorregister/personalinfo'); break; //未填写
          case 1 : this.props.push('/tutorregister/verify/0'); break; //未审核
          case 2 : this.props.push('/tutorregister/verify/1'); break; //通过
          case 3 : this.props.push('/tutorregister/verify/2'); break; //不通过
        }
      }
      if (nextProps.userStatus.status == '0') {
        this.setState({
          tips_box: true,
          msg: nextProps.userStatus.errMsg,
        });
      }
    }
  }
  // 传递的方法
  handleCheckBox(){
    this.setState({
      check: !this.state.check,
    });
  }
  // 重置消息
  resetTipBox() {
    this.setState({
      tips_box: false,
      msg: '',
    });
  }
  // 控制按钮功能
  handleBtn() {
    if (this.state.check) {
      this.props.getUserState();
      // browserHistory.push('/tutorregister/personalinfo');
    }else{
      this.setState({
        tips_box: true,
        msg: '请阅读并勾选主播公约',
      });
    }
  }
  render() {
    return (
      <div>
        <Helmet title="主播报名"/>
        <Header title="主播报名" type={true} line={false} liveclass={true}/>
        <div className={styles.container}>
          <img src={imageUrl+this.props.bg} alt=""/>
        </div>
        <div onClick={()=>{this.handleBtn()}}>
            <img src={imageUrl+"/images/liveCLass/sign.png"} className={styles.btn} style={{marginLeft:this.state.left}}/>
        </div>

        {/*阅读协议*/}
        <div className={styles.contractContainer}>
          <input type="checkbox" checked={this.state.check} onChange={()=>{this.handleCheckBox()}}/>
          <label htmlFor="contract">已阅读
            <Link to="/live/contract">
            主播公约
            </Link>
          </label>
        </div>
        {(()=>{
          if (this.state.tips_box) {
            return <Warning msg={this.state.msg} visible={true} resetTipBox={()=>this.resetTipBox()} />;
          }
        })()}
      </div>
    );
  }
}
