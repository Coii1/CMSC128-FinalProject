import { Link, Navigate, useNavigate } from 'react-router-dom';
import { IoNotifications } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import upvLogo from '../assets/upvlogo.png';
import '../styles/Header.css';

function Header() {
    const navigrate = useNavigate()

    const userRole = localStorage.getItem('userRole')

    const dashboardPage = userRole === 'admin' ? '/adminDashboard' : '/studentDashboard'

    const logoutHandler = () => {
        Navigate('/')
    }

    return(
        <header className='header'>
            
            <nav className='headerLeft'>
                <Logo />
                
                {/* COMMENTED OUT DOWNLOADS */}
                {/* <div className="dropdown">
                    <button className="downloadDropBtn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Downloads
                    </button>
                    
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">PDF 1</a></li>
                        <li><a className="dropdown-item" href="#">PDF 2</a></li>
                        <li><a className="dropdown-item" href="#">PDF 3</a></li>
                    </ul>
                </div> */}
            </nav>
            
            <nav className='roboto-header-right'>
                
                <Link className='home' to='/'>Home</Link>

                <div className='notifications'>
                    <button className='notifBtn'>
                        <IoNotifications />
                    </button>
                </div>

                <div className='profile'>
                    {/* <Link to="/profile" className='profileBtn' target='_blank' rel='noreferrer'>
                        <CgProfile />
                    </Link> */}
                    <div className='dropdown profile'>
                    
                    <a className='profileBtn dropdown-toggle d-flex align-items-center' href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <CgProfile />
                    </a>

                    <ul className="dropdown-menu dropdown-menu-end">
                        
                        <li>
                            <Link className="dropdown-item" to="/profile">Profile</Link>
                        </li>

                        <li>
                            <Link className="dropdown-item" to={dashboardPage}>
                                Dashboard
                            </Link>
                        </li>

                        <li><hr className="dropdown-divider" /></li>

                        <li>
                            <button className="dropdown-item" onClick={logoutHandler}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>

                </div> 
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
            
        </div>
    )
}
export default Header