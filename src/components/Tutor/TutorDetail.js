/**
 * Created by zhaolong on 2016/6/30.
 * File description:导师详情
 */
import React,{Component,PropTypes} from 'react';
import {teacher_detail,signup,issignup,comment_list} from  '../../api/common/Global';
import Helmet from 'react-helmet';
import {Header,Login_Box,CommitSuccess_Box,CommitInfo_Box,Warning,TutorTrainingCourse,TutorLineCourse,TutorEvaluate,Float_Bottom,EvaluationTutor_Box,Star,CourseOverview} from 'components';
import TutorTraining from '../../containers/Tutor/TutorTraining';
import TutorLine from '../../containers/Tutor/TutorLine';
import {connect} from 'react-redux';
import {userApply,detail} from 'redux/modules/tutor';
import {commentList} from 'redux/modules/comment';
import {push} from 'react-router-redux';
import {imageUrl} from '../../api/common/Global';
const styles = require('./TutorDetail.scss');

@connect(
  state => ({
    tutordetail:state.tutor.detail,
    result:state.tutor.result,
    comments:state.comment.data,
  }),
  {detail,userApply,commentList,push}
)

export default class TutorDetail extends Component{
  static propTypes = {
      tutordetail: PropTypes.object,
      result:PropTypes.object,
      detail: PropTypes.func.isRequired,
      userApply:PropTypes.func.isRequired,
      commentList: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired
  }
  state={
    classification_select_index:0,//索引判断
    str:"累计内训: ",//静态文本内容
    star:"4",//默认星级数
    training_num:"88",//内训数
    evaluation_num:"29",//学员评价数
    isShowAll:false,//显示所有
    visible:false,//灰化层
    evaluateBox:true,//评价框
    title2:"擅长领域",//静态文本内容
    title3:"学员评价",//静态文本内容
    tips:"点击展开更多",//静态文本内容
    lookall:"查看全部",//静态文本内容
    bFloat_Bottom:true,//底部浮窗
    info_box:false,//内训报名填写信息弹框
    tips_box:false,//提示信息弹框
    commitok_box:false,//提交成功弹框
    login_box:false,//提示登录框
    msg:"",//弹框提示文字
    btnText:"我要内训",//底部内训父窗按钮文字
    pageNum:0,//页数
    total_num:0,//总评论数
    bLock:false,//翻页枷锁标识
    commentlist:[],//评论列表数据
    index:1,//索引
    me_star:0,//我是否打过星
    can_move:true,//屏幕是否可以移动
    nomore_comment:false//没有更多评价
  };

