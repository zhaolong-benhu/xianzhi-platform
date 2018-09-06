/**
 * Created by zhaolong on 2016/8/10.
 * File description:在线课程
 */
'use strict';
import React from 'react';
import {Link} from 'react-router';
import {SingleCourse,CoursePackage} from 'components';
const styles = require('./Common.scss');

export default class OnlineCourses extends React.Component{
  render(){
    return(
      <div className={styles.course}>
          {
            this.props.data.map(function(v,i){
              return(
                <div>
                {(()=>{
                  if(v.type==3){
                    return  <CoursePackage search="" data={[v]} type="专业证书"/>
                  }else{
                    return  <SingleCourse search="" data={[v]} type="单门课程"/>
                  }
                })()}
                </div>
              )
            }.bind(this))
          }

      </div>
    )

  }

}
