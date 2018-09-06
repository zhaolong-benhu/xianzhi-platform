/**
 * Created by qzy on 2016/11/29.
 * File description:注册导航指示
 */
import React, {
  Component,
  PropTypes,
} from 'react';
const styles = require('./RegisterInstructor.scss');
export default class RegisterInstructor extends Component {
  static propTypes = {};
  static defaultProps = {
    step:[1]
  };

  render() {
    return (
      <div className={styles.container} >
        <div className={this.props.step.indexOf(1) > -1 ? styles.onStep : ''} onClick={()=>this.props.changePage(1)}>
          <div className={styles.rounded}>1</div>
          <div>个人信息</div>
        </div>
        <div className={styles.line}></div>
        <div className={this.props.step.indexOf(2) > -1 ? styles.onStep : ''}>
          <div className={styles.rounded}>2</div>
          <div>职业信息</div>
        </div>
      </div>
    );
  }
}
