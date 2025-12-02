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

    const route = 
        userType === "student" 
            ? "/auth/student/login" 
            : "/auth/admin/login"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        setTimeout(() => {
        setLoading(false)

        // ================== SIMULATED LOGIN =======================

        // Save dummy token (optional)
        localStorage.setItem(ACCESS_TOKEN, "dummy-access-token")
        localStorage.setItem(REFRESH_TOKEN, "dummy-refresh-token")

        // Save userType to localStorage if you want
        localStorage.setItem("userType", userType)

        // Redirect to dashboard
        navigate(userType === "student" ? "/student/dashboard" : "/admin/dashboard")
    }, 500)

        // ============= UNCOMMENT WHEN BACKEND IS READY ==============

        // try {
        //     const res = await api.post(route, { email, password })

        //     localStorage.setItem(ACCESS_TOKEN, res.data.access)
        //     localStorage.setItem(REFRESH_TOKEN, res.data.refresh)

        //     navigate(`/${userType}/dashboard/`)     
            
        // } catch (error) {
        //     alert("Login failed: " + error.response?.data?.message)
        // } finally {
        //     setLoading(false)
        // }

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