import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';

//styled component imports
import { MainWrapper } from '../style/elements';
import { Form } from '../components/styled-components/Form';
import { Input, InputContainer, InputError } from '../components/styled-components/Input';
import Button  from '../components/styled-components/Button';

const MainTitle = styled.h1`
    margin-bottom: 30px;
    font-size: 1.9rem;
`;

const Login = props => {
    const [user, setUser] = useState();
    const [errors, setErrors] = useState({
        message: {
            userHandle: null,
            password: null
        },
        invalidCreds: null
    });

    const handleChange = e => {
        if((e.target.name && errors && errors.message.userHandle) || 
           (e.target.name && errors && errors.message.password)) {
            setErrors({
                message: {
                    ...errors.message,
                    [e.target.name]: null
                }
            })
        }

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('http://localhost:1337/api/auth/login', user)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                props.history.push('/')
            })
            .catch(error => {
                console.log(error.response.data.message)
                if(error.response.data.message.userHandle || error.response.data.message.password) {
                    setErrors({
                        ...error.response.data
                    }, console.log(errors))
                    return;
                }
                setErrors({
                    ...errors,
                    invalidCreds: error.response.data.message
                }, console.log(errors))
            })
    }


    return (
        <MainWrapper
            flex 
            flexDir='column'
            justFlex='center'
            alignFlex='center'
        >
            <MainTitle>
                Log into FaceBrowser 
            </MainTitle>
            {console.log(errors)}
            <Form 
                flexDir='column' 
                maxW='300px'
                justifyContent
                height='true'
                onSubmit={handleSubmit}
            >
                <InputContainer width='100%'>
                    <Input 
                        name='userHandle' 
                        placeholder='Handle' 
                        onChange={handleChange}
                        border={errors && errors.message.userHandle ? 'red' : null}
                    />
                    {errors && errors.message.userHandle 
                        ? <InputError left='85'>{errors.message.userHandle}</InputError> 
                        : null
                    }
                    {errors && errors.invalidCreds 
                        ? <InputError left='85'>{errors.invalidCreds}</InputError> 
                        : null
                    }
                </InputContainer>
                <InputContainer width='100%'>
                    <Input 
                        name='password' 
                        placeholder='Password' 
                        onChange={handleChange}
                        border={errors && errors.message.password ? 'red' : null}
                    />
                    {errors && errors.message.password 
                        ? <InputError left='85'>{errors.message.password}</InputError>
                        : null
                    }
                </InputContainer>
                <Button type='submit' primary>Login</Button>
            </Form>       
        </MainWrapper>
    )
}

export default Login;
