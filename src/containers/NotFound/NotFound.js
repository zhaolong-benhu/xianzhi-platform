/**
 * Created by zhaolong on 2016/10/1.
 * File description:网站404页面
 */
import React,{Component} from 'react';
import Helmet from 'react-helmet';
import {Header} from 'components';
import {imageUrl} from '../../api/common/Global';


export default function NotFound() {
  return (
    <div className="container">
    <Helmet title="对不起，您访问的页面不存在！"/>
    <Header title="对不起，您访问的页面不存在！"/>
      <div>
        <img style={{width:"100%",height:"100%",paddingTop:"60px"}} src={imageUrl+"/images/404.jpg"}/>
      </div>
    </div>
  );
}
