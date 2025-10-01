import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {Navbar, Sidebar} from '../component';
import { useAuth, useCustomLocation } from '../hooks';
import { fetchHistory } from '../api';
import { Logo } from '../component/ui';
import { generateServiceDesc } from '../utils';

const ServiceLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

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
  const {
    data: history = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['history', user.uid, serviceName],
    queryFn: () => fetchHistory(user.uid, serviceName),
    enabled: !!user.uid,
  });

  // console.log('history', history);

  return (
    <main className='flex flex-col h-screen'>
      <div className='flex flex-1'>
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(!isSidebarOpen)}
          serviceName={serviceName}
          userUid={user?.uid}
          isLoading={isLoading}
          isError={isError}
          history={history}
          activeChatId={activeChatId}
          setActiveChatId={setActiveChatId}
         refetch={refetch}
        />

        {/* Main content */}
        <section className='flex-1 service-layout overflow-x-hidden'>
          <Navbar />
          <div className='my-10 xl:my-20 space-y-20 service-outlet'>
            <div className='flex-col-center max-w-3xl mx-auto text-center gap-y-2 lg:text-lg'>
              <Logo size='lg' />
              {generateServiceDesc(serviceName)}
            </div>
            <Outlet context={{ activeChatId }} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ServiceLayout;
