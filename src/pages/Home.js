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
    /* justify-content: center; */
    /* border: 2px solid green; */
`;
const ContentWrapper = styled.div`
    height: 100%;
    width: 75%;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    /* border: 1px solid red; */
`;
const Seperator = styled.div`
    /* border: 1px solid green; */
    width: ${props => props.small 
        ? '30%' 
        : props.medium 
            ? '40%' 
            : '60%'
    };
    padding: ${props => props.padding};
    box-sizing: border-box;
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
                <Seperator >
                    {info && info.map(post => (
                        <PostsCard key={post.postId} post={post}/>
                    ))}
                </Seperator>
                <Seperator medium padding='0 0 0 1rem'>
                    Profile coming soon...
                </Seperator>
            </ContentWrapper>
        </MainWrapper>
    )
}

export default Home;