  static defaultProps = {
    classification:[
      {name:"简介"},
      {name:"评价"}
    ]
  };
  constructor(props) {
      super(props);
      this.array=[];
      this.addarray=[];
      this.me_star = 0;
      this.back = null;
      this.scroll = this.handleScroll.bind(this);
      this.touchmove = this.handleTouchMove.bind(this);
  }

componentDidMount(){
     window.addEventListener('scroll',this.scroll);
     window.addEventListener('touchmove',this.touchmove);
     if(localStorage.oldbackUrl && localStorage.oldbackUrl){
       this.back=localStorage.backUrl!=localStorage.oldbackUrl ? localStorage.oldbackUrl :'/';
     }

    //  setTimeout(() =>{
    //      var oMeta = document.getElementsByTagName("meta");
    //      oMeta[1]["content"] = this.props.tutordetail.adept_areare;
     //
    //      var a = document.getElementsByClassName('meta_description')[0];
    //      a.innerHTML = a.innerText;
    //      var strResult = a.innerText;
    //      strResult=strResult.replace(/&nbsp;/ig, "");
     //
    //      if(strResult && strResult.length >200){
    //          oMeta[2]["content"] = strResult.substr(0,200);
    //      }else {
    //          oMeta[2]["content"] = strResult;
    //      }
    //  },2000);
  }
componentWillMount(){
    this.props.detail(this.props.params.id);
    const comment_params={
      id:this.props.params.id,
      type:21
    }
    this.props.commentList(comment_params,comment_list);
  }
componentWillUnmount(){
    window.removeEventListener('scroll',this.scroll);
    window.removeEventListener('touchmove',this.touchmove);
  }
  HTMLEnCode(str)
  {
    let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
  }
componentWillReceiveProps(nextProps){
      this.setState({tips_box:false});
      if(this.props.result!=nextProps.result){
        if(nextProps.result.status==1){
        }
      }
      if(this.props.comments!=nextProps.comments){
        if(nextProps.comments.current_page==1){
          this.array.length=0;
          this.setState({index:1});
          this.setState({pageNum:nextProps.comments.total_page});
          this.setState({total_num:nextProps.comments.total_num});
        }
        this.array.push(nextProps.comments.list);
        this.setState({commentlist:this.array});
        this.setState({bLock:false});
      }
  }
//判断用户是否登录
CheckUserIsLogined(str,star){
  if(str=="学习过该导师课程后才可以评价！" || str=="导师不可以重复评价！"){
    this.setState({commitok_box:false});
    this.setState({tips_box:true,msg:str});
  }
  if(str=="unlogin") {
    //弹出灰化层
    let mask=document.getElementById('mask');
    mask.style.display="block";
    this.setState({login_box:true});
    this.setState({can_move:false});
  }
  if(star>=1 && star<=5){
    this.setState({me_star:star});
    const comment_params={
      id:this.props.params.id,
      type:21
    }
    this.props.commentList(comment_params,comment_list);
  }
}
//屏幕按下移动
handleTouchMove(e){
    if(!this.state.can_move){
        e.preventDefault();
    }
}
//页面滚动
handleScroll(e){
  if(this.state.classification_select_index==1){
    let srollPos = window.pageYOffset; //滚动条距顶部距离(页面超出窗口的高度)
    let totalheight = parseFloat(document.documentElement.clientHeight) + parseFloat(srollPos); //屏幕高度+滚动条距顶部距离
    if((document.body.scrollHeight-10) <= totalheight){//屏幕高度+滚动条距顶部距离>页面高度
      //加锁处理
      if(!this.state.bLock){
        if(this.state.index<this.state.pageNum){
            this.setState({bLock:true});
            this.setState({index:this.state.index+1});
            const params={
              id:this.props.params.id,
              page:this.state.index,
              type:21
            }
            this.props.commentList(params,comment_list);
        }else {
            if(this.state.total_num>10){
                this.setState({nomore_comment:true});
            }
        }
      }
    }
  }
}
//接收子组件消息
onChildChanged(bFlag){
    this.setState({
        commitok_box: false,
        tips_box:false,
        can_move:false
    });
    //弹出灰化层
    let mask=document.getElementById('mask');
    mask.style.display="block";
    if(bFlag){
      //弹出报名框
      this.setState({info_box:true});
      //此刻屏幕可以滑动
      document.documentElement.style.overflow='hidden';
      document.body.style.overflow='hidden';//手机版设置这个。
    }
    else {
      //弹出登录框
      this.setState({login_box:true});
    }
  }
  //判断用户登录选择是or否
  UserIsSeclectedLogin(){
    let mask=document.getElementById('mask');
    mask.style.display="none";
    this.setState({bomb_box:false,login_box:false,can_move:true});
  }
//校验用户输入的数据
onCommitInfoBoxChanged(strResult,strName,strPhone){
    if("name_null" == strResult)
    {
      this.setState({tips_box:true});
      this.setState({msg:"姓名不能为空"});
    }
    else if("phone_null" == strResult)
    {
      this.setState({tips_box:true});
      this.setState({msg:"电话号码不能为空"});
    }
    else if("one" == strResult)
    {
      this.setState({tips_box:true});
      this.setState({msg:"姓名不能少于2个字"});
    }
    else if("lack" == strResult)
    {
      this.setState({tips_box:true});
      this.setState({msg:"电话号码格式不正确"});
    }
    else
    {
      let mask=document.getElementById('mask');
      mask.style.display="none";

      this.setState({info_box:false});
      this.setState({tips_box:false});
      this.setState({can_move:true});

      //此刻屏幕可以滑动
      document.documentElement.style.overflow='visible';
      document.body.style.overflow='visible';//手机版设置这个。

      if(strResult)//提交成功-内训报名
      {
        const params={
          resource_id:this.props.params.id,
          type:2,
          name:strName,
          tel:strPhone,
          resource_name:this.props.tutordetail.name
        }
        this.props.userApply(params);
        this.setState({btnText:"再次预约"});
        this.setState({commitok_box: true});
      }
      else//取消
      {
        this.setState({commitok_box: false});
      }
    }

  }
//控制文本显示字数
ShowAllinfo(){
    this.setState({commitok_box:false});
    this.setState({isShowAll:!this.state.isShowAll});
    if(this.state.isShowAll){
      this.setState({tips:"点击展开更多"});
    }
    else{
      this.setState({tips:"点击向上收起"});
    }
  }
  //查看所有
LookAll(){
    this.setState({classification_select_index:1,commitok_box:false});
  }
  //菜单点击事件
ClickedClassification(index){
    this.setState({commitok_box:false,tips_box:false});
    this.setState({classification_select_index:index});
}

