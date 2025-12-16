// postDetails.jsx
import '../styles/postDetails.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api.js'

function PostDetails() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const isEditMode = Boolean(id); // true if we edit a post, otherwise false

    const [scholarshipTitle, setScholarshipTitle] = useState('');
    const [scholarshipType, setScholarshipType] = useState('government');
    const [slotsAvailable, setSlotsAvailable] = useState(0);
    const [qualifications, setQualifications] = useState('');
    const [benefits, setBenefits] = useState('');
    const [instructions, setInstructions] = useState('');
    const [applicationPeriodStart, setApplicationPeriodStart] = useState('');
    const [applicationPeriodEnd, setApplicationPeriodEnd] = useState('');
    const [deadline, setDeadline] = useState('');

    const [requirementsList, setRequirements] = useState({requirements: []});
    const [requirementName, setRequirementName] = useState('');
    const [fileType, setFileType] = useState('');

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    useEffect(() => {
        if (!isEditMode) return;

        // Fetching existing data if in edit mode
        const fetchScholarshipData = async () => {
            
            const response = await api.get(`/scholarships/${id}`);
            const data = response.data;

            if (data) {
                setScholarshipTitle(data.title);
                setScholarshipType(data.type);
                setSlotsAvailable(data.slots);
                setQualifications(data.qualifications);
                setBenefits(data.benefits);
                setInstructions(data.instructions);
                setApplicationPeriodStart(formatDate(data.start_date));
                setApplicationPeriodEnd(formatDate(data.end_date));
                setDeadline(formatDate(data.deadline));

                if (typeof data.requirements === 'string') {
                    setRequirements({ requirements: JSON.parse(data.requirements) });
                } else {
                    setRequirements({ requirements: data.requirements || [] });
                }
            }
        };
        fetchScholarshipData();
    }, [id, isEditMode]);

    const handleSubmit = async () => {
        const payload = {
            title: scholarshipTitle,
            type: scholarshipType,
            slots: Number(slotsAvailable),
            qualifications: qualifications,
            benefits: benefits,
            instructions: instructions,
            requirements: JSON.stringify(requirementsList.requirements),
            start_date: applicationPeriodStart,
            end_date: applicationPeriodEnd,
            deadline: deadline,
        };

        if (isEditMode) {
            try {
                await api.put(`/scholarships/${id}`, payload);
                console.log("Updating scholarship:", payload);
                alert("Scholarship updated successfully! (Mock)");
                navigate('/postManagement');
            } catch (error) {
                console.error("Error updating scholarship:", error);
                alert("Error updating scholarship.");
            }
        } else {
            
            try {
                const response = await api.post("/scholarships/", payload);
                console.log("Posting scholarship:", payload);
                alert("Scholarship posted successfully! (Mock)");
                navigate('/postManagement');
            } catch (error) {
                console.error("Error posting scholarship:", error.response?.data || error);
                alert("Error posting scholarship.");
            }
        }
    };

    const addRequirement = (requirement) => {
        let requirementsArray = [...requirementsList.requirements];
        requirementsArray.push(requirement);
        setRequirements({requirements: requirementsArray});
        document.getElementById("myForm").style.display = "none";
        setRequirementName('');
        setFileType('');
    }
    
    const removeRequirement = (index) => {
        const updatedReqs = requirementsList.requirements.filter((_, i) => i !== index);
        setRequirements({ requirements: updatedReqs });
    }

    const addRequirementPopup = () => {
        document.getElementById("myForm").style.display = "block";
    }

    const closeRequirementPopup = () => {
        document.getElementById("myForm").style.display = "none";
    }

    return(
        <div className='postDetails'>
            <Header />

            <div className='postScholarshipContent'>
                <h2>{isEditMode ? "Edit Scholarship" : "Post new scholarship"}</h2>

                <div className='postScholarshipForm'>

                    <div className="mb-3">
                        <label className='required form-label' htmlFor="title">Scholarship title</label>
                        <input type="text" className="form-control title" id="title" value={scholarshipTitle} onChange={(e) => setScholarshipTitle(e.target.value)} required/>
                    </div>

                    <div className='mb-3'>
                        <label className='required form-label' htmlFor="type">Scholarship Type</label>
                        <select className="form-select" id="type" value={scholarshipType} onChange={(e) => setScholarshipType(e.target.value)} required>
                            <option value="government">Government-Funded</option>
                            <option value="private">Private</option>
                        </select>
                    </div>

                    <div className='mb-3'>
                        <label className='required form-label' htmlFor="numSlots">Number Of Slots Available</label><br/>
                        <input type="number" id="numSlots" min={1} max={1000} value={slotsAvailable} onChange={(e) => setSlotsAvailable(e.target.value)} required/><br/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="qualifications" className="required form-label">Qualifications</label>
                        <textarea className="form-control" id="qualifications" rows="7" value={qualifications} onChange={(e) => setQualifications(e.target.value)} required></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="benefits" className="required form-label">Benefits</label>
                        <textarea className="form-control" id="benefits" rows="5" value={benefits} onChange={(e) => setBenefits(e.target.value)} required></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="instructions" className="required form-label">Instructions</label>
                        <textarea className="form-control" id="instructions" rows="5" value={instructions} onChange={(e) => setInstructions(e.target.value)} required></textarea>
                    </div>

                    {/* APPLICATION PERIOD */}
                    <div className="row mb-3 applicationPeriodContainer">
                        <label className='required applicationPeriod' htmlFor="applicationPeriod">Application Period</label>
                        
                        <div className="col startDate">
                            <label className='required startDate' htmlFor="applicationPeriod">Starting date</label>
                            <input type="date" className="form-control" id="startDate" value={applicationPeriodStart} onChange={(e) => setApplicationPeriodStart(e.target.value)} required/>
                        </div>
                        <div className="col endDate">
                            <label className='required endDate' htmlFor="applicationPeriod">End date</label>
                            <input type="date" className="form-control" id="endDate" value={applicationPeriodEnd} onChange={(e) => setApplicationPeriodEnd(e.target.value)} required/>
                        </div>
                    </div>

                    {/* DEADLINE */}
                    <div className='mb-3'>
                        <label className='required deadline' htmlFor="deadline">Deadline</label>
                        <input type="date" className="form-control" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} required/>
                    </div>

                    <div className='mb-3'>
                        <label className='required requirements' htmlFor="requirements">Scholarship Requirements</label>
                        
                        <div className="requirement-section">
                            <div className="p-3">
                                {requirementsList.requirements.map((requirement, index) => {
                                    return (
                                        <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded bg-light">
                                            <span>{requirement.reqName} ({requirement.ftp})</span>
                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeRequirement(index)}>Remove</button>
                                        </div>
                                    )
                                })}
                            </div>
                            <button type="button" className="addRequirementBtn btn btn-danger m-3" onClick={addRequirementPopup}>Add requirement</button>
                        </div>
                        
                    </div>

                    <div className='option'>
                        <button type="button" className="cancelBtn btn btn-secondary" onClick={() => navigate('/postManagement')}>Cancel</button>
                        <button 
                            type="button" 
                            className={isEditMode ? "updateBtn btn btn-success" : "postBtn btn btn-success"} 
                            onClick={handleSubmit}
                        >
                            {isEditMode ? "Update Scholarship" : "Post Scholarship"}
                        </button>
                    </div>

                </div>
            </div>
            

             <div className="form-popup" id="myForm">
                <div className="form-container">
                    <h1>Add Requirement</h1>

                    <label htmlFor="Requirment Name"><b>Requirement Name</b></label>
                    <input type="text" placeholder="Requirement Name" value={requirementName} name="Requirement Name" onChange={(e) => setRequirementName(e.target.value)} required/>

                    
                    <select name="fileType" value={fileType} onChange={(e) => setFileType(e.target.value)}>
                        <option value="">-- File Type --</option>
                        <option value="pdf">pdf</option>
                        <option value="docx">docx</option>
                        <option value="xlsx">xlsx</option>
                    </select>

                    <button type="button" className="btn" onClick={() => addRequirement({reqName: requirementName, ftp: fileType})}>Add</button>
                    <button type="button" className="btn cancel" onClick={closeRequirementPopup}>Cancel</button>
                </div>
            </div>   

            <Footer />
        </div>
    )
}

export default PostDetails