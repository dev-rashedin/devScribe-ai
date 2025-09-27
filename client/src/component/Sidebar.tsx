import { useState } from 'react';
import { FiPlus, FiUser } from '../data/icons';
import { Logo } from './ui';
import ToggleSidebar from './ui/ToggleSidebar';

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
      className={`h-full bg-sidebar shadow-2xl 
        transition-[width] duration-300 ease-in-out
        ${isOpen ? 'w-60' : 'w-16'} flex flex-col`}
    >
      {/* Top Section */}
      <div className='flex items-center justify-between px-4'>
        <section className='h-20 flex-center'>
          {isOpen ? (
            <div className='w-50 flex-between text-lg font-semibold'>
              <Logo isService />
              <ToggleSidebar onClose={onClose} />
            </div>
          ) : (
            <div className='text-xl flex-center'>
              {logoDisplay ? (
                <div onMouseEnter={() => setLogoDisplay(false)}>
                  <Logo isService />
                </div>
              ) : (
                <div onMouseLeave={() => setLogoDisplay(true)}>
                  <ToggleSidebar onClose={onClose} />
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      <h3
        className={`
    text-lg font-semibold px-4 overflow-hidden whitespace-nowrap
    ${isOpen ? 'opacity-100 w-auto ml-2' : 'opacity-0 w-0'}
  `}
      >
        {serviceName}
      </h3>

      {/* New Chat */}
      <button
        onClick={onNewChat}
        className={`flex items-center gap-2 m-3 px-3 py-2 rounded-lg text-sm font-medium 
          transition-colors ${isOpen ? 'justify-start' : 'justify-center'}`}
      >
        <FiPlus />
        <span
          className={`whitespace-nowrap transition-all duration-300 overflow-hidden 
            ${isOpen ? 'opacity-100 w-auto ml-2' : 'opacity-0 w-0'}`}
        >
          New Chat
        </span>
      </button>

      {/* Chat List */}
      <div className='flex-1 overflow-y-auto px-2'>
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer 
              transition-colors ${isOpen ? 'justify-start' : 'justify-center'}`}
          >
            💬
            <span
              className={`truncate transition-all duration-300 overflow-hidden 
                ${isOpen ? 'opacity-100 w-auto ml-1' : 'opacity-0 w-0'}`}
            >
              {chat.title}
            </span>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div
        className={`flex gap-2 p-3 border-t 
          ${isOpen ? 'justify-start' : 'justify-center'}`}
      >
        <div className='size-9 rounded-full bg-gray-300 flex items-center justify-center'>
          <FiUser />
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden 
            ${isOpen ? 'opacity-100 w-auto ml-1' : 'opacity-0 w-0'}`}
        >
          <div className='flex justify-between items-start w-42'>
            <div className='flex flex-col text-sm ml-[2px]'>
              <span className='font-medium'>John Doe</span>
              <span className='text-xs text-gray-500'>Free Plan</span>
            </div>
            <button className='text-xs border primary-border px-2 py-[2px] rounded-full cursor-pointer'>
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
