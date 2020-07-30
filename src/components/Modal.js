import React from 'react';
import styled from 'styled-components';

// fontawesome icon for a closing x
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ClickableIcon } from '../style/elements';

// custom button
import Button from '../components/styled-components/Button';

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
    /* min-height: 200px; */
    min-width:300px;
    background: ${props => props.theme.light.background};
    position: absolute;
    left: 50%;
    top: calc(50% - 3.5rem);
    transform: translate(-50%, -50%);
    z-index: 100;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const ModalSeparator = styled.div`
    width:100%;
    min-height: ${props => props.height === 'large' ? '75%' : '10%'};
    display: flex;
    justify-content: ${props => props.justifyContent ? 'flex-end' : ''};
    position: relative;
    /* border: 1px solid green; */
`;

const Modal = ({ children, ...props }) => {
    return (
        <BackDrop 
            leftZero={props.leftZero ? true : false }
            topZero={props.topZero ? true : false }
            open={props.open}
            onClick={e => {
                // check if user clicks on just the backdrop
                // if so close the modal
                if(e.target === e.currentTarget) {
                    props.setOpen(false)
                }
            }}
        >
            {console.log(props)}
            <ModalContainer>
                <ModalSeparator justifyContent>
                    <ClickableIcon 
                        icon={faTimes}
                        onClick={() => props.setOpen(false)}
                    />
                </ModalSeparator>
                <ModalSeparator height='large'>
                    {children}
                </ModalSeparator>
                <ModalSeparator justifyContent>
                    <Button 
                        primary
                        width='80px'
                        fontSize='0.9rem'
                        margin='0 5px 0 0'
                    >
                        Save
                    </Button>
                    <Button
                        width='75px'
                        fontSize='0.9rem'
                    >
                        Cancel
                    </Button>
                </ModalSeparator>
            </ModalContainer>
        </BackDrop>
    )
}

export default Modal;