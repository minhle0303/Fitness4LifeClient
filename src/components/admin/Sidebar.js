import React, { useEffect, useState } from 'react';

const Sidebar = () => {
    const initialIndex = parseInt(localStorage.getItem('activeIndex')) || 0;
    const [activeIndex, setActiveIndex] = useState(initialIndex);

    const menuItems = [
        { label: 'Dashboard', icon: 'bxs-dashboard', path: '/admin/dashboard' },
        { label: 'Shop', icon: 'bx-store-alt', path: '/admin/home' },
        { label: 'Analytics', icon: 'bx-analyse', path: '/admin/home' },
        { label: 'Tickets', icon: 'bx-message-square-dots', path: '/admin/home' },
        { label: 'Users', icon: 'bx-group', path: '/admin/home' },
        { label: 'Settings', icon: 'bx-cog', path: '/admin/home' }
        
    ];

    const handleSetActiveIndex = (index) => {
        setActiveIndex(index);
        localStorage.setItem('activeIndex', index);
    };

    useEffect(() => {
        const menuBar = document.querySelector('.content nav .bx.bx-menu');
        const sideBar = document.querySelector('.sidebar');
        const searchBtn = document.querySelector('.content nav form .form-input button');
        const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
        const searchForm = document.querySelector('.content nav form');
        const themeToggler = document.getElementById('theme-toggle');

        if (menuBar) {
            menuBar.addEventListener('click', () => {
                sideBar.classList.toggle('close');
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', function (e) {
                if (window.innerWidth < 576) {
                    e.preventDefault();
                    searchForm.classList.toggle('show');
                    searchBtnIcon.classList.toggle('bx-x', searchForm.classList.contains('show'));
                    searchBtnIcon.classList.toggle('bx-search', !searchForm.classList.contains('show'));
                }
            });
        }

        const handleResize = () => {
            if (window.innerWidth < 768) {
                sideBar.classList.add('close');
            } else {
                sideBar.classList.remove('close');
            }
            if (window.innerWidth > 576) {
                if (searchBtnIcon && searchForm) {
                    searchBtnIcon.classList.replace('bx-x', 'bx-search');
                    searchForm.classList.remove('show');
                }
            }
        };

        window.addEventListener('resize', handleResize);

        if (themeToggler) {
            themeToggler.addEventListener('change', function () {
                document.body.classList.toggle('dark', this.checked);
            });
        }

        // Cleanup listeners on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            if (menuBar) menuBar.removeEventListener('click', () => {});
            if (searchBtn) searchBtn.removeEventListener('click', () => {});
            if (themeToggler) themeToggler.removeEventListener('change', () => {});
        };
    }, []);

    return (
        <div className="sidebar">
            <a href="#" className="logo">
                <i className="bx bx-code-alt"></i>
                <div className="logo-name"><span>Fitness4</span>Life</div>
            </a>
            <ul className="side-menu">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={index === activeIndex ? 'active' : ''}
                    >
                        <a href={item.path} onClick={() => handleSetActiveIndex(index)}>
                            <i className={`bx ${item.icon}`}></i>{item.label}
                        </a>
                    </li>
                ))}
            </ul>
            <ul className="side-menu">
                <li>
                    <a href="#" className="logout">
                        <i className="bx bx-log-out-circle"></i>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
