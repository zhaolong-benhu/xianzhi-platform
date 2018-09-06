/**
 * Created by qzy on 2016/12/27.
 File description:个人中心-关注直播
 */
'use strict';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {LiveList, Header, NoContent} from 'components';
import {loadLiveList} from 'redux/modules/liveclass';
import {push} from 'react-router-redux';

@connect(
  state => ({
    data: state.liveclass.data,
  }), {loadLiveList, push}
)

export default class MyLive extends Component {
  state = {
    data: [],
    bLock: false,
  };
  static propTypes = {
    data: PropTypes.object,
    loadLiveList: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props);
    this.array = [];
    this.total_page = 1;
    this.current_page = 1;
    this.scroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    this.props.loadLiveList(1);
  }

  componentDidMount() {
    //添加滚动条事件
    window.addEventListener('scroll', this.scroll);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.data != nextProps.data) {
      if (nextProps.data.status == 0) {
        this.props.push('/');
      } else {
        if (nextProps.data.data.current_page == 1)
          this.array.length = 0;
        this.array.push(nextProps.data.data.list);
        this.total_page = nextProps.data.data.total_page;
        this.setState({data: this.array});
        this.setState({bLock: false});
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll);
  }

  //滚动条加载数据
  handleScroll(e) {
    let srollPos = window.pageYOffset; //滚动条距顶部距离(页面超出窗口的高度)
    let totalheight = parseFloat(document.documentElement.clientHeight) + parseFloat(srollPos); //屏幕高度+滚动条距顶部距离
    if ((document.body.scrollHeight - 10) <= totalheight) {//屏幕高度+滚动条距顶部距离>页面高度
      //加锁处理
      if (!this.state.bLock) {
        this.setState({bLock: true});
        if (this.current_page < this.total_page) {
          this.current_page += 1;
          const page = Number(this.current_page);
          this.props.loadLiveList(page);
        } else {
        }
      }
    }
  }


  render() {
    var divStyle={
      backgroundColor:'#eee',
      paddingTop:'45px',
      paddingLeft:'10px',
      paddingRight:'10px',
    }
    const {data} = this.props;

    return (
      <div>
        <Helmet title="主播关注"/>
        <Header title="主播关注" back="/user" line="1"/>
        {data && this.state.data &&
        <div style={divStyle}>
          {(() => {
            if (data.data.total_num === "0") {
              return <NoContent text="您还没有关注过任何主播哦，快去关注吧！"/>
            } else {
              return <div>
              {this.state.data.map((v,i)=>{
                return <LiveList data={this.state.data[i]} key={i}/>
              })}
              </div>

            }
          })()}
        </div>
        }
      </div>
    )
  }
}
