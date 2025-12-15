// postManagement.jsx
import '../styles/postManagement.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Posts() {
	const [scholarships, setScholarships] = useState([])
	const [deleteId, setDeleteId] = useState(null)
	const navigate = useNavigate()

	const [deletedItem, setDeletedItem] = useState(null) 
	const [showUndoModal, setShowUndoModal] = useState(false) 
	const timerRef = useRef(null) 

	useEffect(() => {
		setScholarships([
			{ id: 1, title: 'Academic Excellence Scholarship', slots: 5, datePosted: new Date(), author: 'John Doe' },
			{ id: 2, title: 'Financial Aid Program', slots: 20, datePosted: new Date(), author: 'Jane Dela Cruz' }
		]);
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

	const finalizeDelete = async () => {
		if (deletedItem) {
			try {    
				await fetch(`http://localhost:5000/api/scholarships/${deletedItem.id}`, {
					method: 'DELETE',
				})
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
								{new Date(
								scholarship.datePosted).toLocaleDateString()}
							</td>
							<td>{scholarship.author}</td>

							<td className="actions text-center pe-6">
								<button className="icon-btn edit me-2"
									onClick={() => navigate(`/editScholarship/${scholarship.id}`)}>
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
						Are you sure you want to delete this scholarship post? This action cannot be undone.
						</div>
						<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setDeleteId(null)}>Cancel</button>
						{/* Changed onClick to handleConfirmDelete */}
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
						{/* Undo Button */}
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