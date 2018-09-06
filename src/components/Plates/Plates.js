/**
 * Created by zhaolong on 2016/6/17.
 * File description:首页分类
 */

'use strict';
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {push} from 'react-router-redux';
const styles = require('./Plates.scss');
import {imageUrl} from '../../api/common/Global';
@connect(
  state => ({
  }),
  {push}
)
export default class Plates extends React.Component{
    static propTypes = {
        push: PropTypes.func.isRequired
    }
  static defaultProps = {
    all_plates:[
    //   {name:"线下公开课",img:"/images/plates/plates1.png",link:"/gongkaike",statistics:"gkaike"},
    //   {name:"直播",img:"/images/plates/plates9.png",link:"/live",statistics:"liveclass",new:true},
    //   {name:"内训",img:"/images/plates/plates2.png",link:"/neixun",statistics:"neixun"},
    //   {name:"其他活动",img:"/images/plates/plates4.png",link:"/huodong",statistics:"qthuodong"},
    //   {name:"在线课程",img:"/images/plates/plates5.png",link:"/category/3",statistics:"kecheng"},
    //   {name:"IHMA证书",img:"/images/plates/plates6.png",link:"/ihma",statistics:"ihma"},
    //   {name:"企业商学院",img:"/images/plates/plates7.png",link:"/lms",statistics:"lms"},
    //   {name:"智库",img:"/images/plates/plates8.png",link:"/document",statistics:"zk"}]

      {name:"在线课程",img:"/images/plates/plates5.png",link:"/category/3",statistics:"ga('send','event','kecheng','sy','yketang')"},
      {name:"直播",img:"/images/plates/plates9.png",link:"/live",statistics:"ga('send','event','liveclass','sy','yketang')",new:true},
      {name:"智库",img:"/images/plates/plates8.png",link:"/papers",statistics:"ga('send','event','zk','sy','yketang')"},
      {name:"线下公开课",img:"/images/plates/plates1.png",link:"/gongkaike",statistics:"ga('send','event','gkaike','sy','yketang')"},
      {name:"内训",img:"/images/plates/plates2.png",link:"/neixun",statistics:"ga('send','event','neixun','sy','yketang')"},
      {name:"职业认证",img:"/images/plates/plates6.png",link:"http://m.study.9first.com/ihma/authentication",statistics:"ga('send','event','ihma','sy','yketang')"},
      {name:"先之学院",img:"/images/plates/plates7.png",link:"/lms",statistics:"ga('send','event','lms','sy','yketang')"},
      //{name:"峰会",img:"/images/plates/plates3.png",link:"/huodong/list/1",statistics:"ga('send','event','fenghui','sy','yketang')"},
      {name:"其他活动",img:"/images/plates/plates4.png",link:"/huodong",statistics:"ga('send','event','qthuodong','sy','yketang')"},
    ]
  };
  //添加ga统计代码
  handleGa(link,parameter){
    this.props.push(link);
    ga('send','event',parameter,'sy','yketang');
  }
  render()
  {
    return(
        <div className={styles.container}>
          {this.props.all_plates.map(function(value,index){
            return <div className={styles.nav} key={'all_plates' + index}>
                      <div  onClick={()=>{this.handleGa(value.link,value.statistics);}}>
                        <img src={imageUrl+value.img} className={styles.img} />
                        {value.new? <img src={imageUrl+"/images/plates/new.png"} className={styles.new} /> : ''}
                      </div>
                      <div className={styles.name} to={value.link} onClick={()=>{this.handleGa(value.link,value.statistics);}}>
                        {value.name}
                      </div>
                      {/* {(()=>{
                        if(index==4){
                          return <a href="https://m-study.9first.com/ihma/authentication" onClick={value.statistics}><img src={value.img} className={styles.img}/></a>
                        }else{
                          return <Link to={value.link} onClick={value.statistics}><img src={value.img} className={styles.img} /></Link>
                        }
                      })()}
                      <Link className={styles.name} to={value.link} onClick={value.statistics}>{value.name}</Link> */}
                   </div>
          }.bind(this))}
        </div>
    )
  }
}
