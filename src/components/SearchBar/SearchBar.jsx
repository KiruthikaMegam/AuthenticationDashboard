import React from "react";

import "./SearchBar.css";

function SearchBar({
    value = "",
    onChange,
    placeholder = "Search..."
}) {
    const handleChange = (event) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    const handleClear = () => {
        if (onChange) {
            onChange("");
        }
    };

    return (
        <div className="search-bar">
            <span className="search-bar-icon">
                ⌕
            </span>

            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                aria-label="Search"
            />

            {value && (
                <button
                    type="button"
                    className="search-bar-clear"
                    onClick={handleClear}
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}
        </div>
    );
}

export default SearchBar;