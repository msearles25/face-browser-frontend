import React, { useState, useRef } from 'react'
import styled from 'styled-components';
import dayjs from 'dayjs';

// redux
import { connect } from 'react-redux';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faLink, faEdit } from '@fortawesome/free-solid-svg-icons';

import { editUserDetails, getUserInfo } from '../redux/actions/userActions';

const ProfileWrapper = styled.div`
    /* background: ${props => props.theme.light.foreground}; */
    width: 100%;
    box-sizing: border-box;
    display:flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid green; */
`;
const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 0 auto;
    box-sizing: border-box;
    object-fit: cover;
    box-shadow: 3px 3px 3px rgba(0,0,0,.15);
`;
const ProfileSeparator = styled.div`
    background: ${props => props.background ? props.theme.light.foreground : 'none'};
    width: 200px;
    margin: ${props => props.margin};
    display:flex;
    flex-direction: column;
    align-items: ${props => props.alignCenter ? 'center' : 'none'};
    padding: 10px 20px;
    box-shadow: ${props => props.boxShadow 
        ? '3px 3px 3px rgba(0,0,0,.15)' 
        : 'none'
    };

`;
const UserHandle = styled.h3`
    color: ${props => props.theme.light.primary};
    display:flex;
    justify-content:space-between;
    align-items: center;
    padding: 0 0 5px 0;
    span {
        color: ${props => props.theme.light.fadedColor};
        font-size: 0.8rem;
        margin-left: 20px;
    }
`;
const Body = styled.p`
    word-wrap: break-word;
`;
const InfoWrapper = styled.div`
    display:flex;
    /* justify-content:center; */
    padding: 3px 0;
    svg{
        margin-right: 10px;
        color: ${props => props.theme.light.primary}
    }
`;

const  SideProfile = ({ user, ...props }) => {
    const [imgInfo, setImgInfo] = useState({
        imgSrc: null,
        imgFile: null
    });
    const imageSelectHandler = useRef(null);
    // handles the users uploaded image
    const handleImageUpload = e => {
        if(e.target.files.length === 0) {
            e.target.files = imgInfo.imgFile;
            return;
        }


        if(e.target.files[0].type === 'image/jpg' 
          || e.target.files[0].type === 'image/jpeg' 
          || e.target.files[0].type === 'image/png') {

            const file = e.target.files
            const imgUrl = URL.createObjectURL(e.target.files[0]);
            setImgInfo({ 
                imgSrc: imgUrl, 
                imgFile: file
            });
            return;
        }
        return;
        
    }

    const handleSubmit = async () => {
        props.editUserDetails(imgInfo);
        props.getUserInfo();
    }
    return (
        !user.loadingUser ? (user.authed ? (
            <ProfileWrapper>
                <ProfileSeparator alignCenter>
                    <ProfileImage src={user.info.imageUrl}/>
                    <form onSubmit={handleSubmit}>

                        <input 
                            type='file' 
                            onChange={handleImageUpload}
                            ref={imageSelectHandler}
                            hidden='hidden'
                        />
                        <FontAwesomeIcon icon={faEdit} 
                            onClick={() => {
                                imageSelectHandler.current.click();
                            }}
                        />
                        <button type='submit'>submit</button>
                    </form>
                </ProfileSeparator>
                <ProfileSeparator 
                    background 
                    margin='0.3rem 0 0 0'
                    boxShadow
                >
                    <UserHandle>
                        @{user.info.userHandle}
                        <span>{dayjs(user.info.joinedOn).format('MMM YYYY')}</span>
                    </UserHandle>
                    {user.info.location && 
                        <InfoWrapper>
                            <FontAwesomeIcon icon={faLocationArrow}/>
                            <Body>
                                {user.info.location}
                            </Body>
                        </InfoWrapper>
                    }
                    {user.info.site && 
                        <InfoWrapper>
                            <FontAwesomeIcon icon={faLink}/>
                            <Body>
                                {user.info.site}
                            </Body>
                        </InfoWrapper>
                    }
                    {user.info.bio && 
                        <InfoWrapper>
                            <Body>
                                {user.info.bio}
                            </Body>
                        </InfoWrapper>
                    }
                </ProfileSeparator>
            </ProfileWrapper>
        ) 
        :(<p>login to see profile..</p>)) : (<p>loading...</p>)
        
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { editUserDetails, getUserInfo })(SideProfile);