/**
 * Created by qiuzengyuan on 2016/11/18.
 * File description:课程区域列表
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import OneCourseView from './OneCourseView'

const styles = require('./PromotionCourseList.scss')
export default class PromotionCourseList extends Component {

  static propTypes = {};
  static defaultProps = {};
  renderCourse() {
    if (this.props.list && this.props.list.length > 0 ) {
      // 列表双数两个大，列表单数一个大,没有列表提示错误信息
      if (this.props.list.length % 2 == 0) {
        return this.props.list.map( (val, i) => {
          if (i == 0 || i== 1) {
            return (
              <div className={styles.focus} key={val.id}>
                <OneCourseView {...val} {...this.props}/>
              </div>
            );
          } else {
            return (
              <div className={styles.normal} key={val.id}>
                <OneCourseView {...val} {...this.props} />
              </div>
            );
          }
        });
      }else if (this.props.list.length % 2 == 1) {
        return this.props.list.map( (val, i) => {
          if (i == 0) {
            return (
              <div className={styles.focus} key={val.id}>
                <OneCourseView {...val} {...this.props} />
              </div>
            );
          } else {
            return (
              <div className={styles.normal + " " + styles.odd} key={val.id}>
                <OneCourseView {...val} {...this.props} />
              </div>
            )
          }
        });
      } else {
        return <div className={styles.error}>{this.props.errMsg}</div>;
      }
    }else{
      return <div className={styles.error}>无活动内容</div>;
    }
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderCourse()}
      </div>

    );
  }
}
