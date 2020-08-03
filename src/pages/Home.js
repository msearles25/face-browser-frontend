import React, { useEffect } from 'react';

// components
import PostsCard from '../components/PostsCard';
import { MainWrapper, ContentWrapper, Separator } from '../style/elements';
import SideProfile from '../components/SideProfile';

// redux
import { connect } from 'react-redux';
import { getAllPosts } from '../redux/actions/dataActions';

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