import React from 'react'
import styled from 'styled-components';

// redux
import { connect } from 'react-redux';

const ProfileWrapper = styled.div`
    /* background: ${props => props.theme.light.foreground}; */
    width: 100%;
    box-sizing: border-box;
    display:flex;
    flex-direction: column;
    align-items: center;
`;
const ProfileImage = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-sizing: border-box;
`;
const ProfileSeparator = styled.div`
    background: ${props => props.background ? props.theme.light.foreground : 'none'};
    width: 100%;
`;

const  SideProfile = ({ user }) => {
    return (
        <ProfileWrapper>
            <ProfileSeparator>
                <ProfileImage src={user.info.imageUrl}/>
            </ProfileSeparator>
            <ProfileSeparator background>
                {user.info.userHandle}
            </ProfileSeparator>
        </ProfileWrapper>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(SideProfile);