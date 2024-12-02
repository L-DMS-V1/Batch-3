import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitFeedback } from "../Api";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert2

const GiveFeedback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { courseId, employeeId } = location.state || {};

    const [formData, setFormData] = useState({
        employeeId: employeeId || null,
        courseId: courseId || null,
        rating: 0,
        feedBackEnum: "",
        comment: "",
    });

    const [hoverRating, setHoverRating] = useState(0);
    const [error, setError] = useState("");

    const handleRatingChange = (rating) => {
        setFormData({ ...formData, rating });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.rating || !formData.feedBackEnum || !formData.comment) {
            setError("All fields are required.");
            return;
        }

        try {
            setError("");
            const response = await submitFeedback(formData);
            console.log("Feedback submitted successfully:", response);
            
            // Show SweetAlert2 confirmation
            Swal.fire({
                title: 'Success!',
                text: 'Your feedback has been successfully submitted.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Redirect to the Thank You page after the alert is closed
                navigate("/thankyou");
            });
        } catch (err) {
            console.error("Error submitting feedback:", err);
            setError("Failed to submit feedback. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Give Feedback</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                {/* Star Rating */}
                                <div className="mb-4 text-center">
                                    <label className="form-label">Rating</label>
                                    <div className="d-flex justify-content-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                size={30}
                                                color={
                                                    star <= (hoverRating || formData.rating)
                                                        ? "#ffc107"
                                                        : "#e4e5e9"
                                                }
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                onClick={() => handleRatingChange(star)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {/* Feedback Enum */}
                                <div className="mb-3">
                                    <label className="form-label">Feedback</label>
                                    <select
                                        name="feedBackEnum"
                                        value={formData.feedBackEnum}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">Select Feedback</option>
                                        <option value="GOOD">GOOD</option>
                                        <option value="BETTER">BETTER</option>
                                        <option value="AVERAGE">AVERAGE</option>
                                        <option value="BAD">BAD</option>
                                        <option value="WORST">WORST</option>
                                    </select>
                                </div>
                                {/* Comment */}
                                <div className="mb-3">
                                    <label className="form-label">Comment</label>
                                    <textarea
                                        name="comment"
                                        value={formData.comment}
                                        onChange={handleChange}
                                        className="form-control"
                                        rows="4"
                                        placeholder="Enter your comment"
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Submit Feedback
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiveFeedback;
