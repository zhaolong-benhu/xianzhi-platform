/**
 * Created by zhaolong on 2016/7/26.
 * File description:搜索页面
 */
import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {postData} from 'redux/modules/page';
import Helmet from 'react-helmet';
import {home_search} from '../../api/common/Global';
import {CourseList,Tutor,ThinkTank,Train,SingleCourse,CoursePackage,IhmaList}from 'components';
import {LineCourse,Course} from 'containers';
import { push } from 'react-router-redux';
import {imageUrl} from '../../api/common/Global';
const styles = require('./Search.scss');

@connect(
  state => ({
    list:state.page.result
  }),
  {postData,push}
)
export default class Search extends Component {
  static propTypes = {
      list: PropTypes.object,
      postData: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired
  }
  state={
    searchBox_placeholder:"搜索",
    searchResult_data:[],
    showSearchresult:false,

    nResultSelect:0,//用户选择搜索内容
    searchType:"",//分类名称
    pageNum:0,
    index:1,
    bLock:false,
    data:[],

    screenHight:"480",
    //返回为空
    result_isEmpty:false,

    //线下公开课
    openclass_data:[],
    //导师
    tutor_data:[],
    //内训
    train_data:[],
    //峰会
    summit_data:[],
    //展会
    exhibition_data:[],
    //沙龙
    salon_data:[],
    //学习考察
    studyinvestigation_data:[],
    //在线课程
    singlecourse_data:[],
    coursepackage_data:[],
    //IHMA证书
    cert_data:[],
    //智库
    document_data:[],

    //判断所有类别搜索结果标识
    openclass_exist:false,
    tutor_exist:false,
    train_exist:false,
    summit_exist:false,
    exhibition_exist:false,
    salon_exist:false,
    studyinvestigation_exist:false,
    singlecourse_exist:false,
    coursepackage_exist:false,
    cert_exist:false,
    document_exist:false,

    //判断所有类别搜索结果是否有更多标识
    openclass_more:false,
    training_more:false,
    tutor_more:false,
    summit_more:false,
    exhibition_more:false,
    salon_more:false,
    study_investigation_more:false,
    course_more:false,
    product_more:false,
    cert_more:false,
    document_more:false,
    can_move:false,
    bShowClearBtn:false
  }
  //所有条目
  static defaultProps = {
    all_plates:[
      {id:12,name:"线下公开课",img:"/images/search/search1.png",link:"/gongkaike"},
      {id:-3,name:"内训",img:"/images/search/search2.png",link:"/neixun"},
    //   {id:13,name:"峰会",img:"/images/search/search3.png",link:"/OtherActivities"},
      {id:-1,name:"活动",img:"/images/search/search4.png",link:"/OtherActivities"},
      {id:-2,name:"在线课程",img:"/images/search/search5.png",link:"/gongkaike"},
      {id:4,name:"IHMA证书",img:"/images/search/search6.png",link:"/gongkaike"},
      {id:22,name:"智库",img:"/images/search/search7.png",link:"/document"}],
  };
  constructor(props) {
      super(props);
      this.is_more = false;
      this.bFocus = false;
      this.gongkaikeArray = [];
      this.daoshiArray = [];
      this.neixunArray = [];
      this.fenghuiArray = [];
      this.zhanhuiArray = [];
      this.shalongArray = [];
      this.xuexikaochaArray = [];
      this.danmenkechengArray = [];
      this.zhuanyezhengshuArray = [];
      this.zhiyerenzhengArray = [];
      this.zhikuArray = [];
      this.globalSearch = true;
      this.touchmove = this.handleTouchMove.bind(this);
      this.scroll = this.handleScroll.bind(this);
  }
  componentDidMount(){
    this.refs.searchText.focus();//手动触发input的得到焦点事件
    var height = document.body.scrollHeight;
    this.setState({screenHight:height+"px"});
    window.addEventListener('touchmove',this.touchmove);
    window.addEventListener('scroll',this.scroll);
  }
  componentWillUnmount(){
     this.ReleaseResources();
     window.removeEventListener('touchmove',this.touchmove);
     window.removeEventListener('scroll',this.scroll);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.list !== nextProps.list){
        if(nextProps.list.data.total_num==0){
            this.setState({result_isEmpty:true});
        }else{
            this.setState({result_isEmpty:false});

            //公开课
            if(nextProps.list.data.open_class){
                if(nextProps.list.data.current_page==1)
                  this.gongkaikeArray.length=0;
               this.bLock = false;
               this.setState({openclass_exist:true});
               if(this.globalSearch){
                   this.setState({openclass_data:nextProps.list.data.open_class});
               }else {
                   this.gongkaikeArray.push(nextProps.list.data.open_class);
                   this.setState({pageNum:nextProps.list.data.total_page});
                   this.setState({gongkaike_data:this.gongkaikeArray});
               }
            }else{
              this.setState({openclass_exist:false});
              this.setState({openclass_data:[]});
            }
            if(this.is_more){
              if(nextProps.list.data.is_more  && nextProps.list.data.is_more.open_class== 1){
                 this.setState({openclass_more:true});
              }else{
                this.setState({openclass_more:false});
              }
            }
            //内训
            if(nextProps.list.data.training){
                   if(nextProps.list.data.current_page==1)
                     this.neixunArray.length=0;
                  this.bLock = false;
                  this.setState({train_exist:true});
                  if(this.globalSearch){
                      this.setState({train_data:nextProps.list.data.training});
                  }else{
                      this.neixunArray.push(nextProps.list.data.training);
                      this.setState({pageNum:nextProps.list.data.total_page});
                      this.setState({neixun_data:this.neixunArray});
                  }
            }else{
              this.setState({train_exist:false});
              this.setState({train_data:[]});
            }
            if(this.is_more){
              if(nextProps.list.data.is_more && nextProps.list.data.is_more.training == 1){
                 this.setState({training_more:true});
              }else{
                this.setState({training_more:false});
              }
            }

            //导师
            if(nextProps.list.data.teacher){
               if(nextProps.list.data.current_page==1)
                 this.daoshiArray.length=0;
              this.bLock = false;
              this.setState({tutor_exist:true});
              if(this.globalSearch){
                  this.setState({tutor_data:nextProps.list.data.teacher});
              }else {
                  this.daoshiArray.push(nextProps.list.data.teacher);
                  this.setState({pageNum:nextProps.list.data.total_page});
                  this.setState({daoshi_data:this.daoshiArray});
              }
            }else{
              this.setState({tutor_exist:false});
              this.setState({tutor_data:[]});
            }
            if(this.is_more){
              if(nextProps.list.data.is_more && nextProps.list.data.is_more.teacher == 1){
                 this.setState({tutor_more:true});
              }else{
                this.setState({tutor_more:false});
              }
            }

            if(nextProps.list.data.summit){
                if(nextProps.list.data.current_page==1)
                  this.fenghuiArray.length=0;
               this.bLock = false;
               this.setState({summit_exist:true});
               if(this.globalSearch){
                   this.setState({summit_data:nextProps.list.data.summit});
               }else {
                   this.fenghuiArray.push(nextProps.list.data.summit);
                   this.setState({pageNum:nextProps.list.data.total_page});
                   this.setState({fenghui_data:this.fenghuiArray});
               }
            }else{
              this.setState({summit_exist:false});
              this.setState({summit_data:[]});
            }
            if(this.is_more){
              if(nextProps.list.data.is_more && nextProps.list.data.is_more.summit == 1){
                 this.setState({summit_more:true});
              }else{
                this.setState({summit_more:false});
              }
            }

            if(nextProps.list.data.exhibition){
               if(nextProps.list.data.current_page==1)
                 this.zhanhuiArray.length=0;
              this.bLock = false;
              this.setState({exhibition_exist:true});
              if(this.globalSearch){
                  this.setState({exhibition_data:nextProps.list.data.exhibition});
              }else {
                  this.zhanhuiArray.push(nextProps.list.data.exhibition);
                  this.setState({pageNum:nextProps.list.data.total_page});
                  this.setState({zhanhui_data:this.zhanhuiArray});
              }
            }else{
              this.setState({exhibition_exist:false});
              this.setState({exhibition_data:[]});
            }
            if(this.is_more){
              if(nextProps.list.data.is_more && nextProps.list.data.is_more.exhibition == 1){
                 this.setState({exhibition_more:true});
              }else{
                this.setState({exhibition_more:false});
              }
            }

            if(nextProps.list.data.salon){
               if(nextProps.list.data.current_page==1)
                 this.shalongArray.length=0;
              this.bLock = false;
              this.setState({salon_exist:true});
              if(this.globalSearch){
                  this.setState({salon_data:nextProps.list.data.salon});
              }else {
                  this.shalongArray.push(nextProps.list.data.salon);
                  this.setState({pageNum:nextProps.list.data.total_page});
                  this.setState({shalong_data:this.shalongArray});
              }
            }else{
              this.setState({salon_exist:false});
              this.setState({salon_data:[]});
            }
            if(this.is_more){
              if(nextProps.list.data.is_more && nextProps.list.data.is_more.salon == 1){
                 this.setState({salon_more:true});
              }else{
                this.setState({salon_more:false});
              }
            }

            if(nextProps.list.data.study_investigation){
               if(nextProps.list.data.current_page==1)
                 this.xuexikaochaArray.length=0;
              this.bLock = false;
              this.setState({studyinvestigation_exist:true});
              if(this.globalSearch){
                  this.setState({studyinvestigation_data:nextProps.list.data.study_investigation});
              }else{
                  this.xuexikaochaArray.push(nextProps.list.data.study_investigation);
                  this.setState({pageNum:nextProps.list.data.total_page});
                  this.setState({xuexikaocha_data:this.xuexikaochaArray});
              }
            }else{
              this.setState({studyinvestigation_exist:false});
              this.setState({studyinvestigation_data:[]});
            }
            if(this.is_more){
              if(nextProps.list.data.is_more && nextProps.list.data.is_more.study_investigation == 1){
                 this.setState({study_investigation_more:true});
              }else{
                this.setState({study_investigation_more:false});
              }
            }

            if(nextProps.list.data.cert){
                if(nextProps.list.data.current_page==1)
                  this.zhiyerenzhengArray.length=0;
               this.bLock = false;
               this.setState({cert_exist:true});
               if(this.globalSearch){
                   this.setState({cert_data:nextProps.list.data.cert});
               }else {
                   this.zhiyerenzhengArray.push(nextProps.list.data.cert);
                   this.setState({pageNum:nextProps.list.data.total_page});
                   this.setState({zhiyerenzheng_data:this.zhiyerenzhengArray});
               }
            }else{
              this.setState({cert_exist:false});
              this.setState({cert_data:[]});
            }
            if(this.is_more){
              if(nextProps.list.data.is_more && nextProps.list.data.is_more.cert == 1){
                 this.setState({cert_more:true});
              }else{
                this.setState({cert_more:false});
              }
            }

            if(nextProps.list.data.document){
                if(nextProps.list.data.current_page==1)
                  this.zhikuArray.length=0;
               this.bLock = false;
               this.setState({document_exist:true});
               if(this.globalSearch){
                   this.setState({document_data:nextProps.list.data.document});
               }else{
                   this.zhikuArray.push(nextProps.list.data.document);
                   this.setState({pageNum:nextProps.list.data.total_page});
                   this.setState({zhiku_data:this.zhikuArray});
               }
            }else{
              this.setState({document_exist:false});
              this.setState({document_data:[]});
            }
            if(this.is_more){
              if(nextProps.list.data.is_more && nextProps.list.data.is_more.document == 1){
                 this.setState({document_more:true});
              }else{
                this.setState({document_more:false});
              }
            }

            if(nextProps.list.data.course){
               if(nextProps.list.data.current_page==1)
                 this.danmenkechengArray.length=0;
              this.bLock = false;
              this.setState({singlecourse_exist:true});
              if(this.globalSearch){
                  this.setState({singlecourse_data:nextProps.list.data.course});
              }else {
                  this.danmenkechengArray.push(nextProps.list.data.course);
                  this.setState({pageNum:nextProps.list.data.total_page});
                  this.setState({danmenkecheng_data:this.danmenkechengArray});
              }

            }else{
              this.setState({singlecourse_exist:false});
              this.setState({singlecourse_data:[]});
            }
            if(this.is_more){
              if(nextProps.list.data.is_more && nextProps.list.data.is_more.course == 1){
                 this.setState({course_more:true});
              }else{
                this.setState({course_more:false});
              }
            }

            if(nextProps.list.data.product){
               if(nextProps.list.data.current_page==1)
                 this.zhuanyezhengshuArray.length=0;
              this.bLock = false;
              this.setState({coursepackage_exist:true});
              if(this.globalSearch){
                  this.setState({coursepackage_data:nextProps.list.data.product});
              }else {
                  this.zhuanyezhengshuArray.push(nextProps.list.data.product);
                  this.setState({pageNum:nextProps.list.data.total_page});
                  this.setState({zhuanyezhengshu_data:this.zhuanyezhengshuArray});
              }
            }else{
              this.setState({coursepackage_exist:false});
              this.setState({coursepackage_data:[]});
            }
            if(this.is_more){
              if(nextProps.list.data.is_more && nextProps.list.data.is_more.product == 1){
                 this.setState({product_more:true});
              }else{
                this.setState({product_more:false});
              }
            }
        }

   }else{
        this.setState({result_isEmpty:true});
   }
  }
  //滚动条加载数据
  handleScroll(e){
    let srollPos = window.pageYOffset; //滚动条距顶部距离(页面超出窗口的高度)
    let totalheight = parseFloat(document.documentElement.clientHeight) + parseFloat(srollPos); //屏幕高度+滚动条距顶部距离
    if((document.body.scrollHeight-10) <= totalheight){//屏幕高度+滚动条距顶部距离>页面高度
      //加锁处理
      if(!this.bLock){
        this.bLock = true;
        if(this.state.index<this.state.pageNum){
            let index=Number(this.state.index)+1;
            this.setState({index:index});
            let type = this.state.nResultSelect;
            const params={
              search:"",
              page:index,
              type:type
            }
            this.props.postData(params,home_search);
        }else {
        }
      }
    }
  }
  //释放数据资源+还原默认值
  ReleaseResources(){
        this.gongkaikeArray.length = 0;
        this.daoshiArray.length = 0;
        this.neixunArray.length = 0;
        this.fenghuiArray.length = 0;
        this.zhanhuiArray.length = 0;
        this.shalongArray.length = 0;
        this.xuexikaochaArray.length = 0;
        this.danmenkechengArray.length = 0;
        this.zhuanyezhengshuArray.length = 0;
        this.zhiyerenzhengArray.length = 0;
        this.zhikuArray.length = 0;

        this.setState({gongkaike_data:this.gongkaikeArray});
        this.setState({daoshi_data:this.daoshiArray});
        this.setState({neixun_data:this.neixunArray});
        this.setState({fenghui_data:this.fenghuiArray});
        this.setState({zhanhui_data:this.zhanhuiArray});
        this.setState({shalong_data:this.shalongArray});
        this.setState({xuexikaocha_data:this.xuexikaochaArray});
        this.setState({danmenkecheng_data:this.danmenkechengArray});
        this.setState({zhuanyezhengshu_data:this.zhuanyezhengshuArray});
        this.setState({zhiyerenzheng_data:this.zhiyerenzhengArray});
        this.setState({zhiku_data:this.zhikuArray});

       this.bLock = false;
       this.setState({
          openclass_exist:false,
          tutor_exist:false,
          train_exist:false,
          summit_exist:false,
          exhibition_exist:false,
          salon_exist:false,
          studyinvestigation_exist:false,
          singlecourse_exist:false,
          coursepackage_exist:false,
          cert_exist:false,
          document_exist:false
      });
  }
  //取消
  onCancel(){
      if(this.state.showSearchresult){
          this.setState({showSearchresult:false,searchType:"",bShowClearBtn:false});
          this.refs.searchText.value = '';
      }else {
          this.props.push(localStorage.backUrl? localStorage.backUrl : '/');
      }
  }
  //搜索事件
  handleSearch(event){
    event.preventDefault();
    this.setState({result_isEmpty:false});
    this.is_more = true;

    var inputText = this.refs.searchText.value;
    if(inputText == ""){
      this.setState({showSearchresult:false});
    }else {
      const params={
        search:inputText,
        type:this.state.nResultSelect
      }
      this.props.postData(params,home_search);
      this.setState({showSearchresult:true,can_move:true});
      this.refs.searchText.blur();//手动触发input的失去焦点事件
    }
  }
 //屏幕按下移动
  handleTouchMove(e){
      if(!this.state.can_move){
          e.preventDefault();
      }
  }
  //监视input文本框内容发生变化
  OnSearchBoxChanged(event){
    event.preventDefault();
    let inputText = this.refs.searchText.value;
      if(inputText.length>100)
      {
        this.refs.searchText.value =inputText.substr(0,100);
      }
      if(inputText.length>0){
          this.setState({bShowClearBtn:true});
      }else {
          this.setState({bShowClearBtn:false});
      }
    //   this.setState({showSearchresult:false});
  }
  //图标点击事件
  IconClicked(id,index){
    var prefix = "搜索";
    // this.bFocus = true;
    this.is_more = true;
    this.globalSearch = false;
    //this.refs.searchText.focus();//手动触发input的得到焦点事件
    this.setState({searchBox_placeholder:prefix});
    this.setState({nResultSelect:id,index:1});

    this.setState({searchType:this.props.all_plates[index].name+' |'});
    const params={
      search:"",
      page:1,
      type:this.props.all_plates[index].id
    }
    this.props.postData(params,home_search);
    this.setState({showSearchresult:true,can_move:true});
  }
