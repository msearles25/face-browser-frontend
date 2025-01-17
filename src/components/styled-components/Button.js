import styled from 'styled-components';

const Button = styled.button`
    height: 30px;
    width: ${props => props.width ? props.width : '100%'};
    cursor: pointer;
    color: ${props => props.primary 
        ? props.theme.light.textContrast 
        : props.lightContrast 
            ? props.theme.light.textContrast 
            : props.theme.light.primary
    };
    background: ${props => props.primary 
        ? props.theme.light.primary 
        : props.customButtonColor 
            ? props.customButtonColor 
            : props.theme.light.background
    };
    border: 1px solid ${props => props.primary
        ? props.theme.light.primary 
        : props.customButtonColor 
            ? props.customButtonColor 
            : props.theme.light.primary 
    };
    font-size: ${props => props.fontSize ? props.fontSize :'1.4rem'};
    margin: ${props => props.margin}
`;

export default Button;