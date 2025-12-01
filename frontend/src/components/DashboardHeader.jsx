import { Link } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa'
import upvLogo from '../assets/upvlogo.png'
import '../styles/DashboardHeader.css'

import StudentLogin from '../pages/StudentLogin'
import AdminLogin from '../pages/AdminLogin'

function DashboardHeader() {
    return(
        <header className='main-header'>
            <Logo />

            <nav className='roboto-header-right'>
                <Link className="home" to='/'>Home</Link>

                <div className="dropdown">
                    <button className="downloadDropBtn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Downloads
                    </button>
                    {/* for downloadable files */}
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">PDF 1</a></li>
                        <li><a className="dropdown-item" href="#">PDF 2</a></li>
                        <li><a className="dropdown-item" href="#">PDF 3</a></li>
                    </ul>
                </div>


                <div className="dropdown">
                    <a className="loginDropBtn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Login
                    </a>

                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/studentLogin">Student</Link></li>
                        <li><Link className="dropdown-item" to="/adminLogin">Admin</Link></li>
                        
                    </ul>
                </div>
                {/* <Link to="/login">Login</Link> */}
                <Link to="/signup" className='signupBtn'>Sign Up</Link>
            </nav>

        </header>
    )
}

function Logo() {
    return(
        <div className='headerLeft'>
            <div className='logo'>
                <img src={ upvLogo } alt='UPV Logo' className='upvLogo' />
            </div>
            
            <div className='source-serif-4-header'>
                <h2>UPV Office of Student Affairs</h2>
                <h3>Scholarships and Financial Assistance Unit</h3>
            </div>
        </div>
    )
}
export default DashboardHeader