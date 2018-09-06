import React, {Component,PropTypes} from 'react';
import {Link} from 'react-router'
import {isFollow, addFollow} from 'redux/modules/follow';
import {connect} from 'react-redux';
const styles = require('./LiveUser.scss')

@connect(
  state => ({
      follow: state.follow.isfollow
  }), {isFollow, addFollow}
)

export default class LiveUser extends Component {
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
    }
  }
  exitRoom(user_name,channel_id){
      this.props.exitRoom(user_name,channel_id);
  }
  render() {
    return (
        <div className={styles.videopanehead}>
        {this.props.data &&
            <div>
            <div className={styles.videopaneinfo}>
                <div className={styles.videoinfo}>
                    <div className={styles.userimg}>
                        <img src={this.props.data.live_user_thumb} width="45"/>
                    </div>
                    <div className={styles.userinfo}>
                      <div className={styles.userinfotext}>
                        {this.props.data.live_user_name}
                      </div>
                      <div className={styles.userinfonum}>
                          <i>&#xe604;</i><span id="userfans">{this.props.onlineNum==0 ? this.props.data.online_num : this.props.onlineNum}</span>
                          <i className={styles.packet}>&#xe639;</i><span id="red_packet">{`${this.props.money}`}</span>
                      </div>
                    </div>
                </div>
            </div>
            <a onClick={()=>this.exitRoom(this.props.data.user_name,this.props.data.channel_id)}>
              <i className={styles.exit}>&#xe63c;</i>
            </a>
            </div>
        }
        </div>
      );
    }
  }
