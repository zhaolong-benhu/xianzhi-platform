/**
 * Created by qzy on 2016/11/29.
 * File description:个人信息注册
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import {without} from 'lodash';
import {connect} from  'react-redux';
import Helmet from 'react-helmet';
import {Header, RegisterInstructor, PersonInfo, UploadPics, CareerInfo, Warning} from 'components';
import {add as addTeacher} from 'redux/modules/live';
import {push} from 'react-router-redux';
import {browserHistory} from 'react-router';

const styles = require('./PersonalRegister.scss');

@connect(
  state => ({
    form: state.form,
    status: state.live.status,
    error: state.live.error,
  }), {addTeacher, PersonInfo, CareerInfo, push}
)

export default class PersonalRegister extends Component {
  static propTypes = {};
  static defaultProps = {};
  state = {
    screenHight: '',
    page: 1,
    tips_box: false,
    msg: '',
    files: {},
    selected: [],
    picSize: 0,
    card_pic1Size: 0,
    card_pic2Size: 0,
    personInfoValidate: false,
    careerInfoValidate: false,
  }

  componentDidMount() {
    let height = screen.height;
    this.setState({screenHight: height});
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.status && nextProps.status.status == '1') {
    //   this.props.push('/tutorregister/verify/0');
    // }
    if (nextProps.status && nextProps.status.status == '0') {
      this.setState({
        tips_box: true,
        msg: nextProps.status.errMsg,
      })
    }
  }
// 获取文件
  getFiles(file) {
    // debugger
    this.setState({
      files: {...this.state.files, ...file},
    });
    if (file.pic ) {
      if (file.pic[0].size < 2000) {
        this.setState({
          picSize: 1,
        });
      } else {
        this.setState({
          picSize: 2,
        });
      }
    }
    if (file.card_pic1){
      // if (file.card_pic1[0].size < 2000) {
        this.setState({
          card_pic1Size: 1,
        });
      // }else {
      //   this.setState({
      //     card_pic1Size: 2,
      //   });
      // }
    }
    if (file.card_pic2) {
      // if (file.card_pic2[0].size < 2000) {
        this.setState({
          card_pic2Size: 1,
        });
      // }else {
      //   this.setState({
      //     card_pic2Size: 2,
      //   });
      // }
    }
  }
  //设置页面状态
  changePage(id) {
    this.setState({
      page: id,
    });
  }
//提交验证
  handleSubmit() {
    if (this.props.form.CareerInfo.syncErrors || this.props.form.personInfo.syncErrors) {
      this.setTipBox(true, '请正确填写全部信息');
    } else {
      const teacherInfo = {
        ...this.props.form.personInfo.values,
        ...this.props.form.CareerInfo.values,
        pic: this.state.files.pic[0].base64,
        card_pic1: this.state.files.card_pic1[0].base64,
        card_pic2: this.state.files.card_pic2[0].base64,
        adept: this.state.selected.join(','),
      };
      //完成后跳转页面
      this.props.addTeacher(teacherInfo)
        .then(() => {
          browserHistory.push('/tutorregister/verify/0');
        });
    }
  }

  setTipBox(tips_box, msg,) {
    this.setState({
      tips_box: tips_box,
      msg: msg,
    });
  }

  resetTipBox() {
    this.setState({
      tips_box: false,
      msg: '',
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
  setSelect(val) {
    this.setState({
      selected: val,
    });
  }
  renderPersonButton() {

    if (Object.keys(this.props.form).length > 0) {
      if (!this.props.form.personInfo.syncErrors && this.state.picSize == 1) {
        if (this.props.form.personInfo.hasOwnProperty('values')) {
          if (this.props.form.personInfo.values.hasOwnProperty('sex')) {
            return (
              <button className={styles.btn} onClick={() => this.changePage(2)}>下一步</button>
            );
          } else {
            return (
              <button className={styles.btn + ' ' + styles.disabled} disabled >下一步</button>
            );
          }
        }
      } else {
        return (
          <button className={styles.btn + ' ' + styles.disabled} disabled >下一步</button>
        );
      }
    }
  }

  renderCareerButton() {
    if (Object.keys(this.props.form).length > 0) {
      if (!this.props.form.CareerInfo.syncErrors && this.state.card_pic1Size == 1 && this.state.card_pic2Size == 1 && this.state.selected.length > 0) {
        return (
          <button className={styles.btn} onClick={this.handleSubmit.bind(this)}>提交审核</button>
        );
      } else {
        return (
          <button className={styles.btn + ' ' + styles.disabled} disabled onClick={this.handleSubmit.bind(this)}>提交审核</button>
        );
      }
    }
  }

  render() {
    return (
      <div className={styles.person}>
        <Helmet title="个人信息"/>
        <Header title="个人信息" type="true" line="true"/>

        <div className={this.state.page === 2 ? styles.hide : ''}>
          <div className={styles.container}>
            <RegisterInstructor step={[1]} changePage={(id) => this.changePage(id)}/>
            <PersonInfo />
            <UploadPics type={"personalImg"}
                        pic={this.state.pic}
                        getFiles={(file) => {
                          this.getFiles(file);
                        }}
                        picSize={this.state.picSize}
            />
          </div>
          <div className={styles.btnWrapper}
               style={{height: (this.state.screenHight - 624 > 0 ? this.state.screenHight - 518 : 84)}}>
            {this.renderPersonButton()}
          </div>
        </div>

        <div className={this.state.page === 1 ? styles.hide : ''}>
          <div className={styles.container}>
            <RegisterInstructor step={[1, 2]} changePage={(id) => this.changePage(id)}/>
            <CareerInfo
              handelClick={(val) => {
                this.handelClick(val);
              }}
              setSelect = {(val) => {
                this.setSelect(val);
              }}
              clearSelect={() => {
                this.clearSelect();
              }}
              selected={this.state.selected}
            />
            <UploadPics type={"nameCard"}
                        card_pic1Size={this.state.card_pic1Size}
                        card_pic2Size={this.state.card_pic2Size}
                        getFiles={(file) => {
                          this.getFiles(file);
                        }}/>
          </div>
          <div className={styles.btnWrapper}
               style={{height: (this.state.screenHight - 657 > 0 ? this.state.screenHight - 573 : 84)}}>
            {this.renderCareerButton()}
          </div>
        </div>

        {(() => {
          if (this.state.tips_box) {
            return (<Warning
              msg={this.state.msg}
              visible="true"
              resetTipBox={() => this.resetTipBox()}
            />);
          }
        })()}
      </div>
    );
  }
}
