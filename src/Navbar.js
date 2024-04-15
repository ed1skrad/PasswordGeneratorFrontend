import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarContainer, LogoutButton, Username } from './Navbar.styled';

const Navbar = ({ username, onLogout, isAuthenticated }) => {
    return (
        <NavbarContainer>
            {isAuthenticated && (
                <>
                    <Username>{username}</Username>
                    <LogoutButton onClick={onLogout}>Logout</LogoutButton>
                </>
            )}
        </NavbarContainer>
    );
};

export default Navbar;
