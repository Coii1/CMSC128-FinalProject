// import { useState } from 'react'
// import { FaChevronUp, FaChevronDown, FaUserCircle } from 'react-icons/fa'
// import { RiDeleteBin5Line } from "react-icons/ri";
// import '../styles/ApplicationManagement.css'

// // DUMMY DATA (TO BE REMOVED)
// const dummyApplications = [
//   {
//     id: 1,
//     scholarshipTitle: 'U.P. Presidential Scholarship',
//     students: [
//       {
//         id: 101,
//         name: 'Juan Dela Cruz',
//         documents: [
//           { label: 'Proof of Enrollment', link: '#' },
//           { label: 'Application Form', link: '#' },
//           { label: 'Application Form', link: '#' }
//         ]
//       },
//       {
//         id: 102,
//         name: 'Maria Santos',
//         documents: []
//       }
//     ]
//   },
//   {
//     id: 2,
//     scholarshipTitle: 'Academic Excellence Scholarship',
//     students: [
//       {
//         id: 201,
//         name: 'Pedro Penduko',
//         documents: [
//           { label: 'Proof of Enrollment', link: '#' }
//         ]
//       }
//     ]
//   }
// ]

// function AdminAppAccordion({ applications, onDeleteClick }) {
//     // Tracking ONE open item
//     const [openAppId, setOpenAppId] = useState(null)

//     const toggleAccordion = (id) => {
//         setOpenAppId(openAppId === id ? null : id)
//     }

//     return (
//         <div>
//             {applications.map((app) => {
//                 // Get the student data
//                 // Assume the list is already filtered to the current user, so we take the first one.
//                 const studentData = app.students && app.students.length > 0 ? app.students[0] : null;

//                 return (
//                     <div key={app.id} className="appMgmtAccordion">

//                     {/* MAIN ROW */}
//                     <div className="appMgmtRow">
                        
//                         <span 
//                             className="accordionIcon" 
//                             onClick={() => toggleAccordion(app.id)}
//                         >
//                             {openAppId === app.id ? <FaChevronUp /> : <FaChevronDown />}
//                         </span>

//                         <div 
//                             className="appMgmtCol scholarshipCol"
//                             onClick={() => toggleAccordion(app.id)}
//                             style={{ cursor: 'pointer' }} 
//                         >
//                             {/* SCHOLARSHIP TITLE */}
//                             {app.scholarshipTitle || app.scholarship?.title || "Scholarship Title"}
//                         </div>

//                         <div className="appMgmtCol studentCol">
//                             <div className="studentRow" style={{ cursor: 'default' }}>
//                                 <FaUserCircle className="studentIcon" />
//                                 <span className="studentName" style={{ textDecoration: 'none', cursor: 'default' }}>
                                    
//                                     {studentData?.name || "Student"}
//                                 </span>
//                             </div>
//                         </div>

//                         {/* DELETE ICON */}
//                         <div className="appMgmtCol actionCol">
//                             <span 
//                                 className="deleteIcon" 
//                                 data-bs-toggle="modal" 
//                                 data-bs-target="#deleteModal" 
//                                 onClick={() => onDeleteClick(app.id)}
//                             >
//                                 <RiDeleteBin5Line />
//                             </span>
//                         </div>
//                     </div>

//                     {/* EXPANDED DETAILS */}
//                     {openAppId === app.id && (
//                         <div className="appMgmtStudentAccordion">
//                             <div className="appMgmtStudentDetails">

//                                 <table className="appMgmtDocsTable">
//                                 <tbody>
//                                     {/* Check studentData.documents instead of app.documents */}
//                                     {studentData && studentData.documents && studentData.documents.length > 0 ? (
//                                         studentData.documents.map((doc, idx) => (
//                                         <tr key={doc.id || idx}>
//                                             <td>
//                                                 {doc.label || doc.requirement_name || `Document ${idx + 1}`}
//                                             </td>
//                                             {/* <td>
//                                                 {doc.link || doc.file ? (
//                                                     <a href={doc.link || doc.file} target="_blank" rel="noreferrer">
//                                                         View File
//                                                     </a>
//                                                 ) : (
//                                                     <span style={{color: '#999'}}>No file uploaded</span>
//                                                 )}
//                                             </td> */}
//                                             <td style={{ 
//                                                 textAlign: 'right', 
//                                                 color: doc.verified ? 'green' : '#c0392b',
//                                                 fontWeight: 'bold',
//                                                 fontSize: '0.9rem'
//                                             }}>
//                                                 {doc.verified ? "VERIFIED" : "PENDING REVIEW"}
//                                             </td>
//                                         </tr>
//                                         ))
//                                     ) : (
//                                         <tr>
//                                             <td colSpan="3" style={{ padding: '10px', fontStyle: 'italic', color: '#666' }}>
//                                                 No documents uploaded yet.
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                                 </table>

//                                 {/* Get status from studentData */}
//                                 <div className="addRemarks">
//                                     Remarks: {studentData?.status ? studentData.status.toUpperCase() : "SUBMITTED"}
//                                 </div>
                                
