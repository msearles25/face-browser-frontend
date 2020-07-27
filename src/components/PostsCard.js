import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
    /* background: #fff; */
    height: 150px;
    width: 100%;
    margin-bottom: 1rem;  
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    /* border: 1px solid blue; */
`;
const CardContent = styled.div`
    position: relative;
    right: 0;
    height: 100%;
    width:80%;
    background: ${props => props.theme.light.foreground};
    border-bottom: 1px solid lightgray;
    box-shadow: .3rem .3rem 0.3rem .1rem rgba(0,0,0,.1);
    box-sizing: border-box;
    z-index: 2;
    &::after {
        content:'';
        position: absolute;
        border: 20px solid;
        border-color: ${props => props.theme.light.foreground} ${props => props.theme.light.foreground} transparent transparent;
        top: 60px;
        left: -25px;
        transform: rotate(15deg);
        z-index: -1;
    }
`;
const CardImg = styled.img`
    border-radius: 100%;
    height: 100px;
    width: 100px;
    position: absolute;
    
`;

const PostsCard = ({ post }) => {
    return (
        <CardWrapper>
            {/* <CardImg src={post.imageUrl}/> */}
            <CardContent>
                {post.userHandle} <br />
                {post.postContent} <br />
                {post.createdOn} <br />
            </CardContent>
        </CardWrapper>
    )
}

export default PostsCard;
