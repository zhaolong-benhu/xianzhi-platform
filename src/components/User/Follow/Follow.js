/**
 * Created by zhaolong on 2016/8/5.
 * File description:我的关注所有显示内容
 */
 'use strict';
 import React,{Component,PropTypes} from 'react';
 import {
   Warning,
   Type,
   eparate,
   SingleCourse,
   CoursePackage,
   Tutor,
   CourseList,
   ThinkTank,
   ExcellentCourse,
   SearchFollow,
   OnlineCourses,
   Ihma,
   TutorTrainingCourse,
   NoContent
 } from 'components';
 import {imageUrl} from '../../../api/common/Global';

 const styles = require('./Follow.scss');

export default class Follow extends React.Component{
    state={
        searchBox_placeholder:"本页搜索关注",
        bGetFocus:false,
        bShowallclassify:false,
        nUserSelect:0,
        can_move:true,
        bShowClearBtn:false
    };
    static defaultProps = {
      all_plates:[
        {name:"线下公开课",img:"/images/search/search1.png",link:"/gongkaike"},
        {name:"内训",img:"/images/search/search2.png",link:"/neixun"},
        {name:"峰会",img:"/images/search/search3.png",link:"/huodong/1"},
        {name:"活动",img:"/images/search/search4.png",link:"/OtherActivities"},
        {name:"在线课程",img:"/images/search/search5.png",link:"/gongkaike"},
        {name:"IHMA证书",img:"/images/search/search6.png",link:"/ihma"},
        {name:"智库",img:"/images/search/search7.png",link:"/gongkaike"}],
    };
    constructor(props) {
      super(props);
      this.search = "";
      this.touchmove = this.handleTouchMove.bind(this);
    }
    componentDidMount(){
        window.addEventListener('touchmove',this.touchmove);
    }
    componentWillUnmount(){
        window.removeEventListener('touchmove',this.touchmove);
    }
    //搜索框得到焦点
    onSearchBoxFocus(){
      window.scrollTo(0,0);
      this.setState({bGetFocus:true,bShowallclassify:true,can_move:false,bShowClearBtn:false});
      this.props.callbackParent(null,"noscroll");
    }
    //监视搜索框文本发生变化
    OnSearchBoxChanged(event)
    {
      var strText = this.refs.searchText.value;
      if(strText.length>100)
      {
        this.refs.searchText.value = strText.substr(0,100);
      }
      this.setState({bGetFocus:false,bShowallclassify:false});
      this.setState({data:this.state.test_date});
    }
    //监视搜索框文本发生变化
    OnSearchBoxChanged2(){
      var strText = this.refs.searchText2.value;
      if(strText.length == 0){
        this.setState({bShowClearBtn:false});
      }
      if(strText.length > 0){
        this.setState({bShowClearBtn:true});
      }
      if(strText.length>100)
      {
        this.refs.searchText2.value = strText.substr(0,100);
      }
      this.setState({data:this.state.test_date});
    }
    //屏幕按下移动事件
    handleTouchMove(e){
        if(!this.state.can_move){
            e.preventDefault();
        }
    }
    //回车键按下开始搜索
    handleSearch(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        var inputText = this.refs.searchText2.value;
        if(inputText == ""){
          //搜索内容为空
        }else
        {
          this.search = inputText;
          this.setState({bGetFocus:true,bShowallclassify:false,can_move:true});
          this.refs.searchText2.blur();

          const params={
            search:inputText,
            type:this.state.nUserSelect
          }
          this.props.callbackParent(params,null);
        }
      }
    }
    //取消
    onCancel(){
      this.search = "";
      this.setState({bGetFocus:false,bShowallclassify:false,can_move:true});
      this.setState({searchBox_placeholder:"本页搜索关注"});
      this.refs.searchText2.value = "";
      this.props.callbackParent(null,"cancel");
    }
    //清空输入文本
    ClearInputText(){
        this.refs.searchText2.value = "";
        this.setState({bShowClearBtn:false});
    }
    //获取用户选择
    GetUserSelected(index){
      this.refs.searchText2.focus();
      var prefix = "搜索";
      this.setState({searchBox_placeholder:prefix+this.props.all_plates[index].name});
      switch (index) {
        case 0:
          {
            this.setState({nUserSelect:12});//线下公开课
          }break;
        case 1:
          {
            this.setState({nUserSelect:-3});//内训
          }break;
        case 2:
            {
              this.setState({nUserSelect:-1});//峰会
            }break;
        case 3:
          {
            this.setState({nUserSelect:-1});//其他活动
          }break;
        case 4:
          {
            this.setState({nUserSelect:-2});//在线课程
          }break;
        case 5:
            {
              this.setState({nUserSelect:4});//IHMA证书
            }break;
        case 6:
          {
            this.setState({nUserSelect:22});//智库
          }break;
        default:
        {
        }break;
      }
    }
    render(){
      var searchText = this.search;
      return(
        <div>
            <div className={this.props.index==0?styles.follow:styles.follow2}>

                {(()=>{
                  if(!this.state.bGetFocus)
                  {
                    return <div className={styles.head}>
                        <div className={styles.searchbox} onClick={this.onSearchBoxFocus.bind(this)}>
                          {/* <span className={styles.search_icon}>&#xe603;</span> */}
                          {/* <span onClick={this.onSearchBoxFocus.bind(this)}>test</span> */}
                          {/* <input className={styles.inputtext} placeholder={this.state.searchBox_placeholder} type="text" ref="searchText"  onChange={this.OnSearchBoxChanged.bind(this)}/> */}
                          {/* <span className={styles.inputtext}>{this.state.searchBox_placeholder}</span> */}
                          <div className={styles.fixed}>{this.state.searchBox_placeholder}<span className={styles.search_icon}>&#xe603;</span></div>
                        </div>
                      </div>
                  }
                  else {
                    return <div className={styles.head}>
                          <div className={styles.searchbox2}>
                            <span className={styles.search_icon}>&#xe603;</span>
                            <input className={styles.inputtext} placeholder={this.state.searchBox_placeholder} autoFocus="true" onKeyDown={this.handleSearch.bind(this)} type="text" ref="searchText2" onChange={this.OnSearchBoxChanged2.bind(this)}/>
                            <span className={this.state.bShowClearBtn?styles.clear_btn:styles.hideclear_btn} onClick={this.ClearInputText.bind(this)}>&#xe616;</span>
                          </div>
                          <div className={styles.cancel} onClick={this.onCancel.bind(this)}>取消</div>
                      </div>
                  }
                })()}


             <div className={this.props.index==0?styles.allFollow:styles.allFollow2}>
              {(()=>{
                if(!this.props.data){
                  return <NoContent from="searchfollow" text="找不到你要的内容哦~"/>
                }
                else{
                  return <div>
                  {this.props.data.map(function(value,index){

                    if(value.type == "21"){
                      return <div key={'data'+index}>
                          <Type type="导师" follow_date={value.favorite_time}/>
                          <Tutor data={[value]} type="我的关注" search={searchText}/>
                      </div>
                    }
                    if(value.type == "11"){
                      return <div key={'data'+index}>
                          <Type type="内训" follow_date={value.favorite_time}/>
                          <TutorTrainingCourse data={[value]} type="我的关注" search={searchText}/>
                      </div>
                    }
                    if(value.type == "12"){
                      return <div key={'data'+index}>
                          <Type type="线下公开课" follow_date={value.favorite_time}/>
                          <CourseList data={[value]} classification="curriculum" type="我的关注" search={searchText}/>
                      </div>
                    }
                    if(value.type == "1"){
                      return <div key={'data'+index}>
                                <Type type="免费课程" follow_date={value.favorite_time}/>
                                <SingleCourse search data={[value]} type="我的关注" search={searchText}/>
                            </div>
                    }
                    if(value.type == "2"){
                      return <div key={'data'+index}>
                                <Type type="在线好课" follow_date={value.favorite_time}/>
                                <SingleCourse search data={[value]} type="我的关注" search={searchText}/>
                            </div>
                    }
                    if(value.type == "3"){
                      return <div key={'data'+index}>
                          <Type type="专业证书" follow_date={value.favorite_time}/>
                          <CoursePackage search data={[value]} type="我的关注" search={searchText}/>
                      </div>
                    }
                    if(value.type == "4"){
                      return <div key={'data'+index}>
                          <Type type="IHMA证书" follow_date={value.favorite_time}/>
                          <Ihma data={[value]} type="我的关注" search={searchText}/>
                      </div>
                    }
                    if(value.type == "13"){
                      return <div key={'data'+index}>
                          <Type type="峰会" follow_date={value.favorite_time}/>
                          <CourseList data={[value]} classification="activity" type="我的关注" active_type="summit" search={searchText}/>
                      </div>
                    }
                    if(value.type == "14"){
                      return <div key={'data'+index}>
                          <Type type="展会" follow_date={value.favorite_time}/>
                          <CourseList data={[value]} classification="activity" type="我的关注" active_type="exhibition" search={searchText}/>
                      </div>
                    }
                    if(value.type == "15"){
                      return <div key={'data'+index}>
                          <Type type="沙龙" follow_date={value.favorite_time}/>
                          <CourseList data={[value]} classification="activity" type="我的关注" active_type="salon" search={searchText}/>
                      </div>
                    }
                    if(value.type == "16"){
                      return <div key={'data'+index}>
                          <Type type="学习考察" follow_date={value.favorite_time}/>
                          <CourseList data={[value]} classification="activity" type="我的关注" active_type="study" search={searchText}/>
                      </div>
                    }

                    if(value.type == "22"){
                      return <div key={'data'+index}>
                          <Type type="智库" follow_date={value.favorite_time} />
                          <ThinkTank data={[value]} type="我的关注" search={searchText}/>
                      </div>
                    }

                  })}
                  </div>
                }
              })()}
             </div>

              {(()=>{
                if(this.state.bShowallclassify){
                  return <SearchFollow callbackParent={this.GetUserSelected.bind(this)}/>
                }
              })()}

            </div>
        </div>
      )
    }

}
