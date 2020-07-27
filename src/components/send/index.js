import React, { useEffect, useState, useRef } from 'react'
import './style.scss'

function Index(props) {
    const sendRef = useRef()
    const textareaRef = useRef()
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
            if(txt){
                sendTxt(txt);
            }
            setTxt('')
        }
    }
    let handleImageChange=(e)=>{
        const file = e.target.files[0];
        const windowURL = window.URL || window.webkitURL;//实现预览
        const dataURl = windowURL.createObjectURL(file);//硬盘或sd卡指向文件路径
        console.log('file',dataURl);
        var d=document.createElement('img')
        var image=new Image()
        image.src='https://p1.music.126.net/Cmn04lf1X-DvUvm5YdVm8w==/109951164681628808.jpg';
        var textaaa=textareaRef.current
        console.log('textaaa',textaaa);
        
        textaaa.appendChild(image)
    }
    let addImage=()=>{
        let inputImg=sendRef.current
        inputImg.click()
    }
    return (
        <div className='send-container'>
            <div className='operate'>
                <i className='icon-upload' onClick={()=>addImage()}></i>
                <input
                   style={{
                     display:'none'
                   }}
                   ref={sendRef}
                   type='file'
                   accept='image/*'
                   onChange={(e)=>handleImageChange(e)}
        />
            </div>
            <div className='input-box'>
                <textarea ref={textareaRef} onKeyDown={(e) => send(e)} value={txt} onChange={(e) => changeTxt(e)}></textarea>
            </div>
        </div>
    )
}
export default React.memo(Index)