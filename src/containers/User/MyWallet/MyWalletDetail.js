/**
 * Created by zhaolong on 2016/8/5.
 * File description:我的钱包详情页
 */
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header,WalletHeadDetail,Wallet,ConsumeHistory} from 'components';
import {isLoaded, load as loadwalletdetail} from 'redux/modules/walletdetail';
import {connect} from 'react-redux';

let Stamp = new Date();
let year = Stamp.getFullYear();
let month = Stamp.getMonth()+1;
if(month>=1 && month<=9){
   month = "0" + month;
}
var cur_date = year+"-"+month;

@connect(
  state => ({
    data: state.walletdetail.data
  }),{loadwalletdetail}
)

export default class MyWalletDetail extends Component{
  static propTypes = {
      data: PropTypes.object,
      loadwalletdetail:PropTypes.func.isRequired
  }

  state={
    text:"总收入",
    data:[],
    pageNum:0,
    index:1,
    bLock:false,
  }
  constructor(props) {
    super(props);
    this.array=[];
    this.back = null;
    this.scroll = this.handleScroll.bind(this);
  }
  componentDidMount(){
    if(localStorage.oldbackUrl){
      this.back=localStorage.oldbackUrl;
    }
    window.addEventListener('scroll',this.scroll);
  }
  componentWillMount(){
    if(1 == this.props.params.id)
    {
      this.setState({text:"总消费(元)"});
    }
    if(2 == this.props.params.id)
    {
      this.setState({text:"总收入(元)"});
    }
    if(3 == this.props.params.id)
    {
      this.setState({text:"累计提现(元)"});
    }
    this.props.loadwalletdetail(this.props.params.id,cur_date,1);
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.scroll);
  }
  //获取用户选择日期
  GetUserSelectedDate(date){
    this.props.loadwalletdetail(this.props.params.id,date,1);
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
            this.props.loadwalletdetail(this.props.params.id,cur_date,index);
        }else {
        }
      }
    }
  }
  componentWillReceiveProps(nextProps,nextState){
    if(this.props.data !=nextProps.data){
      if(nextProps.data.current_page==1){
        this.array.length=0;
        this.setState({pageNum:nextProps.data.total_page});
        this.setState({index:1});
      }
      this.array.push(nextProps.data.lists);
      this.setState({data:this.array});
      this.setState({bLock:false});
    }
  }
  render(){
    const {data}=this.props;
    var type = "";
    if(data){
      var money = "0";
      if(1 == this.props.params.id){
        money =data.sum_consumption;
      }
      if(2 == this.props.params.id){
        money = data.sum_income;
      }
      if(3 == this.props.params.id){
        money = data.sum_withdrawals;
        type = "carrymoney";
      }
    }
    return(
      <div>
        <Helmet title="我的钱包"/>
        <Header title="我的钱包" back={this.back}/>
        {data &&
            <WalletHeadDetail text={this.state.text} money={money}/>
        }
        {this.state.data.map(function(v,i){
            return <div>
              {(()=>{
                if(0 == i){
                  return <Wallet type={type} data={this.state.data[i]} key={"key"+i} showTips={false} callbackParent={this.GetUserSelectedDate.bind(this)}/>
                }
                else {
                  return <div>
                  {this.state.data[i].map(function(v,i){
                      return  <ConsumeHistory type={type} index="1" month={ month==v.date ? '本月' : v.date} data={v.list}/>
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
