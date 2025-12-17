import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
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
// import EditScholarship from './pages/EditScholarship.jsx'

import ProtectedScholarships from './pages/ProtectedScholarships.jsx'
import ProtectedScholarshipsforStudents from './pages/ProtectedScholarshipsStudent.jsx'
// import ScholarshipRequirements from "./pages/ScholarshipRequirements";


function App() {

	return (
		<BrowserRouter>
			<Routes>
				{/* Public routes */}
				<Route path='/studentLogin' element={ <StudentLogin/> } />
				<Route path='/adminLogin' element={ <AdminLogin/> } />
				<Route path="/" element={ <Scholarships/> } />

				

				{/* <Route path="/editScholarship" element={ <EditScholarship/> } /> */}

				<Route path="/home" element={ <ProtectedScholarships/> } />
				<Route path="/homeforStudents" element={ <ProtectedScholarshipsforStudents/> } />

				{/* Protected routes - require login */}
				<Route path="/applicationMgmt" element={
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

                <Route path="/postDetails/:id" element={
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
				{/* <Route path='/ScholarshipRequirements' element={<ScholarshipRequirements/>} /> */}


			<Route
				path="/scholarshipReqs/:id"
				element={
					<ProtectedRoute>
					<ScholarshipRequirements />
					</ProtectedRoute>
				}
			/>

			{/* Protected routes - require login */}
			<Route path="/applicationManagement" element={
				<ProtectedRoute>
					<ApplicationManagement />
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

				
				{/* <Route path='/ScholarshipRequirements' element={
					<ProtectedRoute>
						<AdminAccountManagement/>
					</ProtectedRoute>
				} />  */}


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

export default App
