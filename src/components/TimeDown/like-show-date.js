/**
 * Created by ximo on 2016/12/12.
 */

import React, { PropTypes } from 'react'

const ShowDate = (props) => {
  const oneDate = 1000 * 60 * 60 * 24
  return <span className={props.className}>{setZero(props.time / oneDate)}</span>
}

ShowDate.propTypes = {
  time: PropTypes.number.isRequired,
}

function setZero (num) {
  num = parseInt(num, 10) || 0
  return num < 10 ? '0' + num : String(num)
}

export default ShowDate
