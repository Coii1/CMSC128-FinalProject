import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/ApplicationManagement.css'

function ApplicationManagement() {
    return (
        <div className="staffDashboardLayout">
            <Header />
            
            <div className="staffDashboardContent">
                <h2 id = "application-management-header">Application Management</h2>


            </div>

            <Footer />
        </div>
    )
}

export default ApplicationManagement