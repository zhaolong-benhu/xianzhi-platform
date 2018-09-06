/**
 * Created by same on 2016/8/13.
 */

'use strict';
import React, { Component,PropTypes } from 'react';
import Helmet from 'react-helmet';
import {Header,ThinkTank,CourseScreen} from 'components';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { category,isClassed,list as getData } from 'redux/modules/thinktank';
import {imageUrl} from '../../api/common/Global';
const styles = require('./Document.scss');
@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
      if (!isClassed(getState())) {
         return dispatch(category());
      }
  }
}])

@connect(
  state => ({
    doclist:state.thinktank.doclist,
    category:state.thinktank.category
  }),
  {getData}
)

export default class Document extends Component {
  state={
      data:[],
      pageNum:0,
      index:1,
      bLock:false,
      total_num:0,
      tips_display:true
  };
  static propTypes = {
      doclist: PropTypes.object,
      category:PropTypes.object,
      getData: PropTypes.func.isRequired
  }
  componentWillMount(){
    const routes=this.props.params.id ? this.props.params.id.split("-") : 0;
    const params={
      order:routes[1] || 1,
      category_id:routes[0] || 0,
      page:1
    }
    this.params=params;
    this.props.getData(params);
  }
  componentWillReceiveProps(nextProps,nextState){
    if(this.props.doclist !=nextProps.doclist){
      if(nextProps.doclist.current_page==1){
        this.array.length=0;
        this.setState({index:1});
        this.setState({pageNum:nextProps.doclist.total_page});
        this.setState({total_num:nextProps.doclist.total_num});
      }
      this.array.push(nextProps.doclist.list);
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
    var oMeta = document.getElementsByTagName("meta");
    oMeta[1]["content"] = "酒店培训资料, 酒店资料网，酒店资料文档，酒店规则制度，酒店岗位职责，酒店活动方案，前厅培训资料、客房资料、餐饮资料、餐饮英语、酒店人事资料、酒店财务资料、酒店营销资料";
    oMeta[2]["content"] = "先之智库原为迈点智库是酒店行业最大的资料下载站,拥有酒店前厅、客房、餐饮、财务、工程、安全、人力、公关等各个酒店部门的培训资料，规章制度，岗位职责，活动方案，计划总结，管理知识等实用资料,为用户提供阅读下载服务。";
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.scroll);
  }
  //滚动条加载数据
  handleScroll(e){
    this.setState({tips_display:false});
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
        }
      }
    }
  }
  handleMenuOptions(option){
    this.params=option;
    this.props.getData(option);
    document.getElementsByTagName('body')[0].scrollTop = 0;
  }
  close(){
    this.setState({tips_display:false});
  }
	render(){
    const {category} = this.props;
		return(
			<div>
        <Helmet title="智库"/>
        <Header title="智库" back="/"/>
        <CourseScreen data={category} url="/papers/list" type="22" total_num={this.state.total_num} callbackParent={this.handleMenuOptions.bind(this)}   params={this.props.params.id}/>
        {/* <div className={styles.tips}>智库文档将陆续更新，敬请关注！</div> */}
        {(()=>{
          if(this.state.tips_display)
          {
            return <div className={styles.tips}>
                        <span className={styles.text}>智库文档将陆续更新，敬请关注！</span>
                        <img src={imageUrl+"/images/close.png"} className={styles.close} onClick={this.close.bind(this)}/>
                  </div>
          }
        })()}

        <div className={this.state.tips_display?styles.document:styles.document2}>
          {this.state.data.map(function(v,i){
            return <ThinkTank data={v}/>
          })}
        </div>
			</div>
		)
	}
}
