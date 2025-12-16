//Application.jsx
import React, { useState, useRef , useEffect, Fragment } from 'react'
import api from '../api.js'

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

  const [requirements, setRequirements] = useState([
]);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchScholarship = async () => {
    try {
      const response = await api.get('/scholarships');
      // Example: get scholarship with id = 2
      const scholarship = response.data.find(s => s.id === 2);
      if (!scholarship) return;
      // Parse requirements string into JS array
      const parsedRequirements = JSON.parse(scholarship.requirements);

      // Convert DB format → React format
      const formattedRequirements = parsedRequirements.map((req, index) => ({
        id: index + 1,
        name: req.reqName,
        ftp: req.ftp,
        files: [],
        feedback: ""
      }));
      setRequirements(formattedRequirements);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching scholarship:", error);
    }
  };

  fetchScholarship();
}, []);


  const handleFileChange = (id, event) => {
    const files = Array.from(event.target.files);
    setRequirements(prev =>
      prev.map(req =>
        req.id === id ? { ...req, files } : req //update only the file property of req
      )
    );
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    requirements.forEach(req => {
      req.files.forEach(file => {
        formData.append(req.name, file);
      });
    });

    await api.post("/submit-scholarship", formData);
  };


  return ( 
     <div>
      <Header />

      <h2 id = 'headingOfPage'>Required Documents</h2>

        {requirements.map(req => (
          <div className="scholarshipReqBlock" key={req.id}>
            <p className="requirement-feedback">{req.feedback || "No feedback yet"}</p>
            <div className = "upload-button-with-name">
              <label className="filepond-button">
                UPLOAD
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileChange(req.id, e)}
                />
              </label>
              <p className="requirement-name">{req.name}</p>
            </div>

            {req.files.length > 0 && (
              <div className ="uploaded-file-name">
                {req.files.map((file, index) => (
                <div key={index}>
                  <p>{file.name} </p>
                </div>
                ))}
              </div>
            )}

            {/* <label className="filepond-button">
              UPLOAD
              <input
                type="file"
                hidden
                onChange={(e) => handleFileChange(req.id, e)}
              />
            </label> */}
          </div>
        ))}
        {/* onclick?? */}
        
        <button className="submit-requirement-button" onClick={handleSubmit}>
          Submit
        </button>

      <Footer />
    </div>
  )
};

export default ScholarshipRequirements


// cons[requirements, setRequirements] = useState([
//   // { id: 1, name: "Birth Certificate", feedback: "", files: [] },
//   // { id: 2, name: "Transcript of Records", feedback: "", files: [] },
//   // { id: 3, name: "Certificate of Indigency", feedback: "", files: [] }
// ]);t 