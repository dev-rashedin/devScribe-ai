import { useState } from 'react';
import {
  BiSolidMessageRounded,
  FiPenTool,
  FiPlus,
  FiUser,
  HiOutlineDotsHorizontal,
  MdDelete,
  MdOutlineSubtitles,
  MdShare,
} from '../data/icons';
import { LoadingDots, Logo } from './ui';
import ToggleSidebar from './ui/ToggleSidebar';
import { capitalizeFirstLetter, sidebarClasses } from '../utils';
import Error from './Error';

const Sidebar = ({
  isOpen,
  onClose,
  serviceName,
  history,
  isLoading,
  isError,
  activeChatId,
  setActiveChatId,
  onNewChat,
}: SidebarProps) => {
  const [logoDisplay, setLogoDisplay] = useState(true);
  const [popoverOpenId, setPopoverOpenId] = useState<string | null>(null);


  return (
    <aside
      className={` h-full bg-sidebar drop-shadow 
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

      {/* Service Name */}
      <h3
        className={`sidebar-content 
    text-lg lg:text-xl  font-semibold my-8 overflow-hidden whitespace-nowrap
  `}
      >
        <MdOutlineSubtitles />
        <span
          className={`sidebar-content-animation ${sidebarClasses(
            isOpen,
            'span'
          )}`}
        >
          {serviceName.includes('-')
            ? capitalizeFirstLetter(serviceName.split('-')[0]) +
              ' ' +
              capitalizeFirstLetter(serviceName.split('-')[1])
            : capitalizeFirstLetter(serviceName)}
        </span>
      </h3>

      {/* New Chat button */}

      <button
        onClick={onNewChat}
        className={`sidebar-content mb-8 rounded-lg text-sm font-medium  ${sidebarClasses(
          isOpen
        )}`}
      >
        <FiPlus size={16} />
        <span
          className={`sidebar-content-animation ${sidebarClasses(
            isOpen,
            'span'
          )}`}
        >
          New Chat
        </span>
      </button>

      {/* Chat List */}

      {/* {messages.map((chat) => {
        console.log('chat', chat);
      })} */}

      {isLoading && <LoadingDots />}
      {isError && <Error error='Error loading chat history'/>}
      {/* Chat List */}
      <div className='flex-1 overflow-y-auto'>
        {history.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => setActiveChatId(conversation._id)}
            className={`relative group sidebar-content chat-list ${sidebarClasses(
              isOpen
            )} ${activeChatId === conversation._id ? 'chat' : ''}`}
          >
            <BiSolidMessageRounded className='text-xl text-[#446E92]' />
            <span
              className={`text-sm sidebar-content-animation ${sidebarClasses(
                isOpen,
                'span'
              )}`}
            >
              {conversation.messages[0]?.content.length > 20
                ? capitalizeFirstLetter(
                    conversation.messages[0].content.slice(0, 20)
                  ) + '...'
                : capitalizeFirstLetter(
                    conversation.messages[0]?.content || ''
                  )}
            </span>

            <button
              onClick={() =>
                setPopoverOpenId(
                  conversation._id === popoverOpenId ? null : conversation._id
                )
              }
              className='absolute right-2 opacity-0 group-hover:opacity-100'
            >
              <HiOutlineDotsHorizontal />
            </button>

            {/* Popover */}
            {popoverOpenId === conversation._id && (
              <div className='absolute right-0 top-10 z-50 service-layout shadow-2xl px-4 py-8 rounded-xl text-sm space-y-2'>
                <button className='popover-button chat-list'>
                  <MdShare />
                  Share
                </button>
                <button className='popover-button chat-list'>
                  <FiPenTool />
                  Rename
                </button>
                <button className='popover-button chat-list text-red-400'>
                  <MdDelete />
                  Delete
                </button>
              </div>
            )}
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
          className={`sidebar-content-animation 
            ${isOpen ? 'opacity-100 w-auto ml-1' : 'opacity-0 w-0'}`}
        >
          <div className='flex justify-between items-start w-42'>
            <div className='flex flex-col text-sm ml-[2px]'>
              <span className='font-medium'>John Doe</span>
              <span className='text-xs text-gray-500'>Free Plan</span>
            </div>
            <button className='text-xs border primary-border px-2 py-[2px] rounded-full'>
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
