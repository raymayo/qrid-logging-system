import React, { useState, useEffect } from 'react';
import './App.css';
import RegisterStudent from './components/RegisterStudent.jsx';
import ReadQR from './components/ReadQR.jsx';
import Admin from './components/Admin.jsx';
import AdminLogin from './components/AdminLogin.jsx'; // Import the AdminLogin component
import { Sidebar, SidebarItem } from './components/Sidebar';
import { UserPlus, ScanQrCode, Monitor } from 'lucide-react';


function App() {
	const [activeComponent, setActiveComponent] = useState('Register');
	const [adminLoggedIn, setAdminLoggedIn] = useState(false);

	useEffect(() => {
		// Check if admin is already logged in
		const adminSession = localStorage.getItem('adminLoggedIn');
		if (adminSession) {
			setAdminLoggedIn(true);
		}
	}, []);

	const handleLogout = () => {
		// Clear session data and log out admin
		localStorage.removeItem('adminLoggedIn');
		setAdminLoggedIn(false);
		setActiveComponent('Register'); // Reset to default component
	};

	const renderComponent = () => {
		if (!adminLoggedIn) {
			// Show the login screen if the admin is not logged in
			return <AdminLogin setAdminLoggedIn={setAdminLoggedIn} />;
		}

		// Render components based on the active menu item if admin is logged in
		switch (activeComponent) {
			case 'Register':
				return <RegisterStudent />;
			case 'ReadQR':
				return <ReadQR />;
			case 'Admin':
				return <Admin onLogout={handleLogout} />;
			default:
				return <RegisterStudent />;
		}
	};


	return (
		<div className="w-dvw h-dvh flex bg-black">
			{adminLoggedIn && (
				<Sidebar>
					<SidebarItem
						icon={<UserPlus />}
						text="Register"
						active={activeComponent === 'Register'}
						onClick={() => setActiveComponent('Register')}
					/>
					<SidebarItem
						icon={<ScanQrCode />}
						text="Scan"
						active={activeComponent === 'ReadQR'}
						onClick={() => setActiveComponent('ReadQR')}
					/>
					<SidebarItem
						icon={<Monitor />}
						text="Logs"
						active={activeComponent === 'Admin'}
						onClick={() => setActiveComponent('Admin')}
					/>
				</Sidebar>
			)}

			<div className="w-full h-full bg-white">{renderComponent()}</div>
		</div>
	);
}

export default App;
