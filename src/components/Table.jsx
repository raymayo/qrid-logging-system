import React, { useState } from 'react';
import EditInfo from './EditInfo'; // Assuming you have the EditInfo component
import { ChevronLeft, ChevronRight, SquarePen } from 'lucide-react';

const Table = ({ data, updateStudentInfo }) => {
    const [filter, setFilter] = useState({
        studentNo: '',
        studentName: '',
        studentYear: '',
        studentCourse: '',
        studentSet: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [editStudent, setEditStudent] = useState(null); // Track student being edited
    const rowsPerPage = 9; // Number of rows to display per page

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
            [name]: value,
        });
    };

    // Handle edit click
    const handleEditClick = (student) => {
        setEditStudent(student);
    };

    // Year options
    const years = ['1', '2', '3', '4'];

    // Course options
    const courses = ['CS', 'IT', 'Eng', 'Math', 'Biology', 'Physics', 'Chemistry', 'Arts'];

    return (
        <div className='flex flex-col gap-4'>
          <div>
            <h1 className='font-bold text-2xl'>Student Management</h1>
            <p className='text-zinc-500'>Create student QR Code and and post to database.</p>
          </div>
            {/* Filters */}
            <div className="flex gap-4 w-full border border-zinc-200 p-4 rounded-lg shadow-sm">
                {/* Student No Filter */}
                <div className='flex flex-col w-full'>
                  <label className='text-xs text-zinc-500 font-bold pb-2'>Filter ID</label>
                <input
                    type="text"
                    name="studentNo"
                    placeholder="Search by Student No"
                    value={filter.studentNo}
                    onChange={handleFilterChange}
                    className="p-2 border border-zinc-200 rounded-lg shadow-sm"
                />
                </div>

                {/* Student Name Filter */}
                <div className='flex flex-col w-full'>
                <label className='text-xs text-zinc-500 font-bold pb-2'>Filter Name</label>
                <input
                    type="text"
                    name="studentName"
                    placeholder="Search by Name"
                    value={filter.studentName}
                    onChange={handleFilterChange}
                    className="p-2 border border-zinc-200 rounded-lg shadow-sm"
                    />
                    </div>

                {/* Year Filter */}
                <div className='flex flex-col w-full'>
                <label className='text-xs text-zinc-500 font-bold pb-2'>Filter Year Level</label>
                <select
                    name="studentYear"
                    value={filter.studentYear}
                    onChange={handleFilterChange}
                    className="p-2 border border-zinc-200 rounded-lg shadow-sm"
                >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                </div>

                {/* Course Filter */}
                <div className='flex flex-col w-full'>
                <label className='text-xs text-zinc-500 font-bold pb-2'>Filter Course</label>
                <select
                    name="studentCourse"
                    value={filter.studentCourse}
                    onChange={handleFilterChange}
                    className="p-2 border border-zinc-200 rounded-lg shadow-sm"
                >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                        <option key={course} value={course}>
                            {course}
                        </option>
                    ))}
                </select>
                </div>

                {/* Set Filter */}
                <div className='flex flex-col w-full'>
                <label className='text-xs text-zinc-500 font-bold pb-2'>Filter Set</label>
                <input
                    type="text"
                    name="studentSet"
                    placeholder="Search by Set"
                    value={filter.studentSet}
                    onChange={handleFilterChange}
                    className="p-2 border border-zinc-200 rounded-lg shadow-sm"
                />
                </div>
            </div>
            <div className='border border-zinc-200 rounded-md shadow h-full flex flex-col justify-between'>

            {/* Table */}
            <table className="w-full border-collapse">
                <thead>
                    <tr className='border-b border-zinc-200 rounded-t-md'>
                        <th className="pl-5 p-4 text-left font-semibold text-base text-zinc-500">Student No</th>
                        <th className="pl-5 p-4 text-left font-semibold text-base text-zinc-500">Student Name</th>
                        <th className="pl-5 p-4 text-left font-semibold text-base text-zinc-500">Year</th>
                        <th className="pl-5 p-4 text-left font-semibold text-base text-zinc-500">Course</th>
                        <th className="pl-5 p-4 text-left font-semibold text-base text-zinc-500">Set</th>
                        <th className="pl-5 p-4 text-left font-semibold text-base text-zinc-500">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.length > 0 ? (
                        currentRows.map((row, index) => (
                            <tr key={index} className='border-b border-zinc-200'>
                                <td className="pl-5 p-2 text-left font-normal text-zinc-950">{row.studentNo}</td>
                                <td className="pl-5 p-2 text-left font-normal text-zinc-950">{row.studentName}</td>
                                <td className="pl-5 p-2 text-left font-normal text-zinc-950">{row.studentYear}</td>
                                <td className="pl-5 p-2 text-left font-normal text-zinc-950">{row.studentCourse}</td>
                                <td className="pl-5 p-2 text-left font-normal text-zinc-950">{row.studentSet}</td>
                                <td className="pl-5 p-2 text-left font-normal text-zinc-950">
                                    <button
                                        onClick={() => handleEditClick(row)}
                                        className="p-2 bg-zinc-50 border border-zinc-200 text-zinc-950 rounded-lg shadow-sm"
                                    >
                                        <SquarePen size={20}/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="border p-2 border-zinc-200 text-center">
                                No matching data found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex gap-2 items-end p-4 justify-end">
              <span className='mr-12'>
                  Page {currentPage} of {totalPages}
              </span>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 bg-zinc-100 text-zinc-950 border border-zinc-300 rounded-lg shadow-sm cursor-pointer"
                    >
                    <ChevronLeft />
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-zinc-100 text-zinc-950 border border-zinc-300 rounded-lg shadow-sm cursor-pointer"
                    >
                    <ChevronRight />
                </button>
            </div>
                  </div>

            {/* Edit Info Component */}
            {editStudent && (
                <EditInfo
                    student={editStudent}
                    updateStudentInfo={updateStudentInfo}
                    closeEdit={() => setEditStudent(null)}
                />
            )}
        </div>
    );
};

export default Table;
