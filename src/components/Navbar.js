import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { connect } from 'react-redux';

import NewPost from './NewPost';

const NavWrapper = styled.div`
    background-image: ${({ theme }) => 
        `linear-gradient(to bottom, ${theme.light.navBlend}, 85%, ${theme.light.primary})`
    };
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);
`;
const NavContainer = styled.div`
    height:65%;
    width: 300px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const NavItem = styled(Link)`
    color: ${({ theme }) => theme.light.textContrast};
    text-decoration: none;
`;

function Navbar({ user }) {

    return (
        <NavWrapper>
            <NavContainer>
                <NavItem to='/'>
                    Home
                </NavItem>
                {user.authed && 
                    <>
                        <NavItem>
                            Notifications
                        </NavItem>

                        <NewPost />
                    
                    </>
                }
                {!user.authed && 
                    <>    
                        <NavItem to='/login'>
                            Login
                        </NavItem>
                        <NavItem to='/register'>
                            Register
                        </NavItem>
                    </>
                }
            </NavContainer>
        </NavWrapper>
    )
}

const mapStateToProps = state =>({
    user: state.user
})

export default connect(mapStateToProps)(Navbar);
