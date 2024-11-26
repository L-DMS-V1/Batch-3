import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Feedback = ({ onSubmit }) => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(5); // Default rating

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleRatingChange = (e) => {
        setRating(Number(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (feedback.trim() === '') {
            alert('Feedback cannot be empty');
            return;
        }
        onSubmit({ feedback, rating });
        setFeedback('');
        setRating(5); // Reset to default rating
    };

    return (
        <div className="feedback-form">
            <h2>Submit Your Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="feedback">Feedback:</label>
                    <textarea
                        id="feedback"
                        value={feedback}
                        onChange={handleFeedbackChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <select id="rating" value={rating} onChange={handleRatingChange}>
                        {[1, 2, 3, 4, 5].map((rate) => (
                            <option key={rate} value={rate}>
                                {rate}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

Feedback.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Feedback;