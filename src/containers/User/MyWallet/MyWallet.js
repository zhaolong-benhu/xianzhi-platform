/**
 * Created by zhaolong on 2016/8/5.
 * File description:我的钱包
 */
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header,WalletHead,Wallet,ConsumeHistory} from 'components';
import {isLoaded, load as loadwallet} from 'redux/modules/wallet';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import { push } from 'react-router-redux';

let Stamp = new Date();
let year = Stamp.getFullYear();
let month = Stamp.getMonth()+1;
if(month>=1 && month<=9){
   month = "0" + month;
}
var cur_date = year+"-"+month;

@connect(
  state => ({
    data: state.wallet.data
  }),{loadwallet,push}
)

export default class MyWallet extends Component{
  state={
    data:[],
    pageNum:0,
    index:1,
    bLock:false,
  };

  static propTypes = {
      data: PropTypes.object,
      loadwallet:PropTypes.func.isRequired,
      push:PropTypes.func.isRequired
  }
constructor(props) {
  super(props);
  this.array=[];
  this.scroll = this.handleScroll.bind(this);
}
componentWillMount(){
  this.props.loadwallet(cur_date,this.state.index);
}
componentWillUnmount(){
  window.removeEventListener('scroll',this.scroll);
}
componentDidMount(){
  window.addEventListener('scroll',this.scroll);
}
componentWillReceiveProps(nextProps,nextState){
  if(this.props.data !=nextProps.data){
    if(nextProps.data.status==0){
        this.props.push('/');
    }else{
      if(nextProps.data.data.current_page==1){
        this.array.length=0;
        this.setState({pageNum:nextProps.data.data.total_page});
        this.setState({index:1});
      }
      this.array.push(nextProps.data.data.lists);
      this.setState({data:this.array});
      this.setState({bLock:false});
    }
  }
}
//获取用户选择日期
GetUserSelectedDate(date)
{
  cur_date = date;
  this.props.loadwallet(date,1);
}
//屏幕滚动
handleScroll(e){
  let srollPos = window.pageYOffset; //滚动条距顶部距离(页面超出窗口的高度)
  let totalheight = parseFloat(document.documentElement.clientHeight) + parseFloat(srollPos); //屏幕高度+滚动条距顶部距离
  if((document.body.scrollHeight-10) <= totalheight){//屏幕高度+滚动条距顶部距离>页面高度
    //加锁处理
    if(!this.state.bLock){
      this.setState({bLock:true});
      if(this.state.index<this.state.pageNum){
          let index=Number(this.state.index)+1;
          this.setState({index:index});
          this.props.loadwallet(cur_date,index);
      }else {
      }
    }
  }

}
  render(){
    const {data}=this.props;
    return(
      <div>
          <Helmet title="我的钱包"/>
          <Header title="我的钱包" back="/user"/>
          {data &&
              <WalletHead sum_consumption={data.data.sum_consumption} sum_income={data.data.sum_income}  sum_withdrawals={data.data.sum_withdrawals}/>
          }
          {this.state.data.map(function(v,i){
            return <div>
                {(()=>{
                  if(0 == i){
                    return <Wallet type="0" data={this.state.data[i]} key={"key"+i} showTips={true} callbackParent={this.GetUserSelectedDate.bind(this)}/>
                  }
                  else {
                    return <div>
                    {this.state.data[i].map(function(v,i){
                        return  <ConsumeHistory type="0" index="1" month={ month==v.date ? '本月' : v.date} data={v.list}/>
                      })
                    }
                    </div>
                  }
                })()}
            </div>

           }.bind(this))
          }
      </div>
    )
  }
}
