import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { devices } from "../../styles/media";

const NavbarContainer = styled.nav`
    background: linear-gradient(90deg, #0056b3, #00c6ff); // Darker Blue to Light Blue
    color: white;
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 1000;
`;

const Brand = styled.h1`
    font-size: 1.8rem;
    margin: 0;
    cursor: pointer;
    text-transform: uppercase;
    display: flex;
    align-items: baseline;

    span:first-child {
        color: #003d80; // Darker Blue
        font-weight: bold;
    }

    span:last-child {
        color: white;
        font-weight: normal;
    }
`;

const MenuIcon = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    display: none;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: rotate(90deg);
    }

    @media ${devices.mobileS} {
        display: block;
        margin-left: auto;
    }
`;

const NavOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    z-index: 900;
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    transition: opacity 0.3s ease-in-out;
`;

const NavLinks = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    margin: 0;

    @media ${devices.mobileS} {
        flex-direction: column;
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        width: 250px;
        background-color: white;
        color: #007bff;
        padding-top: 2rem;
        transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
        transition: transform 0.3s ease-in-out;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        padding: 1rem;
    }
`;

const NavCategory = styled.div`
    margin-bottom: 2rem;
    border-bottom: 1px solid #eaeaea; // Line between segments
    padding-bottom: 1rem;

    &:last-child {
        border-bottom: none; // Remove border from last category
    }
`;

const NavLinkTitle = styled.h2`
    font-size: 1.2rem;
    color: #003d80; // Darker Blue
    margin-bottom: 0.5rem;
    cursor: pointer;
`;
const SubNav = styled.ul`
    list-style: none;
    padding-left: 1rem;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    transition: max-height 0.3s ease-in-out;
`;

const SubNavLinkItem = styled.li`
    padding: 0.25rem 0;

    a {
        color: #007bff; // Primary Blue
        text-decoration: none;

        &:hover {
            color: #0056b3; // Dark Blue
        }
    }
`;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [managementOpen, setManagementOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setProfileOpen(false);
        setManagementOpen(false);
        setAboutOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('nav')) {
                closeMenu();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <>
            <NavbarContainer>
                <Brand>
                    <span>MED</span>
                    <span>OGRAM</span>
                </Brand>
                <MenuIcon onClick={toggleMenu}>
                    &#9776;
                </MenuIcon>
                <NavOverlay isOpen={isOpen} onClick={closeMenu} />
                <NavLinks isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
                    <NavCategory>
                        <NavLinkTitle onClick={() => setProfileOpen(!profileOpen)}>Profile</NavLinkTitle>
                        <SubNav isOpen={profileOpen}>
                            <SubNavLinkItem><Link to="/">Home</Link></SubNavLinkItem>
                            <SubNavLinkItem><Link to="/login">Login</Link></SubNavLinkItem>
                            <SubNavLinkItem><Link to="/user-visits">Your Visit</Link></SubNavLinkItem>
                        </SubNav>
                    </NavCategory>
                    <NavCategory>
                        <NavLinkTitle onClick={() => setManagementOpen(!managementOpen)}>Management</NavLinkTitle>
                        <SubNav isOpen={managementOpen}>
                            <SubNavLinkItem><Link to="/subscriptions">Subscription</Link></SubNavLinkItem>
                            <SubNavLinkItem><Link to="/visits">Do Visit!</Link></SubNavLinkItem>
                            <SubNavLinkItem><Link to="/chat">DocAI</Link></SubNavLinkItem>
                            <SubNavLinkItem><Link to="/profile">Profile</Link></SubNavLinkItem>

                        </SubNav>
                    </NavCategory>
                    <NavCategory>
                        <NavLinkTitle onClick={() => setAboutOpen(!aboutOpen)}>About Us</NavLinkTitle>
                        <SubNav isOpen={aboutOpen}>
                            <SubNavLinkItem><Link to="/about">About Us</Link></SubNavLinkItem>
                            <SubNavLinkItem><Link to="/contact">Contact Us</Link></SubNavLinkItem>
                        </SubNav>
                    </NavCategory>
                </NavLinks>
            </NavbarContainer>
        </>
    );
};

export default Navbar;
