import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BiSolidMessageRounded,
  FiPlus,
  FiUser,
  HiOutlineDotsHorizontal,
  MdOutlineSubtitles,
} from '../data/icons';
import { DeleteModal, LoadingDots, Logo, Popover } from './ui';
import ToggleSidebar from './ui/ToggleSidebar';
import { capitalizeFirstLetter, sidebarClasses } from '../utils';
import Error from './Error';
import { fetchUserById } from '../api';
import { Link } from 'react-router';
import RenamingInput from './ui/RenamingInput';

const Sidebar = ({
  isOpen,
  onClose,
  serviceName,
  history,
  isError,
  isLoading,
  userUid,
  activeChatId,
  setActiveChatId,
  onNewChat,
  refetch,
}: SidebarProps) => {
  const [logoDisplay, setLogoDisplay] = useState(true);
  const [popoverOpenId, setPopoverOpenId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  // fetch user data
  const {
    data: user = {},
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ['user', userUid],
    queryFn: () => fetchUserById(userUid),
    enabled: !!userUid,
  });

  return (
    <aside
      className={`h-full bg-sidebar drop-shadow 
        transition-[width] duration-300 ease-in-out
        ${isOpen ? 'w-60' : 'w-16'} flex flex-col h-screen sticky top-0 z-30`}
    >
      {/* Top Section */}
      <div className='flex items-center justify-between px-2.5'>
        <section className='h-20 flex-center'>
          {isOpen ? (
            <div className='w-50 flex-between text-lg font-semibold'>
              <Logo isService />
              <ToggleSidebar onClose={onClose} />
            </div>
          ) : (
            <div className='flex items-center '>
              {logoDisplay ? (
                <div
                  className='w-10 h-20 rounded-lg flex-center'
                  onMouseEnter={() => setLogoDisplay(false)}
                >
                  <Logo isService />
                </div>
              ) : (
                <div
                  className='w-10 h-8 rounded-lg flex-center'
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
        className={`sidebar-content text-lg lg:text-xl font-semibold my-8 overflow-hidden ${sidebarClasses(
          isOpen
        )}`}
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

      {/* Loading/Error */}
      {isLoading && <LoadingDots />}
      {isError && <Error error='Error loading chat history' />}

      {/* Chat List */}
      <section className='flex-1 overflow-y-auto mb-4'>
        {history.map((conversation) => (
          <div key={conversation._id} className='relative group'>
            <div
              onClick={() => setActiveChatId(conversation._id)}
              className={`relative group sidebar-content chat-list ${sidebarClasses(
                isOpen
              )} ${activeChatId === conversation._id ? 'chat' : ''}`}
            >
              <BiSolidMessageRounded className='text-xl text-[#446E92]' />
              {renamingId === conversation._id ? (
                <RenamingInput
                  renameValue={renameValue}
                  setRenameValue={setRenameValue}
                  setRenamingId={setRenamingId}
                  id={conversation._id}
                  refetch={refetch}
                />
              ) : (
                <span
                  className={`text-sm sidebar-content-animation ${sidebarClasses(
                    isOpen,
                    'span'
                  )}`}
                >
                  {conversation.title.length > 20
                    ? capitalizeFirstLetter(conversation.title.slice(0, 20)) +
                      '...'
                    : capitalizeFirstLetter(conversation.title || '')}
                </span>
              )}
            </div>

            {/* three dot button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPopoverOpenId(conversation._id);
                setAnchorEl(e.currentTarget);
              }}
              className='absolute right-2 top-2.5 opacity-0 group-hover:opacity-100'
            >
              <HiOutlineDotsHorizontal />
            </button>

            {/* Popover */}
            <Popover
              isOpen={popoverOpenId === conversation._id}
              onClose={() => setPopoverOpenId(null)}
              anchorEl={anchorEl}
              id={conversation._id}
              onRequestDelete={() => {
                setPopoverOpenId(null);
                setDeleteModalId(conversation._id);
              }}
              onRename={() => {
                setPopoverOpenId(null);
                setRenamingId(conversation._id);
                setRenameValue(conversation.title);
              }}
            />
          </div>
        ))}
      </section>

      {/* User Profile */}
      <div
        className={`flex gap-2 p-3 border-t ${
          isOpen ? 'justify-start' : 'justify-center'
        }`}
      >
        <div className='size-8 rounded-full bg-gray-300 flex items-center justify-center'>
          <FiUser />
        </div>
        <div
          className={`sidebar-content-animation ${
            isOpen ? 'opacity-100 w-auto ml-1' : 'opacity-0 w-0'
          }`}
        >
          <div className='flex justify-between items-start w-42'>
            {userLoading && <LoadingDots />}
            {userError && <Error error='Error fetching user data' />}
            <div className='flex flex-col text-sm ml-[2px]'>
              {user.displayName && (
                <span className='font-medium'>
                  {user.displayName.length < 20
                    ? user.displayName
                    : user.displayName.slice(0, 20) + '...'}
                </span>
              )}
              <span className='text-xs text-gray-500'>
                {user?.subscription === 'free' ? 'Free Plan' : 'Premium'}
              </span>
            </div>
            <Link
              to='/subscription'
              className='text-xs border primary-border px-2 py-[2px] rounded-full'
            >
              Upgrade
            </Link>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModalId && (
        <DeleteModal
          isOpen={deleteModalId !== null}
          id={deleteModalId}
          onCancel={() => setDeleteModalId(null)}
          refetch={refetch}
        />
      )}
    </aside>
  );
};

export default Sidebar;
