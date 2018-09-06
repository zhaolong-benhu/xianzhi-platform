/**
 * Created by zhaolong on 2016/7/1.
 * File description:评价组件
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {iscomment,comment_list,add_comment} from '../../api/common/Global';
import {Warning,Star,MarkDiv,EvaluationTutor_Box,CommitSuccess_Box} from 'components';
import {connect} from 'react-redux';
import {addComment,isComment} from 'redux/modules/comment';
import {imageUrl} from '../../api/common/Global';
const styles = require('./TutorEvaluate.scss');

@connect(
  state => ({
    user:state.auth.user,
    is_comment:state.comment.is_result,
    add_comment:state.comment.result
  }),
  {isComment,addComment}
)

export default class TutorEvaluate extends Component{
  static propTypes = {
      isComment:PropTypes.func.isRequired,
      addComment:PropTypes.func.isRequired,
      is_comment:PropTypes.object,
      add_comment:PropTypes.object
  }
  state={
    title:"评价该",//静态文本
    title2:"综合评价",//静态文本
    visible:false,//静态文本
    evaluation_box:false,//评价框
    tips_box:false,//文本提示框
    commitsuccess_box:false,//提交成功提示框
    cannotevaluate_box:false,//不能评价该导师
    msg:"学习过该导师课程后才可以评价~",//静态文本
    total_num:0,//总评论数
    tips:false,//文本提示框
    markDiv:false,//遮罩层
    can_move:true//是否可以移动
  }
  constructor(props) {
    super(props);
    this.nStar=0;
    this.touchmove = this.handleTouchMove.bind(this);
  }
  componentDidMount(){
      window.addEventListener('touchmove',this.touchmove);
  }
  componentWillUnmount(){
      window.removeEventListener('touchmove',this.touchmove);
  }
  //屏幕按下移动
  handleTouchMove(e){
     if(!this.state.can_move){
         e.preventDefault();
     }
  }
 componentWillReceiveProps(nextProps){
    this.setState({tips:false});
    this.setState({evaluation_box:false});
    this.setState({tips_box:false});

    if(this.props.add_comment !=nextProps.add_comment && this.state.evaluation_box)
    {
      this.setState({evaluation_box:false,markDiv:false});
      if(nextProps.add_comment.status == 1){
          console.log("评价成功");
        this.setState({tips_box:true,msg:"评价成功~",evaluation_box:false});
        this.props.callbackParent("comment",this.nStar);
      }else{
        this.setState({tips_box:true,msg:nextProps.add_comment.errMsg});
      }
    }

    if(this.props.is_comment != nextProps.is_comment){
      if(nextProps.is_comment.status==1){
         this.setState({markDiv:true,evaluation_box:true,can_move:false});
         document.documentElement.style.overflow='hidden';
         document.body.style.overflow='hidden';//手机版设置这个。
      }
      else {
        this.setState({tips_box:true,msg:nextProps.is_comment.errMsg});
      }
    }
    if(this.props.source=="kecheng"){
      if(nextProps.bShowevaluation_box){
          this.setState({evaluation_box:true});
      }else {
          this.setState({evaluation_box:false});
      }
    }
  }
  //隐藏div
  HideDiv_Box(){
    this.setState({markDiv:false,evaluation_box:false,can_move:true});
    this.props.callbackParent("visible");
    document.documentElement.style.overflow='visible';
    document.body.style.overflow='visible';//手机版设置这个。
 }
  //点击评价按钮
  EvaluateTutor(nStar){
    if(this.props.user && this.props.user.user_ticket)
    {
      if(this.props.isbuy == 0){
        if(this.props.title == "课程"){
          this.props.callbackParent("购买过该课程才可以评价！");
        }
        if(this.props.title == "专业证书")
        {
          this.props.callbackParent("购买过该专业证书才可以评价！");
        }
        if(this.props.title == "导师")
        {
          this.props.callbackParent("学习过该导师课程后才可以评价！");
        }
      }else{
        if(nStar == 0){
          if(this.props.type == 21){
            //判断是否可以评价
            var id = this.props.id;
            var type = this.props.type;
            const params={
              id:id,
              type:type,
            }
            this.props.isComment(params,iscomment);
          }else {
            this.props.callbackParent("评价");
            this.setState({markDiv:true,evaluation_box:true});
            document.documentElement.style.overflow='hidden';
            document.body.style.overflow='hidden';//手机版设置这个。
          }
        }else{
          if(this.props.title == "导师"){
              this.props.callbackParent("导师不可以重复评价！");
          }else{
              this.props.callbackParent("在线课程不可以重复评价！");
          }
        }
      }
    }
    else
    {
      this.props.callbackParent("unlogin");
    }
  }
  //接收子组件传递过来的参数
  onChildChanged(nStar,evaluation_text){
    this.setState({evaluation_box:true});
    this.setState({markDiv:false});
    //接受用户输入的评价内容 提交到后台
    //(1免费课程 2在线好课 3专业证书 4IHMA 11内训 12公开课 13峰会 14展会 15沙龙 16学习考察 21导师 22智库)
    var id = this.props.id;
    var type = this.props.type;
    var resource_name = this.props.name;
    var star = nStar;
    var description = evaluation_text;
    this.nStar=star;
    const params={
      id:id,
      type:type,
      resource_name:resource_name,
      star:star,
      description:description
    }
    this.props.addComment(params,add_comment);
    console.log("pingjia...");
  }

  render(){
    var title = this.state.title+this.props.title;
    return(
      <div className={styles.container}>

        <div className={styles.evaluate}>
          <div className={styles.text}>{title}</div>
          <div className={styles.all_star}  onClick={this.EvaluateTutor.bind(this,this.props.me_star)}>
            <Star num={this.props.me_star}/>
          </div>
        </div>

        <div className={styles.comprehensive_evaluation}>
            <div className={styles.evaluation}>{this.state.title2}</div>
            <div className={styles.all_star}>
              <Star num={this.props.star}/>
            </div>
            <div className={styles.total}>({this.props.total_num}份评价)</div>
        </div>

        {this.props.data.map(function(v,i){
            return(
                <div>
                  {this.props.data[i].map(function (value,index){
                        return <div key={'all_comment' + index}>
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

                      {/* {(()=>{
                        if(index<comment_list.list.length){
                          return <div className={styles.line}>
                          </div>
                        }
                      })()} */}

                    </div>

                      })}
                </div>
            )}.bind(this))}

        <div className={this.props.nomore_comment?styles.nomore_comment:styles.nomore_comment2}>没有更多评价!</div>


        {(()=>{
          if(this.state.evaluation_box)
          {
            return <div>
              <EvaluationTutor_Box callbackParent={this.onChildChanged.bind(this)}/>
            </div>
          }
          if(this.state.commitsuccess_box)
          {
            return <div>
              <CommitSuccess_Box/>
            </div>
          }
        })()}
        {(()=>{
          if(this.state.tips_box)
          {
            return <div>
              <Warning visible="true" msg={this.state.msg} icon={imageUrl+"/images/EvaluateWarning.png"} />
            </div>
          }
        })()}
        {(()=>{
          if(this.state.markDiv)
          {
            return <MarkDiv callbackParent={this.HideDiv_Box.bind(this)}/>
          }
        })()}

      </div>
    )
  }
}
