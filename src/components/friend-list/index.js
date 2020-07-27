import React, { useEffect, useState } from 'react'
import './style.scss'

function Index(props) {
    const { friendList, activeId } = props;
    const { changeFriend } = props;
    return (
        <div className='friend-container'>
            {
                friendList.map(item => (
                    item.type == 'friend' ?
                        <div key={item.id} className={`content ${activeId == item.id ? 'active' : ''}`} onClick={() => changeFriend(item)}>
                            <img src={item.avatar} />
                            <p>{item.name}</p>
                        </div> : null
                ))
            }
        </div>
    )
}
export default React.memo(Index)