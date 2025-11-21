import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../contants"
import { useState, useEffect } from "react"

// This checks if the user is authorized to access a specific route
// Otherwise, redirect the user and tell them that they need to log in before viewing the route
function ProtectedRoute( {children} ) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    // Refreshes the access token automatically
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            })

            if (res.status === 200) {
                // change to a new access token
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            }
            else {
                setIsAuthorized(false)
            }

        } catch (error) {
            console.error("Refresh token failed: ", error)
            setIsAuthorized(false)
        }

    }

    // Checks if the token needs to be refreshed
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        const userType = localStorage.getItem("userType")

        if (!token) {
            setIsAuthorized(false)
            return
        }

        try {
            const decoded = jwtDecode(token)    // to access the token value and expiration date
            const tokenExpiration = decoded.exp
            const now = Date.now() / 1000       // get the current date in seconds


            if (tokenExpiration < now) {
                await refreshToken()
            }
            else {
                if (allowedRoles && !allowedRoles.includes(userType)) {
                    setIsAuthorized(false)
                    return
                }
                setIsAuthorized(true)
            }

        } catch (error) {
            console.error("Token validation failed:", error)
            setIsAuthorized(false)
        }
        

    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    // if unauthorized, redirect to the login page
    // return isAuthorized ? children : <Navigate to="/login"/>

    if (!isAuthorized) {
        const userType = localStorage.getItem("userType")

        if (userType === "admin") {
            return <Navigate to="/adminlogin" replace />

        } else {
            return <Navigate to="/studentlogin" replace />

        }
    }
    return children

}
export default ProtectedRoute