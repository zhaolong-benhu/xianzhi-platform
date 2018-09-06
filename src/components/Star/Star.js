/**
 * Created by same on 2016/10/12.
 * File description:评论星级
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
const styles = require('./Star.scss');

export default class Star extends Component {
  static defaultProps={
    star:[
      {icon:1},
      {icon:2},
      {icon:3},
      {icon:4},
      {icon:5}
    ]
  }
  render(){
    return(
        <div className={styles.star}>
        {
          this.props.star.map(function(v,i){
            if(i<this.props.num){
              return <i className={styles.yellow}>&#xe610;</i>
            }else{
              return <i>&#xe610;</i>
            }
          }.bind(this))
        }
        </div>
    )
  }
}
