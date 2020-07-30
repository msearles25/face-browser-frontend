import React, { useState } from 'react';
import styled from 'styled-components';

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

const NewPost = () => {
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    
    return (
        <>
            <NavItemButton onClick={() => handleOpen()}>Post</NavItemButton>
            <form>
                <Modal 
                    open={open} 
                    handleClose={handleClose}
                    topZero
                    leftZero
                    includeButtons
                    submitButtonText='Post'
                >
                    <Title>Post something new!</Title>
                    <TextArea />
                </Modal>
            </form>
        </>
    )
}

export default NewPost;