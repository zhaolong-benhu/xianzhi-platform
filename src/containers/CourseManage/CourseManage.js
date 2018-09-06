/**
 * Created by zhaolong on 2016/9/13
 * File description:个人中心-导师上传传奇
 */
 'use strict';
 import React,{Component,PropTypes} from 'react';
 import Helmet from 'react-helmet';
 import {Header,NoContent,Contactus} from 'components';
 import {TeacherCourseList} from 'containers';
 import {connect} from 'react-redux';
 import {isLoaded, load as loadcourse} from 'redux/modules/course';
 const styles = require('./CourseManage.scss');

 @connect(
   state => ({
     data:state.course.data
   }),
   {loadcourse}
 )

export default class CourseManage extends Component {

  static propTypes = {
      data: PropTypes.array,
      loadcourse: PropTypes.func.isRequired
  }
  state={
    data:[],
    index:1,
    pageNum:0,
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
  componentWillUnmount(){
    window.removeEventListener('scroll',this.scroll);
  }
  componentWillMount(){
    this.props.loadcourse(1);
  }
  componentWillReceiveProps(nextProps,nextState){
    if(this.props.data !=nextProps.data){
      if(nextProps.data.current_page==1){
        this.array.length=0;
        this.setState({pageNum:nextProps.data.total_page});
        this.setState({index:1});
      }
      this.array.push(nextProps.data.list);
      this.setState({data:this.array});
      this.setState({bLock:false});
    }
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
          this.setState({index:this.state.index+1});
          this.props.loadcourse(this.state.index);
      }else {
      }
    }
  }
}
  render(){
    const {data}=this.props;
    return(
      <div className={styles.container}>
        <Helmet title="上传课程管理"/>
        <Header title="上传课程管理"  back="/user"/>
        {data &&
          <div className={styles.course}>
            {(()=>{
              if(data.length == 0){
                return <NoContent text="您还没有上传过课程哦,快去上传吧!"/>
              }
              else
              {
                return <div>
                  {this.state.data.map(function(value,index){
                    return <TeacherCourseList data={this.state.data[index]}/>
                  }.bind(this))}
                </div>
              }
            })()}
          </div>
        }

        <div className={styles.float_bottom}>
           <Contactus text="上传课程请联系我们："/>
        </div>

      </div>
    )
  }
}