//失去焦点
  onBlur(){
    this.bFocus = false;
  }
  //获得焦点
  onFocus(){
    this.bFocus = true;
  }
  //搜索更多
  SearchMore(nType){
      this.is_more = false;
      this.setState({result_isEmpty:false});
      var inputText = this.refs.searchText.value;
    //   if(inputText == ""){
    //     this.setState({showSearchresult:false});
    //   }
    //   else {
        const params={
          search:inputText,
          type:nType
        }
        this.props.postData(params,home_search);
        this.setState({showSearchresult:true,nResultSelect:nType});
        this.refs.searchText.blur();//手动触发input的失去焦点事件

        switch (nType) {
          case 21:
          {
            this.setState({tutor_more:false});
          }break;
          case 11:
          {
            this.setState({training_more:false});
          }break;
          case 12:
          {
            this.setState({openclass_more:false});
          }break;
          case 1:
          {
            this.setState({course_more:false});
          }break;
          case 3:
          {
            this.setState({product_more:false});
          }break;
          case 4:
          {
            this.setState({cert_more:false});
          }break;
          case 13:
          {
            this.setState({summit_more:false});
          }break;
          case 14:
          {
            this.setState({exhibition_more:false});
          }break;
          case 15:
          {
            this.setState({salon_more:false});
          }break;
          case 16:
          {
            this.setState({study_investigation_more:false});
          }break;
          case 22:
          {
            this.setState({document_more:false});
          }break;
          default:

        }
    //   }
}
//清空输入内容
ClearInputText(){
    this.refs.searchText.value = "";
    this.setState({bShowClearBtn:false});
}

  render(){
    const {list} =this.props;
    return(
      <div>
        <Helmet title="搜索"/>
        <div className={styles.container} style={{height:this.state.screenHight}}>
        	<form className={styles.form} onSubmit={this.handleSearch.bind(this)}>
            <div className={styles.head}>
              <div className={styles.searchbox}>
                <span className={styles.search_icon}>&#xe603;</span>
                {(()=>{
                    if(this.state.searchType != ""){
                        return <span className={styles.search_type}>{this.state.searchType}</span>
                    }
                })()}
                {/* {(()=>{
                    if(this.state.searchType != ""){
                        return <span className={styles.dividingline}>|</span>
                    }
                })()} */}
                {(()=>{
                    if(this.state.searchType==""){
                        return <input className={styles.inputtext} onBlur={this.onBlur.bind(this)} onFocus={this.onFocus.bind(this)} placeholder={this.state.searchBox_placeholder} onChange={this.OnSearchBoxChanged.bind(this)} type="text" ref="searchText" />
                    }else {
                        switch (this.state.nResultSelect) {
                            case -1:
                            case -3:
                            case 13:
                            case 14:
                            case 11:
                            case 15:
                            case 16:
                            case 22:
                            case 21:
                            {
                                return <input className={styles.inputtext2} onBlur={this.onBlur.bind(this)} onFocus={this.onFocus.bind(this)} placeholder={this.state.searchBox_placeholder} onChange={this.OnSearchBoxChanged.bind(this)} type="text" ref="searchText" />
                            }break;
                            case 4:
                            case 1:
                            case -2:
                            case 3:
                            {
                                return <input className={styles.inputtext4} onBlur={this.onBlur.bind(this)} onFocus={this.onFocus.bind(this)} placeholder={this.state.searchBox_placeholder} onChange={this.OnSearchBoxChanged.bind(this)} type="text" ref="searchText" />
                            }break;
                            case 12:
                            {
                                return <input className={styles.inputtext5} onBlur={this.onBlur.bind(this)} onFocus={this.onFocus.bind(this)} placeholder={this.state.searchBox_placeholder} onChange={this.OnSearchBoxChanged.bind(this)} type="text" ref="searchText" />
                            }break;
                            default:{
                                return <input className={styles.inputtext} onBlur={this.onBlur.bind(this)} onFocus={this.onFocus.bind(this)} placeholder={this.state.searchBox_placeholder} onChange={this.OnSearchBoxChanged.bind(this)} type="text" ref="searchText" />
                            }
                        }
                    }
                })()}
                <span className={this.state.bShowClearBtn?styles.clear_btn:styles.hideclear_btn} onClick={()=>this.ClearInputText()}>&#xe616;</span>
              </div>
              <div className={styles.cancel} onClick={this.onCancel.bind(this)}>取消</div>
            </div>
          </form>

            {(()=>{
            if(!this.state.showSearchresult){
              return <div className={styles.info}>
                {this.props.all_plates.map(function(value,index){
                  return <div className={styles.nav} key={'all_plates' + index} onClick={this.IconClicked.bind(this,value.id,index)}>
                    <div>
                      <img src={imageUrl+value.img} className={styles.img}></img>
                    </div>
                    <div className={styles.name} >{value.name}</div>
                  </div>
                }.bind(this))}
              </div>
            }
            else {
              return <div>
                {(()=>{
                  if(this.state.result_isEmpty){
                    return <div>
                      <div>
                        <div className={styles.restule_empty}>
                          <img src={imageUrl+"/images/search_empty.png"}/>
                          <div className={styles.empy_text}>找不到你要的内容哦~</div>
                        </div>
                      </div>
                    </div>
                  }else{
                    return  <div className={styles.write}>
                                {(()=>{
                                  if(this.state.tutor_exist){
                                    return <div>
                                      <div className={styles.top_title}>
                                        <span className={styles.title}>导师</span>
                                        <div className={this.state.tutor_more?styles.more:styles.hide_more} onClick={this.SearchMore.bind(this,21)}>
                                          <a className={styles.more_text}>更多导师</a>
                                          <a className={styles.more_symbol}>&#xe619;</a>
                                        </div>
                                      </div>
                                      {list && this.state.daoshi_data && !this.globalSearch &&
                                          <div>
                                          {this.state.daoshi_data.map(function(v,i){
                                             return <Tutor data={this.state.daoshi_data[i]} key={"key"+i} search={this.refs.searchText.value}/>
                                           }.bind(this))
                                          }
                                          </div>
                                      }
                                      {(()=>{
                                         if(this.globalSearch) {
                                             return <Tutor data={this.state.tutor_data} search={this.refs.searchText.value}/>
                                         }
                                      })()}
                                    </div>
                                  }
                                })()}

                                {(()=>{
                                  if(this.state.train_exist){
                                    return <div>
                                      <div className={styles.top_title}>
                                        <span className={styles.title}>内训</span>
                                        <div className={this.state.training_more?styles.more:styles.hide_more} onClick={this.SearchMore.bind(this,11)}>
                                          <a className={styles.more_text}>更多内训</a>
                                          <a className={styles.more_symbol}>&#xe619;</a>
                                        </div>
                                      </div>
                                      {list && this.state.neixun_data && !this.globalSearch &&
                                          <div>
                                          {this.state.neixun_data.map(function(v,i){
                                             return <Train data={this.state.neixun_data[i]} key={"key"+i} search={this.refs.searchText.value}/>
                                           }.bind(this))
                                          }
                                          </div>
                                      }
                                      {(()=>{
                                         if(this.globalSearch){
                                             return <Train data={this.state.train_data} search={this.refs.searchText.value}/>
                                         }
                                      })()}
                                    </div>
                                  }
                                })()}

                                {(()=>{
                                  if(this.state.openclass_exist){
                                    return <div>
                                      <div className={styles.top_title}>
                                        <span className={styles.title}>公开课</span>
                                        <div className={this.state.openclass_more?styles.more:styles.hide_more} onClick={this.SearchMore.bind(this,12)}>
                                          <a className={styles.more_text}>更多公开课</a>
                                          <a className={styles.more_symbol}>&#xe619;</a>
                                        </div>
                                      </div>
                                       {list && this.state.gongkaike_data  && !this.globalSearch &&
                                           <div>
                                           {this.state.gongkaike_data.map(function(v,i){
                                              return <CourseList data={this.state.gongkaike_data[i]} key={"key"+i} classification="activity" active_type="all" search={this.refs.searchText.value}/>
                                            }.bind(this))
                                           }
                                           </div>
                                       }
                                       {(()=>{
                                          if(this.globalSearch){
                                              return <CourseList data={this.state.openclass_data} classification="curriculum" search={this.refs.searchText.value}/>
                                          }
                                       })()}
                                    </div>
                                  }
                                })()}

                                {(()=>{
                                  if(this.state.singlecourse_exist) {
                                      return <div>
                                        <div className={styles.top_title}>
                                          <span className={styles.title}>单门课程</span>
                                          <div className={this.state.course_more?styles.more:styles.hide_more} onClick={this.SearchMore.bind(this,1)}>
                                            <span className={styles.more_text}>更多单门课程</span>
                                            <span className={styles.more_symbol}>&#xe619;</span>
                                          </div>
                                        </div>
                                        {list && this.state.danmenkecheng_data && !this.globalSearch &&
                                            <div>
                                            {this.state.danmenkecheng_data.map(function(v,i){
                                               return <SingleCourse data={this.state.danmenkecheng_data[i]} search={this.refs.searchText.value}/>
                                             }.bind(this))
                                            }
                                            </div>
                                        }
                                        {(()=>{
                                            if(this.globalSearch){
                                                return  <SingleCourse data={this.state.singlecourse_data} search={this.refs.searchText.value}/>
                                            }
                                        })()}
                                      </div>
                                  }
                                })()}

                                {(()=>{
                                  if(this.state.coursepackage_exist) {
                                      return <div>
                                        <div className={styles.top_title}>
                                          <span className={styles.title}>专业证书</span>
                                          <div className={this.state.product_more?styles.more:styles.hide_more} onClick={this.SearchMore.bind(this,3)}>
                                            <span className={styles.more_text}>更多专业证书</span>
                                            <span className={styles.more_symbol}>&#xe619;</span>
                                          </div>
                                        </div>
                                        {list && this.state.zhuanyezhengshu_data && !this.globalSearch  &&
                                            <div>
                                            {this.state.zhuanyezhengshu_data.map(function(v,i){
                                               return <CoursePackage data={this.state.zhuanyezhengshu_data[i]} search={this.refs.searchText.value}/>
                                             }.bind(this))
                                            }
                                            </div>
                                        }
                                        {(()=>{
                                            if(this.globalSearch){
                                                return <CoursePackage data={this.state.coursepackage_data} search={this.refs.searchText.value}/>
                                            }
                                        })()}
                                      </div>
                                  }
                                })()}

                                {(()=>{
                                    if(this.state.summit_exist){
                                      return <div>
                                        <div className={styles.top_title}>
                                          <span className={styles.title}>峰会</span>
                                          <div className={this.state.summit_more?styles.more:styles.hide_more} onClick={this.SearchMore.bind(this,13)}>
                                            <a className={styles.more_text}>更多峰会</a>
                                            <a className={styles.more_symbol}>&#xe619;</a>
                                          </div>
                                        </div>
                                        {list && this.state.fenghui_data && !this.globalSearch &&
                                            <div>
                                            {this.state.fenghui_data.map(function(v,i){
                                               return <CourseList data={this.state.fenghui_data[i]} key={"key"+i} classification="activity" type="summit" search={this.refs.searchText.value}/>
                                             }.bind(this))
                                            }
                                            </div>
                                        }
                                        {(()=>{
                                            if(this.globalSearch){
                                                return <CourseList data={this.state.summit_data} classification="activity" type="summit" search={this.refs.searchText.value}/>
                                            }
                                        })()}
                                      </div>
                                    }
                                })()}

                                {(()=>{
                                    if(this.state.exhibition_exist) {
                                      return <div>
                                        <div className={styles.top_title}>
                                          <span className={styles.title}>展会</span>
                                          <div className={this.state.exhibition_more?styles.more:styles.hide_more} onClick={this.SearchMore.bind(this,14)}>
                                            <a className={styles.more_text}>更多展会</a>
                                            <a className={styles.more_symbol}>&#xe619;</a>
                                          </div>
                                        </div>
                                        {list && this.state.zhanhui_data && !this.globalSearch &&
                                            <div>
                                            {this.state.zhanhui_data.map(function(v,i){
                                               return <CourseList data={this.state.zhanhui_data[i]} classification="activity" type="exhibition" search={this.refs.searchText.value}/>
                                             }.bind(this))
                                            }
                                            </div>
                                        }
                                        {(()=>{
                                            if(this.globalSearch){
                                                return <CourseList data={this.state.exhibition_data} classification="activity" type="exhibition" search={this.refs.searchText.value}/>
                                            }
                                        })()}
                                      </div>
                                    }
                                })()}

                                {(()=>{
                                    if (this.state.salon_exist) {
                                      return <div>
                                        <div className={styles.top_title}>
                                          <span className={styles.title}>沙龙</span>
                                          <div className={this.state.salon_more?styles.more:styles.hide_more} onClick={this.SearchMore.bind(this,15)}>
                                            <a className={styles.more_text}>更多沙龙</a>
                                            <a className={styles.more_symbol}>&#xe619;</a>
                                          </div>
                                        </div>
                                        {list && this.state.shalong_data && !this.globalSearch &&
                                            <div>
                                            {this.state.shalong_data.map(function(v,i){
                                               return <CourseList data={this.state.shalong_data[i]} classification="activity" type="salon" search={this.refs.searchText.value}/>
                                             }.bind(this))
                                            }
                                            </div>
                                        }
                                        {(()=>{
                                            if(this.globalSearch){
                                                return <CourseList data={this.state.salon_data} classification="activity" type="salon" search={this.refs.searchText.value}/>
                                            }
                                        })()}
                                      </div>
                                  }
                                })()}

                                {(()=>{
                                    if (this.state.studyinvestigation_exist) {
                                      return <div>
                                        <div className={styles.top_title}>
                                          <span className={styles.title}>学习考察</span>
                                          <div className={this.state.study_investigation_more?styles.more:styles.hide_more} onClick={this.SearchMore.bind(this,16)}>
                                            <a className={styles.more_text}>更多学习考察</a>
                                            <a className={styles.more_symbol}>&#xe619;</a>
                                          </div>
                                        </div>
                                        {list && this.state.xuexikaocha_data && !this.globalSearch &&
                                            <div>
                                            {this.state.xuexikaocha_data.map(function(v,i){
                                               return <CourseList data={this.state.xuexikaocha_data[i]} classification="activity" type="study" search={this.refs.searchText.value}/>
                                             }.bind(this))
                                            }
                                            </div>
                                        }
                                        {(()=>{
                                            if(this.globalSearch){
                                                return <CourseList data={this.state.studyinvestigation_data} classification="activity" type="study" search={this.refs.searchText.value}/>
                                            }
                                        })()}
                                      </div>
                                  }
                                })()}

                                {(()=>{
                                  if(this.state.cert_exist) {
                                      return <div>
                                        <div className={styles.top_title}>
                                          <span className={styles.title}>IHMA证书</span>
                                          <div className={this.state.cert_more?styles.more:styles.hide_more} onClick={this.SearchMore.bind(this,4)}>
                                            <a className={styles.more_text}>更多IHMA证书</a>
                                            <a className={styles.more_symbol}>&#xe619;</a>
                                          </div>
                                        </div>
                                        {list && this.state.zhiyerenzheng_data && !this.globalSearch &&
                                            <div>
                                            {this.state.zhiyerenzheng_data.map(function(v,i){
                                               return <IhmaList data={this.state.zhiyerenzheng_data[i]} search={this.refs.searchText.value}/>
                                             }.bind(this))
                                            }
                                            </div>
                                        }
                                        {(()=>{
                                            if(this.globalSearch){
                                                return <IhmaList data={this.state.cert_data} search={this.refs.searchText.value}/>
                                            }
                                        })()}
                                      </div>
                                  }
                                })()}

                                {(()=>{
                                  if(this.state.document_exist) {
                                      return <div>
                                        <div className={styles.top_title}>
                                          <span className={styles.title}>智库</span>
                                          <div className={this.state.document_more?styles.more:styles.hide_more} onClick={this.SearchMore.bind(this,22)}>
                                            <a className={styles.more_text}>更多智库</a>
                                            <a className={styles.more_symbol}>&#xe619;</a>
                                          </div>
                                        </div>
                                        {list && this.state.zhiku_data && !this.globalSearch &&
                                            <div>
                                            {this.state.zhiku_data.map(function(v,i){
                                               return <ThinkTank data={this.state.zhiku_data[i]} search={this.refs.searchText.value}/>
                                             }.bind(this))
                                            }
                                            </div>
                                        }
                                        {(()=>{
                                            if(this.globalSearch){
                                                return <ThinkTank data={this.state.document_data} search={this.refs.searchText.value}/>
                                            }
                                        })()}
                                      </div>
                                  }
                                })()}
                           </div>
                  }
                })()}
              </div>
            }
          })()}
        </div>
      </div>
    )
  }

}
