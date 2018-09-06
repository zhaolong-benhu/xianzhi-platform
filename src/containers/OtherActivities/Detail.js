/**
 * Created by zhaolong on 2016/9/1.
 * File description:其他活动详情页面
 */
'use strict';
import React,{Component} from 'react';
import {CourseListDetail} from 'components';
export default class Detail extends Component{

  render(){
    return(<div>
        <CourseListDetail isfree={false}/>
    </div>
    )
  }
}
