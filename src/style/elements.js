import styled, { css } from 'styled-components';

export const MainWrapper = styled.div`
    position: relative;
    box-sizing: border-box;
    min-height: calc(100% - 3.5rem);
    /* display: flex; */
    /* border: 1px solid green; */
    background: ${props=> props.theme.light.lightgray};
    
    ${({ flex }) => 
        flex &&
        css`
            display: flex;
            flex-direction: ${({ flexDir }) => flexDir };
            align-items: ${({ alignFlex }) => alignFlex };
            justify-content: ${({ justFlex }) => justFlex }
        `}
`;