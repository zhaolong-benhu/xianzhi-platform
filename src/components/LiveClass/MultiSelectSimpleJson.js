/**
 * Created by qzy on 2016/12/16.
 * File description:简化的多选组件
 */
import React, {Component, PropTypes,} from 'react';
import {without} from 'lodash';
const styles = require('./MultiSelectSimpleJson.scss');
export default class MultiSelectSimpleJson extends Component {
  static propTypes = {};
  static defaultProps = {
    subject: [
      '人力资源', '营销', '餐饮', '前厅', '客房', '财务', '安全', '其他',
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      selected: [],
    };
  }

  // 打开多选
  handleSkill() {
    this.setState({
      isSelected: true,
    });
  }

  // 关闭多选
  handleSubmit() {
    this.props.setSelect(this.state.selected)
    this.setState({
      isSelected: false,
    });
  }

  // 清楚多选
  clearSelect() {
    this.setState({
      selected: [],
    });
  }

  // 查找选中的id
  findVal(value) {
    return this.state.selected.find((val) => {
      return val === value;
    });
  }

  // // 添加数据
  // handelClick(value) {
  //   if (this.findVal(value)) {
  //     this.setState({
  //       selected: without(this.state.selected, value),
  //     });
  //   } else {
  //     this.setState({
  //       selected: [...this.state.selected, value],
  //     });
  //   }
  // }

  // 改变颜色
  handleColorChange(value) {
    if (this.findVal(value)) {
      return {
        background: '#FF5252',
      };
    }
  }
  // 添加数据
  handelClick(value) {
    if (this.findVal(value)) {
      this.setState({
        selected: without(this.state.selected, value),
      });
    } else {
      this.setState({
        selected: [...this.state.selected, value],
      });
    }
  }
  // 渲染结果
  renderSelected() {
    if (this.state.selected) {
      return this.state.selected.map((val) => val).join(',\n');
    }
  }

  // 多选弹出
  renderPopup() {
    if (this.state.isSelected === true) {
      return (<div className={styles.popup}>
        <div className={styles.chooseContent}>
          <div className={styles.title}>
            <span>请选择您擅长的课程/主题（可多选）</span>
            <span className={styles.btn} onClick={() => this.handleSubmit()}>提交</span>
          </div>
            <div style={{ marginTop: '10px', borderBottom: '1px dashed #eee',height:'30px'}}>
              <span className={this.props.selected.length > 0 ? styles.selected : styles.default} style={{color: '#aaa', lineHeight: '30px', height: '30px'}}>
                {this.renderSelected()}
              </span>
                {this.props.selected.length > 0 && this.state.isSelected ?
                <i className={styles.clear_btn} onClick={() => this.clearSelect()}>&#xe616;</i> : ''}
            </div>
            <div className={styles.classify}>
              {this.props.subject.map((val, i) => {
                return (
                  <span
                    key={i}
                    onClick={() => {
                      this.handelClick(val);
                    }}
                    style={this.handleColorChange(val)}
                  >
                    {val}
                  </span>
                );
              })}
            </div>
          </div>
      </div>);
    }
  }

  render() {
    return (
      <div style={{padding: '0'}}>
        <div className={styles.multiSelect}>
          <label>擅长课程/专题:</label>
          <div ref="subject" onClick={() => this.handleSkill()}>
            <span className={this.props.selected.length > 0 && !this.state.isSelected ? styles.selected : styles.default}>
              {this.props.selected.length > 0 && !this.state.isSelected ? this.renderSelected() : '请选择课程/专题'}
            </span>
          </div>
        </div>
        {this.renderPopup()}
      </div>
    );
  }
}
