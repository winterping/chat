import React, { useEffect, useState, useRef } from 'react'
import './style.scss'
import axios from 'axios';

function Index(props) {
    const sendRef = useRef()
    const [txt, setTxt] = useState()
    const { sendTxt } = props
    const [uploadImg, setUploadImg] = useState(false)
    const [imgUrl, setImgUrl] = useState('')

    let changeTxt = (e) => {
        setTxt(e.target.value);
    }

    let send = (e) => {
        var keyCode = e.keyCode || e.which || e.charCode;
        var ctrlKey = e.ctrlKey || e.metaKey;
        if (ctrlKey && keyCode == 13) {
            setTxt(txt + "\n")
        } else if (keyCode == 13) {
            e.preventDefault();
            if (txt) {
                sendTxt(txt, 0);
            }
            setTxt('')
        }
    }
    let handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileName = file.name;
        var pettern = /\.(png|jpg|jpeg|gif|mp3|mp4)$/;
        if (!pettern.test(fileName)) {
            alert("图片格式错误,请重新上传");
            return;
        }
        let data = new FormData();
        data.append('imgName', fileName);
        data.append('img', file);
        axios({
            method: 'post',
            url: 'http://localhost:3001/uploadImg',
            data: data
        })
            .then(res => {
                console.log(res.data);
                const dataUrl = `http://localhost:3001/${res.data}`
                setUploadImg(true);
                setImgUrl(dataUrl);
            })
            .catch(error => {
                alert('上传错误,请重新上传')
                console.log(error)
            })
        // const windowURL = window.URL || window.webkitURL;
        // const dataURl = windowURL.createObjectURL(file);
    }

    let addImage = () => {
        let inputImg = sendRef.current
        inputImg.click()
    }

    let sendImg = () => {
        sendTxt(imgUrl, 1);
        setUploadImg(false);
    }

    let closePhoto = () => {
        setUploadImg(false);
    }

    return (
        <div className='send-container'>
            <div className='operate'>
                <i className='icon-upload' onClick={() => addImage()}></i>
                <input
                    style={{
                        display: 'none'
                    }}
                    ref={sendRef}
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleImageChange(e)}
                />
            </div>
            <div className='input-box'>
                <textarea onKeyDown={(e) => send(e)} value={txt} onChange={(e) => changeTxt(e)} className='edit'></textarea>
            </div>
            {
                uploadImg ? <div className='bg-container'>
                    <img src={imgUrl} />
                    <div className='operate'>
                        <span onClick={() => sendImg()}>Send</span>
                        <span onClick={() => closePhoto()}>Cancel</span>
                    </div>
                </div> : null
            }
        </div>
    )
}
export default React.memo(Index)