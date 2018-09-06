/**
 * Created by zhaolong on 2016/9/2.
 * File description:底部浮窗
 */
import React,{Component,PropTypes} from 'react';
import {Warning} from 'components';
import {connect} from 'react-redux';
const styles = require('./ApplyLms.scss');

@connect(
  state => ({
    user:state.auth.user
  })
)

export default class ApplyLms extends Component {

  static propTypes = {
    user:PropTypes.object
  }
  state = {

  };
componentWillReceiveProps()
{

}
//点击申请试用
onClickedSign(strAction)
{
  if(this.props.user && this.props.user.user_ticket){
    if("申请试用"==strAction){
      this.props.callbackParent(true);
    }
  }
  else {
    this.props.callbackParent(false);
  }
}

componentDidMount(){
}

  render(){
    var btnText = this.props.btnText;
    return(
      <div className={styles.container}>

          <div className={styles.consultation}>
            <a href="http://p.qiao.baidu.com/im/index?siteid=8603625&ucid=6402298&cp=http%3A%2F%2Fm.9first.com%2Flms&cr=&cw=%E8%A7%A6%E5%B1%8F%E7%89%88LMS">
              <span className={styles.consultation_icon}>&#xe60a;</span>
              <span className={styles.consultation_text}>咨询</span>
            </a>
          </div>
        <div className={styles.line}></div>

          {(()=>{
            switch (btnText)
            {
              case "申请试用":
              case "再次申请":
              {
                return <div className={styles.signup}>
                       <span className={styles.signup_text} onClick={this.onClickedSign.bind(this,"申请试用")} >{btnText}</span>
                  </div>
              }break;
              case "已申请":
              case "敬请期待":
              {
                return <div className={styles.signup3}>
                  <span className={styles.signup_text}>{btnText}</span>
                </div>
              }break;

            }
          })()}

      </div>
    )
  }


}
