import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
    /* background: #fff; */
    position:relative;
    height: 130px;
    width: 100%;
    margin-bottom: 1rem;  
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    /* border: 1px solid blue; */
`;
const CardContent = styled.div`
    position: relative;
    /* z-index: 2; */
    right: 0;
    height: 100%;
    width:70%;
    max-width: 500px;
    background: ${props => props.theme.light.foreground};
    border-bottom: 1px solid lightgray;
    box-shadow: 3px 3px 3px rgba(0,0,0,.15);
    box-sizing: border-box;
    padding: 20px;
    &::after {
        content:'';
        z-index: -1;
        position: absolute;
        border: 15px solid;
        border-color: transparent  ${props => props.theme.light.foreground} ${props => props.theme.light.foreground} transparent;
        box-shadow: 3px 3px 3px rgba(0,0,0,.15);
        /* box-shadow: rgba(0, 0, 0, 0.3) 10px 2px 2px ; */
        top: 75px;
        left: -9px;
        transform: rotate(60deg);
    }
`;
const CardImg = styled.img`
    border-radius: 100%;
    height: 100px;
    width: 100px;
    position: absolute;
    top: 6%;
    left: -120px;
    box-shadow: .1rem .2rem 0.4rem .2rem rgba(0,0,0,.15);
`;

const PostsCard = ({ post }) => {
    return (
        <CardWrapper>
            <CardContent>
                <CardImg src={post.imageUrl}/>
                {post.userHandle} <br />
                {post.postContent} <br />
                {post.createdOn} <br />
            </CardContent>
        </CardWrapper>
    )
}

export default PostsCard;
