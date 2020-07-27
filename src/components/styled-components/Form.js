import styled from 'styled-components';

export const Form = styled.form`
    width: 100%;
    height: ${props => props.height && '149px'};
    max-width: ${props => 
    props.maxW 
        ? props.maxW 
        : '430px'
    };
    display: flex;
    flex-direction: ${props => 
        props.flexDir ? props.flexDir : 'row'
    };
    justify-content: ${props => 
        props.justifyContent && 'space-between'
    };
    box-sizing: border-box;
    /* border: 1px solid green; */
`;
export const FormSeparator = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
    /* align-items:center; */
    width: calc(100% / 2);
    /* border:1px solid green; */
`;
export const Img = styled.img`
    height: 200px;
    width: 100%;
    margin-bottom: 1rem;
    object-fit: cover;
`;