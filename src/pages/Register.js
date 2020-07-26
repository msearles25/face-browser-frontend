import React, { useState, useRef } from 'react'
import axios from 'axios';

// styled components imports
import { MainWrapper } from '../style/elements';
import Button from '../components/styled-components/Button';
import Input from '../components/styled-components/Input';
import { Form, FormSeparator, Img } from '../components/styled-components/Form';

const Register = () => {
    const [imgInfo, setImgInfo] = useState({
        imgSrc: null,
        imgFile: null
    });
    const [newUser, setNewUser] = useState()

    //using a reference to the file input so I can use a custom button
    const imageSelectHandler = useRef(null);

    // handles the users uploaded image
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
    // uploads the image to cloudinary
    const imageUpload = async () => {
        if(!imgInfo.imgFile) {
            return `${process.env.REACT_APP_DEFAULT_IMAGE}`;
        }

        const imageData = new FormData();
        const image = imgInfo.imgFile[0]
        imageData.append('upload_preset', `${process.env.REACT_APP_UPLOAD_PRESET}`)
        imageData.append('file', image);
        try {
            const imageUrl = await axios.post(`${process.env.REACT_APP_IMAGE_UPLOAD_URL}`, imageData)
            return await imageUrl.data.secure_url;
        }
        catch(error) {
            console.log(error)
            return `${process.env.REACT_APP_DEFAULT_IMAGE}`;
        }
    }
    const handleSubmit = async e => {
        e.preventDefault();
        
        try {
            const userImage = await imageUpload();
            await axios.post('http://localhost:1337/api/auth/register', {
                ...newUser,
                imageUrl: userImage
            });
        } 
        catch(error) {
            console.error(error.response)
        }
    }
    
    return (
        <MainWrapper 
            flex 
            flexDir='column' 
            justFlex='center'
            alignFlex='center'
        >
            <Form onSubmit={handleSubmit}>
                <FormSeparator>
                    <Img src={imgInfo.imgSrc ? imgInfo.imgSrc : process.env.REACT_APP_DEFAULT_IMAGE } alt='user'/> 
                    <input hidden='hidden' type='file' onChange={handleImageUpload} ref={imageSelectHandler}/>
                    <Button type='button' primary onClick={() => imageSelectHandler.current.click()}>Chose Image</Button>
                </FormSeparator>
                <FormSeparator>
                    <Input type='text' name='userHandle' placeholder='Handle' onChange={handleChange}/>
                    <Input type='email' name='email' placeholder='Email' onChange={handleChange}/>
                    <Input type='password' name='password' placeholder='Password' onChange={handleChange}/>
                    <Input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={handleChange}/>
                    <Button type='submit'>Register</Button>
                </FormSeparator>
            </Form>
        </MainWrapper>
    )
}

export default Register;
