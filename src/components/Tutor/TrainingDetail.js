/**
 * Created by zhaolong on 2016/7/11.
 * File description:导师内训课程详情
 */
import React,{Component,PropTypes} from 'react';
import {teacher_trainingdetail,classification_detail,signup,comment_list,add_comment} from '../../api/common/Global';
import {Header,Float_Bottom,Share,CommitInfo_Box,CommitSuccess_Box,CourseOverview,Warning,Payment_Box,PlayVideo,Comment,Login_Box} from 'components';
import Helmet from 'react-helmet';
import {commentList,addComment} from 'redux/modules/comment';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {isapply,detail as trainDetail} from 'redux/modules/train';
import {push} from 'react-router-redux';
import {imageUrl} from '../../api/common/Global';
const styles = require('./TrainingDetail.scss');

@connect(
  state => ({
    detail:state.train.detail,
    comments:state.comment.data,
    addcomment:state.comment.result,
    apalyed:state.train.data,
    user:state.auth.user,
  }),
  {trainDetail,addComment,commentList,isapply,push}
)

export default class TrainingDetail extends Component{
  static propTypes = {
      detail: PropTypes.object,
      apalyed:PropTypes.object,
      trainDetail: PropTypes.func.isRequired,
      addComment:PropTypes.func.isRequired,
      commentList: PropTypes.func.isRequired,
      isapply: PropTypes.func.isRequired,
      comments:PropTypes.func.isRequired,
      user:PropTypes.object
  }
  state={
    visible:false,//是否可见
    bomb_box:false,//弹框标识
    description:"",//描述
    lookall:"查看全部",//静态文本
    title:"学员评论",//静态文本
    nocomment:"暂无评论",//静态文本
    btnText:"我要内训",//静态文本
    share_box:false,//分享弹框标识
    commitok_box:false,//提交成功弹框标识
    info_box:false,//内训信息弹框标识
    tips_box:false,//文本提示弹框标识
    login_box:false,//登录框
    number:0,//个数
    commentlist:[],//评论列表
    iscomment:false,//是否评论
    pageNum:0,//评论页数
    total_num:0,//评论总数量
    index:1,//索引
    bLock:false,//翻页解锁标识
    can_more:true,//屏幕是否可以移动
    nomore_comment:false//没有更多评论
  }
 //接收子组件传递过来参数
  onChildChanged(bflag){
    this.setState({can_more:false});
    this.setState({commitok_box:false});
    //弹出灰化层
    let mask=document.getElementById('mask');
    mask.style.display="block";
    if(bflag){
      //弹出报名框
      this.setState({info_box:true});
    }
    else {
      //弹出登录框
      this.setState({login_box:true});
    }
  }
  //分享
  Share(){
    //弹出灰化层
    let mask=document.getElementById('mask');
    mask.style.display="block";
    //弹出分享框
    this.setState({share_box:true});
  }
  //取消分享
  Shared(str){
    if(str=="cancel"){
      let mask=document.getElementById('mask');
      mask.style.display="none";
      //隐藏分享框
      this.setState({share_box:false});
    }
  }
  //接收用户输入的数据进行校验
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
      this.setState({can_more:true});
      if(strResult)//提交成功-内训报名
      {
        const params={
          resource_id:this.props.id,
          type:1,
          name:strName,
          tel:strPhone,
          resource_name:this.resource_name
        }
        this.props.addComment(params,signup);
        this.setState({btnText:"再次预约"});
        this.setState({commitok_box: true});

      }
      else//取消
      {
        this.setState({commitok_box: false});
      }
    }

  }
  componentWillMount(){
    this.props.trainDetail(this.props.id || 0);

   //获取内训课程评论
    const comment_params={
      id:this.props.id,
      type:11
    }
    this.props.commentList(comment_params,comment_list);

    // this.props.isapply(this.props.id);
  }
  constructor(props) {
      super(props);
      this.array=[];
      this.addarray=[];
      this.resource_name = "";
      this.scroll = this.handleScroll.bind(this);
      this.touchmove = this.handleTouchmove.bind(this);
  }
  componentDidMount(){
    //添加滚动条事件
    window.addEventListener('scroll',this.scroll);
    window.addEventListener('touchmove',this.touchmove);
    if(this.props.tutordetail){
      setTimeout(() =>{
          var oMeta = document.getElementsByTagName("meta");
          oMeta[1]["content"] = this.props.tutordetail.intro;
          var description = this.props.tutordetail.learn_object;

          if(description && description.length >200){
              oMeta[2]["content"] = description.substr(0,200);
          }else {
              oMeta[2]["content"] = description;
          }
      },2000);
    }
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.scroll);
  }
 componentWillReceiveProps(nextProps){
   if(this.state.iscomment){
       const comment_params={
        id:this.props.id,
        type:11
       }
       this.props.commentList(comment_params,comment_list);
    }

   if(this.props.comments!=nextProps.comments && nextProps.comments){
      if(this.state.iscomment){
        this.addarray.push(nextProps.comments.list[0]);
      }else{
        if(this.addarray.length>0){
          this.array[0].splice(0,0,this.addarray[0]);
          this.addarray.length=0;
        }else{
          this.array.push(nextProps.comments.list);
        }
      }
     this.setState({pageNum:nextProps.comments.total_page})
     this.setState({total_num:nextProps.comments.total_num})
     this.setState({commentlist:this.array});
     this.setState({bLock:false});
     this.setState({iscomment:false});
   }
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
           this.setState({index:this.state.index+1});
           const params={
             id:this.props.id,
             page:this.state.index,
             type:11
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

 //移动端按住移动
 handleTouchmove(e){
     if(!this.state.can_more){
         e.preventDefault();
     }
   //   if(e.target.type == 'range') return;
 }
 //判断用户登录选择是or否
   UserIsSeclectedLogin(){
     //弹出灰化层
     let mask=document.getElementById('mask');
     mask.style.display="none";
     this.setState({login_box:false});
     this.setState({can_more:true});
   }
  //接受子组件传递过来的值 发送到后台
  GetUserCommitComment(strComment){
    this.setState({tips_box:false,commitok_box:false});
    if(this.props.user && this.props.user.user_ticket){
      var id = this.props.id;
      var type = 11;
      var description = strComment;
      if(!strComment){
          this.setState({msg:"请输入内容！"});
          this.setState({tips_box:true});
      }else{
        const params={
          id:id,
          type:type,
          resource_name:this.resource_name,
          description:description
        }
        this.setState({tips_box:false,commitok_box:false,iscomment:true});
        this.props.addComment(params,add_comment);
      }
    }
    else {
        let mask=document.getElementById('mask');
        mask.style.display="block";
        this.setState({login_box:true});
    }
  }
  render(){
    var id = this.props.id;
    var strTotal = "";
    const {detail,comments,apalyed}=this.props;
    var total_num = 0;
    var title = "";
    if(comments){
      total_num = comments.total_num;
      strTotal = this.state.title+"("+total_num+")";
    }
    if(detail){
      this.resource_name = detail.title;
      title = detail.title;
    }
    return(
        <div>
            <Helmet title={title}/>
            <Header title={title} back={this.back}/>
            <div className={styles.container}>
              {detail &&
                <div>
                {(()=>{
                  //if(0 == detail.is_overdue){
                    //内训结束
                    if(detail.mp4_url && "" !=detail.mp4_url ){
                       return   <video src={detail.mp4_url}  id="player" preload="meta" controls="controls" width="100%" poster={detail.thumb}>
                                  your browser does not support the video tag
                               </video>
                    }
                    else {
                      return <div className={styles.top_pic}>
                        <img className={styles.img} src={detail.thumb}/>
                      </div>
                    }
                  //}
                  // else {
                  //   //内训未结束
                  //   return <div className={styles.top_pic}>
                  //     <img className={styles.img} src={detail.thumb}/>
                  //   </div>
                  // }
                })()}


                <div className={styles.detail}>
                  <div>
                    <span className={styles.title}>{detail.title}</span>
                    <span className={styles.share} onClick={this.Share.bind(this)}>&#xe60c;</span>
                  </div>

                  <div>
                    <span className={styles.interest}>已累计内训{" " + detail.apply_num + " "}家企业</span>
                  </div>

                  <div className={styles.spec}>
                    <span className={styles.key}>内训简介：</span>
                    <span className={styles.values}>{detail.intro}</span>
                  </div>

                  <div>
                    <span className={styles.key}>时长：</span>
                    <span className={styles.value}>{detail.days}天</span>
                  </div>

                  <div>
                    <span className={styles.key}>讲师：</span>
                    <span className={styles.value}>{detail.teacher_name}</span>
                  </div>

                  <div>
                    <span className={styles.key}>适用人群：</span>
                    <span className={styles.value2}>{detail.learn_object}</span>
                  </div>

                  <div>
                    <span className={styles.key}>联系人：</span>
                    <span className={styles.value}>{detail.contact_name}</span>
                    {(()=>{
                       var telNumber = detail.contact_tel;
                       telNumber = telNumber.replace(/(\s*$)/g,"");
                       return <a href={'tel:'+telNumber} className={styles.phone}><img style={{width:'18px',height: '18px'}} src={imageUrl+"/images/tel.png"} /></a>
                    })()}
                  </div>

                </div>

                {(()=>{
                  if("" == detail.train_company[0])
                  {
                    return <div className={styles.train_company}>
                      <div className={styles.company}>暂无部分内训企业</div>
                    </div>
                  }
                  else
                  {
                      return <div className={styles.train_company}>
                        <div className={styles.company}>部分内训企业</div>
                        {detail.train_company.map(function(value,index){
                          if(0 == index){
                            return <div key={'name'+index} className={styles.company_name1}>{value}</div>
                          }
                          else {
                            return <div key={'name'+index} className={styles.company_name}>{value}</div>
                          }
                        })}
                     </div>
                  }
                })()}

                <CourseOverview id={id} title="课程概述" description={detail.description}/>
                <Comment total_num={this.state.total_num} nomore_comment={this.state.nomore_comment} data={this.state.commentlist} callbackParent={this.GetUserCommitComment.bind(this)}/>



                <div className={styles.float_bottom}>
                {(()=>{
                    if(detail.is_buy == 1){
                      return <Float_Bottom callbackParent={this.onChildChanged.bind(this)} is_favorite={detail.is_favorite} type2="11" id={this.props.id} btnText="再次预约"/>
                    }
                    else {
                      return <Float_Bottom callbackParent={this.onChildChanged.bind(this)} is_favorite={detail.is_favorite} type2="11" id={this.props.id} btnText={this.state.btnText}/>
                    }
                })()}
                </div>

                {(()=>{
                  if(this.state.info_box)
                  {
                    return  <CommitInfo_Box callbackParent={this.onCommitInfoBoxChanged.bind(this)}/>
                  }
                })()}


                {(()=>{
                  if(this.state.tips_box)
                  {
                    return <Warning visible="true" msg={this.state.msg}/>
                  }
                })()}

                {(()=>{
                  if(this.state.commitok_box)
                  {
                    return <CommitSuccess_Box msg="提交成功！" autoHide="true"/>
                  }
                })()}
                {(()=>{
                  if(this.state.login_box){
                    return <Login_Box callbackParent={this.UserIsSeclectedLogin.bind(this)}/>
                  }
                })()}
                {(()=>{
                  if(this.state.share_box){
                    return <div className={styles.float_share}>
                       <Share callbackParent={this.Shared.bind(this)}  title={detail.title+',不说教，只看成效-聆听实力派讲师实战内训不再犹豫'} pic={detail.thumb}/>
                    </div>
                  }
                })()}

                </div>
              }
            </div>
        </div>

    )
  }

}
