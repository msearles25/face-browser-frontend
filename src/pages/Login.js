import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';

//styled component imports
import { MainWrapper } from '../style/elements';
import { Form } from '../components/styled-components/Form';
import { Input } from '../components/styled-components/Input';
import Button  from '../components/styled-components/Button';

const MainTitle = styled.h1`
    margin-bottom: 30px;
    font-size: 1.9rem;
`;

const Login = props => {
    const [user, setUser] = useState()

    const handleChange = e => {
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
                console.error(error.response)
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
            <Form 
                flexDir='column' 
                maxW='300px'
                justifyContent
                height='true'
                onSubmit={handleSubmit}
            >
                <Input name='userHandle' placeholder='Handle' onChange={handleChange}/>
                <Input name='password' placeholder='Password' onChange={handleChange}/>
                <Button type='submit' primary>Login</Button>
            </Form>       
        </MainWrapper>
    )
}

export default Login;
