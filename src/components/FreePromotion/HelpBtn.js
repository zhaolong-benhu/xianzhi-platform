/**
 * Created by qzy on 2016/12/5.
 * File description:秒杀帮助按钮
 */
import React, {Component, PropTypes,} from 'react';
const styles = require('./HelpBtn.scss')
export default class HelpBtn extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props)
    this.state = {
      showMask: false,
      can_move: true,
    }
    this.touchmove = this.handleTouchMove.bind(this);
  }
  componentDidMount() {
    window.addEventListener('touchmove', this.touchmove);
    this.setState({list:this.props.data});
  }
  componentWillUnmount() {
    window.removeEventListener('touchmove', this.touchmove);
  }
  //按下移动
  handleTouchMove(e) {
    if (!this.state.can_move) {
      e.preventDefault();
    }
  }
  // 提示
  showTips() {
    this.setState({
      showMask: !this.state.showMask,
      can_move: !this.state.can_move,
    })
  }
// 渲染遮罩
  renderMask() {
    if (this.state.showMask) {
      document.documentElement.style.overflow = 'none';
      document.body.style.overflow = 'none';//手机版设置这个
      let screenHeight = screen.height;
      return (
        <div className={styles.maskWrapper} onClick={() => {
          this.showTips()
        }}>
          <div className={styles.background}>

          </div>
          <div className={styles.content}>
            <p>抢课攻略</p>
            <ul>
              <li>手要快</li>
              <li>眼要快</li>
              <li>各种快</li>
            </ul>
            <p>活动说明</p>
            <ul>
              <li>解释权归先之云课堂</li>
              <li>每天只能抢一门哟</li>
              <li>抢完课需要在指定时间学习完毕哦</li>
            </ul>
          </div>
        </div>
      )
    } else {
      document.documentElement.style.overflow = 'visible';
      document.body.style.overflow = 'visible';//手机版设置这个。
    }
  }
// 动态zindex
  btnZIndexChange() {
    if (this.state.showMask) {
      return {
        zIndex: "98",
        position: "fixed"
      }
    }
  }

  render() {
    return (
      <div>
        <div className={styles.container} style={this.btnZIndexChange()}>
          <div className={styles.helper} onClick={() => {
            this.showTips()
          }}>
            <span>?</span>
          </div>
        </div>
        {this.renderMask()}
      </div>
    );
  }
}
