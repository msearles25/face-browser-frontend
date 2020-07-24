import React, { useState } from 'react'
import axios from 'axios'

const Home = () => {
    const [info, setInfo] = useState()

    return (
        <div>
            <h1>Home page</h1>
            <button onClick={() => {
                axios.get('http://localhost:1337/api/post/')
                    .then(res => {
                        setInfo(res.data)
                    })
            }}>press for posts</button>
            {info && info.map(post => (
                <p key={post.id}>{post.postContent}</p>
                
            ))}
        </div>
    )
}

export default Home;
