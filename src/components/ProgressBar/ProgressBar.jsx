import React from 'react'
import './ProgressBar.css'

const ProgressBar = function(props) {
  const { progress } = props;
  return (
    <div className="progress-bar">
      <div
        className="progress"
        style={{ width: progress + '%' }}
      />
    </div>
  )
}

export default ProgressBar