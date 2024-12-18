import React from 'react'
import Table from './Table.jsx'

const StudentManagement = () => {
    const students = [
        { studentNo: '123', studentName: 'John Doe', studentYear: '1', studentCourse: 'CS', studentSet: 'Set A' },
        { studentNo: '124', studentName: 'Jane Smith', studentYear: '2', studentCourse: 'IT', studentSet: 'Set B' },
        { studentNo: '125', studentName: 'Alice Johnson', studentYear: '3', studentCourse: 'Eng', studentSet: 'Set C' },
        { studentNo: '126', studentName: 'Bob Brown', studentYear: '4', studentCourse: 'Math', studentSet: 'Set D' },
        { studentNo: '127', studentName: 'Charlie White', studentYear: '2', studentCourse: 'Biology', studentSet: 'Set A' },
        { studentNo: '128', studentName: 'David Green', studentYear: '1', studentCourse: 'Physics', studentSet: 'Set B' },
        { studentNo: '129', studentName: 'Eva Black', studentYear: '3', studentCourse: 'Chemistry', studentSet: 'Set C' },
        { studentNo: '130', studentName: 'Frank Blue', studentYear: '4', studentCourse: 'Arts', studentSet: 'Set D' },
    ];
    
  return (
    <Table data={students}/>
    // <h1>hello</h1>
  )
}

export default StudentManagement