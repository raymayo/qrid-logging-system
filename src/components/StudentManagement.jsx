import React, { useState } from 'react';
import Table from './Table.jsx'

const StudentManagement = () => {
    const [students, setStudents] = useState([
        { studentNo: '123', studentName: 'John Doe', studentYear: '1', studentCourse: 'CS', studentSet: 'Set A' },
        { studentNo: '124', studentName: 'Jane Smith', studentYear: '2', studentCourse: 'IT', studentSet: 'Set B' },
        { studentNo: '125', studentName: 'Alice Johnson', studentYear: '3', studentCourse: 'Eng', studentSet: 'Set C' },
        { studentNo: '126', studentName: 'Bob Brown', studentYear: '4', studentCourse: 'Math', studentSet: 'Set D' },
        { studentNo: '127', studentName: 'Charlie White', studentYear: '2', studentCourse: 'Biology', studentSet: 'Set A' },
        { studentNo: '128', studentName: 'David Green', studentYear: '1', studentCourse: 'Physics', studentSet: 'Set B' },
        { studentNo: '129', studentName: 'Eva Black', studentYear: '3', studentCourse: 'Chemistry', studentSet: 'Set C' },
        { studentNo: '130', studentName: 'Frank Blue', studentYear: '4', studentCourse: 'Arts', studentSet: 'Set D' },
        { studentNo: '131', studentName: 'Frank Blue', studentYear: '4', studentCourse: 'Arts', studentSet: 'Set D' },
        { studentNo: '132', studentName: 'Frank Blue', studentYear: '4', studentCourse: 'Arts', studentSet: 'Set D' },
        { studentNo: '133', studentName: 'Frank Blue', studentYear: '4', studentCourse: 'Arts', studentSet: 'Set D' },
    ]);

    const updateStudentInfo = (updatedStudent) => {
      setStudents((prevStudents) =>
          prevStudents.map((student) =>
              student.studentNo === updatedStudent.studentNo ? updatedStudent : student
          )
      );
  };
    
  return (
    <div className='border border-red-500 h-full grid p-12'>
    <Table data={students} updateStudentInfo={updateStudentInfo} />
    </div>
    // <h1>hello</h1>
  )
}

export default StudentManagement