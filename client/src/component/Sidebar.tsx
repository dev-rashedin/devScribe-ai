import { useState } from 'react';
import { BiSolidMessageRounded, FiPlus, FiUser } from '../data/icons';
import { Logo } from './ui';
import ToggleSidebar from './ui/ToggleSidebar';
import { capitalizeFirstLetter } from '../utils';

const Sidebar = ({
  isOpen,
  onClose,
  serviceName,
  history,
  onNewChat,
}: SidebarProps) => {
  const [logoDisplay, setLogoDisplay] = useState(true);

  const messages = history.map((item) =>
    item.messages.length > 0 ? item.messages : []
  );

  return (
    <aside
      className={`h-full bg-sidebar drop-shadow 
        transition-[width] duration-300 ease-in-out
        ${isOpen ? 'w-60' : 'w-16'} flex flex-col z-30`}
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
            <div className='flex-center '>
              {logoDisplay ? (
                <div
                  className=' w-10 h-20 rounded-lg flex-center'
                  onMouseEnter={() => setLogoDisplay(false)}
                >
                  <Logo isService />
                </div>
              ) : (
                <div
                  className=' w-10 h-8 rounded-lg flex-center'
                  onMouseLeave={() => setLogoDisplay(true)}
                >
                  <ToggleSidebar onClose={onClose} />
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      <h3
        className={`
    text-lg font-semibold my-8 px-4 overflow-hidden whitespace-nowrap
    ${isOpen ? 'opacity-100 w-auto ml-2' : 'opacity-0 w-0'}
  `}
      >
        {serviceName.includes('-')
          ? capitalizeFirstLetter(serviceName.split('-')[0]) +
            ' ' +
            capitalizeFirstLetter(serviceName.split('-')[1])
          : capitalizeFirstLetter(serviceName)}
      </h3>

      {/* New Chat button */}

      <button
        onClick={onNewChat}
        className={`flex items-center gap-2 m-3 px-1.5 py-3 rounded-lg text-sm font-medium cursor-pointer 
           ${isOpen ? 'justify-start' : 'justify-center'}`}
      >
        <FiPlus size={16} />
        <span
          className={`whitespace-nowrap transition-[opacity,width,margin] duration-300 overflow-hidden 
            ${isOpen ? 'opacity-100 w-auto ml-2' : 'opacity-0 w-0'}`}
        >
          New Chat
        </span>
      </button>

      {/* Chat List */}

      {/* {messages.map((chat) => {
        console.log('chat', chat);
      })} */}

      <div className='flex-1 overflow-y-auto px-2'>
        {messages.map((chat) => (
          <div
            key={chat[0]._id}
            className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer 
               ${isOpen ? 'justify-start' : 'justify-center'}`}
          >
            <BiSolidMessageRounded className='text-xl text-[#446E92]' />
            <span
              className={`text-sm truncate transition-[opacity,width,margin] duration-300 overflow-hidden 
                ${isOpen ? 'opacity-100 w-auto ml-1' : 'opacity-0 w-0'}`}
            >
              {chat[0].content.length > 30
                ? capitalizeFirstLetter(chat[0].content.slice(0, 30)) + '...'
                : capitalizeFirstLetter(chat[0].content)}
            </span>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div
        className={`flex gap-2 p-3 border-t 
          ${isOpen ? 'justify-start' : 'justify-center'}`}
      >
        <div className='size-8 rounded-full bg-gray-300 flex items-center justify-center'>
          <FiUser />
        </div>
        <div
          className={`transition-[opacity,width,margin] duration-300 overflow-hidden 
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
