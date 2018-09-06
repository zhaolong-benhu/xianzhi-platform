/**
 * Created by zhaolong on 2016/8/10.
 * File description:在现课程详情
 */
'use strict';
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {CourseList,Header,CourseScreen,OnlineCourses,NoContent} from 'components';
import {isLoaded, load as loadCategory} from 'redux/modules/category';
import { asyncConnect } from 'redux-async-connect';
import { courseList as getData } from 'redux/modules/course';
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
    course:state.course.courseData
  }),
  {getData}
)

export default class LineCourse extends Component {
    static propTypes = {
        course: PropTypes.object,
        category:PropTypes.object,
        getData:PropTypes.func.isRequired
    }
     state={
       title:'筛选',
       order_name:'综合排序',
       data:[],//所有数据
       pageNum:0,//页数
       index:1,//索引
       bLock:false,//翻页加锁判断
       total_num:0,//总数量
       type:0//类型
     };
     componentWillMount(){
       const routes=this.props.params.id ? this.props.params.id.split("-") : 0;
       const params={
         order:routes[1] || 1,
         class_id:routes[0] || 0,
         type:routes[2] || 0,
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
     constructor(props) {
         super(props);
         this.array=[];
         this.params=[];
         this.type=0;
         this.scroll = this.handleScroll.bind(this);
     }
     componentDidMount(){
       window.addEventListener('scroll',this.scroll);
       var oMeta = document.getElementsByTagName("meta");
       oMeta[1]["content"] = "酒店管理培训、客房个性化服务、客房培训、餐饮个性化服务、餐饮培训、前厅教学、客房课程、客房教学、客房视频、客房培训、酒店营销、餐饮平常、酒店人力资源、酒店工程、酒店人力资源。";
       oMeta[2]["content"] = "先之云课堂在线课程涵盖酒店行业的各岗位培训课程，通过在线学习的方式进行线上培训，帮助酒店节省酒店培训成本帮助酒店行业培训及提升酒店服务质量。";
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
           }
         }
       }
     }
     //菜单选项事件
     handleMenuOptions(option){
       this.params=option;
       this.props.getData(option);
       document.getElementsByTagName('body')[0].scrollTop = 0;
     }
  	render(){
      const {category,course} = this.props;
		  return (
  			<div>
  		      <Helmet title="在线课程"/>
              <Header title="在线课程" back={this.state.type==1 ? "/" : "/category/3"}/>
              {course &&
    		        <div className="container">
                  <CourseScreen data={category}  url="/kecheng/list" type="1" total_num={this.state.total_num}  callbackParent={this.handleMenuOptions.bind(this)} params={this.props.params.id} />
                  <div className={styles.linecourse}>
                    {this.state.data.map(function(v,i){
                      return   <OnlineCourses data={v}/>
                    }.bind())}
                    {(()=>{
                      if(course.total_num == 0){
                        return <NoContent text="暂时没有可以学习的课程" background="#ffffff"/>
                      }
                    })()}
                  </div>
    		        </div>
              }
  		    </div>
  		);
  	}
}
