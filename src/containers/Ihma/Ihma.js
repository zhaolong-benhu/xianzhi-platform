/**
 * Created by zhaolong on 2016/11/14
 * File description:首页-IHMA证书
 */
'use strict';
import React, { Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header,IhmaList,Warning,CourseScreen,NoContent} from 'components';
import {connect} from 'react-redux';
import {asyncConnect } from 'redux-async-connect';
import {isLoaded,category,ihmaList as getData} from 'redux/modules/ihma';
import {Link} from 'react-router';
const styles = require('./Ihma.scss');

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
      // if (!isLoaded(getState())) {
         return dispatch(category());
      // }
  }
}])
@connect(
  state => ({
    category:state.ihma.category,
    ihma:state.ihma.ihmaData
}),{getData}
)
export default class Ihma extends Component{
    state={
      data:[],
      pageNum:0,
      index:1,
      bLock:false,
      total_num:0,
      nodata:false
    }
	static propTypes = {
			category:PropTypes.object,
      ihma: PropTypes.object,
      getData: PropTypes.func.isRequired
	}
    componentWillMount(){
      const routes=this.props.params.id ? this.props.params.id.split("-") : 0;
      const params={
        position:routes[0] || 0,
        quarters:routes[1] || 0,
        page:1
      }
      this.params=params;
      this.props.getData(params);
    }
    componentWillReceiveProps(nextProps){
      if(this.props.ihma !=nextProps.ihma){
        if(nextProps.ihma.current_page==1){
          this.array.length=0;
          this.setState({index:1});
          this.setState({pageNum:nextProps.ihma.total_page});
          this.setState({total_num:nextProps.ihma.total_num});
        }
        this.array.push(nextProps.ihma.list);
        this.setState({data:this.array});
        this.setState({bLock:false});
      }
    }
    constructor(props) {
        super(props);
        this.array=[];
        this.params=[];
        this.scroll = this.handleScroll.bind(this);
    }
    componentDidMount(){
      window.addEventListener('scroll',this.scroll);
    }
    componentWillUnmount(){
      window.removeEventListener('scroll',this.scroll);
    }
    //滚动条加载数据
    handleScroll(e){
      let srollPos = window.pageYOffset; //滚动条距顶部距离(页面超出窗口的高度)
      let totalheight = parseFloat(document.documentElement.clientHeight) + parseFloat(srollPos); //屏幕高度+滚动条距顶部距离
      if((document.body.scrollHeight-10) <= totalheight){//屏幕高度+滚动条距顶部距离>页面高度
        //加锁处理
        if(!this.state.bLock){
          if(this.state.index<this.state.pageNum){
            let index=Number(this.state.index)+1;
            this.setState({bLock:true});
            this.setState({index:index});
            this.params.page=index;
            this.props.getData(this.params);
          }else {
              if(this.array.length>10){
                this.setState({nodata:true});
              }
          }
        }
      }
    }
	//选项卡回调参数
  handleMenuOptions(option){
      this.setState({nodata:false});
      this.params=option;
      this.props.getData(option);
      document.getElementsByTagName('body')[0].scrollTop = 0;
	}
	render(){
        const {ihma,category} = this.props;
		return(
				<div>
				 <Helmet title="IHMA证书"/>
				 <Header title="IHMA证书" back='/'/>
             {ihma &&
                 <div className={styles.container}>
    				         <CourseScreen data={category} url="/ihma" type="3" total_num={this.state.total_num}  callbackParent={this.handleMenuOptions.bind(this)} params={this.props.params.id}/>
                     {this.state.data.map(function(v,i){
                       return  <IhmaList key={'list-'+i} data={v}/>
                     }.bind())}
                     {(()=>{
                       if(ihma.total_num == 0){
                         return <NoContent text="暂时没有可以报名岗位胜任能力证书" background="#ffffff"/>
                       }
                     })()}
                 </div>
              }
              {(()=>{
                if(this.state.nodata){
                  return <div className={styles.nodata}>没有更多IHMA证书</div>
                }
              })()}
            </div>
      )
    }
  }
