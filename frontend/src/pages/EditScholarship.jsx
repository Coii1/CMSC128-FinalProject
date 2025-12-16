import '../styles/postDetails.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditScholarship() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [scholarshipTitle, setScholarshipTitle] = useState('');
    const [scholarshipType, setScholarshipType] = useState('government');
    const [slotsAvailable, setSlotsAvailable] = useState(0);
    const [qualifications, setQualifications] = useState('');
    const [benefits, setBenefits] = useState('');
    const [instructions, setInstructions] = useState('');
    const [applicationPeriodStart, setApplicationPeriodStart] = useState('');
    const [applicationPeriodEnd, setApplicationPeriodEnd] = useState('');
    const [deadline, setDeadline] = useState('');
    
    const [requirementsList, setRequirements] = useState({ requirements: [] });
    const [requirementName, setRequirementName] = useState('');
    const [fileType, setFileType] = useState('');

    // Helper to format dates for input fields (YYYY-MM-DD)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    // SIMULATED FETCH, TO BE REMOVED
    useEffect(() => {
        const mockScholarships = [
            { 
                id: 1, 
                title: 'Academic Excellence Scholarship', 
                type: 'government',
                slots: 5, 
                qualifications: 'Must have a GWA of 1.5 or higher.',
                benefits: 'Full tuition + 10k allowance.',
                instructions: 'Submit documents to the registrar.',
                requirements: JSON.stringify([{reqName: "Report Card", ftp: "pdf"}]),
                start_date: '2024-01-01',
                end_date: '2024-01-30',
                deadline: '2024-02-15',
                datePosted: new Date(), 
                author: 'John Doe' 
            },
            { 
                id: 2, 
                title: 'Financial Aid Program', 
                type: 'private',
                slots: 20, 
                qualifications: 'Family income below 200k.',
                benefits: '50% tuition discount.',
                instructions: 'Apply online.',
                requirements: JSON.stringify([{reqName: "ITR", ftp: "pdf"}]),
                start_date: '2024-03-01',
                end_date: '2024-03-30',
                deadline: '2024-04-15',
                datePosted: new Date(), 
                author: 'Jane Dela Cruz' 
            }
        ];

        const data = mockScholarships.find(s => s.id == id);

        if (data) {
            setScholarshipTitle(data.title);
            setScholarshipType(data.type);
            setSlotsAvailable(data.slots);
            setQualifications(data.qualifications);
            setBenefits(data.benefits);
            setInstructions(data.instructions);
            
            // Format dates
            setApplicationPeriodStart(formatDate(data.start_date));
            setApplicationPeriodEnd(formatDate(data.end_date));
            setDeadline(formatDate(data.deadline));

            // Parse requirements
            if (typeof data.requirements === 'string') {
                    setRequirements({ requirements: JSON.parse(data.requirements) });
            } else {
                    setRequirements({ requirements: data.requirements || [] });
            }
        } else {
            console.error("Scholarship not found in mock data");
            alert("Scholarship not found.");
        }

    }, [id]);

    // TO BE REMOVED
    const updateScholarship = async () => {
        const payload = {
            title: scholarshipTitle,
            type: scholarshipType,
            slots: Number(slotsAvailable),
            // ...
        };

        console.log("Mock Update Payload:", payload);
        alert("Scholarship updated successfully! (Mock)");
        navigate('/posts'); 
    };

    const addRequirement = (requirement) => {
        let requirementsArray = [...requirementsList.requirements];
        requirementsArray.push(requirement);
        setRequirements({ requirements: requirementsArray });
        document.getElementById("myForm").style.display = "none";
        setRequirementName('');
        setFileType('');
    }

    const addRequirementPopup = () => {
        document.getElementById("myForm").style.display = "block";
    }

    const closeRequirementPopup = () => {
        document.getElementById("myForm").style.display = "none";
    }

    const removeRequirement = (index) => {
        const updatedReqs = requirementsList.requirements.filter((_, i) => i !== index);
        setRequirements({ requirements: updatedReqs });
    }

    return (
        <div className='postDetails'>
            <Header />

            <div className='postScholarshipContent'>
                <h2>Edit Scholarship</h2> 

                <div className='postScholarshipForm'>
                    {/* Scholarship Title */}
                    <div className="mb-3">
                        <label className='required form-label' htmlFor="title">Scholarship title</label>
                        <input type="text" className="form-control title" id="title" 
                            value={scholarshipTitle} 
                            onChange={(e) => setScholarshipTitle(e.target.value)} required 
                        />
                    </div>

                    {/* Scholarship Type */}
                    <div className='mb-3'>
                        <label className='scholarshipType required form-label' htmlFor="type">Scholarship Type</label>
                        <select className="form-select" id="type" 
                            value={scholarshipType} 
                            onChange={(e) => setScholarshipType(e.target.value)} required
                        >
                            <option value="government">Government-Funded</option>
                            <option value="private">Private</option>
                        </select>
                    </div>

                    {/* Slots */}
                    <div className='mb-3'>
                        <label className='required form-label' htmlFor="numSlots">Number Of Slots Available</label><br />
                        <input type="number" id="numSlots" min={1} max={1000} 
                            value={slotsAvailable} 
                            onChange={(e) => setSlotsAvailable(e.target.value)} required 
                        /><br />
                    </div>

                    {/* Qualifications */}
                    <div className="mb-3">
                        <label htmlFor="qualifications" className="required form-label">Qualifications</label>
                        <textarea className="form-control" id="qualifications" rows="7" 
                            value={qualifications} 
                            onChange={(e) => setQualifications(e.target.value)} required
                        ></textarea>
                    </div>

                    {/* Benefits */}
                    <div className="mb-3">
                        <label htmlFor="benefits" className="required form-label">Benefits</label>
                        <textarea className="form-control" id="benefits" rows="5" 
                            value={benefits} 
                            onChange={(e) => setBenefits(e.target.value)} required
                        ></textarea>
                    </div>

                    {/* Instructions */}
                    <div className="mb-3">
                        <label htmlFor="instructions" className="required form-label">Instructions</label>
                        <textarea className="form-control" id="instructions" rows="5" 
                            value={instructions} 
                            onChange={(e) => setInstructions(e.target.value)} required
                        ></textarea>
                    </div>

                    {/* Dates */}
                    <div className="row mb-3 applicationPeriodContainer">
                        <label className='required applicationPeriod' htmlFor="applicationPeriod">Application Period</label>
                        <div className="col startDate">
                            <label className='required startDate' htmlFor="applicationPeriod">Starting date</label>
                            <input type="date" className="form-control" id="startDate" 
                                value={applicationPeriodStart} 
                                onChange={(e) => setApplicationPeriodStart(e.target.value)} required 
                            />
                        </div>
                        <div className="col endDate">
                            <label className='required endDate' htmlFor="applicationPeriod">End date</label>
                            <input type="date" className="form-control" id="endDate" 
                                value={applicationPeriodEnd} 
                                onChange={(e) => setApplicationPeriodEnd(e.target.value)} required 
                            />
                        </div>
                    </div>

                    <div className='mb-3'>
                        <label className='required deadline' htmlFor="deadline">Deadline</label>
                        <input type="date" className="form-control" id="deadline" 
                            value={deadline} 
                            onChange={(e) => setDeadline(e.target.value)} required 
                        />
                    </div>

                    {/* Requirements List */}
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

                    {/* Update/Cancel Buttons */}
                    <div className='option'>
                        <button type="button" className="cancelBtn btn btn-secondary" onClick={() => navigate('/posts')}>Cancel</button>
                        
                        {/* Update Button */}
                        <button type="button" className="updateBtn btn btn-success" onClick={() => updateScholarship()}>
                            Update Scholarship
                        </button>
                    </div>

                </div>
            </div>

            {/* Document Type */}
            <div className="form-popup" id="myForm">
                <div className="form-container">
                    <h1>Add Requirement</h1>
                    <label htmlFor="Requirment Name"><b>Requirement Name</b></label>
                    <input type="text" placeholder="Requirement Name" value={requirementName} name="Requirement Name" onChange={(e) => setRequirementName(e.target.value)} required />
                    <select name="fileType" value={fileType} onChange={(e) => setFileType(e.target.value)}>
                        <option value="">-- File Type --</option>
                        <option value="pdf">pdf</option>
                        <option value="docx">docx</option>
                        <option value="xlsx">xlsx</option>
                    </select>
                    <button type="button" className="btn" onClick={() => addRequirement({ reqName: requirementName, ftp: fileType })}>Add</button>
                    <button type="button" className="btn cancel" onClick={closeRequirementPopup}>Cancel</button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default EditScholarship