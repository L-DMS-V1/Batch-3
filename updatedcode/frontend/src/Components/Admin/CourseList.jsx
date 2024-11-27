import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCourses, getCourse, getAllAssessments } from '../Api';
import Navbar from './AdminNavbar';

const CourseList = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const mockAllCourses = await getAllCourses();
        const mockAllAssessments = await getAllAssessments();
        setAllCourses(mockAllCourses);
        // Map assessments by courseId
        const assessmentMap = mockAllAssessments.data.reduce((acc, assessment) => {
          acc[assessment.course.courseId] = assessment;
          return acc;
        }, {});
        setAssessments(assessmentMap);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleBack = () => {
    navigator('/admin');
  };

  const handleAddCourse = () => {
    navigator('/addcourse');
  };

  const handleCreateCourse = () => {
    navigator('/createCourse');  // Remove the unnecessary requestData
  };

  const handleEditCourse = async (course) => {
    try {
      navigator('/editCourse', { state: { course } }); // Pass data to the route
    } catch (error) {
      console.error('Failed to fetch course details:', error);
    }
  };

  const handleAddLearners = (course) => {
    try {
      navigator('/courseassign', { state: { course } }); // Pass data to the route
    } catch (error) {
      console.error('Failed to fetch course details:', error);
    }
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
  };

  const closeCard = () => {
    setSelectedCourse(null);
  };

  const handleassessment = (course, assessmentExists) => {
    if (assessmentExists) {
      // Redirect to Update Assessment page with assessment details
      const assessmentDetails = assessments[course.courseId]; // Retrieve assessment details for the course
      navigator('/updateassessment', {
        state: { assessmentDetails }, // Passing details via state
      });
    } else {
      // Redirect to Create Assessment page
      navigator('/createassessment',{ state: { course } }); // Passing course data
    }
  };

  return (
    <div className="d-flex">
      {/* Navbar (Sidebar) */}
      <div
        className="d-flex flex-column bg-dark text-white"
        style={{
          width: '250px',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      >
        <Navbar />
      </div>

      {/* Course List (Main Content) */}
      <div
        className="flex-grow-1 bg-light p-4"
        style={{
          marginLeft: '250px',
          overflowY: 'auto',
          height: '100vh',
        }}
      >
        {/* Back and Add Course Buttons */}
      

        {/* Course List */}
        <div className="container bg-white p-4 shadow-sm rounded">
          <h3 className="h4 mb-4">Course List</h3>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
            {allCourses.map((course, index) => {
              const assessmentExists = assessments[course.courseId] !== undefined;

              return (
                <div
                  key={index}
                  className="col d-flex align-items-stretch"
                >
                  <div className="card w-100 shadow-sm">
                  {course.resourceLinks && (
  <div className="ratio ratio-16x9">
    <iframe
      src={`https://www.youtube.com/embed/${new URL(course.resourceLinks).searchParams.get('v')}`}
      title="Course Video"
      allowFullScreen
      frameBorder="0"
    />
  </div>
)}

                    <div className="card-body">
                      <h5 className="card-title">{course.courseName}</h5>
                      
                      <p className="card-text">{course.keyConcepts}</p>
                      <p className="card-text">{course.duration}</p>

                      <div className="d-flex gap-2 mt-4">
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="btn btn-info btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleAddLearners(course)}
                          className="btn btn-secondary btn-sm"
                        >
                          Add Learners
                        </button>
                        <button
                          onClick={() => handleViewCourse(course)}
                          className="btn btn-danger btn-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleassessment(course, assessmentExists)}
                          className={`btn btn-sm ${
                            assessmentExists ? 'btn-warning' : 'btn-success'
                          }`}
                        >
                          {assessmentExists ? 'Update Assessment' : 'Create Assessment'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedCourse && (
          <div className="fixed-top bg-white d-flex justify-content-center align-items-center" style={{ left: '250px' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <button
                  className="btn btn-close position-absolute top-0 end-0 m-2"
                  onClick={closeCard}
                />
                <div className="modal-header">
                  <h5 className="modal-title">Course Details</h5>
                </div>
                <div className="modal-body">
                  <p><strong>Course Name:</strong> {selectedCourse.courseName}</p>
                  <p><strong>Key Concepts:</strong> {selectedCourse.keyConcepts}</p>
                  <p><strong>Duration:</strong> {selectedCourse.duration}</p>
                  <p><strong>Resource Links:</strong> {selectedCourse.resourceLinks}</p>
                  <p><strong>Other Links:</strong> {selectedCourse.otherLinks}</p>
                  <p><strong>Outcomes:</strong> {selectedCourse.outcomes}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
