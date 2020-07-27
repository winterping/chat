import React, { useEffect, useState } from 'react'
import './style.scss'

function Index(props) {
    const { item } = props;
    useEffect(() => {
    }, [])
    let contextMenu=(e)=>{
        e.preventDefault();
        console.log('1222',item.msg_content);   
    }
    return (
        <div className='msg-me'>
            <span onContextMenu={(e)=>contextMenu(e)}>{item.msg_content}</span>
        </div>
    )
}
export default React.memo(Index)