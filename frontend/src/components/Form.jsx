import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import DashboardHeader from "./DashboardHeader"
import Footer from "../components/Footer"
import LoadingIndicator from "./LoadingIndicator"
import "../styles/Form.css"


function Form( { userType } ) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')
    const [loading, setLoading] = useState(false)

    const name = userType === "student" ? "Student Login" : "Admin Login"

    const route = "/auth/login/"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            // Django's default TokenObtainPairView expects 'username' and 'password'.
            // Use the email input as username if you prefer email-based login.
            const res = await api.post(route, { username: email, password })

            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)

            // Determine role by hitting role-protected test endpoints
            let determinedRole = null
            try {
                await api.get('/auth/test/student/')
                determinedRole = 'student'
            } catch (errStudent) {
                try {
                    await api.get('/auth/test/admin/')
                    determinedRole = 'admin'
                } catch (errAdmin) {
                    // fallback: treat as student if server doesn't expose role endpoints
                    determinedRole = userType || 'student'
                }
            }

            localStorage.setItem('userType', determinedRole)
            navigate(determinedRole === 'student' ? '/' : '/adminDashboard')

        } catch (error) {
            console.error("Login error:", error)
            const serverMsg = error.response?.data || error.message
            // Try to show helpful server message when available
            if (error.response?.data) {
                // common DRF serializer error shapes: {'non_field_errors': [...]} or {'detail': '...'}
                const data = error.response.data
                const msg = data.detail || data.non_field_errors?.[0] || JSON.stringify(data)
                alert("Login failed: " + msg)
            } else {
                alert("Login failed: " + error.message)
            }
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="login">
            <DashboardHeader />
            
            <div className="loginContent">
                <h2>{ name }</h2>

                <div className="loginForm">

                    <form onSubmit={ handleSubmit }>

                        <div className="mb-3">
                            <label htmlFor="email" className="required form-label">Email address</label>
                            <input type="email" className="form-control" id="email" value={ email } aria-describedby="emailHelp" onChange={ (e) => setEmail( e.target.value ) } placeholder="Enter your email" required/>
                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="required form-label">Password</label>
                            <input type="password" className="form-control" value={ password } id="password" onChange={ (e) => setPasword( e.target.value ) } placeholder="Enter your password" required/>

                            <p className="forgotPassword">
                                <a href="#">Forgot your password?</a>
                                
                            </p>
                        
                        </div>

                        { loading && <LoadingIndicator/> }
                        
                        <button type="submit" className="loginBtn btn">Log in</button>
                        
                    </form>
                </div>
                
            </div>

            <Footer />
        </div>
    )

}

export default Form