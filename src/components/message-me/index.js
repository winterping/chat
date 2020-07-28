import React, { useEffect, useState } from 'react'
import './style.scss'

function Index(props) {
    const { item, deleteOneMsg } = props;
    useEffect(() => {
    }, [])

    let contextMenu = (e) => {
        e.preventDefault();
        deleteOneMsg(item,e.clientX,e.clientY);
    }
    let showMsg = () => {
        switch (parseInt(item.msg_type)) {
            case 0:
                return <span onContextMenu={(e) => contextMenu(e)}>{item.msg_content}</span>
            case 1:
                return <img src={item.msg_content} onContextMenu={(e) => contextMenu(e)} />
        }
    }
    return (
        <div>
            <div className='msg-me'>
                {showMsg()}
            </div>
        </div>


    )
}
export default React.memo(Index)
