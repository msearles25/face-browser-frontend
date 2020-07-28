import React, { useState, useRef, useEffect } from 'react'

// styled components imports
import { MainWrapper } from '../style/elements';
import Button from '../components/styled-components/Button';
import { InputContainer, Input, InputError } from '../components/styled-components/Input';
import { Form, FormSeparator, Img } from '../components/styled-components/Form';

// redux
import { connect } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';
import { clearAllErrors } from '../redux/actions/uiActions';

// util functions
import { imageUpload } from '../utils/utils';

const Register = props => {
    const { ui, clearAllErrors } = props;
    const [imgInfo, setImgInfo] = useState({
        imgSrc: null,
        imgFile: null
    });
    const [newUser, setNewUser] = useState();
    const [errors, setErrors] = useState();
    //using a reference to the file input so I can use a custom button
    const imageSelectHandler = useRef(null);

    useEffect(() => {
        if(ui.errors) {
            setErrors({ ...ui.errors })
        }
        return () => {
            clearAllErrors()
        }
    }, [ui.errors, clearAllErrors])

    // handles the users uploaded image
    const handleImageUpload = e => {
        if(e.target.files.length === 0) {
            e.target.files = imgInfo.imgFile;
            return;
        }


        if(e.target.files[0].type === 'image/jpg' 
          || e.target.files[0].type === 'image/jpeg' 
          || e.target.files[0].type === 'image/png') {

            const file = e.target.files
            const imgUrl = URL.createObjectURL(e.target.files[0]);
            setImgInfo({ 
                imgSrc: imgUrl, 
                imgFile: file
            });
            return;
        }
        return;
        
    }
    const handleChange = e => {
        if(errors) {
            setErrors({
                ...errors,
                [e.target.name]: null
            })
        }
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }
   
    const handleSubmit = e => {
        e.preventDefault();
        
        props.registerUser(
            newUser, 
            imageUpload, 
            imgInfo,
            props.history
        )
    }
    
    return (
        <MainWrapper 
            flex 
            flexDir='column' 
            justFlex='center'
            alignFlex='center'
        >
            <Form justifyContent onSubmit={handleSubmit}>
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
            {ui.loading ? <p>loading...</p> : null}
        </MainWrapper>
    )
}

const mapStateToProps = state => ({
    ui: state.ui
})

const mapActionsToProps = {
    registerUser,
    clearAllErrors
}

export default connect(mapStateToProps, mapActionsToProps )(Register);
