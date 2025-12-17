//ScholarshipRequirements.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/HeaderforStudent.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/scholarshipRequirements.css';

function ScholarshipRequirements() {
  const location = useLocation();
  const fileInputRef = useRef(null);
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scholarship, setScholarship] = useState(null);

  // useEffect(() => {
  //   if (location.state && location.state.scholarship) {
  //     const sch = location.state.scholarship;
  //     setScholarship(sch);
  //     try {
  //       const parsedRequirements = JSON.parse(sch.requirements);
  //       const formattedRequirements = parsedRequirements.map((req, index) => ({
  //         id: index + 1,
  //         name: req.reqName,
  //         ftp: req.ftp,
  //         files: [],
  //         feedback: ""
  //       }));
  //       setRequirements(formattedRequirements);
  //     } catch (e) {
  //       setRequirements([]);
  //     }
  //     setLoading(false);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [location.state]);

  useEffect(() => {
  if (!location.state?.scholarship) {
    setLoading(false);
    return;
  }

  const sch = location.state.scholarship;
  setScholarship(sch);

  try {
    const parsed = JSON.parse(sch.requirements);
    setRequirements(
      parsed.map((req, i) => ({
        id: i + 1,
        name: req.reqName,
        ftp: req.ftp,
        files: [],
        feedback: ""
      }))
    );
  } catch (err) {
    console.error("Invalid requirements JSON", err);
    setRequirements([]);
  }

  setLoading(false);
}, [location.state]);



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


// const [requirements, setRequirements] = useState([
//   // { id: 1, name: "Birth Certificate", feedback: "", files: [] },
//   // { id: 2, name: "Transcript of Records", feedback: "", files: [] },
//   // { id: 3, name: "Certificate of Indigency", feedback: "", files: [] }
// ]);