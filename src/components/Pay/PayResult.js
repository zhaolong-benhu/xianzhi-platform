/**
 * Created by zhaolong on 2016/7/4.
 * File description:支付结果页
 */
'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header,Warning} from 'components';
import {Link} from "react-router";
import { push } from 'react-router-redux';
import {connect} from 'react-redux';
import {orderDetail as getOrder} from 'redux/modules/pay';
import {imageUrl} from '../../api/common/Global';
const styles = require('./PayResult.scss');

@connect(
  state => ({
    result:state.pay.data
  }),
  {push,getOrder}
)

export default class PayResult extends Component {
  static propTypes = {
      pay: PropTypes.object,
      getOrder:PropTypes.func.isRequired,
      push:PropTypes.func.isRequired
  }
  state={
    pay_success:"/images/pay_success.png",//支付成功图片
    pay_faild:"/images/pay_faild.png",//支付失败图片
    selected:true,//选中标识
    pay_result:true,//支付结果标识
    bGetResult:true,//获取支付结果数据
  };
  //静态文本
  static defaultProps={
    remarks1:"注:凡购买成功的用户，详细信息我们将在半小时内以手机短信和站内通知方式发送，请注意查收！",
    remarks2:"如有疑问，请联系我们：",
    remarks3:"0571-81023948",
  };

  constructor(props) {
      super(props);
      this.order_id= 0;
    }
  //返回首页
  GotoHomepage(){
    this.props.push('/');
  }
  //按钮添加事件
  onClickedBtn(type,id){
        switch (type) {
          case "1":
          case "3":
          {
            this.props.push('/user');
          }break;
          case "12":
            {
              this.props.push("/gongkaike/"+id);
            }break;
          case "13":
          case "14":
          case "15":
          case "16":
            {
              this.props.push("/huodong/"+id);
            }break;
          default:
        }

  }
  componentWillReceiveProps(nextProps){
    this.setState({visible:false});
    if(this.props.result!==nextProps.result){
      if(nextProps.result.status==0){
        // this.setState({msg:nextProps.result.errMsg});
        // this.setState({visible:true});
        setTimeout(() => {
          this.props.push('/');
        }, 1500);
      }
    }
  }
  componentWillMount(){
    if(this.props.params.id)
    {
      this.props.getOrder('',this.props.params.id);
    }else{
      this.setState({msg:'订单不存在'});
      this.setState({visible:true});
      setTimeout(() => {
        this.props.push('/');
      }, 1500);

    }
  }

  //重新支付
  PayAgain(){
    this.props.push('/Pay/'+this.order_id);
  }

render(){
  const {result}=this.props;
  if(result){
    this.order_id = result.order_id;
  }
  return(
    <div className={styles.container}>
    <Helmet title="支付"/>
    <Header title="支付" type={true} back="/"/>
    {result &&
      <div>
      {(()=>{
        if(result.order_status == 1){
          return <div className={styles.info}>
            <img className={styles.img} src={imageUrl+this.state.pay_success}></img>
            <div className={styles.pay_result}>支付成功！</div>
            <div className={styles.line}></div>
          </div>
        }
        if(result.order_status == 0){
          return <div className={styles.info}>
             <img className={styles.img} src={imageUrl+this.state.pay_faild}></img>
             <div className={styles.pay_result}>支付失败！</div>
             <div className={styles.pay_again} onClick={this.PayAgain.bind(this)}>重新支付</div>
             <div className={styles.line}></div>
           </div>
        }
      })()}

      <div className={styles.details}>
        <div>
          <span className={styles.text}>商品名称：</span>
          <span className={styles.text}>{result.order_list.title}</span>
        </div>

        <div>
          <span className={styles.text}>支付时间：</span>
          <span className={styles.text}>{result.pay_time}</span>
        </div>

        <div>
          <span className={styles.text}>支付金额：</span>
          <span className={styles.price}>¥{result.pay_money}</span>
        </div>

        {(()=>{
          if(this.state.pay_result && result.order_status == 1){
            return <div className={styles.other}>
              <div className={this.state.selected? styles.back2:styles.back} onClick={this.GotoHomepage.bind(this)}>返回首页</div>
              <div className={styles.empty}></div>
              {(()=>{
                if(result.order_list.type=="1" || result.order_list.type=="3"){
                  return <div  className={styles.back2} onClick={this.onClickedBtn.bind(this,result.order_list.type,0)}>去学习</div>
                }
                else {
                  return <div  className={styles.back2} onClick={this.onClickedBtn.bind(this,result.order_list.type,result.order_list.id)}>查看详情</div>
                }
              })()}

              <div className={styles.empty2}></div>
            </div>
          }
        })()}
      </div>

      <div className={styles.remarks}>
        <div className={styles.remarks1}>{this.props.remarks1}</div>
        <span className={styles.remarks2}>{this.props.remarks2}</span>
        <a href={'tel:'+this.props.remarks3} className={styles.remarks3}>{this.props.remarks3}</a>
      </div>

    </div>
  }

  </div>
  )
}
}
