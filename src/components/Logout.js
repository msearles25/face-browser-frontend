import React from 'react';

// reduc
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// styled 
import styled from 'styled-components';

const LogoutContainer = styled.div`
    position: absolute;
    left: 40px;
    bottom: 10px;
    color: red;
`;

const Logout = ({ history, logoutUser }) => {
    return (
        <LogoutContainer onClick={() => {
            // localStorage.removeItem('token');
            logoutUser(history);
            // history.push('/login');
        }}>
            <FontAwesomeIcon icon={faSignOutAlt}/>
        </LogoutContainer>
    )
}

export default connect(null, { logoutUser })(Logout);