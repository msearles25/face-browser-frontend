import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const NavWrapper = styled.div`
    background-image: ${({ theme }) => 
        `linear-gradient(to bottom, ${theme.light.secondary}, 98%, ${theme.light.primary})`
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

function Navbar() {
    return (
        <NavWrapper>
            <NavContainer>
                <NavItem to='/'>
                    Home
                </NavItem>
                <NavItem>
                    Notifications
                </NavItem>
                <NavItem>
                    Post
                </NavItem>
            </NavContainer>
        </NavWrapper>
    )
}

export default Navbar;