  render(){
    const {tutordetail} = this.props;
    var strTotal = "";
    var title = "";
    if(tutordetail){
       strTotal = this.state.str+tutordetail.apply_num;
       title = tutordetail.name;
    }

    return(
      <div className={styles.container}>
            <Helmet title={title}/>
            <Header title={title} back={this.back}/>
             {tutordetail &&
              <div>
                <div className={styles.top_pic} onClick={this.handleScroll.bind(this)}>
                 <img className={styles.img} src={tutordetail.thumb==""?'/images/course_defaultbg.jpg':tutordetail.thumb} alt=""/>
                </div>

                <div className={styles.item}>
                  {this.props.classification.map(function(value,index){
                    return  <div className={this.state.classification_select_index==index? styles.nav_selected:styles.nav} key={'classification'+index} onClick={this.ClickedClassification.bind(this,index)}>{value.name}
                    </div>
                  }.bind(this))}
                </div>
              {(()=>{
                if(this.state.classification_select_index==0){
                  return <div onClick={this.handleScroll.bind(this)}>
                    <div className={styles.tutor_info}>
                      <div className={styles.user}>
                        <div className={styles.name}>{tutordetail.name}</div>
                        <Star num={tutordetail.star}/>
                      </div>
                      {/* {(()=>{
                        if(tutordetail.is_reserve !=0){
                          return <span className={styles.total}>{strTotal}</span>
                        }
                      })()} */}
                    </div>

                    <CourseOverview description={tutordetail.description} title="" type="teacher"/>

                    <div className={styles.good_at}>
                      <div className={styles.empty}></div>
                      <div className={styles.good}>{this.state.title2}</div>

                    <div className={styles.good_details}>
                      {tutordetail.adept_areare.map(function(value,index){
                        return <span className={styles.field}>{value}</span>
                      })}
                    </div>

                    </div>

                    <div className={styles.student_evaluation}>
                      <div className={styles.empty}></div>
                    {(()=>{
                      if(this.state.total_num>0){
                        return   <div className={styles.info}>
                            <span className={styles.evaluation}>学员评价({this.state.total_num})</span>
                            <span className={styles.more}>&#xe619;</span>
                            <span className={styles.look_all} onClick={this.LookAll.bind(this)}>{this.state.lookall}</span>
                          </div>
                      }
                      else {
                        return   <div className={styles.info}>
                            <span className={styles.evaluation}>学员评价({this.state.total_num})</span>
                            <span className={styles.nocomment}>暂无评价</span>
                          </div>
                      }
                    })()}

                    </div>


                    {(()=>{
                      if(this.state.commentlist.length>0){
                        return <div>
                            {this.state.commentlist[0].map(function (value,index){
                              if(0 == index){
                                return <div>
                                            <div className={styles.comments}>
                                               <div className={styles.info}>
                                                 <div className={styles.pic}>
                                                 <img className={styles.img} src={value.user_thumb==""?imageUrl+'/images/user/head.jpg':value.user_thumb}/>
                                                 </div>
                                                 <div className={styles.account}>
                                                   <span className={styles.name}>{value.user_name}</span>
                                                   <span className={styles.date}>{value.add_time}</span>
                                                 </div>
                                                 <div className={styles.all_star}>
                                                    <Star num={value.star}/>
                                                 </div>
                                               </div>
                                            </div>
                                            <div className={styles.user_comments}>
                                                   <span className={styles.user_comment}>
                                                     {value.description}
                                                   </span>
                                            </div>
                                      </div>
                              }
                            })}
                        </div>
                      }
                    })()}


                    {(()=>{
                      if(tutordetail.is_reserve !=0){
                        return <TutorTraining name="导师内训课程" id={this.props.params.id}/>
                      }
                    })()}

                    <TutorLine name="导师在线课程" id={this.props.params.id}/>
                  </div>
                }
                else{
                  if(tutordetail.name){
                    return <TutorEvaluate total_num={this.state.total_num} data={this.state.commentlist} nomore_comment={this.state.nomore_comment} callbackParent={this.CheckUserIsLogined.bind(this)} type="21" id={this.props.params.id} name={tutordetail.name} title="导师" isbuy={tutordetail.is_buy} me_star={this.state.me_star==0?tutordetail.me_star:this.state.me_star} star={tutordetail.star} />
                  }
                }
              })()}

              <div className={styles.float_bottom}>
                {(()=>{
                  var btnText = "我要内训";
                  if(tutordetail.is_buy == 1){//已购买过
                      btnText = "再次预约";
                  }
                  else {
                      btnText = "我要内训";
                  }
                  if(this.state.btnText == "再次预约"){
                    return  <Float_Bottom callbackParent={this.onChildChanged.bind(this)} is_favorite={tutordetail.is_favorite} type2="21" id={this.props.params.id} btnText={this.state.btnText}/>
                  }
                  else {
                    return <Float_Bottom callbackParent={this.onChildChanged.bind(this)} is_favorite={tutordetail.is_favorite} type2="21" id={this.props.params.id} btnText={btnText}/>
                  }
                })()}
              </div>

              <div className="meta_description" style={{display:"none"}}>
                  {tutordetail.description}
              </div>

              </div>
            }



        {(()=>{
          if(this.state.info_box)
          {
            return  <CommitInfo_Box callbackParent={this.onCommitInfoBoxChanged.bind(this)}/>
            // return <EvaluationTutor_Box/>
          }
        })()}

        {(()=>{
          if(this.state.tips_box)
          {
            return <Warning visible="true" msg={this.state.msg}/>
          }
        })()}

        {(()=>{
          if(this.state.login_box){
            return <Login_Box callbackParent={this.UserIsSeclectedLogin.bind(this)}/>
          }
        })()}

        {(()=>{
           if(this.state.commitok_box)
           {
             return <CommitSuccess_Box msg="提交成功！" autoHide="true"/>
           }
        })()}

      </div>
    )
  }
}
