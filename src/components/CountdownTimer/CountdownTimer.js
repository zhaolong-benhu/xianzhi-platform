/**
 * Created by qiuzengyuan on 2016/11/18.
 * File description:倒计时
 */
import React, {Component, PropTypes} from 'react';
import TimeDown from '../TimeDown/like-time-down';
const styles = require('./CountdownTimer.scss');

export default class Countdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
      endTime: 0,
    };
  }

  componentWillMount() {
    this.setState({
      startTime: this.props.nowTime,
      endTime: this.props.expireTime,
    })
  }
  componentDidMount() {
    this.handleEndTime(this.props);
    if (this.state.endTime - this.state.startTime > 0) {
      this.tick();
      this.interval = setInterval(this.tick.bind(this), 1000);
    }
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.paramsId == 0) {
      this.setState({
        startTime: nextProps.nowTime,
        endTime: nextProps.expireTime,
      })
    }
    if (this.props.expireTime !== nextProps.expireTime) {
      this.handleEndTime(nextProps);
      // debugger
      this.props.passIsPromotionStart(nextProps.startTime, nextProps.nowTime, nextProps.expireTime);
    }
    if (this.props.promotionStart !== nextProps.promotionStart) {
      this.handleEndTime(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  // 根据活动开始传入不同时间
  handleEndTime(props) {
    const { startTime, nowTime, expireTime, promotionStart } = props;
    if (startTime - nowTime > 0 && promotionStart === false) {
      this.setState({
        startTime: nowTime,
        endTime: startTime,
      });
    }
    if (startTime - this.state.startTime <= 0 ) {
      this.setState({
        endTime: expireTime,
      });
    }
  }
  //开定时器，判断活动开始
  tick() {
    this.setState({
      startTime: this.state.startTime + 1,
    });
    this.props.passIsPromotionStart(this.props.startTime, this.state.startTime, this.props.expireTime);
  }
  // 计算时间
  dateBetween(startTime, endTime) {
    const second = 1;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const distance = endTime - startTime;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    return (
      <div className={styles.container}>
        {(() => {
          if (days > 0) {
              if (this.props.promotionStart) {
                  return (<div>
                    距离开抢结束还有：<span className={styles.days}>{days}</span>天
                  </div>);
              }else{
                  return (<div>
                    距离开抢还有：<span className={styles.days}>{days}</span>天
                  </div>);
              }
          } else {
            if (this.props.promotionStart) {
              return (<div>
                  距离抢购结束还有:
                  <span className={styles.hours}>{hours}</span>:
                  <span className={styles.minutes}>{minutes}</span>:
                  <span className={styles.seconds}>{seconds}</span>
                </div>
              );
            } else {
              return (<div>
                  距离开抢还有：
                  <span className={styles.hours}>{hours}</span>:
                  <span className={styles.minutes}>{minutes}</span>:
                  <span className={styles.seconds}>{seconds}</span>
                </div>
              );
            }
          }
        })()}
      </div>
    );
  }

  renderTimeOver() {
    return (
      <div className={styles.container}>
        <span>抢课完毕，没抢到可以 <span className={styles.red}>限时优惠</span> 哦～</span>
      </div>
    );
  }

  render() {
    // console.log(this.state.endTime)
    return (
      <div >
        {
          this.state.endTime && this.props.list.length > 0 ?
          this.state.endTime - this.state.startTime > 0 ?
            this.dateBetween(this.state.startTime, this.state.endTime)
            : this.renderTimeOver()
          : ''
        }
      </div>
    );
  }
}
