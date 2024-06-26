import React, { useState } from 'react';
import "./generatingButton.css";
import axios from "axios";
import Admin from "./admin";
import API_URL from "./config";

const Generate = ({ onReturnToAuth }) => {
    const [passwordLevel, setPasswordLevel] = useState("");
    const [characterCount, setCharacterCount] = useState("");
    const [generatedPassword, setGeneratedPassword] = useState("");
    const [showAdminPanel, setShowAdminPanel] = useState(false);
    const token = localStorage.getItem("token");

    const handlePasswordLevelChange = (e) => {
        setPasswordLevel(e.target.value);
    };

    const handleCharacterCountChange = (e) => {
        setCharacterCount(e.target.value);
    };

    const handleGeneratePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_URL}/api/password/generatePassword`,
                {
                    difficulty: passwordLevel,
                    length: characterCount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const generatedPassword = response.data;
            setGeneratedPassword(generatedPassword);
        } catch (error) {
            console.error(error);
        }
    };

    const handleReturnToAuth = () => {
        onReturnToAuth(false);
    };

    const handleShowAdminPanel = () => {
        setShowAdminPanel(true);
    };

    return (
        <div className="PasswordPage">
            {showAdminPanel ? (
                <Admin onReturnToAuth={onReturnToAuth} /> // Pass onReturnToAuth as a prop
            ) : (
                <>
                    <div className="exit" onClick={handleReturnToAuth}>
                        Вернуться к авторизации
                    </div>
                    <form onSubmit={handleGeneratePassword}>
                        <button className="button_to_generate" type="submit">
                            Сгенерировать пароль
                        </button>
                        <label>
                            Выберите уровень сложности пароля:
                            <select value={passwordLevel} onChange={handlePasswordLevelChange}>
                                <option value="">Выбор</option>
                                <option value="EASY">EASY</option>
                                <option value="NORMAL">NORMAL</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </label>
                        <label>
                            Введите количество символов (до 255):
                            <input type="text" value={characterCount} onChange={handleCharacterCountChange} />
                        </label>
                    </form>
                    <h1 className="genereativeH1">Ваш пароль: {generatedPassword}</h1>
                    <a className="admin" onClick={handleShowAdminPanel}>
                        Админ Панель
                    </a>
                </>
            )}
        </div>
    );
};

export default Generate;