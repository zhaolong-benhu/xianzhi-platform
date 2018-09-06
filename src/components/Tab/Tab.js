/**
 * Created by qiuzengyuan on 2016/11/18.
 * File description:Tab组件容器
 * 需要传递路由属性
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import {Link,browserHistory} from 'react-router';

const styles = require('./Tab.scss');


export default class Tab extends Component {

  static propTypes = {};
  state = {

  }
  componentWillMount() {
    this.setState({
      tabSelected: this.props.params.id,
    });
  }
  handleTabClick(index) {
    this.setState({tabSelected:index});
    browserHistory.push(`/seckill/${this.props.tabs[index].link}`);
  }
  componentDidMount() {
    if (this.props.promotionStart) {
      this.props.changeTabs();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.promotionStart !== nextProps.promotionStart) {
      if (nextProps.promotionStart) {
        this.props.changeTabs();
      }
    }
  }
  render() {
    //传递  属性 至 this.props.children 的方法
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        tabSelected: this.state.tabSelected,
      })
    );
    return (
      <div className={styles.container}>

        {/*头部*/}
        <div className={styles.header}>
          {this.props.tabs.map((value, index) => (
            <div className={this.state.tabSelected == index ? styles.nav_selected : ''}
               key={index}
               onClick={()=>{this.handleTabClick(index);}}>
              <div className={styles.innerWrapper}>
                {value.title}
              </div>
            </div>
          ))}
        </div>

        {/*内容*/}
        <div className={styles.content} >
          {childrenWithProps}
        </div>

      </div>
    );
  }
}
