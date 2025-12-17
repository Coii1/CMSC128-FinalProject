// postManagement.jsx
import '../styles/postManagement.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api.js' // Import your Axios instance

// DUMMY SHARED DATA
export const SCHOLARSHIP_DATA = [
    { 
        id: 1, 
        title: 'Academic Excellence Scholarship', 
        type: 'government',
        slots: 5, 
        datePosted: '2023-09-01', 
        author: 'John Doe',
        qualifications: 'Must be a consistent honor student.\nNo failing grades.',
        benefits: 'Tuition fee coverage.\nMonthly stipend of 5000.',
        instructions: 'Submit your report card and certificate of good moral.',
        start_date: '2023-09-01',
        end_date: '2023-12-30',
        deadline: '2024-01-15',
        requirements: ["Form 137 (pdf)", "Certificate of Good Moral (pdf)"]
    },
    { 
        id: 2, 
        title: 'Financial Aid Program', 
        type: 'private',
        slots: 20, 
        datePosted: '2023-10-05', 
        author: 'Jane Dela Cruz',
        qualifications: 'Family income must be below poverty line.',
        benefits: 'Full tuition support.',
        instructions: 'Interview required after document submission.',
        start_date: '2023-10-01',
        end_date: '2023-11-30',
        deadline: '2023-12-01',
        requirements: ["ITR (pdf)", "Barangay Indigency (pdf)"]
    }
];

function Posts() {
    // Initialize state with dummy data for now
    const [scholarships, setScholarships] = useState(SCHOLARSHIP_DATA)
    const [deleteId, setDeleteId] = useState(null)
    const navigate = useNavigate()

    const [deletedItem, setDeletedItem] = useState(null) 
    const [showUndoModal, setShowUndoModal] = useState(false) 
    const timerRef = useRef(null) 

    // ==== FETCH SCHOLARSHIPS API (TO UNCOMMENT)
    // Endpoint: GET /scholarships/ 
    /*
    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await api.get('/scholarships/');
                const data = response.data;

                // Transform API data to match UI structure if needed
                // The API returns fields like 'start_date', but UI uses 'datePosted'
                const formattedData = data.map(item => ({
                    ...item,
                    datePosted: item.created_at || item.start_date, // Fallback if no created_at
                    author: item.author || 'Admin' // Fallback if no author returned
                }));

                setScholarships(formattedData);
            } catch (error) {
                console.error("Error fetching scholarships:", error);
            }
        };

        fetchScholarships();
    }, []);
    */

    // DUMMY DATA SETUP
    useEffect(() => {
        // Simulating data load
        setScholarships(SCHOLARSHIP_DATA);
    }, [])

    useEffect(() => {
        if (showUndoModal) {
        timerRef.current = setTimeout(() => {
            finalizeDelete() 
        }, 10000)
        }
        return () => clearTimeout(timerRef.current) 
    }, [showUndoModal])

    const handleConfirmDelete = () => {
        if (!deleteId) return

        const itemToDelete = scholarships.find(s => s.id === deleteId)
        setDeletedItem(itemToDelete)

        setScholarships(prev => prev.filter(s => s.id !== deleteId))
    
        setDeleteId(null)
        
        setShowUndoModal(true)
    }

    const handleUndo = () => {
        if (deletedItem) {
            setScholarships(prev => [...prev, deletedItem].sort((a,b) => a.id - b.id))
        
            setDeletedItem(null)
            setShowUndoModal(false)
            clearTimeout(timerRef.current)
        }
    }

    // DELETE SCHOLARSHIP API (TO UNCOMMENT)
    const finalizeDelete = async () => {
        if (deletedItem) {
            try {    
                // Endpoint: DELETE /scholarships/<id>/ (Standard REST)
                // await api.delete(`/scholarships/${deletedItem.id}/`)
                
                console.log("Permanently deleted ID:", deletedItem.id)
            } catch (error) {
                console.error("Error deleting: ", error)
            }
        }
        setDeletedItem(null)
        setShowUndoModal(false)
    }

    return (
        <div className="postManagement">
            <Header />

            <div className="middleDivision">
                <h2>Post Scholarships</h2>

                <Link to="/postDetails" className="postDetailsBtn mb-3 d-inline-block">
                Post new scholarship
                </Link>

                <table className="scholarship-table table table-hover align-middle">
                    <thead className='bg-maroon text-white'>
                        <tr>
							<th scope="col" className="py-3 ps-4">Scholarship Title</th>
							<th scope="col" className="py-3">Slots</th>
							<th scope="col" className="py-3">Date posted</th>
							<th scope="col" className="py-3">Author</th>
							<th scope="col" className="py-3 text-center pe-6">Modify post</th>
                        </tr>
                    </thead>

                    <tbody>
                        {scholarships.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>
                                No scholarships posted yet.
                            </td>
                        </tr>
                        ) : (
                        scholarships.map(scholarship => (
                            <tr key={scholarship.id}>
								<td className="ps-4">{scholarship.title}</td>
								<td>{scholarship.slots}</td>
								<td>
									{new Date(scholarship.datePosted).toLocaleDateString()}
								</td>
								<td>{scholarship.author}</td>

								<td className="actions text-center pe-6">
									{/* Navigate to /postDetails/:id for editing */}
									<button className="icon-btn edit me-2"
										onClick={() => navigate(`/postDetails/${scholarship.id}`)}>
										<TbEdit />  
									</button>

									<button className="icon-btn delete" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setDeleteId(scholarship.id)}>
										<RiDeleteBin5Line />
									</button>
								</td>
                            </tr>
                        ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* DELETE CONFIRMATION MODAL */}
            <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-danger text-white">
							<h1 className="modal-title fs-5" id="deleteModalLabel">Confirm Deletion</h1>
							<button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={() => setDeleteId(null)}></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this scholarship post?
                        </div>
							<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setDeleteId(null)}>Cancel</button>
							<button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleConfirmDelete}>
								Yes, Delete
							</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* UNDO DELETE THE POST */}
            <div 
                className={`modal fade ${showUndoModal ? 'show' : ''}`} 
                id="undoModal" 
                tabIndex="-1" 
                style={{ display: showUndoModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-dark text-white">
							<h5 className="modal-title">Post Deleted</h5>
							<button type="button" className="btn-close btn-close-white" onClick={finalizeDelete}></button>
                        </div>
                        <div className="modal-body">
                            The scholarship has been deleted.<br/>
                        </div>
                        <div className="modal-footer">
							<button type="button" className="btn btn-secondary" onClick={finalizeDelete}>Close</button>
							<button type="button" className="btn btn-warning" onClick={handleUndo}>
								Undo Delete
							</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
  )
}

export default Posts