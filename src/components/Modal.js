import React from 'react';
import styled from 'styled-components';

const BackDrop = styled.div`
    background: rgba(0,0,0, 0.5);
    position: fixed;
    left: ${props => props.leftZero 
        ? 0 
        : ''
    };
    top: ${props => props.topZero ? 0 : ''};
    height: 100vh;
    width: 100vw;
    display: ${props => props.open ? '' : 'none'};
`;
const ModalContainer = styled.div`
    min-height: 200px;
    min-width:300px;
    background: white;
    position: absolute;
    left: 50%;
    top: calc(50% - 3.5rem);
    transform: translate(-50%, -50%);
`;

const Modal = ({ children, ...props }) => {
    return (
        <BackDrop 
            leftZero={props.leftZero ? true : false }
            topZero={props.topZero ? true : false }
            open={props.open}
            onClick={() => {
                props.setOpen(false)
            }}
        >
            {console.log(props)}
            <ModalContainer>
                {children}
            </ModalContainer>
        </BackDrop>
    )
}

export default Modal;