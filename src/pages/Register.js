import React, { useState } from 'react'
import axios from 'axios';

const Register = () => {
    const [imgInfo, setImgInfo] = useState({
        imgSrc: null,
        imgFile: null
    });
    const [newUser, setNewUser] = useState()
    
    const handleImageUpload = e => {
        if(e.target.files.length === 0) {
            e.target.files = imgInfo.imgFile;
            return;
        }
        
        const file = e.target.files
        const imgUrl = URL.createObjectURL(e.target.files[0]);
        setImgInfo({ 
            imgSrc: imgUrl, 
            imgFile: file
        });
    }

    const handleChange = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
       
        axios.post('http://localhost:1337/api/auth/register', newUser)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

    const testImage = e => {
        e.preventDefault()

        const imageData = new FormData();
        const image = imgInfo.imgFile[0]
        imageData.append('upload_preset', `${process.env.REACT_APP_UPLOAD_PRESET}`)
        imageData.append('file', image);
        axios.post(`${process.env.REACT_APP_IMAGE_UPLOAD_URL}`, imageData)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    return (
        <div>
            <form onSubmit={testImage}>
                <input type='file' onChange={handleImageUpload}/>
                <input type='text' name='userHandle' placeholder='Handle' onChange={handleChange}/>
                <input type='text' name='email' placeholder='Email' onChange={handleChange}/>
                <input type='text' name='password' placeholder='Password' onChange={handleChange}/>
                <input type='text' name='confirmPassword' placeholder='Confirm Password' onChange={handleChange}/>
                <button type='submit'>test register</button>
            </form>
            {imgInfo.imgSrc && <img src={imgInfo.imgSrc} alt='user'/> }
        </div>
    )
}

export default Register;
