import React, { useState } from 'react';
import styled from 'styled-components';

// components
import Modal from './Modal';

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// redux 
import { connect } from 'react-redux';
import { deletePost } from '../redux/actions/dataActions';

const DeleteWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;
const DeleteButton = styled.div`
    color: red;
        font-size: 1.1rem;
        cursor: pointer;
`;

const DeletePost = ({ postId, deletePost }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleSubmit = e => {
        e.preventDefault();
        deletePost(postId);
        handleClose();
    }

    return (
        <DeleteWrapper>
            <DeleteButton
                onClick={() => {
                    handleOpen()}}
            >
                <FontAwesomeIcon icon={faTrashAlt}/>
            </DeleteButton>
            <form onSubmit={handleSubmit}>
                <Modal
                    leftZero
                    topZero
                    open={open}
                    handleClose={setOpen}
                    includeButtons
                    submitButtonText='Delete'
                    topMargin='15px'
                    customButtonColor='red'
                    lightContrast
                >
                    Are you sure you want to delte this post? It cannot be undone.
                </Modal>
            </form>
        </DeleteWrapper>
    )
}

export default connect(null, { deletePost })(DeletePost);