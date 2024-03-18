import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../css/PasswordGenerator/passwordGenerator.css';
import API_URL from "../../config/config";
import ErrorPage from "../Error/ErrorPage";
import { useNavigate } from 'react-router-dom';
import useAuth from '../Admin/useAuth';

const PasswordGenerator = () => {
    const [difficulty, setDifficulty] = useState('EASY');
    const [length, setLength] = useState(8);
    const [password, setPassword] = useState('');
    const buttonRef = useRef(null);
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated ) {
        return <ErrorPage errorMessage="You do not have permission to access this page." />;
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        buttonRef.current.style.animationPlayState = 'paused';

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.post(`${API_URL}/api/password/generatePassword`, {
                difficulty,
                length,
            }, config);

            setPassword(response.data);
        } catch (error) {
            console.error('Failed to generate password: ', error);
            setError('You do not have permission to access this page.');
        }
    };

    const handleLengthChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 0 && value <= 255) {
            setLength(value);
        }
    };

    const copyPasswordToClipboard = (event) => {
        navigator.clipboard.writeText(password);
        event.preventDefault();
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000)
    };

    if (error) {
        return <ErrorPage errorMessage={error} />;
    }

    return (
        <div className="password-generator">
            <div className="user-container">
                <span>Current User: {localStorage.getItem('username')}</span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Difficulty:
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="EASY">EASY</option>
                        <option value="NORMAL">NORMAL</option>
                        <option value="HARD">HARD</option>
                    </select>
                </label>
                <br/>
                <label>
                    Length:
                    <input type="number" value={length} onChange={handleLengthChange}/>
                </label>
                <br/>
                <button type="submit" className={"generate-button"} ref={buttonRef}>Generate Password</button>
            </form>
            {showAlert && (
                <div className={"alert"}>
                    <p>Copied to clipboard!</p>
                </div>
            )}
            {password && (
                <div className="password-generator-button" onClick={copyPasswordToClipboard}>
                    {password}
                </div>
            )}
        </div>
    );
};

export default PasswordGenerator;
