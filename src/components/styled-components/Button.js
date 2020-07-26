import styled from 'styled-components';

const Button = styled.button`
    height: 30px;
    width: 100%;
    cursor: pointer;
    color: ${props => props.primary ? props.theme.light.textContrast : props.theme.light.primary};
    background: ${props => props.primary ? props.theme.light.primary : props.theme.light.lightgray};
    border: 1px solid ${props => props.theme.light.primary};
`;

export default Button;