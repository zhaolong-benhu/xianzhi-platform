/**
 * Created by ximo on 2016/12/12.
 */

import React, { PropTypes } from 'react'

const ShowTime = (props) => {
  const time = new Date(props.time).toJSON().match(/T(\d\d):(\d\d):(\d\d).{4}Z/)

  return (
    <span className={props.className}>
      <i>{ time['1'] }</i>
      <b>:</b>
      <i>{ time['2'] }</i>
      <b>:</b>
      <i>{ time['3'] }</i>
    </span>
  )
}

ShowTime.propTypes = {
  time: PropTypes.number.isRequired,
}

export default ShowTime
