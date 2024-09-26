import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { devices } from "../../styles/media";
import { motion, AnimatePresence } from 'framer-motion';

const NavbarContainer = styled(motion.nav)`
    background: linear-gradient(90deg, #2c3e50, #3498db);
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Brand = styled(motion.h1)`
    font-size: 2rem;
    margin: 0;
    cursor: pointer;
    text-transform: uppercase;
    display: flex;
    align-items: baseline;

    span:first-child {
        color: #ecf0f1;
        font-weight: 800;
    }

    span:last-child {
        color: #3498db;
        font-weight: 300;
    }
`;

const MenuIcon = styled(motion.button)`
    display: flex;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;

    
`;

const NavOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 900;
`;

const NavLinks = styled(motion.ul)`
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    margin: 0;

    @media  {
        flex-direction: column;
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        width: 300px;
        background-color: #2c3e50;
        color: white;
        padding: 4rem 2rem;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        overflow-y: auto;
    }
`;

const NavItem = styled(motion.li)`
    position: relative;
`;

const NavLinkTitle = styled(motion.a)`
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: #3498db;
    }

    @media  {
        font-size: 1.3rem;
        
        padding: 1rem 0;
    }
`;

const SubNav = styled(motion.ul)`
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #34495e;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    padding: 0.5rem 0;
    min-width: 200px;
    z-index: 1;
    border-radius: 4px;

    @media  {
        position: static;
        box-shadow: none;
        background-color: transparent;
        padding-left: 1rem;
    }
`;

const SubNavItem = styled(motion.li)`
    padding: 0.5rem 1rem;

    a {
        color: white;
        text-decoration: none;
        display: block;
        transition: color 0.3s ease;
        font-size: 1rem;

        &:hover {
            color: #3498db;
        }
    }
`;

const CloseButton = styled(motion.button)`
    display: none;

    @media ${devices.laptop} {
        
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 2rem;
        color: white;
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
                {title: 'Blog', link:'/blogs'}
            ],
        },
        {
            title: 'Management',
            subItems: [
                { title: 'Payment Visit', link: '/payment-visit' },
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
        <NavbarContainer
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        >
            <Brand
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <span>MED</span>
                <span>OGRAM</span>
            </Brand>
            <MenuIcon
                onClick={toggleMenu}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                &#9776;
            </MenuIcon>
            <AnimatePresence>
                {isOpen && (
                    <NavOverlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMenu}
                    />
                )}
            </AnimatePresence>
            <NavLinks
                initial={false}
                animate={{ x: isOpen ? 0 : '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
            >
                <CloseButton
                    onClick={closeMenu}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    &times;
                </CloseButton>
                {navItems.map((item, index) => (
                    <NavItem key={index}>
                        <NavLinkTitle
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleSubNav(index);
                            }}
                            whileHover={{ color: '#3498db' }}
                        >
                            {item.title}
                        </NavLinkTitle>
                        <AnimatePresence>
                            {openSubNav === index && (
                                <SubNav
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {item.subItems.map((subItem, subIndex) => (
                                        <SubNavItem
                                            key={subIndex}
                                            whileHover={{ x: 5 }}
                                        >
                                            <Link to={subItem.link} onClick={closeMenu}>{subItem.title}</Link>
                                        </SubNavItem>
                                    ))}
                                </SubNav>
                            )}
                        </AnimatePresence>
                    </NavItem>
                ))}
            </NavLinks>
        </NavbarContainer>
    );
};

export default Navbar;