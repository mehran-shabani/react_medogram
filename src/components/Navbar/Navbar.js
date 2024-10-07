import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const lightTheme = {
    background: 'rgba(255, 255, 255, 0.95)',
    text: '#333',
    primary: '#3498db',
    shadow: 'rgba(0, 0, 0, 0.1)',
};

const darkTheme = {
    background: 'rgba(30, 30, 30, 0.95)',
    text: '#f5f5f5',
    primary: '#4db6ff',
    shadow: 'rgba(0, 0, 0, 0.3)',
};

const NavbarContainer = styled(motion.nav)`
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    z-index: 1000;
    box-shadow: 0 2px 10px ${({ theme }) => theme.shadow};
    backdrop-filter: blur(5px);
`;

const Brand = styled(motion.h1)`
    font-size: 1.8rem;
    margin: 0;
    cursor: pointer;
    display: flex;
    align-items: baseline;

    span:first-child {
        color: ${({ theme }) => theme.text};
        font-weight: 800;
    }

    span:last-child {
        color: ${({ theme }) => theme.primary};
        font-weight: 300;
    }
`;

const MenuIcon = styled(motion.button)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1002;

    &:focus {
        outline: none;
    }
`;

const MenuIconSVG = styled.svg`
    width: 24px;
    height: 24px;
`;

const NavLinks = styled(motion.div)`
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    background-color: ${({ theme }) => theme.background};
    padding: 5rem 2rem;
    box-shadow: -2px 0 10px ${({ theme }) => theme.shadow};
    z-index: 1001;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const NavItem = styled(motion.div)`
    position: relative;
`;

const NavLinkTitle = styled(motion.button)`
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.3s ease;
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;

    &:hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const SubNav = styled(motion.ul)`
    padding: 0.5rem 0 0.5rem 1rem;
    list-style: none;
`;

const SubNavItem = styled(motion.li)`
    padding: 0.5rem 1rem;

    a {
        color: ${({ theme }) => theme.text};
        text-decoration: none;
        display: block;
        transition: color 0.3s ease;
        font-size: 1rem;

        &:hover {
            color: ${({ theme }) => theme.primary};
        }
    }
`;

const ThemeToggle = styled(motion.button)`
    background: none;
    border: none;
    color: ${({ theme }) => theme.text};
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const navItems = [
    {
        title: 'Profile',
        subItems: [
            { title: 'خانه', link: '/' },
            { title: 'ورود', link: '/login' },
            { title: 'پروفایل', link: '/profile' },
            { title: 'DocAI', link: '/chat' },
        ],
    },
    {
        title: 'Management',
        subItems: [
            { title: 'انجام ویزیت!', link: '/visits' },
            { title: ' پرداخت', link: '/payment-visit' },
            { title: ' ویزیت های شما', link: '/user-visits' },
            { title: 'وبلاگ', link: '/blogs' },
        ],
    },
    {
        title: 'About Us',
        subItems: [
            { title: 'درباره ما', link: '/about' },
            { title: ' تماس با ما', link: '/contact' },
            { title: 'خدمات ما', link: '/excluded-services' },
        ],
    },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubNav, setOpenSubNav] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setOpenSubNav(null);
    };

    const toggleSubNav = (index) => {
        setOpenSubNav(openSubNav === index ? null : index);
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

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                const currentScrollY = window.scrollY;
                if (currentScrollY - lastScrollY > 10) {
                    setIsVisible(false);
                } else if (lastScrollY - currentScrollY > 10) {
                    setIsVisible(true);
                }
                setLastScrollY(currentScrollY);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <AnimatePresence>
                {isVisible && (
                    <NavbarContainer
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
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
                            <MenuIconSVG
                                viewBox="0 0 100 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="20" y="30" width="60" height="8" rx="4" fill="currentColor" />
                                <rect x="20" y="46" width="60" height="8" rx="4" fill="currentColor"/>
                                <rect x="20" y="62" width="60" height="8" rx="4" fill="currentColor"/>
                            </MenuIconSVG>
                        </MenuIcon>
                    </NavbarContainer>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isOpen && (
                    <NavLinks
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {navItems.map((item, index) => (
                            <NavItem key={index}>
                                <NavLinkTitle
                                    onClick={() => toggleSubNav(index)}
                                    whileHover={{ color: isDarkMode ? darkTheme.primary : lightTheme.primary }}
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
                        <ThemeToggle onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            {isDarkMode ? '🌞' : '🌙'}
                        </ThemeToggle>
                    </NavLinks>
                )}
            </AnimatePresence>
        </ThemeProvider>
    );
};

export default Navbar;