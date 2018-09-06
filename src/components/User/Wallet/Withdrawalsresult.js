/**
 * Created by zhaolong on 2017/02/09.
 * File description:提现结果页
 */
'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header,Warning} from 'components';
import {Link} from "react-router";
import { push } from 'react-router-redux';
import {connect} from 'react-redux';
import {wdsResult} from 'redux/modules/withdrawals';
import {imageUrl} from '../../../api/common/Global';
const styles = require('./Withdrawalsresult.scss');

@connect(
  state => ({
    result:state.withdrawals.result
  }),
  {push,wdsResult}
)

export default class Withdrawalsresult extends Component {
  static propTypes = {
      wdsResult:PropTypes.func.isRequired,
      push:PropTypes.func.isRequired,
      result: PropTypes.object
  }
  state={
    pay_success:"/images/pay_success.png",//支付成功图片
    pay_faild:"/images/pay_faild.png",//支付失败图片
    selected:true,//选中标识
    pay_result:true,//提现结果标识
    bGetResult:true,//获取提现结果数据
    tips:false,
    msg:"",
  };
  //静态文本
  static defaultProps={
    remarks1:"注:提现金额会及时到账，请注意查收！",
    remarks2:"如有疑问，请联系我们：",
    remarks3:"0571-81023948",
  };

  constructor(props) {
      super(props);
    }
  //返回首页
  GotoHomepage(){
    this.props.push('/');
  }

  componentWillReceiveProps(nextProps){
    this.setState({visible:false});
    if(this.props.result!==nextProps.result){
      if(nextProps.result.status==0){
        this.setState({msg:nextProps.result.errMsg});
        this.setState({tips:true});
        setTimeout(() => {
          this.props.push('/');
      }, 3000);
  }else {
      setTimeout(() => {
        this.props.push('/');
    }, 3000);
  }
    }
  }
  componentWillMount(){
    if(this.props.params.id)
    {
      this.props.wdsResult(this.props.params.id);
    }else{
      this.setState({msg:'订单不存在'});
      this.setState({tips:true});
      setTimeout(() => {
        this.props.push('/');
      }, 1500);

    }
  }

render(){
  const {result}=this.props;
  return(
    <div className={styles.container}>
    <Helmet title="提现"/>
    <Header title="提现" type={true} back="/"/>
    {result &&
      <div>
      {(()=>{
        if(result.data.status == "1"){
          return <div className={styles.info}>
            <img className={styles.img} src={imageUrl+this.state.pay_success}></img>
            <div className={styles.pay_result}>提现成功！</div>
            <div className={styles.line}></div>
          </div>
        }
        if(result.data.status == "0" || result.data.status == "2" ){
          return <div className={styles.info}>
             <img className={styles.img} src={imageUrl+this.state.pay_faild}></img>
             <div className={styles.pay_result}>提现失败！</div>
             <div className={styles.line}></div>
           </div>
        }
      })()}

      <div className={styles.remarks}>
        <div className={styles.remarks1}>{this.props.remarks1}</div>
        <span className={styles.remarks2}>{this.props.remarks2}</span>
        <a href={'tel:'+this.props.remarks3} className={styles.remarks3}>{this.props.remarks3}</a>
      </div>

    </div>
  }
  {(()=>{
     if(this.state.tips){
         return <Warning  visible={true} msg={this.state.msg} />
     }
  })()}

  </div>
  )
}
}
