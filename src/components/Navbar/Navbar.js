import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { devices } from "../../styles/media";

const NavbarContainer = styled.nav`
    background: linear-gradient(90deg, #0056b3, #00c6ff);
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
        color: #003d80;
        font-weight: bold;
    }

    span:last-child {
        color: white;
        font-weight: normal;
    }
`;

const MenuIcon = styled.button`
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: rotate(90deg);
    }

    @media ${devices.mobileS} {
        display: block;
    }
`;

const NavOverlay = styled.div`
    display: none;

    @media ${devices.desktop} {
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
    }
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
        padding: 2rem 1rem;
        transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
        transition: transform 0.3s ease-in-out;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        overflow-y: auto;
    }
`;

const NavItem = styled.li`
    position: relative;
`;

const NavLinkTitle = styled.a`
    color: white;
    text-decoration: none;
    font-size: 1rem;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: #003d80;
    }

    @media ${devices.mobileS} {
        color: #007bff;
        font-size: 1.2rem;
        display: block;
        padding: 0.5rem 0;
    }
`;

const SubNav = styled.ul`
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 0;
    min-width: 150px;
    z-index: 1;

    ${NavItem}:hover & {
        display: block;
    }

    @media ${devices.mobileS} {
        position: static;
        box-shadow: none;
        display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
        padding-left: 1rem;
    }
`;

const SubNavItem = styled.li`
    padding: 0.25rem 1rem;

    a {
        color: #007bff;
        text-decoration: none;
        display: block;
        transition: color 0.3s ease;

        &:hover {
            color: #0056b3;
        }
    }
`;

const CloseButton = styled.button`
    display: none;
    
    @media ${devices.mobileS} {
        display: block;
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #007bff;
        cursor: pointer;
    }
`;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubNav, setOpenSubNav] = useState(null);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setOpenSubNav(null);
    };

    const toggleSubNav = (index) => {
        if (openSubNav === index) {
            setOpenSubNav(null);
        } else {
            setOpenSubNav(index);
        }
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

    const navItems = [
        {
            title: 'Profile',
            subItems: [
                { title: 'Home', link: '/' },
                { title: 'Login', link: '/login' },
                { title: 'Your Visit', link: '/user-visits' },
                {tiltle: 'Blog', link:'blogs'}
            ],
        },
        {
            title: 'Management',
            subItems: [
                { title: 'Subscription', link: '/subscriptions' },
                { title: 'Do Visit!', link: '/visits' },
                { title: 'DocAI', link: '/chat' },
                { title: 'Profile', link: '/profile' },
            ],
        },
        {
            title: 'About Us',
            subItems: [
                { title: 'About Us', link: '/about' },
                { title: 'Contact Us', link: '/contact' },
            ],
        },
    ];

    return (
        <NavbarContainer>
            <Brand>
                <span>MED</span>
                <span>OGRAM</span>
            </Brand>
            <MenuIcon onClick={toggleMenu}>&#9776;</MenuIcon>
            <NavOverlay isOpen={isOpen} onClick={closeMenu} />
            <NavLinks isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeMenu}>&times;</CloseButton>
                {navItems.map((item, index) => (
                    <NavItem key={index}>
                        <NavLinkTitle
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleSubNav(index);
                            }}
                        >
                            {item.title}
                        </NavLinkTitle>
                        <SubNav isOpen={openSubNav === index}>
                            {item.subItems.map((subItem, subIndex) => (
                                <SubNavItem key={subIndex}>
                                    <Link to={subItem.link} onClick={closeMenu}>{subItem.title}</Link>
                                </SubNavItem>
                            ))}
                        </SubNav>
                    </NavItem>
                ))}
            </NavLinks>
        </NavbarContainer>
    );
};

export default Navbar;