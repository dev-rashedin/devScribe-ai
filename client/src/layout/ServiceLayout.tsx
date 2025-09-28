import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import { useAuth, useCustomLocation } from '../hooks';


const ServiceLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { user } = useAuth();
  const { serviceName } = useCustomLocation(); 
  

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize(); 

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 

  // Example data
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
          serviceName={serviceName}
          uid={user?.uid}
          chats={chats}
          onNewChat={() => console.log('Start new chat')}
        />

        {/* Main content */}
        <div className='flex-1 overflow-y-auto service-layout'>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default ServiceLayout;
