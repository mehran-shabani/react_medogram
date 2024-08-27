import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { devices } from "../../styles/media";

const NavbarContainer = styled.nav`
    background-color: #007bff; // Primary Blue
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 1000;
`;

const Brand = styled.h1`
    font-size: 1.5rem;
    color: white;
    margin: 0;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 2px;
    animation: glow 1.5s infinite alternate;

    @keyframes glow {
        from {
            text-shadow: 0 0 10px #80bdff, 0 0 20px #80bdff, 0 0 30px #80bdff; // Light Blue Glow
        }
        to {
            text-shadow: 0 0 20px #80bdff, 0 0 30px #80bdff, 0 0 40px #80bdff;
        }
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
    }
`;

const NavLinkCategory = styled.div`
    margin-bottom: 1rem;
    text-align: right;
`;

const NavLinkTitle = styled.h2`
    font-size: 1rem;
    color: #333;
    margin-bottom: 0.5rem;
`;

const NavLink = styled.li`
    padding: 0.5rem 1rem;
    text-align: right;
    transition: color 0.3s ease-in-out;

    a {
        color: #007bff; // Primary Blue
        text-decoration: none;
        font-size: 1rem;
        position: relative;
        transition: color 0.3s ease-in-out;

        &:hover {
            color: #0056b3; // Dark Blue
            text-decoration: underline;
        }

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 100%;
            height: 2px;
            background-color: #007bff; // Primary Blue
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s ease-in-out;
        }

        &:hover::after {
            transform: scaleX(1);
            transform-origin: left;
        }
    }
`;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
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
                <Brand>medogram</Brand>
                <MenuIcon onClick={toggleMenu}>
                    &#9776;
                </MenuIcon>
                <NavOverlay isOpen={isOpen} onClick={closeMenu} />
                <NavLinks isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
                    <NavLinkCategory>
                        <NavLinkTitle>حساب کاربری</NavLinkTitle>
                        <NavLink><Link to="/">خانه</Link></NavLink>
                        <NavLink><Link to="/login">ورود</Link></NavLink>
                        <NavLink><Link to="/user-visits">ویزیت‌های شما</Link></NavLink>
                    </NavLinkCategory>
                    <NavLinkCategory>
                        <NavLinkTitle>مدیریت</NavLinkTitle>
                        <NavLink><Link to="/subscriptions">اشتراک‌ها</Link></NavLink>
                        <NavLink><Link to="/visits">ویزیت‌ها</Link></NavLink>
                    </NavLinkCategory>
                    <NavLinkCategory>
                        <NavLinkTitle>درباره ما</NavLinkTitle>
                        <NavLink><Link to="/about">درباره ما</Link></NavLink>
                        <NavLink><Link to="/contact">تماس با ما</Link></NavLink>
                    </NavLinkCategory>
                </NavLinks>
            </NavbarContainer>
        </>
    );
};

export default Navbar;
