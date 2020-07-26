import React, { useState, useRef } from 'react'
import axios from 'axios';

// styled components imports
import { MainWrapper } from '../style/elements';
import Button from '../components/styled-components/Button';
import { InputContainer, Input, InputError } from '../components/styled-components/Input';
import { Form, FormSeparator, Img } from '../components/styled-components/Form';

const Register = () => {
    const [imgInfo, setImgInfo] = useState({
        imgSrc: null,
        imgFile: null
    });
    const [newUser, setNewUser] = useState();
    const [errors, setErrors] = useState();
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
            const user = await axios.post('http://localhost:1337/api/auth/register', {
                ...newUser,
                imageUrl: userImage
            });
            localStorage.setItem('token', user.data.token)
        } 
        catch(error) {
            setErrors({
                ...error.response.data.message
            }, console.log(errors))
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
                    <Img 
                    src={imgInfo.imgSrc 
                        ? imgInfo.imgSrc 
                        : process.env.REACT_APP_DEFAULT_IMAGE 
                    } 
                    alt='user'/> 
                    <input 
                        hidden='hidden' 
                        type='file' 
                        onChange={handleImageUpload} 
                        ref={imageSelectHandler}
                    />
                    <Button 
                        type='button' 
                        primary onClick={() => 
                            imageSelectHandler.current.click()
                    }>
                                Chose Image
                    </Button>
                </FormSeparator>
                <FormSeparator>
                    <InputContainer>
                        <Input 
                            type='text' 
                            name='userHandle' 
                            placeholder='Handle' 
                            onChange={handleChange}
                            border={errors && errors.userHandle ? 'red' : null}
                        />
                        {errors && errors.userHandle 
                            ? <InputError bottom='-10' toolTipTop='32'>{errors.userHandle}</InputError> 
                            : null
                        }
                    </InputContainer>
                    <InputContainer>
                        <Input 
                            type='text' 
                            name='email' 
                            placeholder='Email' 
                            onChange={handleChange}
                            border={errors && errors.email ? 'red' : null}
                        />
                        {errors && errors.email 
                            ? <InputError>{errors.email}</InputError> 
                            : null
                        }
                    </InputContainer>
                    <InputContainer>
                        <Input 
                            type='password' 
                            name='password' 
                            placeholder='Password' 
                            onChange={handleChange}
                            border={errors && errors.password ? 'red' : null}

                        />
                        {errors && errors.password 
                            ? <InputError bottom={
                                errors.password === 'Password must be between 6 and 14 characters.' 
                                ? '-10' 
                                : '10'
                            }
                            toolTipTop={
                                errors.password === 'Password must be between 6 and 14 characters.' 
                                ? '31' 
                                : '17'
                            }>
                                {errors.password}
                            </InputError> : null
                        }                    
                    </InputContainer>
                    <InputContainer>
                        <Input 
                            type='password' 
                            name='confirmPassword' 
                            placeholder='Confirm Password' 
                            onChange={handleChange}
                            border={errors && errors.confirmPassword ? 'red' : null}
                        />
                        {errors && errors.confirmPassword 
                            ? <InputError>{errors.confirmPassword}</InputError> 
                            : null
                        }
                    </InputContainer>
                    <Button type='submit'>Register</Button>
                </FormSeparator>
            </Form>
        </MainWrapper>
    )
}

export default Register;
