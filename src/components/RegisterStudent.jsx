import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import axios from 'axios';
// import { Button } from "@shadcn/ui";

//TODO add react hot toast

const RegisterStudent = () => {
	const [formData, setFormData] = useState({
		studentNo: '',
		studentLastName: '',
		studentFirstName: '',
		studentMiddleInitial: '',
		studentName: '', // Will be populated automatically
		studentYear: '',
		studentCourse: '',
		studentSet:''
	  });

	const divRef = useRef();

	const handleDownload = () => {
		html2canvas(divRef.current).then((canvas) => {
			const link = document.createElement('a');
			link.download = `${formData.studentName} QR Code.png`;
			link.href = canvas.toDataURL('image/png');
			link.click();
		});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
	
		// Update formData with the new value
		setFormData((prevFormData) => {
		  const updatedFormData = { ...prevFormData, [name]: value };
	
		  // Automatically combine the name fields into studentName
		  if (name === 'studentLastName' || name === 'studentFirstName' || name === 'studentMiddleInitial') {
			updatedFormData.studentName = `${updatedFormData.studentLastName}, ${updatedFormData.studentFirstName} ${updatedFormData.studentMiddleInitial}.`.trim();
		  }
	
		  return updatedFormData;
		});
	  };

	  const handleSubmit = (e) => {
		e.preventDefault();
		axios
		  .post('http://localhost:8000/api/users/', formData) // Adjust port if necessary
		  .then((response) => {
			console.log('User created:', response.data);
			// Optionally, clear the form or show a success message
			setFormData({
			  studentNo: '',
			  studentLastName: '',
			  studentFirstName: '',
			  studentMiddleInitial: '',
			  studentName: '',
			  studentYear: '',
			  studentCourse: '',
			  studentSet:''
			});
		  })
		  .catch((error) => {
			console.error('Error creating user:', error);
			// Optionally, show an error message to the user
		  });
	  };
	  
	return (
		<div className='w-full h-full flex flex-col justify-center items-center'>
		<div
			id="registerBox"
			className="container w-3/5 border border-zinc-200 p-6 rounded-2xl shadow grid grid-cols-2 gap-6">
			<div className='col-span-2 text-left'>
				<h1 className="text-xl font-semibold">Register student</h1>
				<p className='text-zinc-400'>Input the student's information and click submit button to get unique QR Code.</p>
			</div>
			<form onSubmit={handleSubmit} className="">
				<div className="w-full flex flex-col gap-4 shadow h-full justify-between">
					<div className='flex flex-col gap-3'>
					<div className="">
						<label className="block mb-1 text-sm font-medium">School ID</label>
						<input
							className="w-full bg-white border border-zinc-200 p-2 pl-3 text-base rounded-md shadow-sm placeholder-zinc-500 focus:border focus:border-black"
							name="studentNo"
							placeholder="Student Number"
							value={formData.studentNo}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='grid grid-cols-8 gap-2'>
						<div className='col-span-4'>
							<label className="block mb-1.5 text-sm font-medium">Last Name</label>
							<input
								className="w-full bg-white border border-zinc-200 p-2 pl-3 text-base rounded-md shadow placeholder-zinc-500 focus:border-black"
								type="text"
								name="studentLastName"
								placeholder='Dela Cruz'
								value={formData.studentLastName}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='col-start-5 col-end-8'>
							<label className="block mb-1.5 text-sm font-medium">First Name</label>
							<input
								className=" w-full bg-white border border-zinc-200 p-2 pl-3 text-base rounded-md shadow placeholder-zinc-500 focus:border-black"
								type="text"
								name="studentFirstName"
								placeholder='Juan'
								value={formData.studentFirstName}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='col-start-8 col-end-9'>
							<label className="block mb-1.5 text-sm font-medium">M.I.</label>
							<input
								className=" w-full bg-white border border-zinc-200 p-2 pl-3 text-base rounded-md shadow placeholder-zinc-500 focus:border-black"
								type="text"
								name="studentMiddleInitial"
								placeholder='M.'
								value={formData.studentMiddleInitial}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div>
						<label className="block mb-1.5 text-sm font-medium">
							Year Level
						</label>
						<select
							className="w-full border border-zinc-200 shadow-sm text-gray-900 rounded-md focus:border-black block text-base p-2 pl-3"
							name="studentYear"
							value={formData.studentYear}
							onChange={handleChange}
							required>
							<option value="" disabled>
								Select Year Level
							</option>
							<option value="1st Year">1st Year</option>
							<option value="2nd Year">2nd Year</option>
							<option value="3rd Year">3rd Year</option>
							<option value="4th Year">4th Year</option>
						</select>
					</div>
					<div>
						<label className="block mb-1.5 text-sm font-medium">Course</label>

						<select
							className="w-full border border-zinc-200 shadow-sm text-gray-900 rounded-md focus:border-black block text-base p-2 pl-3"
							name="studentCourse"
							value={formData.studentCourse}
							onChange={handleChange}
							required>
							<option value="" disabled>
								Select Course
							</option>
							<option value="BSBA HRM">BSBA HRM</option>
							<option value="BSBA FM">BSBA FM</option>
							<option value="BSA">BSA</option>
							<option value="BSCS">BSCS</option>
							<option value="BSED MATH & FIL">BSED MATH & FIL</option>
							<option value="BSED SOCSTUD">BSED SOCSTUD</option>
							<option value="BEED">BEED</option>
							<option value="CPE">CPE</option>
							<option value="BSHM">BSHM</option>
						</select>
					</div>
					<div>
						<label className="block mb-1.5 text-sm font-medium">Set</label>

						<select
							className="w-full border border-zinc-200 shadow-sm text-gray-900 rounded-md focus:border-black block text-base p-2 pl-3"
							name="studentSet"
							value={formData.studentSet}
							onChange={handleChange}
							required>
							<option value="" disabled>
								Select Set
							</option>
							<option value="Set A">Set A</option>
							<option value="Set B">Set B</option>
							<option value="Set C">Set C</option>
							<option value="Set D">Set D</option>
							<option value="Set E">Set E</option>
							<option value="Set F">Set F</option>
							<option value="Set G">Set G</option>
							<option value="Set H">Set H</option>
							<option value="Set I">Set I</option>
							<option value="Set J">Set J</option>
							<option value="Set K">Set K</option>
							<option value="Set L">Set L</option>
							<option value="Set M">Set M</option>
							<option value="Set N">Set N</option>
							<option value="Set O">Set O</option>
							<option value="Set P">Set P</option>
							<option value="Set Q">Set Q</option>
							<option value="Set R">Set R</option>
							<option value="Set S">Set S</option>
							<option value="Set T">Set T</option>
							<option value="Set U">Set U</option>
							<option value="Set V">Set V</option>
							<option value="Set X">Set X</option>
							<option value="Set Y">Set Y</option>
							<option value="Set Z">Set Z</option>
						</select>
					</div>
					</div>
					<button
				className="col-span-2 bg-zinc-900 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow h-9 px-4 py-2"
				type="submit"
				onClick={handleDownload}
				>
				Generate QR Code
			</button>
				</div>
				
			</form>
			<div className="qrContainer p-6 border border-zinc-200 rounded-md shadow bg-white-100" ref={divRef}>
				<QRCode
					size={256}
					style={{ height: '100%', maxWidth: '100%', width: '100%' }}
					value={formData.studentNo}
					viewBox={`0 0 256 256`}
					id="QRCode"
				/>
			</div>

		</div>
		</div>
	);
};

export default RegisterStudent;
