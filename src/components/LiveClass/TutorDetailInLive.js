/**
 * Created by qzy on 2016/11/29.
 * File description:直播导师详情
 */
import React, {Component,PropTypes} from 'react';
import {Link} from 'react-router'
import {isFollow, addFollow} from 'redux/modules/follow';
import {connect} from 'react-redux';
const styles = require('./TutorDetailInLive.scss')

@connect(
  state => ({
      follow: state.follow.isfollow
  }), {isFollow, addFollow}
)

export default class TutorDetailInLive extends Component {
  state={
    isFollow:-1,
    tips:false,
  }
  static propTypes = {
      isFollow: PropTypes.func,
      addFollow:PropTypes.func,
      follow:PropTypes.object,
  };
  static defaultProps = {};

  //添加和取消关注
  followHandle() {
    if(this.props.isLogin){
      this.props.addFollow(this.props.hourse_id,"23");//type：23关注直播间
    }else{
      this.props.callbackParent();
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({tips:false});
    if(this.props.follow!=nextProps.follow){
        this.setState({isFollow:nextProps.follow.is_favorite});
        // if(nextProps.follow.status==1){
        //   this.setState({isFollow:nextProps.follow.is_favorite});
        // }else{
        //   this.props.callbackParent();
        // }
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.innerWrapper}>
          <div className={styles.top}>
            <div className={styles.img}>
              <img src={this.props.data.live_user_thumb} alt=""/>
            </div>
            <div className={styles.title}>
              <h5 id="live_user_name">
                {this.props.data.live_user_name}
              </h5>
              <div className={styles.location}>
              <span><i>&#xe604;</i>
                {this.props.data.favorite_num}</span>
                <span className={styles.gift}><i>&#xe639;</i>
                  <em id="red_packet">{`${this.props.data.red_packet}`}</em></span>
              </div>
            </div>
            <div className={this.props.data.teacher_id == "0" ? styles.warn: styles.warn2}>
              {(()=>{
                if (this.state.isFollow==-1 ? this.props.data.is_favorite : this.state.isFollow==1) {
                  return <div className={styles.reminded} onClick={()=>this.followHandle()}>
                    &nbsp;取消关注
                  </div>
                }else {
                  return <div className={styles.remind} onClick={()=>this.followHandle()}>
                    <span className={styles.iconplus}>+</span>&nbsp;关注
                  </div>
                }
              })()}
            </div>

          </div>
          <div className={styles.description}>
            <p>{this.props.data.introduction}</p>
          </div>
        </div>

      </div>
    );
  }
}
