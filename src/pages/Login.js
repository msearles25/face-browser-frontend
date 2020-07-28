import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

//styled component imports
import { MainWrapper } from '../style/elements';
import { Form } from '../components/styled-components/Form';
import { Input, InputContainer, InputError } from '../components/styled-components/Input';
import Button  from '../components/styled-components/Button';

// redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { clearAllErrors } from '../redux/actions/uiActions';

const MainTitle = styled.h1`
    margin-bottom: 30px;
    font-size: 1.9rem;
`;

const Login = props => {
    const [user, setUser] = useState();
    const [errors, setErrors] = useState();
    const { ui } = props;

    useEffect(() => {
        if(ui.errors) {
            setErrors({ ...ui.errors })
        }
        
        return () => {
            props.clearAllErrors()
        }

    }, [ui.errors])

    const handleChange = e => {
        // if((e.target.name && errors && errors.userHandle) || 
        //    (e.target.name && errors && errors.password)) {
        // }
        setErrors({
            ...errors,
            [e.target.name]: null
        })
        
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
                            errors && errors.userHandle 
                                ? 'red' 
                                : null
                        }
                    />
                    {errors && errors.userHandle 
                        ? <InputError left='85'>{errors.userHandle}</InputError> 
                        : null
                    }
                    {errors && errors.general 
                        ? <InputError left='85'>{errors.general}</InputError> 
                        : null
                    }
                </InputContainer>
                <InputContainer width='100%'>
                    <Input 
                        name='password' 
                        placeholder='Password' 
                        onChange={handleChange}
                        border={
                            errors && errors.password 
                                ? 'red' 
                                : null
                        }
                    />
                    {errors && errors.password 
                        ? <InputError left='85'>{errors.password}</InputError>
                        : null
                    }
                </InputContainer>
                {ui.loading === true ? <p>loading...</p> : null}
                <Button type='submit' primary>Login</Button>
            </Form>       
        </MainWrapper>
    )
}

const mapStateToProps = state => ({
    ui: state.ui
})

export default connect(mapStateToProps, { loginUser, clearAllErrors })(Login);
