/**
 * Created by same on 2016/06/23.
 * File description:其他活动列表页面
 */
'use strict';
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header} from 'components';
import {connect} from 'react-redux';
import { list } from 'redux/modules/activity';
import {CourseList,Warning,Slider,NoContent} from 'components';
import {loadBanner} from 'redux/modules/home';
import {asyncConnect} from 'redux-async-connect';
import {activity_banner} from '../../api/common/Global';
const styles = require('./OtherActivities.scss');
@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    return dispatch(loadBanner(activity_banner));
  }
}])
@connect(
  state => ({
    data: state.activity.list,
    banner: state.home.banner,
  }),{list}
)
export default class OtherActivities extends Component {
  static propTypes = {
    data:PropTypes.object,
    banner:PropTypes.object,
    list: PropTypes.func.isRequired
  };
  state={
      data:[],//数据
      pageNum:0,//页数
      index:1,//索引
      bLock:false,//翻页加锁标识
      type:0,//类型
      classification_select_index:0,//菜单选择
      bShownoactity:false,//是否显示没有更多活动
      tips:"",//文本提示内容
      bResult:false//数据请求是否完成
  };
  //条目定义
  static defaultProps = {
    classification:[
      {name:"全部"},
      {name:"峰会"},
      {name:"展会"},
      {name:"沙龙"},
      {name:"学习考察"}
    ]
  };
  componentWillMount(){
    switch (Number(this.id)) {
      case 1:
        this.type=13;
        break;
      case 2:
        this.type=14;
        break;
      case 3:
        this.type=15;
        break;
      case 4:
        this.type=16;
        break;
      default:
        this.type=0;
        break;
    }
    if(this.type==0){
      this.props.list(0,1,1);
    }else{
      this.props.list(this.type,1);
    }
    this.setState({type:this.type});
  }
  componentWillReceiveProps(nextProps,nextState){
    if(this.props.data !=nextProps.data){
      if(nextProps.data.current_page==1){
        this.array.length=0;
        this.setState({index:1});
        this.setState({pageNum:nextProps.data.total_page});
      }
      this.array.push(nextProps.data.list);
      this.setState({data:this.array,bResult:true});
      this.setState({bLock:false});
    }
  }
  constructor(props) {
      super(props);
      this.array=[];
      this.id=this.props.params.id || 0;
      this.type=0;
      this.back = null;
      this.scroll = this.handleScroll.bind(this);
  }
  componentDidMount(){
    //添加滚动条事件
    window.addEventListener('scroll',this.scroll);
    //设置条目位置
    this.setState({classification_select_index:this.id});
    if(localStorage.oldbackUrl){
      this.back=localStorage.oldbackUrl;
    }
    var oMeta = document.getElementsByTagName("meta");
    oMeta[1]["content"] = "酒店活动、峰会、展会、沙龙、学习考察";
    oMeta[2]["content"] = "先之云课堂活动涉及酒店行业的聚会以及各类型活动进行线下交流，帮助酒店行业培训督导";
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
            if(this.state.type==0)
              this.props.list(0,index,1);
            else
              this.props.list(this.state.type,index);
        }else {
            if(this.array.length>10){
                this.setState({bShownoactity:true});
            }
        }
      }
    }
  }
  //条目点击事件
  ClickedClassification(index){
    this.setState({classification_select_index:index,bShownoactity:false,bResult:false});
    this.setState({index:1});
    switch (index){
      case 0://所有
      {
        this.setState({type:0,tips:"没有更多活动"});
        this.props.list(0,1,1);
      }break;

      case 1:{//峰会
        this.setState({type:13,tips:"没有更多峰会"});
        this.props.list(13);
        ga('send','event','fenghui','detail-1','huodong');
      }break;

      case 2:{//展会
        this.setState({type:14,tips:"没有更多展会"});
        this.props.list(14);
        ga('send','event','zhanhui','detail-1','huodong');
      }break;

      case 3:{//沙龙
        this.setState({type:15,tips:"没有更多沙龙"});
        this.props.list(15);
        ga('send','event','shalong','detail-1','huodong');
      }break;

      case 4:{//学习考察
        this.setState({type:16,tips:"没有更多学习考察"});
        this.props.list(16);
        ga('send','event','kaocha','detail-1','huodong');
      }break;
    }
  }

  render(){
    const {banner} = this.props;
    return(
      <div>
        <Helmet title="其他活动"/>
        <Header title="其他活动" back="/"/>

        <div className={styles.activities}>
          {(()=>{
            if(this.props.banner){
            return <Slider data={this.props.banner} time="3000"/>
            }
          })()}
          <div className={styles.item}>
            {this.props.classification.map(function(value,index){
              return  <div className={this.state.classification_select_index==index? styles.nav_selected:styles.nav} key={'classification'+index} onClick=
                {this.ClickedClassification.bind(this,index)}>{value.name}
              </div>
            }.bind(this))}
          </div>
          {this.state.data.map(function(data,i){
            return <CourseList data={this.state.data[i]} classification="activity" active_type={this.state.type} />
          }.bind(this))}
          {(()=>{
            var tips = "暂时没有更多活动";
            if(this.state.data && this.state.data[0] && this.state.data[0].length == 0 && this.state.bResult){
              switch (this.state.classification_select_index) {
                case 0:
                  tips = "暂时没有任何活动";
                  break;
                case 1:
                  tips = "暂时没有峰会活动";
                  break;
                case 2:
                  tips = "暂时没有展会活动";
                  break;
                case 3:
                  tips = "暂时没有沙龙活动";
                  break;
                case 4:
                  tips = "暂时没有学习考察活动";
                  break;
                default:
              }
              return <NoContent text={tips} type="activity" background="#ffffff"/>
            }
          })()}

          <div>{this.classification_select_index}</div>
        </div>
        {(()=>{
          if(this.state.bShownoactity){
          return <div className={styles.noactivity}>{this.state.tips}</div>
          }
        })()}
      </div>
    )
  }

}
