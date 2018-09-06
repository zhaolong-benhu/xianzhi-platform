/**
 * Created by qiuzengyuan on 2016/11/18.
 * File description:课程视图
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import {Link} from 'react-router'
const styles = require('./OneCourseView.scss')

export default class OneCourseView extends Component {

  static propTypes = {};
  static defaultProps = {
    thumb: '/images/FreePromotion/sample1.jpg',
    title: '餐饮卫生与安全',
    real_price: '1800',
    price: '3600.00',
    quantity: '5',
    id: '1',
    type: '2',
  };
// 控制按钮大小
  handleImgSize() {
    if (this.props.focus) {
      return {
        height: '62%',
      };
    }
  }
// 渲染按钮
  renderBtn() {
    if (this.props.promotionStart) {
      return (
      <a>
        <div
          onClick={() => this.props.handleKill(this.props.id, this.props.type, this.props.real_price, this.props.title, "createSecKill")}
          className={styles.btn}>
          开抢
        </div>
      </a>
      );
    } else {
      if (this.props.tabSelected == 0) {
        return (
            <div
              onClick={() => this.props.handleKill(this.props.id, this.props.type, this.props.real_price, this.props.title, "createcourseorder")}
              className={styles.btn}>
              已抢完，特价购买
            </div>
        );
      }
      if (this.props.tabSelected == 1) {
        return (
          <Link to={this.renderLinks()}>
            <div className={styles.btn}>
              即将开抢
            </div>
          </Link>
        );
      }
      if (this.props.tabSelected == 2) {
        return (
          <Link to={this.renderLinks()}>
            <div className={styles.btn}>
              敬请期待
            </div>
          </Link>
        );
      }
    }
  }
// 控制链接
  renderLinks() {
    switch (this.props.type) {
      case '3' :
        return `/kechengbao/${this.props.id}`;
      default :
        return `/kecheng/${this.props.id}`;
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Link to={this.renderLinks()}>
          <img src={this.props.thumb} alt="" style={this.handleImgSize()}/>
          <div>
            <div>
              <span className={styles.title}>{this.props.title}</span>
              <span className={styles.count}>{this.props.quantity}份</span>
            </div>
            <div>
              <span className={styles.price}>￥{this.props.real_price}</span>
              <span className={styles.oldPrice}>￥{this.props.price}</span>
            </div>
          </div>
        </Link>
          {this.renderBtn()}
      </div>
    );
  }
}
