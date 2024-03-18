import React from 'react';
import '../../css/ErrorPage/errorPage.css';

const ErrorPage = ({ errorMessage }) => {
    return (
        <div className="error-page">
            <h1>Something went wrong</h1>
            <p>{errorMessage}</p>
        </div>
    );
};

export default ErrorPage;
