import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import './styles/App.css'

import Scholarships from './pages/Scholarships.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Posts from './pages/postManagement.jsx'
import PostDetails from './pages/postDetails.jsx'
import NotFound from './pages/NotFound.jsx'
import StaffDashboard from './pages/StaffDashboard.jsx'

function App() {

  return (
  	<BrowserRouter>
        <Routes>
			{/* Public routes */}
			<Route path="/" element={ <Scholarships/> } />
			<Route path="/posts" element={ <Posts/> } />
            <Route path="/postDetails" element={ <PostDetails/> } />
			<Route path='/staffDashboard' element={<StaffDashboard/>} />


			{/* Protected routes - Pages that should only be accessed after signing up/logging in*/}
			{/* <Route path='/staffdashboard' element={
				<ProtectedRoute allowedRoles={ ["admin"] }>
					
					<StaffDashboard />

				</ProtectedRoute>
			} /> */}
			
            {/* <Route path='/studentdashboard' element={
				<ProtectedRoute allowedRoles={ ["student"] }>
					<StudentDashboard />
				</ProtectedRoute>
			} /> */}

			<Route path="/registerandlogout" element={ <RegisterAndLogout/> } />
			<Route path="*" element={ <NotFound /> } />
        </Routes>
    </BrowserRouter>
  )
}

function RegisterAndLogout() {
	// get the user type if student or admin to determine which register page to go to
	const userType = localStorage.getItem('userType')	

	localStorage.clear()			// to clear the access and refresh tokens
	
	if (userType === 'admin') {
		return <Navigate to="/adminregister" replace />
	}
	return <Navigate to="/studentregister" replace />

}

function Logout() {
	localStorage.clear()		
	return <Navigate to="/" />
}

export default App
