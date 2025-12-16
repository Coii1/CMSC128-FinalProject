import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/ApplicationManagement.css';
import { FaChevronUp, FaChevronDown, FaUserCircle } from 'react-icons/fa';

const mockApplications = [
  {
    id: 1,
    scholarshipTitle: 'U.P. Presidential Scholarship',
    students: [
      {
        id: 1,
        name: 'Juan Dela Cruz',
        documents: [
          { label: 'Proof of Enrollment', link: '#' },
          { label: 'Application Form', link: '#' },
          { label: 'Application Form', link: '#' },
        ],
      },
      {
        id: 2,
        name: 'Juan Dela Cruz',
        documents: [],
      },
    ],
  },
  {
    id: 2,
    scholarshipTitle: '_____________________________',
    students: [
      { id: 3, name: '________________', documents: [] },
    ],
  },
];

function ApplicationManagement() {
  const [openScholarship, setOpenScholarship] = useState(null);
  const [openStudent, setOpenStudent] = useState(null);

  const toggleScholarship = (id) => {
    setOpenScholarship(openScholarship === id ? null : id);
    setOpenStudent(null);
  };

  const toggleStudent = (id) => {
    setOpenStudent(openStudent === id ? null : id);
  };

  return (
    <div className="applicationManagement">
      <Header />
      <div className="appMgmtContainer">
        <h2 className="appMgmtTitle">Application Management</h2>
        <div className="appMgmtTableWrapper">
          <div className="appMgmtTableHeader">
            <div className="appMgmtCol scholarshipCol">Scholarship Title</div>
            <div className="appMgmtCol studentCol">Student</div>
            <div className="appMgmtCol actionCol"></div>
          </div>
          {mockApplications.map((sch) => (
            <div key={sch.id} className="appMgmtAccordion">
              <div className="appMgmtRow">
                <span className="accordionIcon" onClick={() => toggleScholarship(sch.id)}>
                  {openScholarship === sch.id ? <FaChevronDown /> : <FaChevronUp />}
                </span>
                <div className="appMgmtCol scholarshipCol">{sch.scholarshipTitle}</div>
                <div className="appMgmtCol studentCol">
                  {sch.students.map((student) => (
                    <div key={student.id} className="studentRow">
                      <FaUserCircle className="studentIcon" />
                      <span className="studentName" onClick={() => toggleStudent(student.id)}>{student.name}</span>
                    </div>
                  ))}
                </div>
                <div className="appMgmtCol actionCol">
                  <span className="deleteIcon">🗑️</span>
                </div>
              </div>
              {openScholarship === sch.id && sch.students.map((student) => (
                <div key={student.id} className="appMgmtStudentAccordion">
                  {openStudent === student.id && (
                    <div className="appMgmtStudentDetails">
                      <table className="appMgmtDocsTable">
                        <tbody>
                          {student.documents.map((doc, idx) => (
                            <tr key={idx}>
                              <td>{doc.label}:</td>
                              <td><a href={doc.link}>Document link {idx + 1}</a></td>
                              <td className="markIncomplete">Mark as Incomplete</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="addRemarks">ADD REMARKS</div>
                      <button className="sendDocumentBtn">Send document</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ApplicationManagement;