import React, { useEffect, useState, useRef } from 'react'
import './style.scss'

function Index(props) {
    const sendRef = useRef()
    const [txt, setTxt] = useState()
    const { sendTxt } = props
    let changeTxt = (e) => {
        setTxt(e.target.value)
    }
    let send = (e) => {
        var keyCode = e.keyCode || e.which || e.charCode;
        var ctrlKey = e.ctrlKey || e.metaKey;
        // 判断 ctrl+enter 换行
        if (ctrlKey && keyCode == 13) {
            setTxt(txt + "\n")
        } else if (keyCode == 13) {
            // 阻止提交自动换行
            e.preventDefault();
            sendTxt(txt);
            setTxt('')
        }
    }
    return (
        <div className='send-container'>
            <div className='operate'>
                <i className='icon-upload'></i>
            </div>
            <div className='input-box'>
                <textarea onKeyDown={(e) => send(e)} ref={sendRef} value={txt} onChange={(e) => changeTxt(e)}></textarea>
            </div>
        </div>
    )
}
export default React.memo(Index)