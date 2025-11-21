import { useState, useRef } from 'react'      // reference to a DOM element for scrolling

import DashboardHeader from '../components/DashboardHeader.jsx'
import HeroSection from '../components/HeroSection.jsx'
import Accordion from '../components/Accordion.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/Scholarships.css'

function Scholarships() {
    const contentRef = useRef(null)
    const [sortBy, setSortBy] = useState("")

    const scrollToContent = () => {
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const scholarshipCategories = [
        { title: "Government-Funded Scholarships", type: "government" },
        { title: "Private Scholarships", type: "private" }
    ]

    return (
        <div className="scholarshipsPage">
            <DashboardHeader />

            <HeroSection 
                title=<>AVAILABLE<br/>SCHOLARSHIPS</> 
                height='384px'
                showChevron = {true}
                scrollToSection={scrollToContent} 
            />

            <div ref={contentRef} className="scholarshipsContent">

                {scholarshipCategories.map((category) => (

                    <section key={category.type} className="scholarshipSection">
                        <div className='sectionHeaderRow'>
                            <h2 className="scholarshipHeader">{category.title}</h2>
                        
                            {/* SORT BY DROPDOWN */}
                             <div className='sort'>
                                <h5 className='sortTitle'>SORT BY: </h5>

                                <select className="sortDropdown" id="sortBy" value={sortBy}
                                onChange={ (e) => setSortBy(e.target.value) }>
                                    <option value="datePosted">Date Posted</option>
                                    <option value="deadline">Deadline</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* Scholarship accordion */}
                        <Accordion type={category.type} /> 
                    </section>
                ))}

            </div>

            <Footer />
        </div>
    )
}
export default Scholarships