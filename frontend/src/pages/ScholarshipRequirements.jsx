//Application.jsx
import React, { useState, useRef } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/scholarshipRequirements.css'

// Our app
function ScholarshipRequirements() {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Opens the file dialog, click() is built in 
  };

  const handleFileChange = (event) => {
    // const docName = document.getElementById('1');
    // docName.style.display = 'none';
    setSelectedFiles(Array.from(event.target.files)); // Store selected files
  };


  return ( 
     <div>
      <Header />

      <h2 id = 'headingOfPage'>Required Documents</h2>

        <div class = 'scholarshipReqBlock'>
            <p id = '1'>Document_name</p>
            <div>
              {selectedFiles.length > 0 && (
                <ul>
                  {/* {requirementsList.requirements.map((requirement) => {
                                    return (
                                        <div>
                                            <p>for testing, will be removed later on</p>
                                            <p>{requirement.reqName} </p>
                                            <p>({requirement.ftp})</p>
                                        </div>
                                    )
                                })} */}
                                {/* from postDetails */}
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <button class = 'filepond-button' onClick={handleButtonClick}>UPLOAD</button>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
        </div>

      <Footer />
    
    </div>


  )
};

export default ScholarshipRequirements