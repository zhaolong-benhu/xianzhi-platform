/**
 * Created by qzy on 2016/11/30.
 * File description:职业信息注册
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import {Link} from 'react-router'
import Helmet from 'react-helmet';
import {Header,RegisterInstructor,PersonInfo,UploadPics,CareerInfo} from 'components'
const styles = require('./CareerRegister.scss')
export default class CareerRegister extends Component {
  static propTypes = {};
  static defaultProps = {};
  state={
    screenHight:''
  }
  componentDidMount(){
    let height = screen.height;
    this.setState({screenHight:height});
  }
  render() {
    return (
      <div>
        <Helmet title="职业信息"/>
        <Header title="职业信息" type="true" line="true"/>
        <div className={styles.container}>
          <RegisterInstructor step={[1,2]}/>
          <CareerInfo />
          <UploadPics type={"nameCard"}/>
        </div>
        <div className={styles.btnWrapper} style={{height:(this.state.screenHight - 500 > 0 ? this.state.screenHight - 500 : 84)}}>
          <a href="/tutorregister/verify" className={styles.btn}>提交审核</a>
        </div>
      </div>
    );
  }
}
