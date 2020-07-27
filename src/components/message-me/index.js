import React, { useEffect, useState } from 'react'
import './style.scss'

function Index(props) {
    const { item } = props;
    useEffect(() => {
    }, [])
    return (
        <div className='msg-me'>
            <span>{item.msg_content}</span>
        </div>
    )
}
export default React.memo(Index)