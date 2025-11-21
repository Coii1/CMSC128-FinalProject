//postManagement.jsx
import '../styles/postManagement.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'

function Posts() {
    return(
        <div>
            <Header />

            <Link to="/postDetails" className='signupBtn'>Posts</Link>

            <Footer />
        </div>
    )
}

export default Posts