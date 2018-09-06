/**
 * Created by zhaolong on 2016/6/29.
 * File description:用户评论列表
 */
'use strict';
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {Login_Box,CommitSuccess_Box} from 'components';
import {imageUrl} from '../../api/common/Global';
const styles = require('./Comment.scss');

@connect(
  state => ({
    user:state.auth.user
  })
)
export default class Comment extends Component {
  static propTypes = {
      user:PropTypes.object
  }
  state={
    bShowComment_area:false,
    title:"评论",
    login_box:false,
  };

  //接受用户输入的评论信息内容
  GetUserInput(){
    var comment_text = this.refs.comment_text.value;
    if(comment_text.length>100)
    {
      message.value =comment_text.substr(0,100);
    }

  }

  onCommentBtnClicked()
  {
    //判断是否登录
  if(this.props.user && this.props.user.user_ticket){
    this.setState({bShowComment_area:!this.state.bShowComment_area});
    if(this.state.bShowComment_area){
      this.setState({title:"评论"});
    }
    else {
      this.setState({title:"取消"});
    }
  }else{
    //弹出灰化层
    let mask=document.getElementById('mask');
    mask.style.display="block";
    //弹出登录框
    this.setState({login_box:true});
  }


  }
  //提交
  HandleSubmit(){
      var comment_text = this.refs.comment_text.value;
      if(comment_text.length==0)
      {
        this.props.callbackParent(null);
      }
      else {
        this.setState({bShowComment_area:false});
        //发送给父组件
        this.props.callbackParent(this.refs.comment_text.value);
        this.setState({comment_num:parseInt(this.state.comment_num)+1});
        this.setState({title:"评论"});
      }
  }

  onChildChanged(){
    //弹出灰化层
    let mask=document.getElementById('mask');
    mask.style.display="none";
    this.setState({login_box:false});
  }
  render(){
    var title = "评论"+ "(" +this.props.total_num + ")";
    return(
      <div className={styles.container}>
        <div className={styles.line}></div>

        <div className={styles.title}>
          <span>{title}</span>
          <span className={styles.edit_text} onClick={this.onCommentBtnClicked.bind(this)}>{this.state.title}</span>
          <span className={styles.edit_icon} onClick={this.onCommentBtnClicked.bind(this)}>&#xe62a;</span>
        </div>

        {(()=>{
          if(this.state.bShowComment_area){
            return  <div className={styles.user_input}>
              <textarea className={styles.comment_area} name="yj" placeholder="" ref="comment_text" id="message" onChange={this.GetUserInput.bind(this)}/>
              <div className={styles.publish_comment} onClick={this.HandleSubmit.bind(this)}>发表评论</div>
            </div>
          }
        })()}


        {this.props.data.map(function(v,i){
            return(
                <div key={'all'+i}>
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
                                </div>
                              </div>
                              <div className={styles.user_comments}>
                               <span className={styles.user_comment}>
                                 {value.description}
                               </span>
                              </div>
                      </div>
                    })}
              </div>
            )
        }.bind(this))}

        <div className={this.props.nomore_comment?styles.nomore_comment:styles.nomore_comment2}>没有更多评论!</div>

        {(()=>{
          if(this.state.login_box){
            return <Login_Box callbackParent={this.onChildChanged.bind(this)}/>
          }
        })()}
      </div>
    )
  }
}
