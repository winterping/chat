import React, { useEffect, useState } from 'react'
import './style.scss'
import FriendList from '../../components/friend-list/index'
import Send from '../../components/send/index'
import MessageMe from '../../components/message-me/index'
import MessageOther from '../../components/message-other/index'
import {connect} from 'react-redux'
import {addMsg} from './store/index'
function Index(props) {
    const id = parseInt(props.match.params.id);
    const [userid, setUserid] = useState()
    const [toUserInfo, setToUserInfo] = useState({})
    const [ws, setWs] = useState()
    const {msgBox,addMessageDispatch}=props
    const friendList = id == 6773200 ? [
        {
            name: '张三',
            avatar: 'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
            id: 6773201,
            type: 'friend',
        },
    ] : [
            {
                name: '李四',
                avatar: 'https://p1.music.126.net/Cmn04lf1X-DvUvm5YdVm8w==/109951164681628808.jpg',
                id: 6773200,
                type: 'friend',
            }
        ]
    useEffect(() => {
        setUserid(id)
        setToUserInfo(Object.assign(friendList[0]))
    }, [])
    useEffect(() => {   
        var ws;
        if (window.WebSocket) {
            ws = new WebSocket("ws://localhost:8080/ws");
            ws.onmessage = function (event) {
                // console.log('event', JSON.parse(event.data));
                var msg = JSON.parse(event.data);
                addMessageDispatch(msg)
            };
            ws.onopen = function (event) {
                console.log('连接socket');
            };
            ws.onclose = function (event) {
                console.log('socket连接关闭');
            };
        } else {
            alert("你的浏览器不支持 WebSocket！");
        }
        setWs(ws)
    }, [])

    //消息模型
    let msgModel = (msg, msg_type) => {
        var obj = {
            fromuserid: userid,
            touserid: toUserInfo.id,
            type: toUserInfo.type,
            msg_type: msg_type,
            msg_content: msg,
            time: new Date().getTime()
        }
        return JSON.stringify(obj);
    }

    let changeFriend = (info) => {
        if (id !== toUserInfo.id) {
            setToUserInfo(Object.assign(info))
        }
    }

    //发送文本消息
    let sendTxt = (msg) => {
        const result = msgModel(msg, 0)
        ws.send(result);
    }
    return (
        <div className='chat-container'>
            <div className='friend-list'>
                <FriendList friendList={friendList} activeId={toUserInfo.id ? toUserInfo.id : ''} changeFriend={changeFriend}></FriendList>
            </div>
            <div className='msg-content'>
                <div className='msg-list'>
                    {
                        msgBox.toJS().map(item => {
                            if (item.type == 'friend') {
                                if (item.fromuserid == userid) {
                                    return <MessageMe item={item} key={item.time} />
                                } else if (item.touserid == userid) {
                                    return <MessageOther item={item} key={item.time} avatar={toUserInfo.avatar} />
                                }
                            }
                        })
                    }
                </div>
                <div className='send-msg'>
                    <Send sendTxt={sendTxt}></Send>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>({
    msgBox:state.getIn(['message', 'msgBox'])
})

const mapDispatchToProps=(dispatch)=>{
    return{
        addMessageDispatch(msg){
            dispatch(addMsg(msg))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Index))