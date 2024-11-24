import React from 'react';
import './styles.css';

const feedbackData = [
  { id: 1, feedback: "Great experience!", rating: 5, submittedBy: "User1" },
  { id: 2, feedback: "Could be improved", rating: 3, submittedBy: "User2" },
  { id: 3, feedback: "Very satisfied", rating: 4, submittedBy: "User3" },
  // Add more rows as needed
];

function FeedbackTable() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>Feedback</th>
            <th>Rating</th>
            <th>Submitted By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.feedback}</td>
              <td>
                {"★".repeat(row.rating) + "☆".repeat(5 - row.rating)}
              </td>
              <td>{row.submittedBy}</td>
              <td>
                <button className="reply-button">Reply</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeedbackTable;
