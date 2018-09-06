/**
 * Created by same on 2016/6/12.
 * File description:首页
 */
import React, { Component,PropTypes } from 'react';
import Helmet from 'react-helmet';
import {Header} from 'components';
import {connect} from 'react-redux';
import {isLoaded,loadBanner,loadFreeCourse,loadCourse,loadOpenCourse,loadTeacher,loadIHMA} from 'redux/modules/home';
import {asyncConnect } from 'redux-async-connect';
import {Plates,FreeCourse,OnlineCourse,OpenlineCourse,PopularTutor,ProfessionalCertificate,Slider,StaticBanner} from 'components';
import {homepage_banner} from '../../api/common/Global';
const styles = require('./Home.scss');
@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    promises.push(dispatch(loadBanner(homepage_banner)));
   if (!isLoaded(getState())) {
      promises.push(dispatch(loadFreeCourse()));
      promises.push(dispatch(loadCourse()));
      promises.push(dispatch(loadOpenCourse()));
      promises.push(dispatch(loadTeacher()));
      promises.push(dispatch(loadIHMA()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    banner: state.home.banner,
    freecourse: state.home.freecourse,
    course: state.home.course,
    opencourse: state.home.opencourse,
    teacher: state.home.teacher,
    ihma: state.home.ihma,
    isload:state.home.loaded
  })
)
export default class Home extends Component {
  mixins:[Lifecycle];
  static propTypes = {
      banner:PropTypes.array,
      freecourse: PropTypes.array,
      course: PropTypes.object,
      opencourse: PropTypes.object,
      teacher: PropTypes.array,
      ihma: PropTypes.array
  }
  state = {
       free_course:[], //免费课程
       online_course:{ //在线课程
         classroom:[],
         course:[]
       },
       openline_course:{ //公开课
         open_course_ad:[],
         open_course:[]
       },
       popular_tutor:[], //推荐导师
       professional_certificate:[] //IHMA证书
 }

  constructor(){
    super();
  }
  componentWillMount(){
    this.setState({free_course:this.props.freecourse});
    this.setState({online_course:this.props.course});
    this.setState({openline_course:this.props.opencourse});
    this.setState({popular_tutor:this.props.teacher});
    this.setState({professional_certificate:this.props.ihma});
  }
  render() {
    const {banner} = this.props;
    return (
      <div className={styles.home}>
        <Helmet title="首页"/>
        <Header title="搜索课程"/>
        <div className={styles.container}>
          <Slider data={banner} time="3000"/>
          <Plates/>
          {/* <StaticBanner /> */}
          <FreeCourse ModuleName="免费好课" data={this.state.free_course} Link="/kecheng/list/0-0-1" statistics="ga('send','event','gdmfhaoke','sy','yketang')"/>
          <OnlineCourse ModuleName="在线课程" data={this.state.online_course} Link="/kecheng" statistics="ga('send','event','gdzxkecheng','sy','yketang')"/>
          <OpenlineCourse ModuleName="线下公开课" data={this.state.openline_course} Link="/gongkaike" statistics="ga('send','event','gdgkaike','sy','yketang')"/>
          <PopularTutor data={this.state.popular_tutor}/>
          <ProfessionalCertificate data={this.state.professional_certificate}/>
        </div>
        <footer>
             Copyright ©  2017 9first.com All Rights Reserved
        </footer>
      </div>
    );
  }

}
