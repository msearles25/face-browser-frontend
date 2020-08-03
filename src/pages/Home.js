import React, { useEffect } from 'react';
import styled from 'styled-components';

// components
import PostsCard from '../components/PostsCard';
import { MainWrapper } from '../style/elements';
import SideProfile from '../components/SideProfile';

// redux
import { connect } from 'react-redux';
import { getAllPosts } from '../redux/actions/dataActions';

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
        ? '23%' 
        : props.medium 
            ? '40%' 
            : '60%'
    };
    padding: ${props => props.padding};
    box-sizing: border-box;
    margin-right: ${props => `${props.marginRight}px`};
`;

const Home = ({ data, getAllPosts, ...props }) => {
    useEffect(() => {
    
        const allPosts = async () => {
            return await getAllPosts();
        }
        allPosts();
    }, [getAllPosts])

    return (
        <MainWrapper 
            flex 
            flexDir='column' 
            alignFlex='center'
        >
            <ContentWrapper>
                <Separator marginRight='60'>
                    {data.posts && data.posts.map(post => (  
                        <PostsCard key={post.postId} post={post}/>
                    ))}
                </Separator>
                <Separator small padding='0 0 0 1rem'>
                    <SideProfile history={props.history}/>
                </Separator>
            </ContentWrapper>
        </MainWrapper>
    )
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getAllPosts })(Home);