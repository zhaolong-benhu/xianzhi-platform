/**
 * Created by zhaolong on 2016/7/5.
 * File description支付弹框
 */
'use strict'
import React, {Component} from 'react'
const styles = require('./Payment_Box.scss');
import {Link} from 'react-router';

export default class Payment_Box extends Component {

  state = {
    bomb_box: false,
    cancel_clicked: false,
    ok_clicked: true,
    width: 0,
    num: 1
  };

  componentDidMount() {
    // if(this.props.needCountChange  !== false){
    //   this.refs.num.value = this.state.num;
    // }
    this.setState({width: document.body.clientWidth});
  }

//点击确定事件
  onClicked(str) {
    this.props.callbackParent(str);
  }

  //监控数量发生变化
  onNumChange(event) {
    var text = this.refs.num.value;
    if (text > 100) {
      this.refs.num.value = 100;
    }
    if (text.indexOf("+") > 0 || text.indexOf("-") > 0 || text.indexOf(".") > 0) {
      this.refs.num.value = 1;
    }
    this.setState({num: this.refs.num.value});
  }

  //加减课程购买数量
  PlusReduce(type) {
    var index = 0
    if (type == 0) {//-
      if (this.state.num > 1) {
        index = --this.state.num;
        this.refs.num.value = index;
      }
    } else {//+
      if (this.state.num < 100) {
        index = ++this.state.num;
      }
      this.refs.num.value = index;
    }
  }

  //监视count发生变化
  countChange() {
    if (this.props.needCountChange === false) {
      return
    } else {
      return (
        <div className={styles.buys}>
          <div className={styles.reduce} onClick={() => this.PlusReduce("0")}>-</div>
          <input className={styles.num} type="number" ref="num" onChange={() => this.onNumChange(event)}/>
          <div className={styles.reduce} onClick={() => this.PlusReduce("1")}>+</div>
        </div>
      )
    }
  }

  render() {
    var type = this.props.type;
    var goodsname = this.props.goodsname;
    if (this.state.width <= 320) {
      if (goodsname.length > 8) {
        goodsname = goodsname.substr(0, 8) + '...';
      }
    }
    if (this.state.width > 320) {
      if (goodsname.length > 11) {
        goodsname = goodsname.substr(0, 11) + '...';
      }
    }
    return (
      <div className={styles.bomb_box}>
        <div className={styles.info}>
          <div className={styles.tips}>您正在报名参加{type}</div>
          <div className={styles.title}>《{goodsname}》</div>
          {(() => {
            if (this.props.payPrice == "0.00") {
              return <div className={styles.price}>免费</div>
            } else {
              return <div className={styles.money}>
                <div className={styles.price}>¥{this.props.payPrice}</div>
                {/* {this.countChange()} */}
              </div>
            }
          })()}
        </div>
        <div className={styles.yesorno}>
          <a onClick={() => this.onClicked("cancel")}>取消</a>
          {(() => {
            if (this.props.payPrice != "0.00") {
              return <a className={styles.ok} onClick={() => this.onClicked("pay")}>立即支付</a>
            }
            else {
              return <a className={styles.ok} onClick={() => this.onClicked("ok")}>确定</a>
            }
          })()}
        </div>

      </div>
    )
  }
}
