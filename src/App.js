import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import RegistrationForm from './components/Registration/RegistrationForm';

const PasswordGenerator = lazy(() => import('./components/PasswordGenerator/PasswordGenerator'));
const AdminPanel = lazy(() => import('./components/Admin/Admin'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/password" element={<PasswordGenerator />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
