import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../public/image/share.svg';
import Logo from '../public/image/logo.png';
import '../style/Header.scss';

const Header = () => {
    const menuData = [
        {
            label: "Menu",
            submenu: [
                {
                    label: "Sub Menu a",
                    url: "/"
                },
                {
                    label: "Sub Menu b",
                    url: "/"
                }
            ]
        },
        {
            label: "Contact",
            url: "/contact"
        }
    ];

    const [openDropdown, setOpenDropdown] = useState(null);
    const handleDropdownClick = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <header>
            <nav>
                <Link to={'/'}>
                    <img src={Logo} width={200} className='logo' alt='logo' />
                </Link>
                <ul className="nav-menu">
                    {menuData.map((menu, index) => (
                        <li key={index} className='nav-item'>
                            {menu.submenu ? (
                                <>
                                    <button
                                        className="nav-link"
                                        onClick={() => handleDropdownClick(index)}
                                    >
                                        {menu.label}
                                    </button>
                                    {openDropdown === index && (
                                        <ul className='dropdown-menu'>
                                            {menu.submenu.map((subMenu, subMenuIndex) => (
                                                <li key={subMenuIndex}>
                                                    <NavLink
                                                        to={subMenu.url}
                                                        className="dropdown-link"
                                                        activeclassname="active-link"
                                                        onClick={() => setOpenDropdown(null)}
                                                    >
                                                        {subMenu.label}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <NavLink
                                    to={menu.url}
                                    className="nav-link"
                                    activeclassname="active-link"
                                >
                                    {menu.label}
                                </NavLink>
                            )}
                        </li>
                    ))}
                    <li>
                        <button className='menu_button' onClick={() => { /* Add your onClick handler here */ }}>
                            <img src={Icon} alt='share' />
                            Share Link
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
