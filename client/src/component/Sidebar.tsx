import { useState } from 'react';
import { FiPlus, FiX, FiUser } from '../data/icons';
import { Logo } from './ui';
import CloseIcon from './ui/ToggleSidebar';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  chats: { _id: string; title: string }[];
  onNewChat: () => void;
}

const Sidebar = ({
  isOpen,
  onClose,
  serviceName,
  chats,
  onNewChat,
}: SidebarProps) => {

  const [logoDisplay, setLogoDisplay] = useState(true);

  return (
    <aside
      className={`h-full bg-sidebar shadow-2xl transition-all duration-300 
        ${isOpen ? 'w-72' : 'w-16'} flex flex-col`}
    >
      {/* Top Section */}
      <div className='flex items-center justify-between px-4'>
        <section className='h-20 flex-center'>
          {isOpen ? (
            <div className='flex-between gap-4 lg:gap-8 text-lg font-semibold'>
              <Logo isService />
              <CloseIcon onClose={onClose} />
            </div>
          ) : (
            <div className='text-xl font-bold' >
                <img onMouseEnter={() => setLogoDisplay(false)} onMouseLeave={() => setLogoDisplay(true)} src='/logo.png' alt='logo' className={`size-8 cursor-pointer ${logoDisplay ? 'block' : 'hidden'}`} />
                <div className={`${logoDisplay ? 'hidden' : 'block'}`}>
                  <CloseIcon onClose={onClose} />
                </div>
            </div>
          )}
        </section>
      </div>

      {/* New Chat */}
      <button
        onClick={onNewChat}
        className={`flex items-center gap-2 m-3 px-3 py-2 rounded-lg text-sm font-medium 
        hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors
        ${isOpen ? 'justify-start' : 'justify-center'}`}
      >
        <FiPlus />
        {isOpen && 'New Chat'}
      </button>

      {/* Chat List */}
      <div className='flex-1 overflow-y-auto px-2'>
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer 
            hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors
            ${isOpen ? 'justify-start' : 'justify-center'}`}
          >
            💬
            {isOpen && <span className='truncate'>{chat.title}</span>}
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div
        className={`flex items-center gap-2 p-3 border-t 
        ${isOpen ? 'justify-start' : 'justify-center'}`}
      >
        <div className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center'>
          <FiUser />
        </div>
        {isOpen && (
          <div className='flex flex-col text-sm'>
            <span className='font-medium'>John Doe</span>
            <span className='text-xs text-gray-500'>Free Plan</span>
            <button className='text-blue-500 text-xs'>Upgrade</button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
