import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// components
import PostsCard from '../components/PostsCard';

const MainWrapper = styled.div`
    position: relative;
    box-sizing: border-box;
    height: 100%;
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
            <h1>Home page</h1>
            {info && info.map(post => (
                <PostsCard key={post.id}>
                    <p>{post.postContent}</p>
                </PostsCard>
            ))}
        </MainWrapper>
    )
}

export default Home;
