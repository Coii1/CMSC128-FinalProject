import { Link } from 'react-router-dom'
// import { BiLogoGmail } from "react-icons/bi"
// import { BiLogoFacebookCircle } from "react-icons/bi";
import upvLogo from '../assets/upvlogo.png'
import '../styles/Footer.css'

function Footer() {
    return(
        <footer className='footer'>

            {/* Maroon Footer */}
            <div className='topFooter'>
                <div className='footerCol footerLogoCol'>
                    <img src={ upvLogo } alt="UPV Logo" className='upvFooterLogo' />

                    <div className='footerText'>
                        <h3>UPV Office of Student Affairs</h3>
                        <h5>Scholarships and Financial Assistance Unit</h5>
                    </div>

                    <div className='footerIcons'>
                        <a href="mailto:osa.upvisayas@up.edu.ph">
                            {/* <BiLogoGmail /> */}
                        </a>
                        <a href="https://www.facebook.com/UPVSFAU" target='_blank' rel='noreferrer'>
                            {/* <BiLogoFacebookCircle /> */}
                        </a>
                    </div>
                </div>

                <div className='verticalLine'></div>

                <div className='footerColRight'>
                    <p>
                        OSA, Scholarships and Financial Assistance Unit <br />
                        UPV Common Union Building (CUB) <br />
                        5023 Miagao, Iloilo <br />
                        Email: osa.upvisayas@up.edu.ph <br />
                        Phone: (033) 513-7019 <br />
                    </p>
                </div>

                <div className='footerCol copyright'>
                    <p>
                        Copyright © 2025 <br />
                        All Rights Reserved.
                    </p>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className='bottomFooter'>
                <Link to='/aboutus'>About Us</Link>
                <Link to='/termsofservice'>Terms of Service</Link>
                <Link to='/dataprivacy'>Data Privacy</Link>
                <Link to='/trademark'>Copy and Trademark</Link>
                <Link to='/feedback'>Feedback</Link>
            </div>

        </footer>
    )
}

export default Footer