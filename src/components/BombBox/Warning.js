/**
 * Created by zhaolong on 2016/7/5.
 * File description警告提示弹框
 */

'use strict'
import React, {Component} from 'react'
const styles = require('./Warning.scss');

export default class Warning extends Component {

  state = {
    bShowDiv: true,
  }

  componentWillReceiveProps() {
    if (!this.state.bShowDiv) {
      this.setState({bShowDiv: true});
    }
    setTimeout(() => {
      this.setState({bShowDiv: false});
    }, 1500);
  }

  componentDidMount() {
    if (!this.state.bShowDiv) {
      this.setState({bShowDiv: true});
    }
    if (this.props.resetTipBox){
      new Promise((resolve, reject) => {
        setTimeout(() => {
          this.setState({bShowDiv: false});
          resolve('ok');
        }, 1500);
      }).then(()=>{
        this.props.resetTipBox();
      });
    } else {
      setTimeout(() => {
        this.setState({bShowDiv: false});
      }, 1500);
    }
  }

  render() {
    return (

      <div>
        {(() => {
          if (this.state.bShowDiv) {
            return <div className={this.props.visible ? styles.bomb_box : styles.bomb_box + " " + styles.hide}>
              {(() => {
                if (this.props.icon) {
                  return <div className={styles.pic}>
                    <img className={styles.img} src={this.props.icon}/>
                  </div>
                }
              })()}
              <div className={styles.text}>{this.props.msg}</div>
            </div>
          }
        })()}
      </div>

    )
  }
}
