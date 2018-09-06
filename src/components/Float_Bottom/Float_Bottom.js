/**
 * Created by zhaolong on 2016/6/27.
 * File description:底部浮窗
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Warning} from 'components';
import {Link} from 'react-router';
import {isFollow, addFollow} from 'redux/modules/follow';
import {connect} from 'react-redux';
const styles = require('./Float_Bottom.scss');


@connect(
  state => ({
    follow: state.follow.isfollow,
    user: state.auth.user
  }),
  {isFollow, addFollow}
)

export default class Float_Bottom extends Component {

  static propTypes = {
    isFollow: PropTypes.func,
    addFollow:PropTypes.func,
    follow:PropTypes.object,
    user:PropTypes.object
  }
  state = {
    bomb_box:true,
    tips:false,
    isFollow:-1
  };
componentWillReceiveProps(nextProps){
  this.setState({tips:false});
  if(this.props.follow!=nextProps.follow){
      this.setState({isFollow:nextProps.follow.is_favorite});
  }
}

//咨询
Seek(type){
  if(type != 4){
      window.location.href='http://p.qiao.baidu.com/im/index?siteid=3164266&ucid=6402298&cp=m.9first.com&cr=m.9first.com&cw=%E5%85%88%E4%B9%8B%E8%AF%BE%E5%A0%82';
  }else {
      window.location.href='http://p.qiao.baidu.com/im/index?siteid=8212673&ucid=6402298&cp=http%3A%2F%2Fm.9first.com%2Fihma%2F&cr=m.9first.com&cw=%E8%A7%A6%E5%B1%8F%E7%89%88IHMA%E7%9D%80%E9%99%86%E9%A1%B5';
  }
  switch (type) {
    case 1:{//课程
      ga('send','event','zx','detail-2','zxkecheng');
    }break;
    case 11:{//内训
        ga('send','event','zx','detail-2','neixun');
    }break;
    case 12:{//公开课
         ga('send','event','zx','detail-2','fenlei');
    }break;
    case 13:{//活动（峰会 展会 沙龙 学习考察）
        ga('send','event','zx','detail-2','huodong');
    }break;
    case 21:{//导师
         ga('send','event','zx','detail-2','daoshi');
    }break;
    case 22:{//智库
    }break;
    default:
  }
}

//关注
AddFoolow(type){
  if(this.props.user && this.props.user.user_ticket){
    let id = this.props.id;
    let type = this.props.type2;
    this.props.addFollow(id,type);
  }
  else{
    this.props.callbackParent(false);
  }
  switch (type) {
    case 1:{//课程
      ga('send','event','gz','detail-2','zxkecheng');
    }break;
    case 11:{//内训
        ga('send','event','gz','detail-2','neixun');
    }break;
    case 12:{//公开课
         ga('send','event','gz','detail-2','fenlei');
    }break;
    case 13:{//活动（峰会 展会 沙龙 学习考察）
        ga('send','event','gz','detail-2','huodong');
    }break;
    case 21:{//导师
         ga('send','event','gz','detail-2','daoshi');
    }break;
    case 22:{//智库

    }break;
    default:
  }
}
//报名
onClickedSign(btnText){
  if(this.props.user && this.props.user.user_ticket){
    switch (btnText) {
      case "免费学习":
        this.props.callbackParent(true,"free");
        break;
      case "开始学习":
        this.props.callbackParent(true,"study");
        break;
      default:
        this.props.callbackParent(true,"signup");
    }
  }
  else {
    this.props.callbackParent(false);
  }
  switch (this.props.type2) {
    case 1:{//课程
      if(btnText == "免费学习"){
        ga('send','event','mf-xuexi','detail-3','zxkecheng');
      }
      else {
        ga('send','event','gm','detail-2','zxkecheng');
      }

    }break;
    case 11:{//内训
        ga('send','event','bm','detail-2','neixun');
    }break;
    case 12:{//公开课
         ga('send','event','bm','detail-2','fenlei');
    }break;
    case 13:{//活动（峰会 展会 沙龙 学习考察）
        ga('send','event','bm','detail-2','huodong');
    }break;
    case 21:{//导师
         ga('send','event','bm','detail-2','daoshi');
    }break;
    case 22:{//智库

    }break;
    default:
  }
}
  render(){
    var btnText = this.props.btnText;
    return(
      <div className={styles.container}>

          <div className={styles.consultation}>
            <a onClick={this.Seek.bind(this,this.props.type2)}>
              <span className={styles.consultation_icon}>&#xe60a;</span>
              <span className={styles.consultation_text}>咨询</span>
            </a>
          </div>
        <div className={styles.line}></div>
        {(()=>{
          if(this.state.isFollow==-1 ? this.props.is_favorite : this.state.isFollow==1){
              return(<div className={styles.follow} onClick={this.AddFoolow.bind(this,this.props.type2)}>
                         <span className={styles.is_follow_icon}>&#xe610;</span>
                         <span className={styles.follow_text}>已关注</span>
                       </div>
               )
            }
            else {
                return(<div className={styles.follow} onClick={this.AddFoolow.bind(this,this.props.type2)}>
                         <span className={styles.follow_icon}>&#xe600;</span>
                         <span className={styles.follow_text}>关注</span>
                       </div>
                 )
            }
        })()}

          {(()=>{
            switch (btnText)
            {
              case "我要报名":
              case "再次报名":
              case "购买课程":
              case "再次购买":
              case "证书报名":
              {
                return <div className={styles.signup} onClick={this.onClickedSign.bind(this,btnText)}>
                       <span className={styles.signup_text}>{btnText}</span>
                  </div>
              }break;
              case "我要内训":
              case "再次预约":
              {
                return <div className={styles.signup2} onClick={this.onClickedSign.bind(this,btnText)}>
                     <span className={styles.signup_text}>{btnText}</span>
                  </div>
              }break;
              case "免费学习":
              case "开始学习":
              {
                return <div className={styles.signup4} onClick={this.onClickedSign.bind(this,btnText)}>
                     <span className={styles.signup_text}>{btnText}</span>
                  </div>
              }break;
              case "不可预约":
              {
                return <div className={styles.signup3}>
                     <span className={styles.signup_text}>我要內训</span>
                  </div>
              }break;
              case "活动超时":
              {
                return <div className={styles.signup3}>
                     <span className={styles.signup_text}>我要报名</span>
                  </div>
              }break;
              case "已完成":
              {
                return <div className={styles.signup3}>
                     <span className={styles.signup_text}>已完成</span>
                  </div>
              }break;
              case "已报名":
              case "已内训":
              case "已购买":
              case "敬请期待":
              case "已结业":
              {
                return <div className={styles.signup3}>
                  <span className={styles.signup_text}>{btnText}</span>
                </div>
              }break;

            }
          })()}
        {this.state.tips &&
          <Warning visible={true} msg="请登录后进行报名~"/>
        }
      </div>
    )
  }


}
