/**
 * Created by zhaolong on 2016/7/5.
 * File description:评价打星弹框
 */
'use strict'
import React,{Component} from 'react'
import Warning  from './Warning';
import CommitSuccess_Box  from './CommitSuccess_Box';
const styles = require('./EvaluationTutor_Box.scss');

export default class EvaluationTutor_Box extends Component{

  state={
    evaluation_text:"满意",
    start1:true,
    start2:true,
    start3:true,
    start4:true,
    start5:false,
    tips_box:false,
    commitsuccess_box:false,
    msg:"评价内容不能为空",
    nStar:4,
    bFoucs:false,
}

  //打星
  ClickStar(nStar){

    switch (nStar)
    {
      case 1:
      {
        this.setState({evaluation_text:"非常不满意"});
        this.setState({nStar:1});
        this.setState({start1:true});
        this.setState({start2:false});
        this.setState({start3:false});
        this.setState({start4:false});
        this.setState({start5:false});
      }break;
      case 2:
      {
        this.setState({evaluation_text:"不满意"});
        this.setState({nStar:2});
        this.setState({start1:true});
        this.setState({start2:true});
        this.setState({start3:false});
        this.setState({start4:false});
        this.setState({start5:false});
      }break;
      case 3:
      {
        this.setState({evaluation_text:"一般"});
        this.setState({nStar:3});
        this.setState({start1:true});
        this.setState({start2:true});
        this.setState({start3:true});
        this.setState({start4:false});
        this.setState({start5:false});
      }break;
      case 4:
      {
        this.setState({evaluation_text:"满意"});
        this.setState({nStar:4});
        this.setState({start1:true});
        this.setState({start2:true});
        this.setState({start3:true});
        this.setState({start4:true});
        this.setState({start5:false});
      }break;
      case 5:
      {
        this.setState({evaluation_text:"非常满意"});
        this.setState({nStar:5});
        this.setState({start1:true});
        this.setState({start2:true});
        this.setState({start3:true});
        this.setState({start4:true});
        this.setState({start5:true});
      }break;
    }
 }

  //文本字数限制
  LimitTextArea(){
    var evaluation_text = this.refs.evaluation_text.value;
    if(evaluation_text.length>200)
    {
      message.value =evaluation_text.substr(0,200);
    }
  }

  //提交评价
  SubmitEvaluation()
  {
    var evaluation_text = this.refs.evaluation_text.value;
    if(evaluation_text.length>200)
    {
      this.setState({tips_box:true});
      this.setState({msg:"评价内容字数超过200"})
    }
    else if( 0 == evaluation_text.length)
    {
      this.setState({tips_box:true});
      this.setState({msg:"评价内容不能为空"})
    }
    else{
      // this.setState({
      //   bomb_box: newState
      // });
      // 这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
      this.props.callbackParent(this.state.nStar,evaluation_text);

    }
  }

  //得到input焦点
  onFocus(){
    // this.setState({bFoucs:true});
  }

  render()
  {
    return(
      <div className={styles.bomb_box}>
        <div className={styles.info}>
          <div className={styles.empty}></div>
          <div className={styles.star}>
            <span  className={this.state.start1?styles.stars:styles.stars2} onClick={this.ClickStar.bind(this,1)}>&#xe610;</span>
            <span className={this.state.start2?styles.stars:styles.stars2} onClick={this.ClickStar.bind(this,2)}>&#xe610;</span>
            <span className={this.state.start3?styles.stars:styles.stars2} onClick={this.ClickStar.bind(this,3)}>&#xe610;</span>
            <span className={this.state.start4?styles.stars:styles.stars2} onClick={this.ClickStar.bind(this,4)}>&#xe610;</span>
            <span className={this.state.start5?styles.stars:styles.stars2} onClick={this.ClickStar.bind(this,5)}>&#xe610;</span>
          </div>
          <div className={styles.title}>{this.state.evaluation_text}</div>
          <div className={styles.empty}></div>
          <div className={styles.evaluation}>
            <textarea className={styles.text_area} name="yj" onFocus={this.onFocus.bind(this)} placeholder="请写下您的评价，限200字" ref="evaluation_text" id="message" onChange={this.LimitTextArea.bind(this)}/>
          </div>
        </div>
        <div className={styles.commit} onClick={this.SubmitEvaluation.bind(this)}>
          <a className={styles.c}>提交</a>
        </div>

        {(()=>{
          if(this.state.tips_box)
          {
            return <div>
              <Warning visible="true" msg={this.state.msg}/>
            </div>
          }
        })()}

      </div>
    )
  }
}
