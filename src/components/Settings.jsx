import React, { useState } from 'react'

export default function Settings({onSettingsChange, onDarkModeChange, darkMode}) {
    
    const [menuOpen, setMenuOpen] = useState(false)

    const [difficulty, setDifficulty] = useState('any');
    const [type, setType] = useState('any');
    const [category, setCategory] = useState('any');
    const [amount, setAmount] = useState(10);

/* ========================= Functions and API creating ========================= */

    const handleAccept = () => {
        let apiUrl="https://opentdb.com/api.php?"
        
        apiUrl += `amount=${amount}`;
        
        if (category !== "any") apiUrl += `&category=${category}`;
        if (difficulty !== "any") apiUrl += `&difficulty=${difficulty}`;
        if (type !== "any") apiUrl += `&type=${type}`;
        
        setMenuOpen(!menuOpen)
        onSettingsChange(apiUrl)
    }
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const handleDarkModeChange = () => {
        onDarkModeChange()
    }

    
/* ========================= Rendering Settings ========================= */
    
    const icon = menuOpen ? "./public/close-icon.png" : "./public/settings-icon.png";
    const stylingClass = menuOpen ? "settings-icon fixed" : "settings-icon";
    const iconClass = darkMode ? "icon dark-icon" : "icon";
    const containerClass = darkMode ? `${stylingClass} dark-mode` : stylingClass;

    return (
    <div className={"settings"}>

        <div className={containerClass} onClick={toggleMenu}>
            <img src={icon} className={iconClass} />
        </div>

        {menuOpen && (
        <div className={darkMode ? "settings-menu dark-mode" : "settings-menu"}>
            <div className='dark-mode-switch-container'>
                <label>Dark Mode:</label>
                <div className="toggle-group">
                <input
                    type="checkbox"
                    id="darkMode"
                    className="switch"
                    checked={darkMode}
                    onChange={handleDarkModeChange}
                />
                <label id="label" htmlFor="switch" className={darkMode ? "label dark-label" : "label"}>
                    <i className="fas fa-moon"></i>
                    <i className="fas fa-sun"></i>
                    <div className="ball"></div>
                </label>
                </div>
            </div>
            <div className='selects-container'>
                <div className="select-group">
                    <label>Difficulty</label>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="any">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="select-group">
                    <label>Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="any">Any Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                    </select>
                </div>
                <div className="select-group">
                    <label>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="any">Any Category</option>
                        <option value="11">Film</option>
                        <option value="12">Music</option>
                        <option value="15">Video Games</option>
                        <option value="26">Celebrities</option>
                        <option value="22">Geography</option>
                    </select>
                </div>
                <div className="select-group">
                    <label>Number of questions</label>
                    <select value={amount} onChange={(e) => setAmount(e.target.value)}>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                    </select>
                </div>
            </div>
            <button className='settings-btn' onClick={handleAccept}>
                Accept
            </button>
        </div>
        )}

        {!menuOpen && (
            <div className={`settings-menu ${darkMode ? "dark-mode" : ""} slide-out`}>
            </div>
        )}
    </div>
    )
}