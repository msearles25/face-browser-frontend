import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';

//styled component imports
import { MainWrapper } from '../style/elements';
import { Form } from '../components/styled-components/Form';
import { Input, InputContainer, InputError } from '../components/styled-components/Input';
import Button  from '../components/styled-components/Button';

import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { clearErrors } from '../redux/actions/uiActions';

const MainTitle = styled.h1`
    margin-bottom: 30px;
    font-size: 1.9rem;
`;

const Login = props => {
    const [user, setUser] = useState();

    const handleChange = e => {
        if((e.target.name && props.ui.errors && props.ui.errors.userHandle) || 
           (e.target.name && props.ui.errors && props.ui.errors.password)) {
            props.clearErrors(e.target.name);
        }
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.loginUser(user, props.history)
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
                <InputContainer width='100%'>
                    <Input 
                        name='userHandle' 
                        placeholder='Handle' 
                        onChange={handleChange}
                        border={
                            props.ui.errors && props.ui.errors.userHandle 
                                ? 'red' 
                                : null
                        }
                    />
                    {props.ui.errors && props.ui.errors.userHandle 
                        ? <InputError left='85'>{props.ui.errors.userHandle}</InputError> 
                        : null
                    }
                    {props.ui.errors && props.ui.errors.message
                        ? <InputError left='85'>{props.ui.errors.message}</InputError> 
                        : null
                    }
                </InputContainer>
                <InputContainer width='100%'>
                    <Input 
                        name='password' 
                        placeholder='Password' 
                        onChange={handleChange}
                        border={
                            props.ui.errors && props.ui.errors.password 
                                ? 'red' 
                                : null
                        }
                    />
                    {props.ui.errors && props.ui.errors.password 
                        ? <InputError left='85'>{props.ui.errors.password}</InputError>
                        : null
                    }
                </InputContainer>
                <Button type='submit' primary>Login</Button>
            </Form>       
        </MainWrapper>
    )
}

const mapStateToProps = state => ({
    ui: state.ui
})

export default connect(mapStateToProps, { loginUser, clearErrors })(Login);
