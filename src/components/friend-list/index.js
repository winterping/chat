import React, { useEffect, useState } from 'react'
import './style.scss'
import { Popover } from 'antd'
function Index(props) {
    const { friendList, activeId } = props;
    const { changeFriend, addOnePeople } = props;

    const [show, setShow] = useState(false)
    let contextMenu = (item) => {
        addOnePeople(item)
    }
    let handleChange = () => {
        setShow(true);
    }
    useEffect(() => {
        document.body.addEventListener('click', function () {
            setShow(false)
        })
    }, [])

    return (
        <div className='friend-container'>
            {
                friendList.map(item => (
                    item.type == 'friend' ?
                        <div key={item.id} className={`content ${activeId == item.id ? 'active' : ''}`} onClick={() => changeFriend(item)}>
                            <img src={item.avatar} className='avatar' />
                            <p>{item.name}</p>
                        </div> :
                        <Popover content={<p onClick={() => contextMenu(item)}>拉好友进群</p>}
                            trigger="click" placement="bottom" key={item.id} visible={show} onVisibleChange={() => handleChange()}>
                            <div className={`content ${activeId == item.id ? 'active' : ''}`}
                                onClick={() => changeFriend(item)}>
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
                        </Popover>
                ))
            }
        </div>
    )
}
export default React.memo(Index)