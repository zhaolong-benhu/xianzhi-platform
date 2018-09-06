/**
 * Created by zhaolong on 2016/7/23.
  File description:个人中心-我的公开课
 */

'use strict';
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Header,CourseList,NoContent} from 'components';
import {isLoaded, load as loadopenclass} from 'redux/modules/openclass';
import { push } from 'react-router-redux';
const styles = require('../User.scss');

@connect(
  state => ({
    data: state.openclass.data
  }), {loadopenclass,push}
)

export default class MyOpenClass extends Component{
  state={
      data:[],
      pageNum:0,
      index:1,
      bLock:false
  };
  static propTypes = {
      data: PropTypes.object,
      loadopenclass:PropTypes.func.isRequired,
      push:PropTypes.func.isRequired
  }
  componentWillMount(){
    this.props.loadopenclass(1);
  }
  componentWillReceiveProps(nextProps,nextState){
    if(this.props.data !=nextProps.data){
      if(nextProps.data.status==0){
          this.props.push('/');
      }else{
            if(nextProps.data.data.current_page==1)
              this.array.length=0;
            this.array.push(nextProps.data.data.list);
            this.setState({pageNum:nextProps.data.data.total_page});
            this.setState({data:this.array});
            this.setState({bLock:false});
          }
       }
  }
  constructor(props) {
      super(props);
      this.array = [];
      this.scroll = this.handleScroll.bind(this);
  }
  componentDidMount(){
    //添加滚动条事件
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
        this.setState({bLock:true});
        if(this.state.index<this.state.pageNum){
            let index=Number(this.state.index)+1;
            this.setState({index:index});
            this.props.loadopenclass(index);
        }else {
        }
      }
    }
  }

  	render(){
      const {data} = this.props;
		  return (
  			   <div>
             <Helmet title="我的公开课"/>
             <Header title="我的公开课" back="/user" line="1"/>
             {data &&
               <div className={styles.course}>
                 {(()=>{
                   if(data.data.total_num == 0)
                   {
                     return <NoContent text="您还没有报名参加公开课哦，快去参加哟！"/>
                   }else{
                     return <div>
                     {this.state.data.map(function(v,i){
                        return <CourseList data={this.state.data[i]} key={"key"+i} classification="curriculum" type="0"/>
                      }.bind(this))
                     }
                     </div>
                    // return <CourseList data={openclass.list}  classification="curriculum" type="0"/>
                   }
                 })()}
               </div>
             }
  		    </div>
  		)
  	}
}
