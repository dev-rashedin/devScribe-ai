import { FiX, FiPlus } from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string; // e.g. "Code Explainer"
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
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-72 bg-card border-r border-border shadow-md transition-transform duration-300 z-50 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-3 border-b border-border'>
        <h2 className='text-lg font-semibold'>{serviceName}</h2>
        <button onClick={onClose} className='p-1 hover:text-primary'>
          <FiX size={20} />
        </button>
      </div>

      {/* New Chat Button */}
      <div className='px-4 py-3'>
        <button
          onClick={onNewChat}
          className='flex items-center gap-2 w-full px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition'
        >
          <FiPlus size={18} /> New Chat
        </button>
      </div>

      {/* Chats History */}
      <div className='flex-1 overflow-y-auto px-2'>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              className='px-3 py-2 rounded hover:bg-muted cursor-pointer'
            >
              {chat.title}
            </div>
          ))
        ) : (
          <p className='text-sm text-muted px-3 mt-4'>No chats yet</p>
        )}
      </div>

      {/* Footer / Profile */}
      <div className='px-4 py-3 border-t border-border flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <img
            src='https://www.gravatar.com/avatar/?d=mp'
            alt='user'
            className='w-8 h-8 rounded-full'
          />
          <div>
            <p className='text-sm font-medium'>John Doe</p>
            <p className='text-xs text-muted'>Free Plan</p>
          </div>
        </div>
        <button className='text-xs font-medium px-2 py-1 border rounded hover:bg-muted'>
          Upgrade
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
