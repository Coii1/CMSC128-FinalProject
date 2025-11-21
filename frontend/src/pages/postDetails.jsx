//postDetails.jsx
import '../styles/postDetails.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { useState } from 'react'

function PostDetails() {
    const [postInformation, setPostInformation] = useState({});

    const [scholarshipTitle, setScholarshipTitle] = useState('');
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
    
    const postScholarship = (details) => {
        setPostInformation(details);
        //vv will be used for testing later and try to optimize
        console.log(postInformation);

        setScholarshipTitle('');
        setSlotsAvailable(0);
        setQualifications('');
        setBenefits('');
        setInstructions('');
        setApplicationPeriodStart('');
        setApplicationPeriodEnd('');
        setDeadline('');
        setRequirements({requirements: []});
    }

    const addRequirement = (requirement) => {
        let requirementsArray = requirementsList['requirements'];
        requirementsArray.push(requirement);
        setRequirements({requirements: requirementsArray});
        //vv will be used for testing later and try to optimize
        // console.log(requirementsList);
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

    return(
        <div className='postDetails'>
            <Header />

            <div className='postScholarshipContent'>
                <h2>Post new scholarship</h2>

                <div className='postScholarshipForm'>

                    <div className="mb-3">
                        <label className='required form-label' htmlFor="title">Scholarship title</label>
                        <input type="text" className="form-control title" id="title" onChange={(e) => setScholarshipTitle(e.target.value)} required/>
                         <p>for testing, will be removed later on</p>
                         <p>{scholarshipTitle} </p>
                    </div>

                    <div className='mb-3'>
                        <label className='required form-label' htmlFor="numSlots">Number Of Slots Available</label><br/>
                        <input type="number" id="numSlots" min={1} max={1000} onChange={(e) => setSlotsAvailable(e.target.value)} required/><br/>
                        <p>for testing, will be removed later on</p>
                        <p>{slotsAvailable} </p>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="qualifications" className="required form-label">Qualifications</label>
                        <textarea className="form-control" id="qualifications" rows="7" onChange={(e) => setQualifications(e.target.value)} required></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="benefits" className="required form-label">Benefits</label>
                        <textarea className="form-control" id="benefits" rows="5" onChange={(e) => setBenefits(e.target.value)} required></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="instructions" className="required form-label">Instructions</label>
                        <textarea className="form-control" id="instructions" rows="5" onChange={(e) => setInstructions(e.target.value)} required></textarea>
                    </div>

                    {/* APPLICATION PERIOD */}
                    <div class="row mb-3 applicationPeriodContainer">
                        <label className='required applicationPeriod' htmlFor="applicationPeriod">Application Period</label>
                        
                        <div class="col startDate">
                            <label className='required startDate' htmlFor="applicationPeriod">Starting date</label>
                            <input type="date" className="form-control" id = "startDate" onChange={(e) => setApplicationPeriodStart(e.target.value)} required/>
                        </div>
                        <div class="col endDate">
                            <label className='required endDate' htmlFor="applicationPeriod">End date</label>
                            <input type="date" className="form-control" id = "endDate" onChange={(e) => setApplicationPeriodEnd(e.target.value)} required/>
                        </div>
                    </div>

                    {/* DEADLINE */}
                    <div className='mb-3'>
                        <label className='required deadline' htmlFor="deadline">Deadline</label>
                        <input type="date" className="form-control" id = "deadline" onChange={(e) => setDeadline(e.target.value)} required/>
                    </div>

                    <div className='mb-3'>
                        <label className='required requirements' htmlFor="requirements">Scholarship Requirements</label>
                        <textarea class="form-control" id="instructions" rows="5" required></textarea>


                        
                        <div className = "requirement-section">
                            <div>
                                {requirementsList.requirements.map((requirement) => {
                                    return (
                                        <div>
                                            <p>for testing, will be removed later on</p>
                                            <p>{requirement.reqName} </p>
                                            <p>({requirement.ftp})</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <button type="button" className="addRequirementBtn btn btn-danger" onClick = {addRequirementPopup}>Add requirement</button>
                        </div>




                    </div>

                    <div className='option'>
                        <button type="button" className="cancelBtn btn btn-secondary">Cancel</button>
                        <button type="button" className="postBtn btn btn-success"  onClick = {() => postScholarship({
                            scholarshipTitleHolder: scholarshipTitle,
                            slotsAvailableHolder: slotsAvailable,
                            qualificationsHolder: qualifications,
                            benefitsHolder: benefits,
                            instructionsHolder: instructions,
                            applicationPeriodStartHolder: applicationPeriodStart,
                            applicationPeriodEndHolder: applicationPeriodEnd,
                            deadlineHolder: deadline,
                            requirementsHolder: requirementsList 
                            
                            })}>Post scholarship</button>
                    </div>

                </div>
 

                
                 
            </div>
            

             <div className="form-popup" id="myForm">
                <div className="form-container">
                    <h1>Add Requirement</h1>

                    <label htmlfor="Requirment Name"><b>Requirement Name</b></label>
                    <input type="text" placeholder="Requirement Name" value = {requirementName} name="Requirement Name" onChange={(e) => setRequirementName(e.target.value)} required/>

                    
                    <select name="fileType" onChange={(e) => setFileType(e.target.value)}>
                        <option value="">-- File Type --</option>
                        <option value="pdf">pdf</option>
                        <option value="docx">docx</option>
                        <option value="xlsx">xlsx</option>
                    </select>

                    <button type="button" className="btn" onClick = {() => addRequirement({reqName: requirementName, ftp: fileType})}>Add</button>
                    <button type="button" className="btn cancel" onClick={closeRequirementPopup}>Cancel</button>
                </div>
            </div>   

            <Footer />
        </div>
    )
}

export default PostDetails