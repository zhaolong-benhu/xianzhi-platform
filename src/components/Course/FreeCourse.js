/**
 * Created by same on 2016/6/17.
 * File description:免费好课
 */
'use strict';
import React,{Component} from 'react';
const styles = require('./Common.scss');
import {Link} from 'react-router';

export default class FreeCourse extends Component {

	render(){
    	return(
    		<div className={styles.container}>

          <div className={styles.top_title}>
            <span className={styles.title}>{this.props.ModuleName}</span>
            <div className={styles.more}>
              <Link to={this.props.Link}  className={styles.more_text}>更多{this.props.ModuleName}</Link>
              <Link to={this.props.Link}  className={styles.more_symbol}>&#xe619;</Link>
            </div>
          </div>

          {this.props.data.map(function (value,index) {
            if(0 == index){
              return <div key={index}>
                <Link to={'/kecheng/'+value.id}>
                    <div className={styles.content} key={'this.props.data'+index}>
                        <img className={styles.top_img} src={value.thumb}/>
                    </div>
                </Link>
              </div>
            }
          })}


          <div className={styles.details}>
            {this.props.data.map(function (value,index) {
              if(index >0){
                return <div className={styles.detail} key={'this.props.data'+index}>
                                  <Link to={'/kecheng/'+value.id}>
								  <img className={styles.top_img2} src={value.thumb}/>
                                  <div className={styles.content_title}>{value.title}</div>
                                  <div>
                                    <div className={styles.content_free}>免费</div>
                                    <div className={styles.right_people}>
                                      <span className={styles.content_peoplecount2}>{value.view_num}</span>
                                      <span className={styles.content_people}>&#xe604;</span>
                                    </div>
                                  </div>
                                  </Link>
                          </div>
              }
            })}
          </div>
        </div>
    	)
	}
}
