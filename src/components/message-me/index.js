import React, { useEffect, useState, useRef } from 'react'
import './style.scss'
import { Popover } from 'antd'

function Index(props) {
    const { item, deleteOneMsg } = props;
    const content = (
        <div>
            <p onClick={(e) => contextMenu(e)}>消息撤回</p>
        </div>
    );
    useEffect(() => {
        // document.body.addEventListener('click', function (e) {
        //     console.log(e.target);
        //     if(e.target.className=='operate-popver'){
        //         e.stopPropagation()
        //     }else{
        //         // setShow(false)
        //     }
        // })
    }, [])
    let contextMenu = (e) => {
        deleteOneMsg(item);
    }
    let showMsg = () => {
        switch (parseInt(item.msg_type)) {
            case 0:
                return <span>{item.msg_content}</span>
            case 1:
                return <img src={item.msg_content} />
        }
    }

    return (
        <div>
            <div className='msg-me'>
                <Popover content={content} title="操作" trigger="contextMenu">
                    {showMsg()}
                </Popover>
            </div>
        </div>


    )
}
export default React.memo(Index)
