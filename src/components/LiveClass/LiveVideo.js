/**
 * Created by qzy on 2016/12/6.
 * File description:直播视频
 */
import React, {Component, PropTypes,} from 'react';
import {imageUrl} from '../../api/common/Global';
import { Link } from 'react-router';
const styles = require('./LiveVideo.scss');
export default class LiveVideo extends Component {
  static propTypes = {};
  static defaultProps = {};
  state ={
    height:0
  }
  componentDidMount(){
    // this.setState({height: document.body.clientHeight});
    //是否直播中 1直播 0未直播
    if(this.props.data.status==1){
        //加载腾讯云直播视频
        var player = new qcVideo.Player("videoContainer", {
            "live_url" : this.props.data.hls_downstream_address,
            "live_url2" : this.props.data.flv_downstream_address,
            "x5_type" : "h5",
            "width" : "100%",
            "height" : "230px"//document.body.clientHeight
        });
    }
  }
  render() {
      var pic = imageUrl+"/images/user/head.jpg";
    return (
      <div className={styles.videoplay}>
          {(()=>{
             if(this.props.data.status==1){
                 return <div id="videoContainer" className={styles.videoContainer}></div>
             }else {
                 return <div className={styles.tips}>
                     <img src={this.props.data.live_user_thumb !="" ? this.props.data.live_user_thumb : pic} alt="" className={styles.anchor_thumb}/>
                     <div className={styles.msg}>主播暂未开播，你可以去别处逛逛~~</div>
                     <div className={styles.live_info}>
                         <span className={styles.start_time}>{this.props.data.next_live_start != "" ? "下次开播时间："+this.props.data.next_live_start : ""}</span>
                         <div className={styles.history_look} onClick={()=>this.props.callbackParent()}>
                            <i className={styles.eye}>&#xe641;</i>
                            <div className={styles.btn}>历史回看</div>
                         </div>
                     </div>
                 </div>
             }
          })()}
      </div>
    );
  }
}
