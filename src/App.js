import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import * as Components from "./Components";
import axios from "axios";
import Navbar from "./Navbar";
import "./generatingButton.css";
import Generate from "./generate";

function App() {
    const [signIn, toggle] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/auth/signup", {
                username: name,
                email,
                password,
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/auth/signin", {
                username,
                password,
            });

            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            setUsername(response.data.username);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUsername("");
        setIsAuthenticated(false);
    };

    const handleGeneratePassword = () => {
        setRedirect(true);
    };

    const handleReturnToAuth = (value) => {
        setRedirect(value);
    };

    return (
        <Router>
            {redirect ? (
                <Generate onReturnToAuth={handleReturnToAuth} />
            ) : (
                <>
                    <Navbar
                        username={username}
                        onLogout={handleLogout}
                        isAuthenticated={isAuthenticated}
                    />
                    <Components.Container>
                        <Components.SignUpContainer signinIn={signIn}>
                            <Components.Form onSubmit={handleSignUp}>
                                <Components.Title>Create Account</Components.Title>
                                <Components.Input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Components.Input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Components.Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Components.Button type="submit">Sign Up</Components.Button>
                            </Components.Form>
                        </Components.SignUpContainer>

                        <Components.SignInContainer signinIn={signIn}>
                            <Components.Form onSubmit={handleSignIn}>
                                <Components.Title>Sign in</Components.Title>
                                <Components.Input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Components.Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Components.Anchor href="#">Forgot your password?</Components.Anchor>
                                <Components.Button type="submit">Sign In</Components.Button>
                            </Components.Form>
                        </Components.SignInContainer>

                        <Components.OverlayContainer signinIn={signIn}>
                            <Components.Overlay signinIn={signIn}>
                                <Components.LeftOverlayPanel signinIn={signIn}>
                                    <Components.Title>Welcome Back!</Components.Title>
                                    <Components.Paragraph>
                                        To keep connected with us please login with your personal info
                                    </Components.Paragraph>
                                    <Components.GhostButton onClick={() => toggle(true)}>
                                        Sign In
                                    </Components.GhostButton>
                                </Components.LeftOverlayPanel>

                                <Components.RightOverlayPanel signinIn={signIn}>
                                    <Components.Title>Hello, Friend!</Components.Title>
                                    <Components.Paragraph>
                                        Enter Your personal details and start journey with us
                                    </Components.Paragraph>
                                    <Components.GhostButton onClick={() => toggle(false)}>
                                        Sign Up
                                    </Components.GhostButton>
                                </Components.RightOverlayPanel>
                            </Components.Overlay>
                        </Components.OverlayContainer>
                    </Components.Container>
                    <div className="container_to_but">
                        <button onClick={handleGeneratePassword} className="button_to_generate">
                            Сгенерировать пароль
                        </button>
                    </div>
                </>
            )}
        </Router>
    );
}

export default App;