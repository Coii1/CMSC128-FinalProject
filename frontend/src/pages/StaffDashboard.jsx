import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import HeroSection from '../components/HeroSection.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/StaffDashboard.css'

function StaffDashboard() {
    return (
        <div className="staffDashboardLayout">
            <Header />
            <HeroSection 
                title=<><br/>STAFF DASHBOARD</> 
                height= "10.1875rem"
                showChevron= {false}
            />

            <div className="staffDashboardContent">

                <Link to="/manageAccounts" className="dashboardCard card-green">
                    <div className="card-body">
                        <h5 className="card-title">Manage Student Accounts</h5>
                    </div>
                </Link>

                <Link to="/postDetails" className="dashboardCard card-maroon">
                    <div className="card-body">
                        <h5 className="card-title">Post Scholarships/<br/>Opportunities</h5>
                    </div>
                </Link>

                <Link to="/staffProfile" className="dashboardCard card-green">
                    <div className="card-body">
                        <h5 className="card-title">Staff Profile Information</h5>
                    </div>
                </Link>
            
            </div>

            <Footer />
        </div>
    )
}

export default StaffDashboard
