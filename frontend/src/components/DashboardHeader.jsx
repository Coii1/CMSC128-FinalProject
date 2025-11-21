import { Link } from 'react-router-dom'
// import { FaChevronDown } from 'react-icons/fa'
import upvLogo from '../assets/upvlogo.png'
import '../styles/DashboardHeader.css'

function DashboardHeader() {
    return(
        <header className='main-header'>
            <Logo />

            <nav className='roboto-header-right'>
                <Link to='/'>Home</Link>

                <div className='dropdown'>
                    <button className='dropBtn'>
                        Downloads 
                        {/* <FaChevronDown className="chevronDown"/> */}
                    </button>
                </div>
                <Link to="/login">Login</Link>
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