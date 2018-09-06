/**
 * Created by zhaolong on 2016/6/30.
 * File description:导师内训课程
 */
import React,{Component,PropTypes} from 'react';
import {Link} from 'react-router';
import {TutorTrainingCourse} from 'components'
import {connect} from 'react-redux';
import {trainingcourse} from 'redux/modules/tutor';
const styles = require('./Tutor.scss');

@connect(
  state => ({
    data:state.tutor.train
  }),
  {trainingcourse}
)
export default class TutorTraining extends Component{
  static propTypes = {
      data: PropTypes.object,
      trainingcourse:PropTypes.func.isRequired
  }
  state={
    lookall:"查看全部",
    data:[],
    isnull:false,
  };

  componentWillMount(){
    this.props.trainingcourse(this.props.id);
  }
  render(){
    var id = this.props.id;
    const {data} = this.props;
    return(
      <div className={styles.container}>
            <div className={styles.empty}></div>
              {(()=>{
                if(data && data.status ==0){
                  return <div className={styles.info}>
                    <span className={styles.evaluation}>{this.props.name}</span>
                    <span className={styles.look_all}>暂无内训课程</span>
                  </div>
                }
                else{
                  if(data && data.is_more == 1){
                    return <div className={styles.info}>
                     <span className={styles.evaluation}>{this.props.name}</span>
                     <Link to={'/TutorTrainingCourses/'+id} onClick="ga('send','event','qbnxkecheng','detail-2','daoshi')"><span className={styles.more}>&#xe619;</span></Link>
                     <Link to={'/TutorTrainingCourses/'+id} onClick="ga('send','event','qbnxkecheng','detail-2','daoshi')"><span className={styles.look_all}>{this.state.lookall}</span></Link>
                   </div>
                  }
                  else {
                    return <div className={styles.info}>
                      <span className={styles.evaluation}>{this.props.name}</span>
                    </div>
                  }
                }
              })()}

              {(()=>{
                if(data && data.list){
                  return <TutorTrainingCourse data={data.list}/>
                }
              })()}

      </div>
    )
  }
}
