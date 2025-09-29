import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import { useAuth, useCustomLocation } from '../hooks';
import { fetchHistory } from '../api';


const ServiceLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  
  // const [history, setHistory] = useState<HistoryItem[]>([]);
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
  
// fetch history data
    // useEffect(() => {
    //   if (!user?.uid) return;
    //   fetchHistory(user?.uid, serviceName).then((data) => setHistory(data));
  // }, [user?.uid, serviceName]);
  

   const {
     data: history = [],
     isLoading,
     isError,
   } = useQuery({
     queryKey: ['history', user.uid, serviceName],
     queryFn: () => fetchHistory(user.uid, serviceName),
     enabled: !!user.uid,
   });

   if (isLoading) return <p>Loading...</p>;
   if (isError) return <p>Failed to load history</p>;
  
  
  console.log('history', history);
  


  return (
    <main className='flex flex-col h-screen'>
      <div className='flex flex-1'>
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(!isSidebarOpen)}
          serviceName={serviceName}
          history={history}
          onNewChat={() => {}}
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
