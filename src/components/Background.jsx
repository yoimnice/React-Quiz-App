import React from 'react'
import bottomBlob from '../images/blob1.svg'
import topBlob from '../images/blob2.svg'

export default function Background() {
    return (
    <div className='background'>
        <img className="bottomLeftImg" src={bottomBlob} />
        <img className="topRightImg" src={topBlob} />
    </div>
    )
}