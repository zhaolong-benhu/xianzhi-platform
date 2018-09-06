/**
 * Created by zhaolong on 2016/7/23.
  File description:个人中心-系统消息
 */

'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header,MessageList} from 'components';
import {loaded,loaded_ord, loadsysdata as loadsysmessage,loadorddata as loadordmessage} from 'redux/modules/sysmessage';
import {connect} from 'react-redux';
import {asyncConnect } from 'redux-async-connect';
import { push } from 'react-router-redux';
const styles = require('./SysMessage.scss');

@connect(
  state => ({
    sysmessage: state.sysmessage.data,
    ordmessage: state.sysmessage.data,
    isloaded: state.sysmessage.loaded,
    isloaded_ord:state.sysmessage.loaded_ord
  }),{loadsysmessage,loadordmessage,push}
)

export default class SysMessage extends Component {

  static propTypes = {
      sysmessage: PropTypes.object,
      ordmessage: PropTypes.object,
      isloaded: PropTypes.bool,
      isloaded_ord: PropTypes.bool,
      loadsysmessage:PropTypes.func.isRequired,
      loadordmessage:PropTypes.func.isRequired,
      push:PropTypes.func.isRequired
  }
  state={
    title:"通知",
    ordmessage:[],
    sysmessage:[],
    pageNum:0,
    index:1,
    bLock:false,
    nodata:false
  }
  constructor(props) {
    super(props);
    this.array=[];
    this.array2=[];
    this.scroll = this.handleScroll.bind(this);
  }
  componentDidMount(){
    window.addEventListener('scroll',this.scroll);
  }
  componentWillMount(){
    if(1 == this.props.params.id){ //系统消息
      //if(!this.props.isloaded){
        this.props.loadsysmessage(1);
      //}
    }
    else {                        //普通消息
      //if(!this.props.isloaded_ord){
        this.props.loadordmessage(1);
      //}
    }
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.scroll);
  }
  componentWillReceiveProps(nextProps,nextState){
      if(1 == this.props.params.id){
        if(this.props.sysmessage !=nextProps.sysmessage){
          if(nextProps.sysmessage.status==0){
              this.props.push('/');
          }else{
            if(nextProps.sysmessage.data.current_page==1){
              this.array.length=0;
              this.setState({pageNum:nextProps.sysmessage.data.total_page});
              this.setState({index:1});
            }
            this.array.push(nextProps.sysmessage.data.list);
            this.setState({sysmessage:this.array});
            this.setState({bLock:false});
        }
        }
      }
      else {
        if(this.props.ordmessage !=nextProps.ordmessage){
          if(nextProps.ordmessage.status==0){
              this.props.push('/');
          }else{
            if(nextProps.ordmessage.data.current_page==1){
              this.array2.length=0;
              this.setState({pageNum:nextProps.ordmessage.data.total_page});
              this.setState({index:1});
            }
            this.array2.push(nextProps.ordmessage.data.list);
            this.setState({ordmessage:this.array2});
            this.setState({bLock:false});
          }
        }
     }
  }
  //屏幕滚动
  handleScroll(e){
    let srollPos = window.pageYOffset; //滚动条距顶部距离(页面超出窗口的高度)
    let totalheight = parseFloat(document.documentElement.clientHeight) + parseFloat(srollPos); //屏幕高度+滚动条距顶部距离
    if((document.body.scrollHeight-10) <= totalheight){//屏幕高度+滚动条距顶部距离>页面高度
      //加锁处理
      if(!this.state.bLock){
        if(this.state.index<this.state.pageNum){
            this.setState({bLock:true});
            let index=Number(this.state.index)+1;
            this.setState({index:index});
            if(1 == this.props.params.id){
              this.props.loadsysmessage(index);
            }
            else {
              this.props.loadordmessage(index);
            }
        }else {
          this.setState({nodata:true});
        }
      }
    }
  }

  	render(){
      const {sysmessage,ordmessage} = this.props;
		  return (
        <div className={styles.notice}>
          <Helmet title={this.props.params.id == 1 ? "系统提醒" : "通知"}/>
          <Header title={this.props.params.id == 1 ? "系统提醒" : "通知"} back="/user"/>
          {(()=>{
              if(this.props.params.id == 1){
                return  <div className={styles.allnotice}>
                              {this.state.sysmessage.map(function(value,index){
                                return <MessageList data={this.state.sysmessage[index]}/>
                              }.bind(this))}
                        </div>
              }
              else {
                return <div className={styles.allnotice}>
                          {this.state.ordmessage.map(function(value,index){
                            return <MessageList data={this.state.ordmessage[index]}/>
                          }.bind(this))}
                    </div>
              }
          })()}
          {(()=>{
            if(this.state.nodata){
              if(this.array.length >1 || this.array2.length>1){
                return <div className={styles.nodata}>亲，没有更多内容了~</div>
              }
            }
          })()}
        </div>
  		)
  	}
}
