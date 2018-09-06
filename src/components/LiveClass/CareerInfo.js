/**
 * Created by qzy on 2016/11/30.
 * File description:职业信息
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import {Field, reduxForm} from 'redux-form';
import { reject } from 'lodash';
import MultiSelectSimpleJson from './MultiSelectSimpleJson';
const styles = require('./CareerInfo.scss');
// 验证规则
const validate = values => {
  const errors = {};
  if (!values.introduction) {
    errors.introduction = '必填';
  }
  if (!values.honor) {
    errors.honor = '必填';
  }
  return errors;
};
// 渲染文本框
const renderTextarea = ({input, label, type, placeholder, maxlength, meta: {touched, error, warning}}) => (
  <div style={{height: '85px' }}>
    <label style={{lineHeight: '45px'}}>{label}</label>
    <div style={{width: '70%',display:'inline-block'}}>
      <textarea {...input} type={type} placeholder={placeholder} maxLength={maxlength}/>
      {touched && ((error && <span className={styles.error}>{error}</span>) || (warning && <span className={styles.warn}>{warning}</span>))}
    </div>
  </div>
);
const warn = values => {
  const warnings = {};
  return warnings;
};
class CareerInfo extends Component {

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
      subject: '',
      honor: '',
      review: '',
      isSelected: false,
      selected: [],
    };
  }

  render() {
    return (
      <form className={styles.container}>
        <div className={styles.header}>职业信息</div>
        <MultiSelectSimpleJson
          clearSelect={this.props.clearSelect.bind(this)}
          handelClick={this.props.handelClick.bind(this)}
          selected={this.props.selected}
          setSelect = {(val) => {
            this.props.setSelect(val);
          }}
        />
        <Field
          name="introduction"
          label="自我介绍:"
          type="text"
          placeholder="请输入您的自我介绍，50个字以内"
          maxlength="50"
          component={renderTextarea}
        />
        <Field
          name="honor"
          label="主要荣誉:"
          type="text"
          placeholder="请输入您的主要荣誉，200个字以内"
          maxlength="200"
          component={renderTextarea}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'CareerInfo',
  validate,
  warn,
})(CareerInfo);
