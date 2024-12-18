import React, { useState } from 'react';

const Table = ({ data }) => {
    const [filter, setFilter] = useState({
      studentNo: '',
      studentName: '',
      studentYear: '',
      studentCourse: '',
      studentSet: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5; // Number of rows to display per page
  
    // Filter data based on multiple criteria
    const filteredData = data.filter((item) => {
      return (
        (item.studentNo && item.studentNo.toLowerCase().includes(filter.studentNo.toLowerCase()) || !filter.studentNo) &&
        (item.studentName && item.studentName.toLowerCase().includes(filter.studentName.toLowerCase()) || !filter.studentName) &&
        (item.studentYear && item.studentYear.toLowerCase().includes(filter.studentYear.toLowerCase()) || !filter.studentYear) &&
        (item.studentCourse && item.studentCourse.toLowerCase().includes(filter.studentCourse.toLowerCase()) || !filter.studentCourse) &&
        (item.studentSet && item.studentSet.toLowerCase().includes(filter.studentSet.toLowerCase()) || !filter.studentSet)
      );
    });
  
    // Total pages
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  
    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  
    // Handle page change
    const handlePageChange = (newPage) => {
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };
  
    // Handle filter change
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilter({
        ...filter,
        [name]: value
      });
    };

    // Year options
    const years = ['1', '2', '3', '4'];
    
    // Course options
    const courses = ['CS', 'IT', 'Eng', 'Math', 'Biology', 'Physics', 'Chemistry', 'Arts'];

    return (
      <div>
        {/* Filters */}
        <div className="flex gap-4 mb-4">
          {/* Student No Filter */}
          <input
            type="text"
            name="studentNo"
            placeholder="Search by Student No"
            value={filter.studentNo}
            onChange={handleFilterChange}
            className="p-2 border"
          />
          
          {/* Student Name Filter */}
          <input
            type="text"
            name="studentName"
            placeholder="Search by Name"
            value={filter.studentName}
            onChange={handleFilterChange}
            className="p-2 border"
          />
          
          {/* Year Filter as Select */}
          <select
            name="studentYear"
            value={filter.studentYear}
            onChange={handleFilterChange}
            className="p-2 border"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          {/* Course Filter as Select */}
          <select
            name="studentCourse"
            value={filter.studentCourse}
            onChange={handleFilterChange}
            className="p-2 border"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>

          {/* Set Filter */}
          <input
            type="text"
            name="studentSet"
            placeholder="Search by Set"
            value={filter.studentSet}
            onChange={handleFilterChange}
            className="p-2 border"
          />
        </div>
  
        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Student No</th>
              <th className="border p-2">Student Name</th>
              <th className="border p-2">Year</th>
              <th className="border p-2">Course</th>
              <th className="border p-2">Set</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row, index) => (
                <tr key={index}>
                  <td className="border p-2">{row.studentNo}</td>
                  <td className="border p-2">{row.studentName}</td>
                  <td className="border p-2">{row.studentYear}</td>
                  <td className="border p-2">{row.studentCourse}</td>
                  <td className="border p-2">{row.studentSet}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border p-2 text-center">
                  No matching data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
  
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    );
};

export default Table;
