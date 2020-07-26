import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// components
import PostsCard from '../components/PostsCard';
import { MainWrapper } from '../style/elements';

const ContentWrapper = styled.div`
    height: 100%;
    width: 75%;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    /* border: 1px solid red; */
`;
const Separator = styled.div`
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
        <MainWrapper 
            flex 
            flexDir='column' 
            alignFlex='center'
        >
            <ContentWrapper>
                <Separator >
                    {info && info.map(post => (
                        <PostsCard key={post.postId} post={post}/>
                    ))}
                </Separator>
                <Separator medium padding='0 0 0 1rem'>
                    Profile coming soon...
                </Separator>
            </ContentWrapper>
        </MainWrapper>
    )
}

export default Home;