import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
    position: relative;
    background: #fff;
    width: 100%;
    height: 150px;
    border-bottom: 1px solid lightgray;
    box-shadow: .1rem .1rem .3rem .1rem rgba(0,0,0,.1);
    box-sizing: border-box;
    margin-bottom: 1rem;
`;

const PostsCard = ({ post }) => {
    return (
        <CardWrapper>
            {post.userHandle} <br />
            {post.postContent} <br />
            {post.createdOn} <br />
        </CardWrapper>
    )
}

export default PostsCard;
