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
    /* display: ${props => props.open ? '' : 'none'}; */
    visibility: ${props => props.open ? 'visible' : 'hidden'};
    opacity: ${props => props.open ? 1 : 0};
    transition: visibility .4s linear, opacity 0.4s linear;
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
    flex-direction: ${props => props.dirColumn ? 'column' : ''};
    justify-content: ${props => props.justifyContent ? 'flex-end' : ''};
    align-items: ${props => props.alignItems};
    position: relative;
    margin-bottom: ${props => props.bottomMargin};
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
                    props.handleClose()
                }
            }}
        >
            <ModalContainer>
                <ModalSeparator justifyContent>
                    <ClickableIcon 
                        icon={faTimes}
                        onClick={() => props.handleClose()}
                    />
                </ModalSeparator>
                <ModalSeparator 
                    height='large' 
                    dirColumn
                    bottomMargin='30px'
                    alignItems='center'
                >
                    {children}
                </ModalSeparator>
                <ModalSeparator justifyContent>
                    <Button 
                        primary
                        width='80px'
                        fontSize='0.9rem'
                        margin='0 5px 0 0'
                        type='submit'
                    >
                        Save
                    </Button>
                    <Button
                        width='75px'
                        fontSize='0.9rem'
                        onClick={() => props.handleClose()}
                    >
                        Cancel
                    </Button>
                </ModalSeparator>
            </ModalContainer>
        </BackDrop>
    )
}

export default Modal;