/**
 * Created by qiuzengyuan on 2016/11/17.
 * File description:简单图片横幅
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import {Link} from 'react-router';
import {imageUrl} from '../../api/common/Global';
const styles = require('./StaticBanner.scss')
class StaticBanner extends Component {
  static defaultProps = {
    img: {
      name: "线下公开课",
      img: "/images/freePromotion/fpBanner.jpg",
      link: "/seckill/1",
      statistics: "ga('send','event','gkaike','sy','yketang')"
    }
}
  render() {
    return (
      <div className={styles.container}>
        <Link to={this.props.img.link}>
          <img src={imageUrl+this.props.img.img} alt=""/>
        </Link>
      </div>
    );
  }
}

StaticBanner.propTypes = {};

export default StaticBanner;
