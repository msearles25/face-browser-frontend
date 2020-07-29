import React from 'react'
import styled from 'styled-components';
import dayjs from 'dayjs';

// redux
import { connect } from 'react-redux';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow, faLink } from '@fortawesome/free-solid-svg-icons'


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
`;
const ProfileSeparator = styled.div`
    background: ${props => props.background ? props.theme.light.foreground : 'none'};
    width: 200px;
    margin: ${props => props.margin};
    display:flex;
    flex-direction: column;
    align-items: ${props => props.alignCenter ? 'center' : 'none'};
    padding: 10px 20px;
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

const  SideProfile = ({ user }) => {
    return (
        <ProfileWrapper>
            <ProfileSeparator alignCenter>
                <ProfileImage src={user.info.imageUrl}/>
            </ProfileSeparator>
            <ProfileSeparator 
                background 
                margin='0.3rem 0 0 0'
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
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(SideProfile);