/**
 * Created by zhaolong on 2016/8/17.
 * File description:暂无数据
 */
 'use strict';
 import React from 'react';
 import {imageUrl} from '../../api/common/Global';
 const styles = require('./NoContent.scss');

export default class NoContent extends React.Component{
  state={
      height:0
  }
  componentDidMount(){
      let height = screen.height-105+"px";
      this.setState({height:height});
  }
  //跳转到ihma支付页面
  Pay(){
      window.location.href="http://wams.veryeast.cn/activity/9first_pay/?a=pay";
  }
  renderStyle() {
      let style = {}
      if(this.props.background) {
        style.backgroundColor=this.props.background;
      }
      if(this.props.height) {
        style.height=this.props.height;
      }
      return style;
}
 render(){
   return(
     <div>
      {(()=>{
        if(this.props.from=="searchfollow"){
          return   <div className={styles.nodata2} style={{height:this.state.height}}>
                 <img className={styles.pic} src={imageUrl+"/images/search_empty.png"}/>
                 <div className={styles.empy_text}>{this.props.text}</div>
             </div>
        }
        else {
          return <div className={styles.nodata} style={this.renderStyle()}>
                      {/* {(()=>{
                          if(this.props.type == "ihma"){
                              return <img className={styles.renminbi} src={imageUrl+"/images/ihma/renminbi.png"} onClick={()=>this.Pay()}/>
                          }
                      })()} */}

                      {(()=>{
                        if(this.props.type == "ihma"){
                            return <div>
                                 <img className={styles.emptyimg} src={imageUrl+"/images/user/empty.png"}/>
                                 <div className={styles.empy_text2} onClick={()=>this.props.goToIhmalist()}>{this.props.text}</div>
                            </div>
                        }else {
                            return <div>
                                 <img className={this.props.type=="live"?styles.pic2:this.props.type=="activity"?styles.pic3:styles.pic} src={imageUrl+"/images/search_empty.png"}/>
                                 <div className={styles.empy_text}>{this.props.text}</div>
                            </div>
                        }
                    })()}
               </div>
        }
      })()}
     </div>
   )
 }
}
