import { FiSidebar } from '../../data/icons';

const ToggleSidebar = ({ onClose }: { onClose: () => void }) => {
  return (
    <button
      onClick={onClose}
      className='cursor-w-resize'
    >
      <FiSidebar className='size-5 text-gray-500 ' />
    </button>
  );
};
export default ToggleSidebar;
