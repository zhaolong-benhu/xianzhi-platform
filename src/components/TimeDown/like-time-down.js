/**
 * Created by ximo on 2016/12/12.
 */

import React, { Component, PropTypes } from 'react'
import ShowTime from './like-show-time'
import ShowDate from './like-show-date'

class TimeDown extends Component {
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    now: PropTypes.number.isRequired,
    onStart: PropTypes.func,
    onEnd: PropTypes.func,
  }

  constructor (props) {
    super(props)

    this._offset = Date.now() - props.now // 通过外部传入的时间进行时间矫正
    this.state = {
      time: 0,
    }
  }

  componentWillMount () {
    let offset = Date.now() - this._offset
    offset > this.props.start && offset < this.props.end && this.props.onStart && this.props.onStart()
    this.timeInit()
  }

  componentWillUnmount () {
    clearTimeout(this._timeoutBar)
  }

  timeInit () {
    let now = Date.now()
    let offset = now - this._offset

    if (offset < this.props.start) {
      this.setState({ time: this.props.start - offset })
    } else if (offset <= this.props.end) {
      this.setState({ time: this.props.end - offset })
    }
    
    // 开始时／结束时触发事件
    let start = offset - this.props.start
    start > -1000 && start <= 0 && this.props.onStart && this.props.onStart()
    if (offset > this.props.end - 1000 && this.props.onEnd) return this.props.onEnd()
    
    this._timeoutBar = setTimeout(() => this.timeInit(), 1001 - now % 1000)
  }

  render () {
    return this.state.time < 1000 * 60 * 60 * 24 ?
      <ShowTime time={this.state.time} /> :
      <ShowDate time={this.state.time} />
  }
}

export default TimeDown
