import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
    background: #fff;
    width: 50%;
    height: 150px;
    border-bottom: 1px solid lightgray;
    box-shadow: .1rem .2rem .2rem rgba(0,0,0,.1);
`;

const PostsCard = ({ children }) => {
    return (
        <CardWrapper>
            {children}
        </CardWrapper>
    )
}

export default PostsCard;
