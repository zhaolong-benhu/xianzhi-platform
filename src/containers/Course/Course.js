/**
 * Created by zhaolong on 2016/7/10.
 * File description:线下公开课列表
 */
'use strict';

import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {CourseList,Header,CourseScreen,NoContent} from 'components';
import {isLoaded, load as loadCategory} from 'redux/modules/category';
import { asyncConnect } from 'redux-async-connect';
import { courseList as getData } from 'redux/modules/openclass';
import {xz_search_api} from '../../api/common/Global';
const styles = require('./Course.scss');

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
    course:state.openclass.courseData
  }),
  {getData}
)
export default class Course extends Component {
  state={
    data:[],
    pageNum:0,
    index:1,
    bLock:false,
    total_num:0,
    nodata:false,
    type:0
  }
  static propTypes = {
      course: PropTypes.object,
      getData: PropTypes.func.isRequired
  }
  constructor(props) {
      super(props);
      this.array=[];
      this.params=[];
      this.scroll = this.handleScroll.bind(this);
  }
  componentWillMount(){
    const routes=this.props.params.id ? this.props.params.id.split("-") : 0;
    const params={
      order:routes[1] || 1,
      class_id:routes[0] || 0,
      type:12,
      status:routes[2] || 0,
      page:1
    }
    this.setState({type:this.props.params.id ? 0 : 1});
    this.params=params;
    this.props.getData(params);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.course !=nextProps.course){
      if(nextProps.course.current_page==1){
        this.array.length=0;
        this.setState({index:1});
        this.setState({pageNum:nextProps.course.total_page});
        this.setState({total_num:nextProps.course.total_num});
      }
      this.array.push(nextProps.course.list);
      this.setState({data:this.array});
      this.setState({bLock:false});
    }
  }
  componentDidMount(){
    window.addEventListener('scroll',this.scroll);
    var oMeta = document.getElementsByTagName("meta");
    oMeta[1]["content"] = "酒店公开课、酒店线下课程，酒店经营，酒店外训，酒店总经理培训，酒店研讨会，酒店论坛讲座，先之云课堂公开课，先之教育培训，酒店培训讲师，酒店绩效管理。";
    oMeta[2]["content"] = "先之云课堂线下公开课涵盖酒店行业的大咖讲师，通过酒店讲师面得面教学方式专门为酒店总经理，酒店财务等酒店高管人才，提供酒店经营、酒店筹建、酒店财务等酒店热点课程。所有课程进行线下培训课程的类型，帮助酒店行业培训和督导";
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.scroll);
  }
  //屏幕滚动
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
  //菜单选项控制
  handleMenuOptions(option){
    this.setState({nodata:false});
    this.params=option;
    this.props.getData(option);
    document.getElementsByTagName('body')[0].scrollTop = 0;
  }
	render(){
      const {course,category} = this.props;
		  return (
  			   <div>
  		        <Helmet title="线下公开课"/>
                <Header title="线下公开课"  back={this.state.type==1 ? "/" : "/category/1"}/>
  		        <div className="container">
                {course &&
                  <div className={styles.course}>
                    <CourseScreen data={category} url="/gongkaike/list" type="12" total_num={this.state.total_num}  callbackParent={this.handleMenuOptions.bind(this)} params={this.props.params.id}/>
                    {this.state.data.map(function(v,i){
                      return   <CourseList data={v} classification="curriculum" type="0"/>
                    }.bind())}
                    {(()=>{
                      if(course.total_num == 0){
                        return <NoContent text="暂时没有可以学习的公开课" background="#ffffff"/>
                      }
                    })()}
                  </div>
                }
  		        </div>

              {(()=>{
                if(this.state.nodata){
                  return <div className={styles.nodata}>没有更多课程</div>
                }
              })()}
  		    </div>
  		);
  	}
}
