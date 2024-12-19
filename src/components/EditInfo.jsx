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
		updateStudentInfo(formData); // Send the updated student info back to the parent
		closeEdit(); // Close the edit form
	};

	// Handle cancel (close the editor without saving)
	const handleCancel = () => {
		closeEdit();
	};

	return (
		<div className="modal absolute top-0 left-0 bg-zinc-950 w-screen h-screen grid place-items-center bg-opacity-80">
			<form
				onSubmit={handleSave}
				className="bg-white w-3/6 p-8 rounded-lg shadow-lg border border-zinc-200 flex flex-col gap-4">
				<div>
					<h3 className="text-2xl font-semibold">Edit Student Info</h3>
					<p className="text-zinc-500">
						Change the data in the input field to edit student details.
					</p>
				</div>
				<div className='flex flex-col gap-1'>
					<div className="mb-4 flex flex-col gap-1">
						<label>Student No:</label>
						<input
							type="text"
							name="studentNo"
							value={formData.studentNo}
							disabled
							className="p-2 border border-zinc-200 rounded-md shadow-sm bg-zinc-200 cursor-not-allowed"
						/>
					</div>

					<div className="mb-4 flex flex-col gap-1">
						<label>Student Name:</label>
						<input
							type="text"
							name="studentName"
							value={formData.studentName}
							onChange={handleChange}
							className="p-2 border border-zinc-200 rounded-md shadow-sm"
						/>
					</div>

					<div className="mb-4 flex flex-col gap-1">
						<label>Year:</label>
						<select
							name="studentYear"
							value={formData.studentYear}
							onChange={handleChange}
							className="p-2 border border-zinc-200 rounded-md shadow-sm">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</div>

					<div className="mb-4 flex flex-col gap-1">
						<label>Course:</label>
						<input
							type="text"
							name="studentCourse"
							value={formData.studentCourse}
							onChange={handleChange}
							className="p-2 border border-zinc-200 rounded-md shadow-sm"
						/>
					</div>

					<div className="mb-4 flex flex-col gap-1">
						<label>Set:</label>
						<input
							type="text"
							name="studentSet"
							value={formData.studentSet}
							onChange={handleChange}
							className="p-2 border border-zinc-200 rounded-md shadow-sm"
						/>
					</div>

					<div className="flex gap-4 self-end">
						<button
							type="button"
							onClick={handleCancel}
							className="px-4 py-2 bg-zinc-50 text-zinc-950 rounded-md shadow-sm border border-zinc-200">
							Cancel
						</button>
                        <button
							type="submit"
							className="px-4 py-2 bg-zinc-950 text-white rounded-md shadow-sm">
							Save
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditInfo;
