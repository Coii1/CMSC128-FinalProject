import { Link } from 'react-router-dom';
// import { FaChevronDown } from "react-icons/fa";
// import { IoNotifications } from "react-icons/io5";
// import { CgProfile } from "react-icons/cg";
import upvLogo from '../assets/upvlogo.png';
import '../styles/Header.css';

function Header() {
    return(
        <header className='header'>
            
            <nav className='headerLeft'>
                <Logo />
                <Link to='/'>Home</Link>

                <div className='dropdown'>
                    <button className='dropBtn'>
                        Downloads 
                        {/* <FaChevronDown className="chevronDown"/> */}
                    </button>
                </div>
            </nav>
            
            <nav className='roboto-header-right'>
                
                <div className='notifications'>
                    <button className='notifBtn'>
                        {/* <IoNotifications /> */}
                    </button>
                </div>

                <div className='profile'>
                    <Link to="/profile" className='profileBtn' target='_blank' rel='noreferrer'>
                        {/* <CgProfile /> */}
                    </Link>
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