/**
 * Created by zhaolong on 2016/8/5.
 * File description:我的钱包
 */
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import {Header,ConsumeHistory,RecordsHistory_Box} from 'components';
import superagent from 'superagent';
import {wallet} from '../../../api/common/user';
const styles = require('./Wallet.scss');


let Stamp = new Date();
let year = Stamp.getFullYear();
let month = Stamp.getMonth()+1;

if(month>=1 && month<=9){
   month = "0" + month;
}
let current_date = year + '-' + month;

export default class Wallet extends Component{
  static propTypes = {
      wallet: PropTypes.object
  }
state={
  sum_consumption:"0.00",
  sum_income:"0.00",
  sum_withdrawals:"0.00",
  current_date:"",
  current_year:0,
  current_month:0,
  nSelect:0,
  bShowSelectDate:false,
}


constructor(props) {
    super(props);
    this.scroll = this.handleScroll.bind(this);
}
componentDidMount(){
  //添加滚动条事件
  window.addEventListener('scroll',this.scroll);
}
componentWillUnmount(){
  window.removeEventListener('scroll',this.scroll);
}
componentDidMount(){
    let Stamp = new Date();
    let year = Stamp.getFullYear();
    let month = Stamp.getMonth()+1;
    var temp = month;
    this.setState({m_mon:temp+'月'});
    if(month>=1 && month<=9){
       month = "0" + month;
    }
    let current_date = year + '-' + month;
    this.setState({current_date:current_date,current_year:year,current_month:month});
    window.addEventListener('scroll',this.handleScroll.bind(this));
}
//屏幕滚动
handleScroll(){
  if(this.state.bShowSelectDate){
    this.setState({bShowSelectDate:false});
  }
}
//选择日期
SelectDate(e){
  this.setState({bShowSelectDate:!this.state.bShowSelectDate});
}
//获取用户选择月份
GetUserSelcted(index){
  this.setState({bShowSelectDate:false});
  this.setState({nSelect:index});

  var time = this.state.current_year+'-'+this.state.current_month;
  switch (index) {
    case 0:
      break;
    case 1:
    {
      if(Number(this.state.current_month)==1){
        var year = Number(this.state.current_year)-1;
        time = year+'-12';
      }
      else {
        var m = Number(this.state.current_month)-1;
        var mm = "";
        if(m>9){
          mm = m;
        }else{
          mm = "0"+m;
        }
        time = this.state.current_year+'-'+mm;
      }
    }break;
    case 2:
      {
        if(Number(this.state.current_month)==2){
        var year = Number(this.state.current_year)-1;
        time = year+'-12';
      }
      if(Number(this.state.current_month)==1){
        var year = Number(this.state.current_year)-1;
        time = year+'-11';
      }
        if(Number(this.state.current_month)>2) {
        var m = Number(this.state.current_month)-2;
        var mm = "";
        if(m>9){
             mm = m;
        }else {
             mm = "0"+m;
        }
        time = this.state.current_year+'-'+mm;
      }
    }break;
    case 3:
    {
      if(Number(this.state.current_month)==3){
        var year = Number(this.state.current_year)-1;
        time = year+'-12';
      }
      if(Number(this.state.current_month)==2){
        var year = Number(this.state.current_year)-1;
        time = year+'-11';
      }
      if(Number(this.state.current_month)==1){
        var year = Number(this.state.current_year)-1;
        time = year+'-10';
      }
        if(Number(this.state.current_month)>3) {
        var m = Number(this.state.current_month)-3;
        var mm = "0"+m;
        time = this.state.current_year+'-'+mm;
      }
    }break;
    case 4:
    {
      if(Number(this.state.current_month)==4){
        var year = Number(this.state.current_year)-1;
        time = year+'-12';
      }
       if(Number(this.state.current_month)==3){
        var year = Number(this.state.current_year)-1;
        time = year+'-11';
      }
       if(Number(this.state.current_month)==2){
        var year = Number(this.state.current_year)-1;
        time = year+'-10';
      }
       if(Number(this.state.current_month)==1){
        var year = Number(this.state.current_year)-1;
        time = year+'-9';
      }
      if(Number(this.state.current_month)>4){
        var m = Number(this.state.current_month)-4;
        var mm = "0"+m;
        time = this.state.current_year+'-'+mm;
      }
    }break;

    default:

  }

  this.props.callbackParent(time);

  var yea = time;//2016-08
  var y = time.substring(0,4);
  var m = yea.substring(5,8);
  var group = y+'年'+m;
  this.setState({current_date:group});//用户选择新的时间后更新日期


  if(m.substring(0,1) == "0"){
    this.setState({m_mon:m.substring(1,2)+'月'});
  }
  else
  {
    this.setState({m_mon:m+'月'});
  }
}
//隐藏选择日期
HideSelcetDate(){
  if(this.state.bShowSelectDate){
    this.setState({bShowSelectDate:false});
  }
}

  render(){
    // const {wallet} = this.props;
    var type = this.props.type;

    return(
      <div className={styles.wallet} onClick={this.HideSelcetDate.bind(this)}>

        {(()=>{
          if(this.props.showTips)
          return <div className={styles.tips}>
                  <div className={styles.tiptitle}>温馨提示</div>
                  <div className={styles.tip}>1、先之教育目前只支持微信支付和支付宝支付；</div>
                  <div className={styles.tip}>2、先之教育目前只支持微信提现功能，若提现失败请联系我们，给您带来的不便，敬请谅解。</div>
          </div>
        })()}

          <div className={styles.account_details}>
               <span className= {styles.title}>账户明细</span>
               <div className={styles.select}>
                 <span className= {styles.more_text} onClick={this.SelectDate.bind(this)}>{this.state.current_date+" "}</span>
                {(()=>{
                  if(!this.state.bShowSelectDate){
                    return <i>&#xe61d;</i>
                  }
                  else {
                     return <i>&#xe61c;</i>
                  }
                })()}
              </div>
              <div>
              {(()=>{
                if(this.state.bShowSelectDate){
                  return <RecordsHistory_Box current_year={this.state.current_year} current_month={this.state.current_month} callbackParent={this.GetUserSelcted.bind(this)}/>
                }
              })()}
            </div>
         </div>

         {(()=>{
           if(this.props.data.length>0){
             return <div>
             {this.props.data.map(function(v,i){
                 return  <ConsumeHistory type={type} month={ month==v.date ? '本月' : v.date} data={v.list}/>
               })
             }
             </div>
           }
           else {
             return <div>
               <div className={styles.nomon}>{this.state.m_mon}</div>
               <div className={styles.zan}>暂无数据</div>
             </div>
           }
         })()}

{/*
           {(()=>{
              if(this.props.data.length==0){
                return <div>
                  <div className={styles.nomon}>{this.state.m_mon}</div>
                  <div className={styles.zan}>暂无数据</div>
                </div>
              }
           })()} */}


       </div>


    )
  }
}
