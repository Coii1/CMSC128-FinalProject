// ApplicationManagement.jsx
// THIS IS WHERE THE LOGGED IN STUDENT CAN VIEW THEIR APPLIED SCHOLARSHIPS

import { useEffect, useState, useRef } from 'react'
import Header from '../components/HeaderforStudent.jsx'
import Footer from '../components/Footer.jsx'
import ApplicationAccordion from '../components/ApplicationAccordion.jsx'
import '../styles/ApplicationManagement.css'

// DUMMY DATA FOR FRONTEND TESTING (TO BE REMOVED)
const dummyUser = { 
    id: 101, 
    name: 'Juan Dela Cruz' 
}

const dummyApplications = [
  // 1. Existing Application
  {
    id: 1,
    scholarshipTitle: 'U.P. Presidential Scholarship',
    students: [
      {
        id: 101, // Juan
        name: 'Juan Dela Cruz',
        documents: [
          { label: 'Proof of Enrollment', link: '#', verified: true },
          { label: 'Application Form', link: '#', verified: true },
        ],
        status: 'verified'
      }
    ]
  },
  // 2. New Application (DOST)
  {
    id: 3,
    scholarshipTitle: 'DOST-SEI Merit Scholarship',
    students: [
      {
        id: 101, // Juan
        name: 'Juan Dela Cruz',
        documents: [
          { label: 'Grade Report', link: '#', verified: false },
          { label: 'Birth Certificate', link: '#', verified: true }
        ],
        status: 'under_review'
      }
    ]
  },
  // 3. New Application (CHED)
  {
    id: 4,
    scholarshipTitle: 'CHED Tulong Dunong Program',
    students: [
      {
        id: 101, // Juan
        name: 'Juan Dela Cruz',
        documents: [
          { label: 'Certificate of Indigency', link: '#', verified: false }
        ],
        status: 'submitted'
      }
    ]
  },
  // 4. New Application (Private)
  {
    id: 5,
    scholarshipTitle: 'Megaworld Foundation Scholarship',
    students: [
      {
        id: 101, // Juan
        name: 'Juan Dela Cruz',
        documents: [],
        status: 'submitted'
      }
    ]
  },
  // 5. Application Juan did NOT apply to (Should NOT appear)
  {
    id: 2,
    scholarshipTitle: 'Academic Excellence Scholarship',
    students: [
      {
        id: 201, // Pedro Penduko
        name: 'Pedro Penduko',
        documents: []
      }
    ]
  }
]

function ApplicationManagement() {
    // For dummy data (const and useEffect to be removed)
    const [currentUser, setCurrentUser] = useState(dummyUser)
    const [applications, setApplications] = useState(dummyApplications)
    const [loading, setLoading] = useState(false)

    const [deleteId, setDeleteId] = useState(null)          // ID selected for deletion
    const [deletedItem, setDeletedItem] = useState(null)    // Item stored temporarily for undo
    const [showUndoModal, setShowUndoModal] = useState(false) 
    const timerRef = useRef(null)

    // Undo timer
    useEffect(() => {
        if (showUndoModal) {
            // Wait 10 seconds before permanently deleting
            timerRef.current = setTimeout(() => {
                finalizeDelete() 
            }, 10000)
        }
        return () => clearTimeout(timerRef.current) 
    }, [showUndoModal])
    
    // Step A: User clicks "Yes, Delete" in the modal
    const deleteConfirmationHandler = () => {
        if (!deleteId) return

        // Finds the item to store it for potential undo
        const itemToDelete = applications.find(app => app.id === deleteId)
        setDeletedItem(itemToDelete)

        // Removes it from the list
        setApplications(prev => prev.filter(app => app.id !== deleteId))
        
        setDeleteId(null) // Closes confirm modal
        setShowUndoModal(true) // Shows undo option
    }

    //User clicks Undo button
    const undoHandler = () => {
        if (deletedItem) {
            // Adds the item back to the list
            setApplications(prev => [...prev, deletedItem].sort((a,b) => a.id - b.id))
        
            setDeletedItem(null)
            setShowUndoModal(false)
            clearTimeout(timerRef.current)
        }
    }

    // Timer runs out OR the user student clicks "Close" on undo modal
    const finalizeDelete = async () => {
        if (deletedItem) {
            try {    
                // UNCOMMENT IF READY
                // await api.delete(`/applications/student/${deletedItem.id}/`)
                console.log("Permanently deleted Application ID:", deletedItem.id)
            } catch (error) {
                console.error("Error deleting: ", error)
                // Optional: Revert change if API fails
            }
        }
        setDeletedItem(null)
        setShowUndoModal(false)
    }

    useEffect(() => {
        const myApps = dummyApplications
        .map(app => ({
            ...app,
            students: app.students.filter(s => s.id === dummyUser.id)
        }))
        .filter(app => app.students.length > 0)
        
        setApplications(myApps)
    }, [])


    // For API (TO UNCOMMENT)
    // const [applications, setApplications] = useState([])
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // // API (TO UNCOMMENT)
    // const fetchData = async () => {
    //     try {
    //         setLoading(true);

    //         // Fetch only the applications list
    //         // Endpoint: GET /applications/student/
    //         const appRes = await api.get('/applications/student/');
    //         setApplications(appRes.data);

    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    return (
        <div className="applicationManagement">
            <Header />

            <div className="appMgmtContainer">
                <h2 className="appMgmtTitle">
                    Hello!<br></br> 
                    This Is Your Applied Scholarships Dashboard
                </h2>

                <div className="appMgmtTableWrapper">
                    <div className="appMgmtTableHeader">
                        <div className="appMgmtCol scholarshipCol">Scholarship Title</div>
                        <div className="appMgmtCol studentCol">Student</div>
                        <div className="appMgmtCol actionCol"></div>
                    </div>

                    {loading ? (
                        <p className="" style={{ padding: '20px', textAlign: 'center'}}>Loading applications...</p>
                    ) : (
                        // <ApplicationAccordion applications={applications} />
                        // PASSING THE DELETE HANDLER
                            <ApplicationAccordion 
                                applications={applications} 
                                onDeleteClick={(id) => setDeleteId(id)} 
                            />
                    )}
                    </div>
                </div>

                {/* --- DELETE CONFIRMATION MODAL --- */}
                <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h1 className="modal-title fs-5">Confirm Application Withdrawal</h1>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" onClick={() => setDeleteId(null)}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to withdraw this application?<br></br>
                                The application will be <strong>permanently deleted</strong> in 10 seconds.
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setDeleteId(null)}>Cancel</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteConfirmationHandler}>
                                    Yes, Withdraw
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- UNDO NOTIFICATION MODAL --- */}
                <div className={`modal fade ${showUndoModal ? 'show' : ''}`} id="undoModal" tabIndex="-1" 
                    style={{ display: showUndoModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-dark text-white">
                                <h5 className="modal-title">Application Withdrawn</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={finalizeDelete}></button>
                            </div>
                            <div className="modal-body">
                                The application has been removed.<br/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={finalizeDelete}>Close</button>
                                <button type="button" className="btn btn-warning" onClick={undoHandler}>
                                    Undo Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            <div className='footer'>
                    <Footer />
            </div>
            
        </div>
    )
}

export default ApplicationManagement
