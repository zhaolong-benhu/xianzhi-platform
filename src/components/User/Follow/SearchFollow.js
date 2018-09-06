/**
 * Created by zhaolong on 2016/8/12.
 * File description:关注搜索页
 */
 'use strict';
 import React from 'react';
 import {imageUrl} from '../../../api/common/Global';
 const styles = require('./SearchFollow.scss');


export default class SearchFollow extends React.Component{

state={
  showSearchresult:false,
  result_isEmpty:false,
  screenHight:"480",
  toleft:"100",

  all_plates:[
    {name:"线下公开课",img:"/images/search/search1.png",link:"/gongkaike"},
    {name:"内训",img:"/images/search/search2.png",link:"/neixun"},
    {name:"峰会",img:"/images/search/search3.png",link:"/huodong/1"},
    {name:"活动",img:"/images/search/search4.png",link:"/OtherActivities"},
    {name:"在线课程",img:"/images/search/search5.png",link:"/gongkaike"},
    {name:"IHMA证书",img:"/images/search/search6.png",link:"/ihma"},
    {name:"智库",img:"/images/search/search7.png",link:"/gongkaike"}],
};

componentDidMount(){
    var width = screen.width;
    var height = screen.height;
    this.setState({screenHight:height+"px"});
    this.setState({toleft:(width-35)/2+"px"});
}
//图标点击事件
IconClicked(index)
{
  this.props.callbackParent(index);
}

     render(){
       return(
         <div className={styles.searchfollow}>
               <div className={styles.info}>
                {this.state.all_plates.map(function(value,index){
                  return <div className={styles.nav} key={'all_plates' + index} onClick={this.IconClicked.bind(this,index)}>
                    <div>
                      <img src={imageUrl+value.img} className={styles.img}></img>
                    </div>
                    <div className={styles.name} >{value.name}</div>
                  </div>
                }.bind(this))}
              </div>
         </div>
       )
     }

   }
