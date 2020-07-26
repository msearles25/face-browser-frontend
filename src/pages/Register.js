import React, { useState, useRef } from 'react'
import axios from 'axios';

import styled from 'styled-components';

import { MainWrapper } from '../style/elements';

const Form = styled.form`
    width: 100%;
    max-width:430px;
    display: flex;
    box-sizing: border-box;
    /* border: 1px solid red; */
`;
const FormSeparator = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
    /* align-items:center; */
    width: calc(100% / 2);
    /* border:1px solid green; */
`;

const Img = styled.img`
    height: 200px;
    width: 100%;
    margin-bottom: 1rem;
`;

const Input = styled.input`
    box-sizing: border-box;
    height: 2rem;
    font-size: 1.2rem;
    border: none;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.light.primary};
    background: ${props => props.theme.light.lightgray};
    padding: 5px;
`;

const Button = styled.button`
    height: 30px;
    width: 100%;
    cursor: pointer;
    color: ${props => props.primary ? props.theme.light.textContrast : props.theme.light.primary};
    background: ${props => props.primary ? props.theme.light.primary : props.theme.light.lightgray};
    border: 1px solid ${props => props.theme.light.primary};
`;

const Register = () => {
    const [imgInfo, setImgInfo] = useState({
        imgSrc: null,
        imgFile: null
    });
    const [newUser, setNewUser] = useState({
        imageUrl: `${process.env.REACT_APP_DEFAULT_IMAGE}`
    })

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
    const imageUpload = e => {
        if(!imgInfo.imgFile) {
            return;
        }

        const imageData = new FormData();
        const image = imgInfo.imgFile[0]
        imageData.append('upload_preset', `${process.env.REACT_APP_UPLOAD_PRESET}`)
        imageData.append('file', image);
        axios.post(`${process.env.REACT_APP_IMAGE_UPLOAD_URL}`, imageData)
        .then(res => {
            const image = res.data.secure_url
            setNewUser({
                ...newUser,
                imageUrl: image
            })
        })
        .catch(error => {
            console.log(error.response)
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        
        imageUpload();

        axios.post('http://localhost:1337/api/auth/register', newUser)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error.response.data)
            })
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
                    <Button primary onClick={() => imageSelectHandler.current.click()}>Chose Image</Button>
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
