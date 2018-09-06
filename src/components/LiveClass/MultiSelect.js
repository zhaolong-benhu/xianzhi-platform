/**
 * Created by qzy on 2016/12/14.
 * File description:多选组件
 */
import React, {Component, PropTypes,} from 'react';
import {reject} from 'lodash';
const styles = require('./MultiSelect.scss');
export default class MultiSelect extends Component {
  static propTypes = {};
  static defaultProps = {
    subject: [
      {
        category_name: '管理类',
        category_content: [
          {
            name: '信息管理1',
            id: 1,
          },
          {
            name: '信息管理2',
            id: 2,
          },
          {
            name: '信息管理3',
            id: 3,
          },
          {
            name: '信息管理4',
            id: 4,
          },
          {
            name: '信息管理5',
            id: 5,
          },
          {
            name: '信息管理6',
            id: 6,
          },
          {
            name: '信息管理7',
            id: 7,
          },
          {
            name: '信息管理8',
            id: 8,
          },
        ],
      },
      {
        category_name: '营销类',
        category_content: [
          {
            name: '信息管理',
            id: 123,
          },
          {
            name: '信息管理',
            id: 123,
          },
          {
            name: '信息管理',
            id: 123,
          },
          {
            name: '信息管理',
            id: 123,
          },
          {
            name: '信息管理',
            id: 123,
          },
          {
            name: '信息管理',
            id: 123,
          },
          {
            name: '信息管理',
            id: 123,
          },
          {
            name: '信息管理',
            id: 123,
          },
        ],
      },
      {
        category_name: '大住宿业类',
        category_content: [
          {
            name: '信息管理',
            id: 123,
          },
          {
            name: '信息管理',
            id: 123,
          },
          {
            name: '信息管理',
            id: 123,
          },
          {
            name: '信息管理',
            id: 123,
          },
          {
            name: '信息管理',
            id: 123,
          },
          {
            name: '信息管理',
            id: 123,
          },
          {
            name: '信息管理',
            id: 123,
          },
          {
            name: '信息管理',
            id: 123,
          },
        ],
      },
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
      return val.id === value.id;
    });
  }

  // 添加数据
  handelClick(value) {
    if (this.findVal(value)) {
      this.setState({
        selected: reject(this.state.selected, value),
      });
    } else {
      this.setState({
        selected: [...this.state.selected, value],
      });
    }
  }

  // 改变颜色
  handleColorChange(value) {
    if (this.findVal(value)) {
      return {
        color: 'red',
      };
    }
  }

  // 渲染结果
  renderSelected() {
    return `${this.state.selected.map((val) => val.name).join(',\n')}`;
  }

  // 多选弹出
  renderPopup() {
    if (this.state.isSelected === true) {
      return (<div className={styles.popup}>
        <div className={styles.mask}>
        </div>
        <div className={styles.chooseContent}>
          <div className={styles.title}>
            <span>请选择您擅长的课程/主题（可多选）</span>
            <span className={styles.btn} onClick={() => this.handleSubmit()}>提交</span>
          </div>
          {this.props.subject.map((val, i) => {
            return (<div className={styles.classify} key={i}>
              <h5>{val.category_name}</h5>
              {val.category_content.map((value, j) => {
                return (
                  <span
                    key={j}
                    onClick={() => {
                      this.handelClick(value);
                    }}
                    style={this.handleColorChange(value)}
                  >
                    {value.name}
                  </span>
                );
              })}
            </div>);
          })}
        </div>
      </div>);
    }
  }

  render() {
    return (
      <div style={{padding:'0'}}>
        <div className={styles.multiSelect}>
          <label>擅长课程/专题:</label>
          <div ref="subject" onClick={() => this.handleSkill()}>
              <span className={this.state.selected.length > 0 ? styles.selected : styles.default}>
                {this.state.selected.length > 0 ? this.renderSelected() : '请输入选择课程/专题'}
                </span>
            {this.state.selected.length > 0 && this.state.isSelected ?
              <i className={styles.clear_btn} onClick={() => this.clearSelect()}>&#xe616;</i> : ''}
          </div>
        </div>
        {this.renderPopup()}
      </div>
    );
  }
}
