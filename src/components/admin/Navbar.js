import React, { useState } from 'react';

const Navbar = ({ menuItems }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            const filtered = menuItems.filter((item) =>
                item.label.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredItems(filtered);
        } else {
            setFilteredItems([]);
        }
    };

    return (
        <nav>
            <i className="bx bx-menu"></i>
            <form action="#">
                <div className="form-input">
                    <input
                        type="search"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button className="search-btn" type="submit"><i className="bx bx-search"></i></button>
                </div>
                {filteredItems.length > 0 && (
                    <ul className="search-suggestions">
                        {filteredItems.map((item, index) => (
                            <li key={index}>
                                <a href={item.path}>{item.label}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </form>
            <input type="checkbox" id="theme-toggle" hidden />
            <label htmlFor="theme-toggle" className="theme-toggle"></label>
            <a href="#" className="notif">
                <i className="bx bx-bell"></i>
                <span className="count">12</span>
            </a>
            <a href="#" className="profile">
                <img src="././logo192.png" alt="Profile" />
            </a>
        </nav>
    );
};

export default Navbar;
