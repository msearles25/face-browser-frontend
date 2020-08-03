import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faLink } from '@fortawesome/free-solid-svg-icons';


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
    position: relative;
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
    width: 100%;
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

const StaticProfile = props => {
    return (
        <ProfileWrapper alignCenter>
            <ProfileSeparator>
                <ProfileImage src={props.user.imageUrl}/>
            </ProfileSeparator>
            <ProfileSeparator
                background 
                margin='0.3rem 0 0 0'
                boxShadow
            >
                <UserHandle>
                    @{props.user.userHandle}
                </UserHandle>
                {props.user.location && 
                    <InfoWrapper>
                        <FontAwesomeIcon icon={faLocationArrow}/>
                        <Body>
                            {props.user.location}
                        </Body>
                    </InfoWrapper>
                }
                {props.user.site && 
                    <InfoWrapper>
                        <FontAwesomeIcon icon={faLink}/>
                        <Body>
                            {props.user.site}
                        </Body>
                    </InfoWrapper>
                }
                {props.user.bio && 
                    <InfoWrapper>
                        <Body>
                            {props.user.bio}
                        </Body>
                    </InfoWrapper>
                }
            </ProfileSeparator>
        </ProfileWrapper>
    )
}

export default StaticProfile;