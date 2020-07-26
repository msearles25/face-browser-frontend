import styled from 'styled-components';

const Input = styled.input`
    box-sizing: border-box;
    height: 2rem;
    font-size: 1.2rem;
    border: none;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.light.primary};
    background: ${props => props.theme.light.lightgray};
    padding: 5px;
`;

export default Input;