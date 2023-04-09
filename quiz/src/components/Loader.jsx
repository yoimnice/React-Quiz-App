import React from 'react'

export default function Loader() {
    return (
        <div className='loader-container'>
            <svg className="spinner" width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <circle className="circle" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
        </div>
    )
}