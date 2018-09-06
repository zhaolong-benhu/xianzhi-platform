/**
 * Created by zhaolong on 2016/7/31.
 * File description免费报名提示弹框
 */

'use strict'
import React,{Component} from 'react'
import Warning  from './Warning';
import CommitSuccess_Box  from './CommitSuccess_Box';
const styles = require('./FreeSignup_Box.scss');

export default class FreeSignup_Box extends Component{

  state={
    bShowDiv:true,
  }

  componentDidMount(){
    this.setState({bShowDiv:true});
    setTimeout(() => {
      this.hideDiv();
    }, 2000);
  }
  componentWillReceiveProps()
  {
    this.setState({bShowDiv:true});
    setTimeout(() => {
      this.setState({bShowDiv:false});
    }, 2000);
  }
  //隐藏div
  hideDiv(){
    this.props.callbackParent();
    this.setState({bShowDiv:false});
  }
  render()
  {
      var title = this.props.name;
      if(title.length<8){
         title = "《"  + this.props.name +"》，";
      }
    else{
         title = "《"  + title.substr(0,8) +"...》，";
      }
    return(
      <div>
        {(()=>{
          if(this.state.bShowDiv){
            return <div className={styles.bomb_box}>
              <div className={styles.pic}>
                <img className={styles.img} src="/images/commitsuccess.png"/>
              </div>
              <div className={styles.title}>亲爱的用户，您已成功报名</div>
              <div className={styles.name}>{title}</div>
              <div className={styles.tips}>请注意查收短信哦!</div>
            </div>
          }
        })()}
      </div>


    )
  }
}
