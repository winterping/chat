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
                            <img src={item.avatar} className='avatar'/>
                            <p>{item.name}</p>
                        </div> :
                        <div key={item.id} className={`content ${activeId == item.id ? 'active' : ''}`} onClick={() => changeFriend(item)}>
                            <ul>
                                {
                                    item.members.map(ele => (
                                        <li key={ele.id}>
                                            <img src={ele.avatar} />
                                        </li>
                                    ))
                                }
                            </ul>
                            <p>{item.group_name}</p>
                        </div>
                ))
            }
        </div>
    )
}
export default React.memo(Index)