import React, { useState } from 'react';
import axios from "axios";
import API_URL from "./config";

const Admin = ({ onReturnToAuth }) => {
    const [id, setId] = useState("");
    const [passwordLevel, setPasswordLevel] = useState("");
    const [choice, setChoice] = useState("");
    const token = localStorage.getItem("token");
    const [allGeneric, setAllGeneric] = useState("");

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
                        `${API_URL}/api/users/delete/${id}`,
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
            case "Удалить пароль":
                try {
                    await axios.delete(
                        `${API_URL}/api/password/delete/${id}`,
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
                        `${API_URL}/api/password/id/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const password = response.data.password;
                    console.log(password);
                    alert(`Password for user with ID ${id}: ${password}`);
                } catch (error) {
                    console.error(error);
                }
                break;


            case "Генератор всех":
                try {
                    const response = await axios.get(
                        `${API_URL}/api/password/all`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const passwords = response.data;

                    let message = "Password for users:";
                    passwords.forEach((password) => {
                        const { id, password: userPassword } = password;
                        message += `\n\nid: ${id} password: ${userPassword} \n `;
                    });
                    setAllGeneric(message);
                } catch (error) {
                    console.error(error);
                }
                break;
            case "Генератор удаления":
                try {
                    await axios.delete(
                        `${API_URL}/api/password/delete/{passwordId}`,
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
                        `${API_URL}/api/password/user/${id}/passwords`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const passwords = response.data;

                    let password = "";
                    if (passwords.length > 0) {
                        password = passwords[0].password;
                    }

                    console.log(password);
                    alert(`Password for user: ${password}`);
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
                <h1>Админ панель</h1>

                <form onSubmit={handleSubmitData}>
                    <button className="button_to_generate" type="submit">
                        Реализовать
                    </button>
                    <label>
                        Выберите нужную функцию:
                        <select value={choice} onChange={handleChoiceChange}>
                            <option value="">Выбор</option>
                            <option value="Удалить пользователя">Удалить пользователя</option>
                            <option value="Удалить пароль">Удалить пароль</option>
                            <option value="Просмотор генератора">Просмотреть сгенерированный пароль по id</option>
                            <option value="Генератор всех">Просмотр всех сгенерированных паролей</option>
                            <option value="Генератор удаления">Удаляет сгенерированный пароль по id</option>
                            <option value="Просмотр всех по username">Список сгенерированных паролей по username
                            </option>
                        </select>
                    </label>
                    <label>
                        Введите id или username в зависимости от задачи:
                        <input type="text" value={id} onChange={handleIdChange}/>
                    </label>
                </form>
                <h1 className="genereativeH2">{allGeneric}</h1>
            </div>
        </div>
    );
};

export default Admin;