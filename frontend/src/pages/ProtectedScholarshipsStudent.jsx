import { useState, useRef, useEffect } from 'react'      // reference to a DOM element for scrolling
import api from '../api.js'

import Header from '../components/HeaderforStudent.jsx'
import HeroSection from '../components/HeroSection.jsx'
import Accordion from '../components/Accordion.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/Scholarships.css'

function ProtectedScholarships() {
    const contentRef = useRef(null)
    const [sortBy, setSortBy] = useState("datePosted")
    const [scholarships, setScholarships] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchScholarships();
    }, []);

    const fetchScholarships = async () => {
        try {
            const response = await api.get("/scholarships/");
            setScholarships(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching scholarships:", error);
            setLoading(false);
        }
    }

    const scrollToContent = () => {
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const scholarshipCategories = [
        { title: "Government-Funded", type: "government" },
        { title: "Private", type: "private" }
    ]

    return (
        <div className="scholarshipsPage">
            <Header />

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
                        {loading ? (
                            <p>Loading scholarships...</p>
                        ) : (
                            <Accordion type={category.type} scholarships={scholarships} sortBy={sortBy} />
                        )}
                        

                    </section>
                ))}

            </div>

            <Footer />
        </div>
    )
}
export default ProtectedScholarships