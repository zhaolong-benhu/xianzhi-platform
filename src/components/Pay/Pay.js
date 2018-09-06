/**
 * Created by zhaolong on 2016/7/4.
 * File description:支付弹框
 */

'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header,Warning} from 'components';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {orderDetail as getOrder} from 'redux/modules/pay';
const styles = require('./Pay.scss');

@connect(
  state => ({
    pay:state.pay.data
  }),
  {push,getOrder}
)
export default class Pay extends Component {
  static propTypes = {
      pay: PropTypes.object,
      getOrder:PropTypes.func.isRequired,
      push:PropTypes.func.isRequired
  }
  state = {
    alipaySelected:1,
    msg:'',
    visible:false,
    lock:false,
    iswx:false
  };
  componentWillReceiveProps(nextProps,nextState){
    if(this.props.pay!=nextProps.pay){
        if(nextProps.pay.status==0){
          this.setState({msg:nextProps.pay.errMsg});
          this.setState({visible:true});
          setTimeout(() => {
            this.props.push('/');
          }, 3000);
        }
    }
  }
  componentDidMount(){
    if(isNaN(this.props.params.id))
    {
      this.setState({msg:'订单不存在'});
      this.setState({visible:true});
      setTimeout(() => {
        this.props.push('/');
      }, 1500);
    }else{
      this.props.getOrder(this.props.params.id,'');
    }

    setTimeout(()=>{
      if(this.props.pay && this.props.pay.order_status == 1){
        //跳转到支付成功页面
        this.props.push("/PayResult/"+this.props.pay.str);
      }
    },1500);
    this.setState({
      alipaySelected:this.isWeiXin() ? 3 : 1,
      iswx:this.isWeiXin()
    });
  }
  //跳转到学习中心
  usrePay(){
    if(this.state.lock)
      return;
    this.setState({lock:true});
    if(this.props.params.id){
      let orderId=this.props.params.id;
      location.href=this.state.alipaySelected==1 ? "//api.9first.com/pay/?order_id="+orderId+"&pay_bank=wap_alipay" : "//api.9first.com/pay/?order_id="+orderId+"&pay_bank=weixin";
      this.setState({lock:false});
    }
  }
  //支付事件
  ClickedPay(index){
    this.setState({alipaySelected:index});
  }
  //判断是否是微信
  isWeiXin(){
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true;
      }else{
          return false;
      }
  }
  render(){
    const {pay}=this.props;
    return(
      <div>
        <Helmet title="支付"/>
        <Header title="支付" type={true}/>
        {pay && pay.order_id &&
          <div className={styles.container}>
            <div className={styles.head}>
              <span className={styles.back}>&#xe609;</span>
              <div className={styles.pay}>支付</div>
            </div>
              <div className={styles.info}>
                <div className={styles.infos}>
                  <div className={styles.pic}>
                    <img className={styles.img} src={pay.order_list.thmub} alt=""/>
                  </div>
                  <div className={styles.detail}>
                  {(()=>{
                    var len = pay.order_list.title.length;
                    var pos = pay.order_list.title.indexOf("《");
                    var name = pay.order_list.title.substring(pos+1,len-1);
                    return <div className={styles.title}>{name}</div>
                  })()}
                    <div className={styles.date}>{pay.order_list.start_time}</div>
                    <div className={styles.city}>{pay.order_list.city_name}</div>
                    {(()=>{
                      if(pay.order_list.type ==1){
                        return <div className={styles.city}>学习时限：30天</div>
                      }
                      if(pay.order_list.type ==3){
                        return <div className={styles.city}>学习时限：60天</div>
                      }
                    })()}
                  </div>
                </div>

                <div className={styles.pay_price}>
                   <div className={styles.fl}>
                     <span className={styles.appy_num}>报名人数：</span>
                     <span className={styles.num}>3</span>
                     <span className={styles.appy_num}>人</span>
                   </div>
                   <div className={styles.fr}>
                     <span className={styles.need_pay}>需支付:</span>
                     <span className={styles.price}>¥{pay.order_list.price}</span>
                   </div>
                </div>

              <div className={styles.tickets}>
                <div className={styles.ticket}>优惠券</div>
                <div className={styles.more}>&#xe619;</div>
                <div className={styles.text}>暂无可使用优惠券</div>
              </div>
            </div>

              <div className={styles.pay}>
                {pay.pay_bank.map(function(v,i){
                    if(!this.state.iswx && v.pay_id==3){
                        return;
                    }else{
                        return <div key={'pay'+i} className={styles.pay_type} onClick={this.ClickedPay.bind(this,v.pay_id)}>
                            {(()=>{

                                if(v.bank_code=='weixin'){
                                  return <i className={styles.wechar}>&#xe61e;</i>
                                }else{
                                  return <i className={styles.alipay}>&#xe62b;</i>
                                }
                            })()}
                            <span className={styles.text}>{v.bank_name}</span>
                            {(()=>{
                              if(this.state.alipaySelected==v.pay_id)
                              {
                                return <i className={styles.selected}>&#xe614;</i>
                              }
                              else{
                                return <i className={styles.no_selected}>&#xe613;</i>
                              }
                            })()}
                          </div>
                    }
                  }.bind(this))
                }
            </div>

            <div className={styles.pay_immediately}>
                <div className={styles.text} onClick={this.state.lock ? '':this.usrePay.bind(this)}>立即支付</div>
            </div>
          </div>
        }
          {(()=>{
              if(this.state.visible){
                return <Warning visible={this.state.visible} msg={this.state.msg}/>
              }
          })()}
      </div>
    )
  }
}
