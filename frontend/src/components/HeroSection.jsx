import { FaChevronDown } from 'react-icons/fa'
import upvCampus from '../assets/upvcampus.jpg'
import '../styles/HeroSection.css'

function HeroSection( { title, height = '384px', showChevron = true, scrollToSection } ) {
    return(
        <section className='heroSection' 
                 style={{ '--hero-img-height': height }}>

            <img src={ upvCampus } className='upvCampus' alt="UP Visayas Campus"/>

            <div className='heroContent'>
                <div className='headerContainer'>
                    <h1 className='montserrat-header'>{title}</h1>
                </div>

                { showChevron && (
                    <button className='downBtn' onClick={scrollToSection}>
                        <FaChevronDown className="heroChevronDown"/>
                    </button>
                    )
                }
                
            </div>
        </section>
    )
}
export default HeroSection