/**
 * Created by zhaolong on 2016/11/14
 * File description:首页-IHMA证书列表
 */

'use strict';
import React, { Component } from 'react';
import {Link} from 'react-router';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {Warning} from 'components';
const styles = require('./IhmaList.scss');

@connect(
  state => ({
  }),{push}
)

export default class IhmaList extends Component{

	state={
         tips_box:false,
         msg:""
     };
     GotoIhma(cert_id,id,is_study_status){
       if(is_study_status == 0){
         this.setState({tips_box:true,msg:"该课程已过期，不能再学哦~"});
       }else {
		   if(this.props.type == 'user'){
			   window.location.href="https://m-study.9first.com/home/courseList?cert_id="+cert_id;
		   }else {
			   this.props.push('/ihmaDetail/'+id);
		   }
       }
     }
	render(){
		var search = this.props.search;
		var search_len = 0;
		if(search){
			 search_len = search.length;
		}
		return(
			<div className={styles.thinktank}>
	          <ol className={this.props.type=="我的关注" ? styles.follow:styles.list}>
	            {this.props.data.map(function(data,i) {
	                      return(
	                            // <Link to={'/IhmaDetail/'+data.id} key={"data"+i} activeClassName="active">
	                            <li key={'list'+ i} onClick={this.GotoIhma.bind(this,data.cert_id,data.id,data.is_study_status)}>
	                              <div className={styles.pic}>
	                                <img src={data.picture}/>
	                              </div>

	                              <div className={styles.info}>
	                                <div className={styles.title}>
	                                  {(()=>{
	                                    if(search_len>0){
	                                      return <span className={styles.title}  dangerouslySetInnerHTML={{__html: data.name.replace(search,'<font color=red>'+search+'</font>')}}></span>
	                                    }
	                                    else{
	                                      return <span className={styles.title}>{data.name}</span>
	                                    }
	                                  })()}
	                                </div>
	                                <div>
                                     {(()=>{
                                        if(data.enroll){
                                            return <span className={styles.name}>{data.enroll}人报考</span>
                                        }else {
                                            return <span className={styles.name}>{data.study_num}人报考</span>
                                        }
                                     })()}
	                                </div>

	                              </div>
	                            </li>
	                        //    </Link>
	                        )
	                      }.bind(this))
	                    }
	          </ol>
              {(()=>{
                 if(this.state.tips_box){
                    return <Warning visible={true} msg={this.state.msg}/>
                 }
              })()}
	        </div>
      )
    }
  }
