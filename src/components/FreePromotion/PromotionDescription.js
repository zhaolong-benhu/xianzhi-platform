/**
 * Created by qzy on 2016/11/20.
 * File description:活动描述
 */
import React, {
  Component,
  PropTypes,
} from 'react';
const styles = require('./PromotionDescription.scss')

export default class PromotionDescription extends Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div className={styles.container}>
        <h5 className={styles.title}>教你抢课</h5>
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
    );
  }
}
