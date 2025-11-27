//postManagement.jsx
import '../styles/postManagement.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'

function Posts() {
    return(
        <div>
            <Header />

            <div className = "middleDivision">
                <Link to="/postDetails" className='signupBtn'>Posts</Link>
            </div>

            <Footer />
        </div>
    )
}

export default Posts