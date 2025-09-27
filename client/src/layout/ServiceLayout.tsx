import { useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';


const ServiceLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 

  // Example data (replace with backend data later)
  const chats = [
    { _id: '1', title: 'First Chat' },
    { _id: '2', title: 'Bug Fix Explainer' },
    { _id: '3', title: 'Summarized Doc' },
  ];

  return (
    <main className='flex flex-col h-screen'>
      <div className='flex flex-1'>
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(!isSidebarOpen)}
          serviceName='Code Explainer'
          chats={chats}
          onNewChat={() => console.log('Start new chat')}
        />

        {/* Main content */}
        <div className='flex-1 overflow-y-auto service-layout border-t border-yellow-100'>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default ServiceLayout;
