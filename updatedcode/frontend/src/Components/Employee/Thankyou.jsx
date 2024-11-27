import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
    const navigate = useNavigate();

    const handleBackToEmployee = () => {
        navigate("/employee");
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
            <h1 className="display-4 text-success mb-4">Thank You!</h1>
            <p className="text-muted mb-6">Your feedback has been successfully submitted.</p>
            <button
                onClick={handleBackToEmployee}
                className="btn btn-primary"
            >
                Back to Employee Page
            </button>
        </div>
    );
};

export default ThankYouPage;
