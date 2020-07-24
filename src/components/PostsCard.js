import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
    background: #fff;
    width: 50%;
    height: 150px;
    border-bottom: 1px solid lightgray;
    box-shadow: .1rem .1rem .3rem .1rem rgba(0,0,0,.1);
    margin-bottom: 1rem;
`;

const PostsCard = ({ children }) => {
    return (
        <CardWrapper>
            {children}
        </CardWrapper>
    )
}

export default PostsCard;