//                             </div>
//                         </div>
//                     )}
//                     </div>
//                 );
//             })}
//         </div>
//     )
// }

// export default AdminAppAccordion

import { useState } from 'react'
import { FaChevronUp, FaChevronDown, FaUserCircle } from 'react-icons/fa'
import { RiDeleteBin5Line } from "react-icons/ri";
import '../styles/ApplicationManagement.css'
import AdminApplicationMgmt from '../pages/AdminApplicationMgmt';

// 🔧 PATCH: add `verified` field per document
const dummyApplications = [
  {
    id: 1,
    scholarshipTitle: 'U.P. Presidential Scholarship',
    students: [
      {
        id: 101,
        name: 'Juan Dela Cruz',
        status: 'submitted',
        documents: [
          { id: 1, label: 'Proof of Enrollment', link: '#', verified: false },
          { id: 2, label: 'Application Form', link: '#', verified: true },
          { id: 3, label: 'Transcript of Records', link: '#', verified: false }
        ]
      }
    ]
  },
  {
    id: 2,
    scholarshipTitle: 'Academic Excellence Scholarship',
    students: [
      {
        id: 201,
        name: 'Pedro Penduko',
        status: 'submitted',
        documents: [
          { id: 4, label: 'Proof of Enrollment', link: '#', verified: false }
        ]
      }
    ]
  }
]

function AdminAppAccordion({ applications = dummyApplications, onDeleteClick }) {
    // 🔧 PATCH: local editable state for admin actions
    const [appData, setAppData] = useState(applications)

    const [openAppId, setOpenAppId] = useState(null)

    const toggleAccordion = (id) => {
        setOpenAppId(openAppId === id ? null : id)
    }

    // 🔧 PATCH: toggle verified / not verified
        const toggleVerifyDocument = (appId, studentId, docIndex) => {
        setAppData(prev =>
            prev.map(app =>
                app.id !== appId
                    ? app
                    : {
                        ...app,
                        students: app.students.map(student =>
                            student.id !== studentId
                                ? student
                                : {
                                    ...student,
                                    documents: student.documents.map((doc, index) =>
                                        index !== docIndex
                                            ? doc
                                            : { ...doc, verified: !doc.verified }
                                    )
                                }
                        )
                    }
            )
        )
    }

    return (
        <div>
            {appData.map((app) => {

                const studentData =
                    app.students && app.students.length > 0
                        ? app.students[0]
                        : null

                return (
                    <div key={app.id} className="appMgmtAccordion">

                        {/* MAIN ROW */}
                        <div className="appMgmtRow">
                            <span
                                className="accordionIcon"
                                onClick={() => toggleAccordion(app.id)}
                            >
                                {openAppId === app.id ? <FaChevronUp /> : <FaChevronDown />}
                            </span>

                            <div
                                className="appMgmtCol scholarshipCol"
                                onClick={() => toggleAccordion(app.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {app.scholarshipTitle || "Scholarship Title"}
                            </div>

                            <div className="appMgmtCol studentCol">
                                <div className="studentRow">
                                    <FaUserCircle className="studentIcon" />
                                    <span className="studentName">
                                        {studentData?.name || "Student"}
                                    </span>
                                </div>
                            </div>

                            <div className="appMgmtCol actionCol">
                                <span
                                    className="deleteIcon"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteModal"
                                    onClick={() => onDeleteClick(app.id)}
                                >
                                    <RiDeleteBin5Line />
                                </span>
                            </div>
                        </div>

                        {/* EXPANDED DETAILS */}
                        {openAppId === app.id && (
                            <div className="appMgmtStudentAccordion">
                                <div className="appMgmtStudentDetails">

                                    <table className="appMgmtDocsTable">
                                        <tbody>
                                            {studentData?.documents?.length > 0 ? (
                                                studentData.documents.map((doc, idx) => (
                                                    <tr key={doc.id || idx}>
                                                        <td>
                                                            {doc.label || `Document ${idx + 1}`}
                                                        </td>

                                                        {/* STATUS */}
                                                        <td
                                                            style={{
                                                                textAlign: 'right',
                                                                color: doc.verified ? 'green' : '#c0392b',
                                                                fontWeight: 'bold',
                                                                fontSize: '0.9rem'
                                                            }}
                                                        >
                                                            {doc.verified ? "VERIFIED" : "NOT VERIFIED"}
                                                        </td>

                                                        {/* 🔧 PATCH: ADMIN ACTION */}
                                                        <td style={{ textAlign: 'right' }}>
                                                            <button
                                                                className="verifyBtn"
                                                                onClick={() =>
                                                                toggleVerifyDocument(
                                                                    app.id,
                                                                    studentData.id,
                                                                    idx   // ✅ use index instead of id
                                                                )
                                                            }
                                                            >
                                                                {doc.verified ? "Unverify" : "Verify"}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" style={{ fontStyle: 'italic', color: '#666' }}>
                                                        No documents uploaded yet.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                    <div className="addRemarks">
                                        Remarks: {studentData?.status?.toUpperCase() || "SUBMITTED"}
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default AdminAppAccordion
