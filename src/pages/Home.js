import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// components
import PostsCard from '../components/PostsCard';

const MainWrapper = styled.div`
    position: relative;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border: 2px solid green; */
`;
const ContentWrapper = styled.div`
    height: 100%;
    width: 60%;
    margin-top: 1rem;
    /* border: 1px solid red; */
`;

const Home = () => {
    const [info, setInfo] = useState();

    useEffect(() => {
        axios.get('http://localhost:1337/api/post/')
        .then(res => {
            setInfo(res.data)
        })
    }, [])

    return (
        <MainWrapper>
            <ContentWrapper>
                {info && info.map(post => (
                    <PostsCard key={post.postId}>
                        {post.postContent}
                    </PostsCard>
                ))}
            </ContentWrapper>
        </MainWrapper>
    )
}

export default Home;