import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles/App.css'

import Scholarships from './pages/Scholarships.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Posts from './pages/postManagement.jsx'
import PostDetails from './pages/postDetails.jsx'
import NotFound from './pages/NotFound.jsx'
import StaffDashboard from './pages/StaffDashboard.jsx'
import ScholarshipRequirements from './pages/ScholarshipRequirements.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import StudentLogin from './pages/StudentLogin.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import ApplicationManagement from './pages/ApplicationManagement.jsx'
// import AdminAccountManagement from './pages/AdminAccountManagement.jsx'
// import EditScholarship from './pages/EditScholarship.jsx'



function App() {

  return (
  	<BrowserRouter>
        <Routes>
			{/* Public routes */}
			<Route path='/studentLogin' element={ <StudentLogin/> } />
			<Route path='/adminLogin' element={ <AdminLogin/> } />
			<Route path="/" element={ <Scholarships/> } />

			{/* Protected routes - require login */}
			<Route path="/applicationManagement" element={
				<ProtectedRoute>
					<ApplicationManagement />
				</ProtectedRoute>
			} />
			<Route path="/posts" element={
				<ProtectedRoute>
					<Posts />
				</ProtectedRoute>
			} />
		    <Route path="/postDetails" element={
				<ProtectedRoute>
					<PostDetails />
				</ProtectedRoute>
			} />
			<Route path='/staffDashboard' element={
				<ProtectedRoute allowedRoles={["admin"]}>
					<StaffDashboard/>
				</ProtectedRoute>
			} />
			{/* application page in figma */}
			{/* <Route path='/ScholarshipRequirements' element={<ScholarshipRequirements/>} /> 
			<Route path='/admin/dashboard' element={<StaffDashboard/>} />
			<Route path='/admin/accountManagement' element={<AdminAccountManagement/>} />
			<Route path='/student/dashboard' element={<StudentDashboard/>} /> */}
			
			{/* <Route path='/ScholarshipRequirements' element={
				<ProtectedRoute>
					<AdminAccountManagement/>
				</ProtectedRoute>
			} />  */}

			<Route
				path="/ScholarshipRequirements/:id"
				element={
					<ProtectedRoute>
					<ScholarshipRequirements />
					</ProtectedRoute>
				}
			/>

			<Route path='/adminDashboard' element={
				<ProtectedRoute allowedRoles={["admin"]}>
					<StaffDashboard/>
				</ProtectedRoute>
			} />
			<Route path='/studentDashboard' element={
				<ProtectedRoute allowedRoles={["student"]}>
					<StudentDashboard/>
				</ProtectedRoute>
			} />


			{/* Protected routes - Pages that should only be accessed after signing up/logging in*/}
			{/* <Route path='/staffDashboard' element={
				<ProtectedRoute allowedRoles={ ["admin"] }>
					
					<StaffDashboard />
					<AdminAccountManagement />

				</ProtectedRoute>
			} /> */}
			
            {/* <Route path='/studentDashboard' element={
				<ProtectedRoute allowedRoles={ ["student"] }>
				
					<StudentDashboard />

				</ProtectedRoute>
			} /> */}

			{/* <Route path="/registerandlogout" element={ <RegisterAndLogout/> } /> */}
			<Route path="*" element={ <NotFound /> } />
        </Routes>
    </BrowserRouter>
  )
}

// function RegisterAndLogout() {
// 	// get the user type if student or admin to determine which register page to go to
// 	const userType = localStorage.getItem('userType')	

// 	localStorage.clear()			// to clear the access and refresh tokens
	
// 	if (userType === 'admin') {
// 		return <Navigate to="/adminregister" replace />
// 	}
// 	return <Navigate to="/studentregister" replace />

// }

function Logout() {
	localStorage.clear()		
	return <Navigate to="/" />
}

export default App
