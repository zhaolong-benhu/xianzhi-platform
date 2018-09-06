/**
 * Created by zhaolong on 2016/7/23.
  File description:个人中心-我的关注
 */

'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {Follow,Header,NoContent} from 'components';
import {isLoaded, load as loadfollow,searchFollow} from 'redux/modules/follow';
import { push } from 'react-router-redux';

@connect(
  state => ({
    data: state.follow.data
  }),{searchFollow,loadfollow,push}
)

export default class MyFollow extends Component {
  static propTypes = {
      data: PropTypes.object,
      searchFollow:PropTypes.func.isRequired,
      loadfollow:PropTypes.func.isRequired,
      push:PropTypes.func.isRequired
  }
  state={
    data:[],
    pageNum:0,
    index:1,
    bLock:false,
  };

constructor(props) {
  super(props);
  this.array=[];
  this.scroll = this.handleScroll.bind(this);
}
componentDidMount(){
  window.addEventListener('scroll',this.scroll);
}
componentWillMount(){
  this.props.loadfollow(1);
}
componentWillUnmount(){
  window.removeEventListener('scroll',this.scroll);
}
componentWillReceiveProps(nextProps,nextState){
  if(this.props.data != nextProps.data){
    if(nextProps.data.status=="0"){
        this.props.push('/');
    }else{
        if(nextProps.data.data.current_page == 1){
          this.array.length=0;
          this.setState({pageNum:nextProps.data.data.total_page});
          this.setState({index:1});
        }
        this.array.push(nextProps.data.data.list);
        this.setState({data:this.array});
        this.setState({bLock:false});
      }
  }
}
  //滚动条加载数据
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
          this.props.loadfollow(index);
      }else {
      }
    }
  }

}
//接收子组件传递消息
getUserSearch(params,type){
  if(type == "cancel"){
    this.props.loadfollow(1);
    document.documentElement.style.overflow='visible';
    document.body.style.overflow='visible';//手机版设置这个。
  }
  else if(type == "noscroll"){
    document.documentElement.style.overflow='hidden';
    document.body.style.overflow='hidden';//手机版设置这个。
  }
  else {
    document.documentElement.style.overflow='visible';
    document.body.style.overflow='visible';//手机版设置这个。
    this.array.length=0;
    this.props.searchFollow(params);
  }
}
  	render(){
      const {data}=this.props;
		  return (
  			   <div>
            <Helmet title="我的关注"/>
            <Header title="我的关注" back="/user"/>
              {data &&
                <div>
                  {(()=>{
                    if(data.data.total_num == 0){
                      return <NoContent text="您还没有关注哦！"/>
                    }
                    else{
                      return <div>
                        {this.state.data.map(function(value,index){
                          return <Follow data={this.state.data[index]} index={index}  callbackParent={this.getUserSearch.bind(this)}/>
                        }.bind(this))}
                      </div>
                    }
                  })()}
                </div>
              }
  		    </div>
  		)
  	}
}
