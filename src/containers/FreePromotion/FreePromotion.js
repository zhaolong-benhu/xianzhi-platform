/**
 * Created by qiuzengyuan on 2016/11/17.
 * File description: 促销活动容器
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getData} from 'redux/modules/freepromotion';
import {Header, Tab} from 'components';
import Helmet from 'react-helmet';
import {CountdownTimer, PromotionCourseList, HelpBtn, Login_Box, Payment_Box, TimeDown, Warning} from 'components';
import { createSecKill, createcourseorder } from 'redux/modules/pay';
import { push } from 'react-router-redux';

const styles = require('./FreePromotion.scss');
@connect(state => ({
  ...state.freepromotion,
  user: state.auth.user,
  pay: state.pay.result,
}),
  {getData, createSecKill, createcourseorder, push }
)
export default class FreePromotion extends Component {

  static propTypes = {
    course: PropTypes.object,
    getData: PropTypes.func.isRequired,
    createSecKill: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    pay: PropTypes.object,
    createcourseorder: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      tabs: [{
        title: '特价购买',
        link: '0',
      }, {
        title: '等待开抢',
        link: '1',
      }, {
        title: '敬请期待',
        link: '2',
      }],
      login_box: false,
      can_move: true,
      pay_box:false,
      tips_box:false,
      msg:'',
    };
    //阻止触摸
    this.touchmove = this.handleTouchMove.bind(this);
  }

  componentWillMount() {
    //获取时间
    this.props.getData({type: ( parseInt(this.props.params.id) + 1)})
  }

  componentDidMount() {
    const height = screen.height;
    this.state = {
      bFlag: false,
      screenHeight: height - 20 + 'px',
      tabs: [{
        title: '特价购买',
        link: '0',
      }, {
        title: '等待开抢',
        link: '1',
      }, {
        title: '敬请期待',
        link: '2',
      }],
      tabsStart: [
        [{
          title: '特价购买',
          link: '0',
        }, {
          title: '等待开抢',
          link: '1',
        }, {
          title: '敬请期待',
          link: '2',
        }],
        [{
          title: '特价购买',
          link: '0',
        }, {
          title: '开始抢购',
          link: '1',
        }, {
          title: '敬请期待',
          link: '2',
        }],
      ],
      login_box: false,
      can_move: true,
      pay_box: false,
      tips_box: false,
      msg: '',
    };
    window.addEventListener('touchmove', this.touchmove);
    this.setState({list:this.props.data});
  }

  componentWillReceiveProps(nextProps) {
    // if(this.props.data !== nextProps.data){
    //     const {data} = nextProps.props;
    //     // debugger
    //     const {start_time, now_time, expire_time} = data;
    //     this.passIsPromotionStart()(start_time, now_time, expire_time);
    // }
    //tab切换获取数据
    if (this.props.params.id !== nextProps.params.id) {
      this.props.getData({type: (parseInt(nextProps.params.id) + 1)});
    }
    this.setState({tips_box:false});
    // 跳转付款
    if (this.props.pay != nextProps.pay) {
      if (nextProps.pay.status==1) {
        if (nextProps.pay.data.order_status==0) {
          this.props.push('/Pay/' + nextProps.pay.data.order_id);
      }else{
          this.setState({tips_box: true, msg: '购买成功~'});
          setTimeout(()=>{
              this.setState({tips_box: false});
          },1000)
      }
      }else{
        this.setState({msg: nextProps.pay.errMsg});
        this.setState({tips_box: true});
        setTimeout(()=>{
          this.setState({tips_box: false});
        }, 1500);
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('touchmove', this.touchmove);
  }

  //弹出登录或者抢购
  handleKill(id, type, price, title, funcType) {
    this.setState({
      buyCourse: {
        id: id,
        type: type,
        price: price,
        title: title,
        funcType: funcType,
      },
    });
    if (this.props.user && this.props.user.user_ticket) {
      this.setState({
        pay_box: true,
        can_move: false,
      });
    } else {
      //弹出登录框
      this.setState({login_box: true, can_move: false});
    }
    //设置屏幕不可以滑动
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';//手机版设置这个。
    //弹出灰化层
    let mask=document.getElementById('mask');
    mask.style.display = 'block';
  }
  // 用户登录
  UserIsSeclectedLogin() {
    const mask = document.getElementById('mask');
    mask.style.display = 'none';
    this.setState({login_box: false, can_move: true});
    //设置屏幕可以滑动
    document.documentElement.style.overflow = 'visible';
    document.body.style.overflow = 'visible';//手机版设置这个。
  }
  // 传递促销开始
  passIsPromotionStart() {
    // debugger
    return (start_time, now_time, expire_time) => {

      if (start_time - now_time < 0 && expire_time - now_time > 0 ) {
        this.setState({
          bFlag: true,
        });
      } else {
        this.setState({
          bFlag: false,
        });
      }
      if (start_time - now_time < 0 && expire_time - now_time === 0) {
        this.getTime();
      }
    };
  }
  // 获取时间
  getTime() {
    this.props.getData({type: ( parseInt(this.props.params.id) + 1)})
      .then( ()=> {
        const {data} = this.props;
        // debugger
        const {start_time, now_time, expire_time} = data;
        this.passIsPromotionStart()(start_time, now_time, expire_time);
      });
  }
  //按下移动
  handleTouchMove(e) {
    if (!this.state.can_move) {
      e.preventDefault();
    }
  }
  // 改变tab
  changeTabs() {
    this.setState({
      tabs: this.state.tabsStart[1],
    });
  }

  // 用户选择
  UserSelected(str) {
     this.setState({pay_box: false});
     const mask = document.getElementById('mask');
     mask.style.display = 'none';
    if (str == 'cancel') {
    } else if (this.state.buyCourse.funcType === 'createSecKill') {
      const { sec_id } = this.props.data;
      const {id, type} = this.state.buyCourse;
      this.props.createSecKill(sec_id, id, type);
    } else if(this.state.buyCourse.funcType === 'createcourseorder') {
      const { sec_id } = this.props.data;
      const {id, type} = this.state.buyCourse;
      this.props.createcourseorder(id, type);
    }
    this.maskOut();
  }
  // 关闭遮罩
  maskOut() {
    this.setState({can_move: true});
    //设置屏幕不可以滑动
    document.documentElement.style.overflow = 'visible';
    document.body.style.overflow = 'visible';//手机版设置这个。
  }
  render() {
    const {data} = this.props;
    // console.log(data)
    return (
      <div className={styles.outWrapper} style={{height: this.state.screenHeight, background: '#eee'}}>
        <Helmet title="限时秒杀"/>
        <Header title="限时秒杀" back="/" line="true" type="share"/>
        {data &&
        <div>
          <Tab {...this.props} promotionStart={this.state.bFlag} tabs={this.state.tabs} changeTabs={this.changeTabs.bind(this)}>
            {/* tab组件的内容传递 */}
            <CountdownTimer
              expireTime={ data.expire_time }
              nowTime={ data.now_time }
              startTime={ data.start_time }
              onTimeOut = { this.getTime.bind(this)}
              promotionStart={this.state.bFlag}
              passIsPromotionStart={this.passIsPromotionStart.bind(this)()}
              list = {data.list || []}
              paramsId = {this.props.params.id}
            />
            <PromotionCourseList {...data}  promotionStart={this.state.bFlag} handleKill={(id, type, price, title, funcType)=> this.handleKill(id, type, price, title, funcType) }/>
          </Tab>
          <HelpBtn />
        </div>
        }
        {(()=>{
          if (this.state.login_box) {
            return (<Login_Box callbackParent={this.UserIsSeclectedLogin.bind(this)}/>);
          }
        })()}
        {(()=>{
          if (this.state.pay_box) {
            return (<Payment_Box
              id={this.state.buyCourse.id}
              type={"限时秒杀"}
              goodsname={this.state.buyCourse.title}
              payPrice={this.state.buyCourse.price}
              needCountChange = {false}
              callbackParent={this.UserSelected.bind(this)}
            />);
          }
        })()}
        {(()=>{
          if (this.state.tips_box) {
            return <Warning msg={this.state.msg} visible="true" />;
          }
        })()}

      </div>
    );
  }
}
