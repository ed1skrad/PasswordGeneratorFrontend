import styled from 'styled-components';

export const NavbarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    z-index: 1000;
`;

export const LogoutButton = styled.button`
    background-color: transparent;
    border: none;
    color: #2e4a8a;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
`;

export const Username = styled.span`
    color: #333;
    font-size: 14px;
    font-weight: bold;
    margin-right: 16px;
`;
