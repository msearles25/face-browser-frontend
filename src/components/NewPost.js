import React, { useState } from 'react';
import styled from 'styled-components';

//redux
import { connect } from 'react-redux';
import { addNewPost } from '../redux/actions/dataActions';

// components
import Modal from './Modal';
import { TextArea } from './styled-components/Input';

const NavItemButton = styled.div`
    color: ${({ theme }) => theme.light.textContrast};
`;
const Title = styled.h4`
    margin-left: -250px;
    margin-bottom: 20px;
`;

const NewPost = ({ addNewPost }) => {
    const [open, setOpen] = useState(false);
    const [post, setPost] = useState();
    
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleChange = e => {
        setPost({
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        await addNewPost(post);
        handleClose();
    }

    return (
        <>
            <NavItemButton onClick={() => handleOpen()}>Post</NavItemButton>
            <form onSubmit={handleSubmit}>
                <Modal
                    open={open} 
                    handleClose={handleClose}
                    topZero
                    leftZero
                    includeButtons
                    submitButtonText='Post'
                >
                    <Title>Post something new!</Title>
                    <TextArea 
                        name='postContent'
                        onChange={handleChange}
                    />
                </Modal>
            </form>
        </>
    )
}

export default connect(null, { addNewPost })(NewPost);