/**
 * Created by qzy on 2016/12/27.
 * File description:关注主播列表
 */
import React,{Component,PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {Warning} from 'components';
import {imageUrl} from '../../../api/common/Global';
import {addAnchorFollow} from 'redux/modules/live_follow';

const styles = require('./LiveList.scss');

@connect(
  state => ({
    addResult:state.live_follow.addanchor_data
}),{addAnchorFollow}
)

export default class LiveList extends Component {

  static propTypes = {
    addAnchorFollow: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.bClickedBtn = 0;
    this.state = {
      tips_box: false,
      msg: '',
      tips:"",
    };
  }
  // 跳转直播间
  goLive(id,e) {
    if(this.bClickedBtn == 1){
      this.bClickedBtn = 0;
      // e.preventDefault();
      return;
    }
    location.href=`/live/${id}`;
  }
  //加关注/取消关注
  addFollow(user_id,i){
    this.bClickedBtn = 1;
    var items = this.props.data;
		if(items[i].favorite == "0"){
			items[i].favorite = "1"
		}else{
			items[i].favorite = "0";
		}
    this.setState({tips:"tips"});
    this.props.addAnchorFollow(user_id);
  }

  render() {
    return (
      <div>

        {this.props.data.map((v,i)=>{
          return <div className={styles.item} onClick={(e)=>this.goLive(v.id,e)} key={i}>
                    <div className={styles.info}>
                        <img className={styles.head} src={v.face_url ? v.face_url : imageUrl+'/images/liveClass/anchor.png'}/>
                        <div className={styles.infos}>
                           <div className={styles.name}>{v.name}</div>
                           <div className={styles.labels}>
                           {v.label && v.label.map((d,j)=>{
                             return  <div className={styles.label} key={j}>{d}</div>
                           })}
                           </div>
                        </div>
                    </div>
                    <img className={styles.follow} src={v.favorite == "0" ? imageUrl+'/images/liveClass/follow.png' : imageUrl+'/images/liveClass/followed.png'} onClick={()=>this.addFollow(v.user_id,i)} />
                </div>
        })}

      </div>
    )
  }
}
