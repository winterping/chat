import React, { useEffect, useState } from 'react'
import './style.scss'

function Index(props) {
    const { item, avatar } = props;
    return (
        <div className='msg-other'>
            {/* <i className='icon-avatar' style={{backgroundImage:`url("${avatar}")`}}></i> */}
            <span>{item.msg_content}</span>
        </div>
    )
}
export default React.memo(Index)