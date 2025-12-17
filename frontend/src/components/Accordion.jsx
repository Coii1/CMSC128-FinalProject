import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronUp } from "react-icons/fa"
import { FaChevronDown } from 'react-icons/fa'
import '../styles/Scholarships.css'

function Accordion({ type, scholarships, sortBy }) {
    // Helper function to split text by newlines into array
    const formatTextToList = (text) => {
        if (!text) return [];
        return text.split('\n').filter(line => line.trim() !== '');
    };

    // Helper function to parse requirements JSON string
    const parseRequirements = (requirementsStr) => {
        try {
            const parsed = JSON.parse(requirementsStr);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error("Error parsing requirements:", error);
            return [];
        }
    };

    // Normalize type string by removing hyphens and converting to lowercase
    const normalizeType = (typeStr) => {
        return typeStr?.toLowerCase().replace(/-/g, '').replace(/\s+/g, '').trim() || '';
    };

    const filtered = scholarships.filter(s => {
        const scholarshipType = normalizeType(s.type);
        const filterType = normalizeType(type);
        console.log(`Comparing: "${scholarshipType}" starts with "${filterType}"?`, scholarshipType.startsWith(filterType));
        return scholarshipType.startsWith(filterType);
    }).sort((a, b) => {
        if (sortBy === "datePosted") {
            return new Date(b.created_at) - new Date(a.created_at);
        }
        if (sortBy === "deadline") {
            return new Date(a.deadline) - new Date(b.deadline);
        }
        return 0;
    });

    console.log(`Filtered scholarships for type "${type}":`, filtered.length);

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
                                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                            </span>

                            <h3>{scholarship.title}</h3>
                        </div>
                        
                        <div className='slotsContainer'>
                            Available slots: {scholarship.slots}
                        </div>
                        
                    </div>

                    {openIndex === index && (
                        <div className="accordionBody scholarshipContent">
                            <h5>Qualifications</h5>
                            <ul>
                                {formatTextToList(scholarship.qualifications).map((item, idx) => (
                                    <li key={idx} className='qualifications'>{item}</li>
                                ))}
                            </ul>

                            <h5>Required Documents</h5>
                            <ul>
                                {parseRequirements(scholarship.requirements).map((req, idx) => (
                                    <li key={idx} className='documents'>
                                        {req.reqName} ({req.ftp})
                                    </li>
                                ))}
                            </ul>

                            <h5>Benefits</h5>
                            <ul>
                                {formatTextToList(scholarship.benefits).map((item, idx) => (
                                    <li key={idx} className='benefits'>{item}</li>
                                ))}
                            </ul>

                            <h5>Instructions</h5>
                            <ul>
                                {formatTextToList(scholarship.instructions).map((item, idx) => (
                                    <li key={idx} className='instructions'>{item}</li>
                                ))}
                            </ul>

                            <h5>Deadline</h5>
                            <ul>
                                <li className='deadline'>{scholarship.deadline}</li>
                            </ul>

                            <div className="applyBtnWrapper">
                                {/* <Link 
                                    to={{ pathname: `/scholarshipReqs/${scholarship.id}`}}
                                    state={{ scholarship }}
                                    className="applyBtn"
                                >
                                    APPLY NOW
                                </Link> */}
                            </div>

                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
export default Accordion;