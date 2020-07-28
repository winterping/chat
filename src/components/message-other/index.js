import React, { useEffect, useState } from 'react'
import './style.scss'

function Index(props) {
    const { item, avatar } = props;
    let showMsg = () => {
        switch (parseInt(item.msg_type)) {
            case 0:
                return <span>{item.msg_content}</span>
            case 1:
                return <img src={item.msg_content} />
        }
    }
    return (
        <div className='msg-other'>
            <i className='icon-avatar' style={{ backgroundImage: `url("${avatar}")` }}></i>
            {showMsg()}
        </div>
    )
}
export default React.memo(Index)