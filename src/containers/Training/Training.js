/**
 * Created by zhaolong on 2016/9/9
 * File description:导师列表页
 */
'use strict';
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Tutor,Header,CourseScreen,NoContent} from 'components';
import {isLoaded, load as loadCategory} from 'redux/modules/category';
import { asyncConnect } from 'redux-async-connect';
import { List as getData } from 'redux/modules/train';
const styles = require('../User/User.scss');
@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadCategory());
    }
  }
}])

@connect(
  state => ({
    category: state.category.data,
    tutor:state.train.trainData
  }),
  {getData}
)
export default class Training extends Component {
  state={
    data:[],
    pageNum:-1,
    index:1,
    bLock:false,
    total_num:-1,
    nodata:false,
    bNotutor:false,
    type:0
  }
  static propTypes = {
      tutor: PropTypes.object,
      getData: PropTypes.func.isRequired
  }

  componentWillMount(){
    const routes=this.props.params.id ? this.props.params.id.split("-") : 0;
    const params={
      order:routes[1] || 1,
      class_id:routes[0] || 0,
      type:11,
      status:routes[2] || 0,
      page:1
    }
    this.setState({type:this.props.params.id ? 0 : 1});
    this.params=params;
    this.props.getData(params);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.tutor !=nextProps.tutor){
      if(nextProps.tutor.total_num==0){
          this.setState({bNotutor:true});
      }
      if(nextProps.tutor.current_page==1)
      {
        this.array.length=0;
        this.setState({index:1});
        this.setState({pageNum:nextProps.tutor.total_page});
        this.setState({total_num:nextProps.tutor.total_num});
      }
      this.array.push(nextProps.tutor.list);
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
    oMeta[1]["content"] = "酒店内训、酒店名师、酒店培训讲师、餐饮讲师、客房讲师、酒店员工培训机构、酒店专业机构、酒店培训机构、酒店胜任力学习。";
    oMeta[2]["content"] = "先之云课堂酒店内训，集齐酒店300多位拥有多年酒店实战经验的讲师，针对酒店提供的经营问题，酒店服务等问题，匹配对应的酒店讲师，通过面对面教学的方式帮助中国酒店业建立真正具有国际化水准的人力资源及培训体系";
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
            this.setState({nodata:true});
        }
      }
    }
  }
  //筛选器点击事件
  handleMenuOptions(option){
    this.params=option;
    this.props.getData(option);
    document.getElementsByTagName('body')[0].scrollTop = 0;
  }
  render(){
    const {category,tutor} = this.props;

    return(
      <div>
        <Helmet title="导师"/>
        <Header title="导师" back={this.state.type==1 ? "/" : "/category/2"}/>
        <div className={styles.training}>
          {tutor &&
          <CourseScreen data={category} url="/neixun/list" type="11" total_num={this.state.total_num} callbackParent={this.handleMenuOptions.bind(this)} params={this.props.params.id}/>
          }
          {this.state.data.map(function(v,i){
            return <Tutor key={"traing"+i} data={v}/>
          }.bind())}
          {(()=>{
            if(this.state.bNotutor){
              return <NoContent text="暂时没有可以预约的导师" background="#ffffff"/>
            }
          })()}
        </div>
        {(()=>{
          if(this.state.nodata && this.state.total_num>10){
            return <div className={styles.nodata}>没有更多内训导师</div>
          }
        })()}
      </div>
    )
  }
}
