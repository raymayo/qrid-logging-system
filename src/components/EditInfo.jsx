import React, { useState, useEffect } from 'react';

const EditInfo = ({ student, updateStudentInfo, closeEdit }) => {
    const [formData, setFormData] = useState({ ...student });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission (save changes)
    const handleSave = (e) => {
        e.preventDefault();
        updateStudentInfo(formData);  // Send the updated student info back to the parent
        closeEdit();  // Close the edit form
    };

    // Handle cancel (close the editor without saving)
    const handleCancel = () => {
        closeEdit();
    };

    return (
        <div className="modal">
            <form onSubmit={handleSave} className="bg-white p-4 rounded shadow-lg">
                <h3>Edit Student Info</h3>
                
                <div className="mb-4">
                    <label>Student No:</label>
                    <input 
                        type="text" 
                        name="studentNo" 
                        value={formData.studentNo} 
                        disabled 
                        className="p-2 border"
                    />
                </div>
                
                <div className="mb-4">
                    <label>Student Name:</label>
                    <input 
                        type="text" 
                        name="studentName" 
                        value={formData.studentName} 
                        onChange={handleChange} 
                        className="p-2 border"
                    />
                </div>
                
                <div className="mb-4">
                    <label>Year:</label>
                    <select
                        name="studentYear"
                        value={formData.studentYear}
                        onChange={handleChange}
                        className="p-2 border"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                
                <div className="mb-4">
                    <label>Course:</label>
                    <input
                        type="text"
                        name="studentCourse"
                        value={formData.studentCourse}
                        onChange={handleChange}
                        className="p-2 border"
                    />
                </div>
                
                <div className="mb-4">
                    <label>Set:</label>
                    <input
                        type="text"
                        name="studentSet"
                        value={formData.studentSet}
                        onChange={handleChange}
                        className="p-2 border"
                    />
                </div>

                <div className="flex gap-4">
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                        Save
                    </button>
                    <button type="button" onClick={handleCancel} className="p-2 bg-gray-500 text-white rounded">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditInfo;
