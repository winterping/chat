import React, { useEffect, useState, useRef } from 'react'
import './style.scss'
import FriendList from '../../components/friend-list/index'
import Send from '../../components/send/index'
import MessageMe from '../../components/message-me/index'
import MessageOther from '../../components/message-other/index'
import { connect } from 'react-redux'
import { addMsg, deleteMsg } from './store/index'
import { uuidGenerator } from '../../api/utils'
function Index(props) {
    const id = parseInt(props.match.params.id);
    const [userid, setUserid] = useState()
    const [toUserInfo, setToUserInfo] = useState({})
    const [msg, setMsg] = useState({})
    const [ws, setWs] = useState()
    const { msgBox, addMessageDispatch, deleteMessageDispatch } = props
    const msgRef = useRef()
    const tabRef = useRef()
    const friendList = id == 6773200 ? [
        {
            name: '张三',
            avatar: 'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
            id: 6773201,
            type: 'friend',
        },
        {
            type: 'group',
            id: 'abhcdlagje',
            group_name: '群聊1',
            members: [
                {
                    name: '张三',
                    avatar: 'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
                    id: 6773201,
                }, {
                    name: '李四',
                    avatar: 'https://p1.music.126.net/Cmn04lf1X-DvUvm5YdVm8w==/109951164681628808.jpg',
                    id: 6773200,
                }, {
                    name: '王五',
                    avatar: 'https://p1.music.126.net/tMH2KjUioNW57zbixCA5Pg==/109951164158510116.jpg',
                    id: 6773201,
                },
                {
                    name: '王五',
                    avatar: 'https://p1.music.126.net/tMH2KjUioNW57zbixCA5Pg==/109951164158510116.jpg',
                    id: 6773201,
                },
                {
                    name: '王五',
                    avatar: 'https://p1.music.126.net/tMH2KjUioNW57zbixCA5Pg==/109951164158510116.jpg',
                    id: 6773201,
                },
                // {
                //     name: '王五',
                //     avatar: 'https://p1.music.126.net/tMH2KjUioNW57zbixCA5Pg==/109951164158510116.jpg',
                //     id: 6773201,
                // },
                // {
                //     name: '王五',
                //     avatar: 'https://p1.music.126.net/tMH2KjUioNW57zbixCA5Pg==/109951164158510116.jpg',
                //     id: 6773201,
                // },
                // {
                //     name: '王五',
                //     avatar: 'https://p1.music.126.net/tMH2KjUioNW57zbixCA5Pg==/109951164158510116.jpg',
                //     id: 6773201,
                // },
                // {
                //     name: '王五',
                //     avatar: 'https://p1.music.126.net/tMH2KjUioNW57zbixCA5Pg==/109951164158510116.jpg',
                //     id: 6773201,
                // }
            ]
        }
    ] : [
            {
                name: '李四',
                avatar: 'https://p1.music.126.net/Cmn04lf1X-DvUvm5YdVm8w==/109951164681628808.jpg',
                id: 6773200,
                type: 'friend',
            },
            {
                type: 'group',
                id: 'abhcdlagje',
                group_name: '群聊1',
                members: [
                    {
                        name: '张三',
                        avatar: 'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
                        id: 6773201,
                    }, {
                        name: '李四',
                        avatar: 'https://p1.music.126.net/Cmn04lf1X-DvUvm5YdVm8w==/109951164681628808.jpg',
                        id: 6773200,
                    }, {
                        name: '王五',
                        avatar: 'https://p1.music.126.net/tMH2KjUioNW57zbixCA5Pg==/109951164158510116.jpg',
                        id: 6773201,
                    }
                ]
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
                var msg = JSON.parse(event.data);
                msgOperate(msg)
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

    let msgOperate = (msg) => {
        console.log('msg', msg);
        if (msg.type == 'system') {
            deleteMessageDispatch(msg.msg_content)
        } else {
            addMessageDispatch(msg)
            scrollToBottom()
        }
    }

    // 滑动到底部
    let scrollToBottom = () => {
        var ele = msgRef.current;
        setTimeout(() => {
            ele.scrollTop = ele.scrollHeight;
        }, 500)
    }

    //消息模型
    let msgModel = (msg, msg_type) => {
        var obj = {
            fromuserid: userid,
            touserid: toUserInfo.id,
            type: toUserInfo.type,
            msg_type: msg_type,
            msg_content: msg,
            time: new Date().getTime(),
            local_msg_id: uuidGenerator()
        }
        return JSON.stringify(obj);
    }

    //系统消息模型
    let sysModel = (msg, msg_type) => {
        var obj = {
            // fromuserid: userid,
            // touserid: toUserInfo.id,
            type: 'system',
            msg_type: msg_type,
            msg_content: msg,
            time: new Date().getTime(),
            local_msg_id: uuidGenerator()
        }
        return JSON.stringify(obj);
    }

    //切换好友列表
    let changeFriend = (info) => {
        if (id !== toUserInfo.id) {
            setToUserInfo(Object.assign(info))
        }
    }

    //发送消息
    let sendTxt = (msg, msg_type) => {
        const result = msgModel(msg, msg_type)
        ws.send(result);
    }

    //消息的撤回
    let deleteOneMsg = (item, X, Y) => {
        const dom = tabRef.current;
        dom.style.display = 'block';
        dom.style.left = X - 550 + 'px';
        dom.style.top = Y - 30 + 'px';
        setMsg(item)
    }

    let rebackMsg = (e) => {
        e.stopPropagation()
        if (new Date().getTime() - msg.time > 1000 * 60 * 2) {
            alert('该消息不能撤回')
        } else {
            const result = sysModel(msg.local_msg_id, 100) //100代表着撤回消息
            ws.send(result);
        }
        closeTab()
    }

    let closeTab = () => {
        const dom = tabRef.current;
        dom.style.display = 'none';
    }

    return (
        <div className='chat-container'>
            <div className='friend-list'>
                <FriendList friendList={friendList} activeId={toUserInfo.id ? toUserInfo.id : ''} changeFriend={changeFriend}></FriendList>
            </div>
            <div className='msg-content' onClick={() => closeTab()}>
                <div className='msg-list' ref={msgRef}>
                    {
                        msgBox.toJS().map(item => {
                            if (item.type == 'friend') {
                                if (item.fromuserid == userid) {
                                    return <MessageMe item={item} key={item.time} deleteOneMsg={deleteOneMsg} />
                                } else if (item.touserid == userid) {
                                    return <MessageOther item={item} key={item.time} avatar={toUserInfo.avatar} />
                                }
                            }
                        })
                    }
                    <div className='tab'>
                        <p ref={tabRef} className='back' onClick={(e) => rebackMsg(e)}>撤回消息</p>
                    </div>
                </div>
                <div className='send-msg'>
                    <Send sendTxt={sendTxt}></Send>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    msgBox: state.getIn(['message', 'msgBox'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        addMessageDispatch(msg) {
            dispatch(addMsg(msg))
        },
        deleteMessageDispatch(msg) {
            dispatch(deleteMsg(msg))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Index))