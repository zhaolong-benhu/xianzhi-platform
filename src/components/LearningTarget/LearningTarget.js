/**
 * Created by zhaolong on 2016/8/31.
 * File description:在现课程-学习目标
 */
import React,{Component} from 'react';
const styles = require('./LearningTarget.scss');


export default class LearningTarget extends Component{

  state={
    title:"学习目标",
    isShowAll:false,
    tips:"点击展开更多",
  }
  //控制文字显示数
  ShowAllinfo(){
    this.setState({isShowAll:!this.state.isShowAll});
    if(this.state.isShowAll){
      this.setState({tips:"点击展开更多"})
    }
    else{
      this.setState({tips:"点击向上收起"})
    }
  }

  componentDidMount(){
  }

  render(){
    return(
      <div className={styles.container}>

        <div className={styles.line}></div>
        <div className={styles.title}>
          <span>{this.state.title}</span>
        </div>

        <div className={styles.overview}>
          {(()=>{
              if(this.props.target.length<=5){
                return <div className={styles.info}>
                    {this.props.target.map(function(value,index){
                        return <div key={'value'+index} className={styles.target}>
                            {value}
                        </div>
                    })}
                </div>
              }
              else{
                if(!this.state.isShowAll)
                {
                  return <div className={styles.info}>
                      {this.props.target.map(function(value,index){
                        if(index<=4){
                          return <div key={'value'+index} className={styles.target}>
                              {value}
                          </div>
                        }
                      })}

                  </div>
                }
                else
                {
                  return <div className={styles.info}>
                      {this.props.target.map(function(value,index){
                          return <div key={'value'+index} className={styles.target}>
                              {value}
                          </div>
                      })}
                  </div>
                }
              }


          })()}
        </div>

       {(()=> {

            if(this.props.target.length <= 5)
            {
              return <div></div>
            }
            else
            {
              return  <div className={styles.tips} onClick={this.ShowAllinfo.bind(this)}>
                <span>{this.state.tips}</span>
                {(()=>{
                  if(this.state.isShowAll){
                    return <span className={styles.down}>&#xe61c;</span>
                  }
                  else{
                    return <span className={styles.down}>&#xe61d;</span>
                  }
                })()}
              </div>
            }

        })()}
      </div>
    )
  }
}
