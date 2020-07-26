import styled from 'styled-components';

export const InputContainer = styled.div`
    position: relative;
    width: 200px;
`;

export const Input = styled.input`
    box-sizing: border-box;
    height: 2rem;
    font-size: 1.2rem;
    border: none;
    width: 100%;
    border-bottom: 1px solid ${props => props.border ? props.border : props.theme.light.primary};
    background: ${props => props.theme.light.lightgray};
    padding: 5px;
    transition: 0.3s;
`;

export const InputError = styled.div`
    font-size: .8rem;
    /* height: 3rem; */
    padding: 5px;
    background: red;
    color: white;
    position: absolute;
    z-index: 20;
    bottom: ${props => props.bottom ? `${props.bottom}%` : '10%'};
    left: 80%;
    margin-left: 60px;
    min-width: 180px !important;

    &::after {
        content: '';
        position: absolute;
        right: 100%;
        top: ${props => props.toolTipTop ? `${props.toolTipTop}%` : '17%'};
        margin-left: -5px;
        border-width: 8px;
        border-style: solid;
        transform: rotate(90deg);
        border-color: red transparent transparent transparent;
    }
`;
