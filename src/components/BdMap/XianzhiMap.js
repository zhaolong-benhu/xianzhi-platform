/**
 * Created by zhaolong on 2016/7/21.
 * File description:地图详情页
 */
'use strict'
import React,{Component} from 'react'
import Helmet from 'react-helmet';
import {Header} from 'components';
import {imageUrl} from '../../api/common/Global';


export default class XianzhiMap extends Component{

  state={
    width:"320px",
    height:"480px",
  }

  componentDidMount(){
    var width = screen.width+"px";
    var height = screen.height+"px";

    //获取父级传递过来的经纬度
    var map_xy = this.props.params.id;
    var len = map_xy.length;

    var handle=new String();
    var arr=new Array();
    handle=map_xy;
    arr=handle.split(',');//注split可以用字符或字符串分割
    var x = arr[0] || 0;
    var y = arr[1] || 0;

    this.setState({width:width});
    this.setState({height:height});

    var center = new qq.maps.LatLng(x,y);
    var map = new qq.maps.Map(document.getElementById('container'),{
      center: center,
      zoom: 13
    });

    var anchor = new qq.maps.Point(6, 6),
      size = new qq.maps.Size(24, 24),
      origin = new qq.maps.Point(0, 0),
      icon = new qq.maps.MarkerImage(imageUrl+'/images/center.gif', size, origin, anchor);
    var marker = new qq.maps.Marker({
      icon: icon,
      map: map,
      position:map.getCenter()});


  }
  render()
  {
    return(
      <div>
        <Helmet title="地图"/>
        <Header title="地图"/>
        <script charset="utf-8" src="https://map.qq.com/api/js?v=2.exp"></script>
        <div id="container" style={{width:this.state.width,height:this.state.height}}></div>
      </div>
    )
  }
}
