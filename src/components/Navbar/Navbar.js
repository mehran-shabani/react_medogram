import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NavbarContainer = styled(motion.nav)`
    background: rgba(255, 255, 255, 0.95);
    color: #333;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: static;
    height: 21px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
`;

const Brand = styled(motion.h1)`
    font-size: 1.8rem;
    margin: 0;
    cursor: pointer;
    display: flex;
    align-items: baseline;

    span:first-child {
        color: #333;
        font-weight: 800;
    }

    span:last-child {
        color: #3498db;
        font-weight: 300;
    }
`;

const MenuIcon = styled(motion.button)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1002;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ isOpen }) => isOpen ? '#3498db' : '#333'};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ isOpen }) => isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
      transform: ${({ isOpen }) => isOpen ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const NavLinks = styled(motion.div)`
    display: flex;
    align-items: center;
    gap: 2rem;

    @media (max-width: 1024px) {
        flex-direction: column;
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 300px;
        background-color: rgba(255, 255, 255, 0.98);
        padding: 5rem 2rem;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
        z-index: 1001;
    }
`;

const NavItem = styled(motion.div)`
    position: relative;
`;

const NavLinkTitle = styled(motion.button)`
    color: #333;
    text-decoration: none;
    font-size: 1rem;
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
        color: #3498db;
    }

    @media (max-width: 1024px) {
        font-size: 1.2rem;
        padding: 1rem 0;
    }
`;

const SubNav = styled(motion.ul)`
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 0;
    min-width: 200px;
    z-index: 1002;
    border-radius: 4px;
    list-style: none;

    @media (max-width: 1024px) {
        position: static;
        box-shadow: none;
        background-color: transparent;
        padding-left: 1rem;
    }
`;

const SubNavItem = styled(motion.li)`
    padding: 0.5rem 1rem;

    a {
        color: #333;
        text-decoration: none;
        display: block;
        transition: color 0.3s ease;
        font-size: 0.9rem;

        &:hover {
            color: #3498db;
        }
    }
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

    useEffect(() => {
        let timeoutId = null;
        const threshold = 10; // تنظیم آستانه برای حساسیت اسکرول

        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                // فقط اگر اسکرول بیشتر از مقدار آستانه باشد، ناوبار را مخفی کن
                if (window.scrollY - lastScrollY > threshold) {
                    setIsVisible(false);
                } else if (lastScrollY - window.scrollY > threshold) {
                    setIsVisible(true);
                }
                setLastScrollY(window.scrollY);
            }
        };

        const debounceScroll = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(controlNavbar, 50); // اضافه کردن debounce با تأخیر 50 میلی‌ثانیه
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', debounceScroll);
            return () => {
                window.removeEventListener('scroll', debounceScroll);
            };
        }
    }, [lastScrollY]);


    return (
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
                        isOpen={isOpen}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div />
                        <div />
                        <div />
                    </MenuIcon>
                    <NavLinks
                        initial={false}
                        animate={{ x: isOpen ? 0 : '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {navItems.map((item, index) => (
                            <NavItem key={index}>
                                <NavLinkTitle
                                    onClick={() => toggleSubNav(index)}
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
            )}
        </AnimatePresence>
    );
};

export default Navbar;