import React, { useEffect, useState } from 'react';
import axios from 'axios';

// components
import PostsCard from '../components/PostsCard';
import StaticProfile from '../components/StaticProfile';
import { MainWrapper, ContentWrapper, Separator } from '../style/elements';


const User = ({ match }) => {
    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        const info = async () => {
            try {
                const response = await axios.get(`https://face-browser.herokuapp.com/api/user/${match.params.userHandle}`);
                setUserInfo(response.data);
            }
            catch(error) {
                console.log(error)
            }

        }
        info();
    }, [match.params.userHandle])
    return (
        <div>
            {/* // <p key={post.id}>{post.postContent}</p> */}
            <MainWrapper
                flex 
                flexDir='column' 
                alignFlex='center'
            >
                <ContentWrapper>
                    <Separator marginRight='60'>
                    {userInfo.posts && userInfo.posts.map(post => (
                        <PostsCard key={post.postId} post={post}/>
                    ))}
                    </Separator>
                    <Separator small padding='0 0 0 1rem'>
                        <StaticProfile user={userInfo}/>
                    </Separator>
                </ContentWrapper>
            </MainWrapper>
        </div>
    )
}

export default User;