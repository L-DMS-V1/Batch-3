// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Components/Welcome';
import SignIn from './Components/Signin';
import SignUp from './Components/Signup';
import AdminPage from './Components/Admin/Admin';
import EmployeePage from './Components/Employee/EmployeePage';
import ManagerPage from './Components/Manager/ManagerPage';
import Managerrequest from './Components/Manager/Managerrequest';
import ProtectedRoute from './Components/ProtectedRoute';
import Forbidden from './Components/Forbidden';
import CourseList from './Components/Admin/CourseList';
import Feedbacks from './Components/Admin/Feedback';
import ViewRequest from './Components/Admin/ViewRequest';
import CreateCourse from './Components/Admin/CreateCourse';
import EditCourse from './Components/Admin/EditCourse';
import EmployeeProgresses from './Components/Admin/EmployeeProgresses';
import CourseAssignment from './Components/Admin/CourseAssignment';
import DynamicForm from './Components/Admin/Createassesments';
import UpdateAssessment from './Components/Admin/UpdateAssessment';
import TakeAssessment from './Components/Employee/TakeAssessment';
import GiveFeedback from './Components/Employee/GiveFeedback';
import Thankyou from './Components/Employee/Thankyou';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/forbidden" element={<Forbidden />}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute allowedRole="ROLE_ADMIN" />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path='/courselist' element={<CourseList/>}/>
          <Route path='/employeeprogress' element={<EmployeeProgresses/>}/>
          <Route path='/viewRequest' element={<ViewRequest/>}/>
          <Route path='/createCourse' element={<CreateCourse/>}/>
          <Route path='/editCourse' element={<EditCourse/>}/>
          <Route path='/courseassign' element={<CourseAssignment/>}/>
          <Route path='/feedbacks' element={<Feedbacks/>}/>
          <Route path='/createassessment' element={<DynamicForm/>}/>
          <Route path='/updateassessment' element={<UpdateAssessment/>}/>
        </Route>
        <Route element={<ProtectedRoute allowedRole="ROLE_MANAGER"/>}>
          <Route path="/manager" element={<ManagerPage />} />
          <Route path='/newrequest' element={<Managerrequest />} />
        </Route>
        {/* <Route element={<ProtectedRoute allowedRole="ROLE_EMPLOYEE"/>}> */}
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/takeassessment" element={<TakeAssessment />} />
          <Route path="/givefeedback" element={<GiveFeedback />} />
          <Route path="/thankyou" element={<Thankyou />} />
        {/* </Route> */}
        
      </Routes>
    </Router>
  );
}

export default App;