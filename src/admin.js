import React, { useState } from 'react';
import axios from "axios";

const Admin = ({ onReturnToAuth }) => {
    const [id, setId] = useState("");
    const [passwordLevel, setPasswordLevel] = useState("");
    const [choice, setChoice] = useState("");
    const token = localStorage.getItem("token");
    const [difficulty, setDifficulty] = useState("");

    const handleReturnToAuth = () => {
        onReturnToAuth(false);
    };

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handleChoiceChange = (e) => {
        setChoice(e.target.value);
    };

    const handlePasswordLevelChange = (e) => {
        setPasswordLevel(e.target.value);
    };

    const handleSubmitData = async (e) => {
        e.preventDefault();
        switch (choice) {
            case "Удалить пользователя":
                try {
                    await axios.delete(
                        `http://localhost:8080/api/users/delete/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    alert(`User with ID ${id} has been deleted.`);
                } catch (error) {
                    console.error(error);
                }
                break;
            case "Просмотреть пароль":
                try {
                    const response = await axios.get(
                        `http://localhost:8080/api/password/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const password = response.data;
                    alert(`Password for user with ID ${id}: ${password}`);
                } catch (error) {
                    console.error(error);
                }
                break;
            case "Удалить пароль":
                try {
                    await axios.delete(
                        `http://localhost:8080/api/password/delete/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    alert(`Password for user with ID ${id} has been deleted.`);

                } catch (error) {
                    console.error(error);
                }
                break;
            case "Просмотор генератора":
                try {
                    const response = await axios.get(
                        `http://localhost:8080/api/password/id/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const password = response.data;
                    alert(`Password for user with ID ${id}: ${password}`);
                } catch (error) {
                    console.error(error);
                }
                break;

            case "Генератор по сложности":
                try {
                    const response = await axios.get(
                        `http://localhost:8080/api/password/difficulty/${difficulty}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const password = response.data;
                    alert(`Password for user with difficulty ${difficulty}: ${password}`);
                } catch (error) {
                    console.error(error);
                }
                break;
            case "Генератор всех":
                try {
                    const response = await axios.get(
                        `http://localhost:8080/api/password/all`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const password = response.data;
                    alert(`Password for users: ${password}`);
                } catch (error) {
                    console.error(error);
                }
                break;
            case "Генератор удаления":
                try {
                    await axios.delete(
                        `http://localhost:8080/api/password/delete/{passwordId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    alert(`Password for user with ID ${id} has been deleted.`);

                } catch (error) {
                    console.error(error);
                }
                break;
            case "Просмотр всех по username":
                try {
                    const response = await axios.get(
                        `/api/password/user/${id}/passwords`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const password = response.data;
                    alert(`Password for users: ${password}`);
                } catch (error) {
                    console.error(error);
                }
                break;
            default:
                console.log("Неверные данные");
                break;
        }
    };

    return (
        <div>
            <div className="exit" onClick={handleReturnToAuth}>
                Вернуться к авторизации
            </div>
            <div className="AdminPanel">
                <h1>Административная панель</h1>

                <form onSubmit={handleSubmitData}>
                    <button className="button_to_generate" type="submit">
                        Реализовать
                    </button>
                    <label>
                        Выберите нужную функцию:
                        <select value={choice} onChange={handleChoiceChange}>
                            <option value="">Выбор</option>
                            <option value="Удалить пользователя">Удалить пользователя</option>
                            <option value="Просмотреть пароль">Просмотреть пароль</option>
                            <option value="Удалить пароль">Удалить пароль</option>
                            <option value="Просмотор генератора">Просмотреть сгенерированный пароль по id</option>
                            <option value="Генератор по сложности">Просмотреть сгенерированный пароль по эмоциям</option>
                            <option value="Генератор всех">Просмотр всех сгенерированных паролей</option>
                            <option value="Генератор удаления">Удаляет сгенерированный пароль по id</option>
                            <option value="Просмотр всех по username">Список сгенерированных паролей по username</option>
                        </select>
                    </label>
                    <label>
                        Введите id или username в зависимости от задачи:
                        <input type="text" value={id} onChange={handleIdChange} />
                    </label>
                    <label>
                        Введите уровень сложности пароля:
                    <select value={passwordLevel} onChange={handlePasswordLevelChange}>
                        <option value="">Выбор</option>
                        <option value="EASY">EASY</option>
                        <option value="NORMAL">NORMAL</option>
                        <option value="HARD">HARD</option>
                    </select>
                    </label>
                </form>
            </div>
        </div>
    );
};

export default Admin;