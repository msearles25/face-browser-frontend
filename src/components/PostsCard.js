import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// components
import DeletePost from './DeletePost';

// redux
import { connect } from 'react-redux';

const CardWrapper = styled.div`
    position:relative;
    min-height: 100px;
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
    width:70%;
    max-width: 500px;
    background: ${props => props.theme.light.foreground};
    border-bottom: 1px solid lightgray;
    box-shadow: 3px 3px 3px rgba(0,0,0,.15);
    box-sizing: border-box;
    padding: 10px;
    padding-top: 2px;
    word-wrap: break-word;
    border-radius: 5px;
    &::after {
        content:'';
        z-index: -1;
        position: absolute;
        border: 15px solid;
        border-color: transparent  ${props => props.theme.light.foreground} ${props => props.theme.light.foreground} transparent;
        box-shadow: 3px 3px 3px rgba(0,0,0,.15);
        top: 55px;
        left: -9px;
        transform: rotate(55deg);
    }
`;
const UserImage = styled.img`
    border-radius: 100%;
    height: 80px;
    width: 80px;
    position: absolute;
    top: 6%;
    left: -110px;
    box-shadow: .1rem .2rem 0.4rem .2rem rgba(0,0,0,.15);
    object-fit: cover;
`;
const InforWrapper = styled.div`
    display: flex;
`;
const UserHandle = styled.h5`
    color: ${props => props.theme.light.primary};
    font-size: 1.2rem;
    margin-top: 3px;
`;
const Date = styled.p`
    color: ${props => props.theme.light.fadedColor};
    font-size: .7rem;
    margin-top: 11px;
    margin-left: 9px;
`;
const BodyWrapper = styled.div`
    height: 100%;
`;
const Body = styled.p`
    margin-top: 10px; 
    width: 100%;
`;
const StyledLink = styled(Link)`
    text-decoration: none;
`;

const PostsCard = ({ user, post, deletePost }) => {
    dayjs.extend(relativeTime);
    return (
        <CardWrapper>
            <CardContent>
                <StyledLink to={`/${post.userHandle}`}>
                    <UserImage src={post.imageUrl}/>
                </StyledLink>
                <InforWrapper>
                    <StyledLink to={`/users/${post.userHandle}`}>
                        <UserHandle>
                            @{post.userHandle}
                        </UserHandle>
                    </StyledLink>
                    <Date>
                        {dayjs(post.createdOn).fromNow()}
                    </Date>
                    {post.userHandle === user.info.userHandle &&
                        // passing the postId down to the component
                        <DeletePost postId={post.postId}/>
                        // <button onClick={() => {
                        //     deletePost(post.postId)
                        // }}>delete</button>
                    }
                </InforWrapper>
                <BodyWrapper>
                    <Body>
                        {post.postContent}
                    </Body>
                </BodyWrapper>
            </CardContent>
          
        </CardWrapper>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(PostsCard);
