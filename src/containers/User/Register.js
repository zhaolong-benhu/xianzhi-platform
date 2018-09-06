/**
 * Created by same on 2016/9/13
 * File description:注册
 */

'use strict';
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Header,UserRegister} from 'components';
const styles = require('./User.scss');

export default class Register extends Component{
  render(){
    return(
      <div>
        <Helmet title="注册"/>
        <Header title="注册" type={true}/>
        <UserRegister/>
      </div>
    )
  }
}
