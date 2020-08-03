import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MainWrapper = styled.div`
    position: relative;
    box-sizing: border-box;
    min-height: calc(100vh - 3.5rem);
    z-index: 0;
    /* display: flex; */
    /* border: 1px solid green; */
    background: ${props=> props.theme.light.background};
    overflow: ${props => props.overflow};
    
    ${({ flex }) => 
        flex &&
        css`
            display: flex;
            flex-direction: ${({ flexDir }) => flexDir };
            align-items: ${({ alignFlex }) => alignFlex };
            justify-content: ${({ justFlex }) => justFlex };
        `}
`;

export const ContentWrapper = styled.div`
height: 100%;
width: 75%;
margin-top: 1rem;
display: flex;
justify-content: center;
/* border: 1px solid red; */
`;
export const Separator = styled.div`
/* border: 1px solid green; */
width: ${props => props.small 
    ? '23%' 
    : props.medium 
        ? '40%' 
        : '60%'
};
padding: ${props => props.padding};
box-sizing: border-box;
margin-right: ${props => `${props.marginRight}px`};
`;

export const ClickableIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
`;