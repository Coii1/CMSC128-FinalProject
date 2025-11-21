import { useState } from 'react'
import { Link } from 'react-router-dom'
// import { FaChevronUp } from "react-icons/fa"
// import { FaChevronDown } from 'react-icons/fa'
import '../styles/Scholarships.css'

// temp data to be replaced with database
const scholarships = [
    { id: 1, 
        type: "government", 
        name: "ONE UPV Scholarship", 
        slots: 5, 
        qualifications: "Must be a full-time student in their SECOND-year term of a four or five-year degree.", 
        documents: "Form D - Scholarship Application Form /n Current resume",
        benefits: "PHP 25, 000 per student",
        instructions: "All information must be TYPED. Handwritten and incomplete submissions will be rejected.",
        deadline: "2025-12-05",
        datePosted: "2025-10-15"
    },
        
    { id: 2, 
        type: "government", 
        name: "DOST-SEI Scholarship", 
        slots: 10, 
        description: "For STEM students with exceptional merit.", 
        qualifications: "Must be a full-time student in their SECOND-year term of a four or five-year degree.", 
        documents: "Form D - Scholarship Application Form /n Current resume",
        benefits: "PHP 25, 000 per student",
        instructions: "All information must be TYPED. Handwritten and incomplete submissions will be rejected.",
        deadline: "2025-9-05",
        datePosted: "2025-2-17"
    },
    { id: 3, 
        type: "private", 
        name: "SM Foundation Scholarship", 
        slots: 5, 
        description: "Financial assistance for deserving students." ,
        qualifications: "Must be a full-time student in their SECOND-year term of a four or five-year degree.", 
        documents: "Form D - Scholarship Application Form /n Current resume",
        benefits: "PHP 25, 000 per student",
        instructions: "All information must be TYPED. Handwritten and incomplete submissions will be rejected.",
        deadline: "2025-12-05",
        datePosted: "2025-10-15"
    },
    { id: 4, 
        type: "private", 
        name: "Ayala Foundation Scholarship", 
        slots: 4, 
        description: "Scholarship for students with leadership potential.",
        qualifications: "Must be a full-time student in their SECOND-year term of a four or five-year degree.", 
        documents: "Form D - Scholarship Application Form /n Current resume",
        benefits: "PHP 25, 000 per student",
        instructions: "All information must be TYPED. Handwritten and incomplete submissions will be rejected.",
        deadline: "2025-12-05",
        datePosted: "2025-10-15"
    },
    ];

function Accordion({ type, sortBy }) {
    // const filtered = scholarships.filter(s => s.type === type);
    const filtered = scholarships.filter(s => s.type === type)
                    .sort((a, b) => {
                        if (sortBy === "datePosted") {
                            return new Date(b.datePosted) - new Date(a.datePosted);
                        }
                        if (sortBy === "deadline") {
                            return new Date(a.deadline) - new Date(b.deadline);
                        }
                        return 0;
                    });

    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    }

    return (
        <div className="accordionContainer my-4">
            {filtered.map((scholarship, index) => (
                <div key={scholarship.id} className="accordionItem">
                    
                    <div className="accordionHeaderLeft" onClick={() => toggleAccordion(index)}>
                        <div className='headerTitle'>
                            <span className="chevron">
                                {/* {openIndex === index ? <FaChevronUp /> : <FaChevronDown />} */}
                            </span>

                            <h3>{scholarship.name}</h3>
                        </div>
                        
                        <div className='slotsContainer'>
                            Available slots: {scholarship.slots}
                        </div>
                        
                    </div>

                    {openIndex === index && (
                        <div className="accordionBody">
                            <h5>Qualifications</h5>
                            <ul>
                                <li className='qualifications'>{scholarship.qualifications}</li>
                            </ul>

                            <h5>Required Documents</h5>
                            <ul>
                                <li className='documents'>{scholarship.documents}</li>
                            </ul>

                            <h5>Benefits</h5>
                            <ul>
                                <li className='benefits'>{scholarship.benefits}</li>
                            </ul>

                            <h5>Instructions</h5>
                            <ul>
                                <li className='instructions'>{scholarship.instructions}</li>
                            </ul>

                            <h5>Deadline</h5>
                            <ul>
                                <li className='deadline'>{scholarship.deadline}</li>
                            </ul>

                            <div className="applyBtnWrapper">
                                <Link to={`/apply/${scholarship.id }`}  className="applyBtn">
                                    APPLY NOW
                                </Link>
                            </div>

                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
export default Accordion;