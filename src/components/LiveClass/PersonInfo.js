/**
 * Created by qzy on 2016/11/29.
 * File description:个人信息表单
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { email, mobile, required, minLength, maxLength, integer, age, username} from '../../utils/validation';
const styles = require('./PersonInfo.scss');
// 错误提示
const warn = values => {
  const warnings = {};
  return warnings;
};
// 截取中英文混合输入
function sub(str, n) {
  let r = /[^\x00-\xff]/g;
  let m = Math.floor( n / 2 );
  if (str.replace(r, 'mm').length <= n) {return str;}

  for ( m; m < str.length; m++) {
    if (str.substr(0, m).replace(r, 'mm').length >= n) {
      return str.substr(0, m);
    }
  }
  return str;
}

// 截取超限文字
function limitTextInput(input) {
  const strName = input.value;
  input.value = sub(strName, 20)
}
// 渲染验证区域
const renderField = ({input, label, type, placeholder, maxLength, meta: {touched, error, warning}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type} maxLength={maxLength}/>
      {touched && ((error && <span className={styles.error}>{error}</span>) || (warning && <span className={styles.warn}>{warning}</span>))}
    </div>
  </div>
);
// 渲染文本框
const renderTextarea = ({input, label, type, placeholder, meta: {touched, error, warning}}) => (
  <div style={{height: '85px'}}>
    <label>{label}</label>
    <div>
      <textarea {...input} placeholder={placeholder} type={type}/>
      {touched && ((error && <span className={styles.error}>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);
// 渲染性别单选
const renderSex = ({ label, type, meta: {touched, error, warning}}) => (
  <div>
    <label>{label}</label>
    <div>
      <label><Field name="sex" component="input" type={type} value="1"/>男</label>
      <label><Field name="sex" component="input" type={type} value="2"/>女</label>
      {touched && ((error && <span className={styles.error}>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);
// 渲染姓名
const renderName = ({input, placeholder, ref, label, type, meta: {touched, error, warning}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input}
             placeholder={placeholder}
             type={type}
             ref={ref}
             onUpdate = {limitTextInput(input)}
      />
      {touched && ((error && <span className={styles.error}>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class PersonInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.header}>个人信息</div>
        <form >
          <Field name="name"
                 ref="name"
                 type="text"
                 component={renderName}
                 label="姓&nbsp;&nbsp;&nbsp;&nbsp;名"
                 validate={[username, required]}
                 placeholder="请输入您的姓名"
          />
          <Field name="sex"
                 validate={[required]}
                 type="radio"
                 component={renderSex}
                 label="性&nbsp;&nbsp;&nbsp;&nbsp;别"
          />
          <Field name="age"
                 type="text"
                 component={renderField}
                 label="年&nbsp;&nbsp;&nbsp;&nbsp;龄"
                 validate={[age, required]}
                 placeholder="请输入您的年龄"
                 maxLength="3"
          />
          <Field name="tel"
                 type="text"
                 component={renderField}
                 label="联系方式"
                 placeholder="请输入您的手机号"
                 validate={[mobile, required]}
                 maxLength="11"
          />
        </form>
      </div>
    );
  }
}


// PersonInfo = reduxForm({
//   form: 'PersonInfo', // a unique identifier for this form
// })(PersonInfo)

// // You have to connect() to any reducers that you wish to connect to yourself
// PersonInfo = connect(
//   state => ({
//     initialValues: state.account.data, // pull initial values from account reducer
//   }),
//   {load: loadAccount} // bind account loading action creator
// )(PersonInfo)

// export default PersonInfo

export default reduxForm({
  form: 'personInfo',
  initialValues: { sex: 1 },
  warn,
})(PersonInfo)
