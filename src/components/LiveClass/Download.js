/**
 * Created by zhaolong on 2017/09/14.
 * File description: 直播间底部下载广告位
 */
import React, {Component} from 'react';
const styles = require('./Download.scss');

export default class Download extends Component {

  render() {
    return (
      <div className={styles.container}>
         <img src="//f3-xz.veimg.cn/m/images/appdown.jpg" className={styles.img} />
      </div>
    );
  }
}
