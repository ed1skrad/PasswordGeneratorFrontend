import React, { useState } from 'react';
import axios from "axios";

const Admin = ({ onReturnToAuth }) => {
    const [id, setId] = useState("");
    const [choice, setChoice] = useState("");
    const token = localStorage.getItem("token");

    const handleReturnToAuth = () => {
        onReturnToAuth(false);
    };

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handleChoiceChange = (e) => {
        setChoice(e.target.value);
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
                        </select>
                    </label>
                    <label>
                        Введите id:
                        <input type="text" value={id} onChange={handleIdChange} />
                    </label>
                </form>
            </div>
        </div>
    );
};

export default Admin;
