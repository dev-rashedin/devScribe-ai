import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiPenTool, MdDelete } from '../../data/icons';
import { axiosApi } from '../../api';
import { StatusCodes } from 'http-status-toolkit';


const Popover = ({ isOpen, onClose, anchorEl, id }: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleDelete = async() => { 
    const res = await axiosApi.delete(`/history/${id}`);

    if (res.status === StatusCodes.OK) {
      onClose();
    } else {
      console.error('Failed to delete history');
    }


  };
  const handleRename = () => { };

  if (!isOpen || !anchorEl) return null;

  // calculate position relative to anchor
  const rect = anchorEl.getBoundingClientRect();
  const style: React.CSSProperties = {
    position: 'absolute',
    top: rect.bottom + 4,
    left: rect.right - 40,
    zIndex: 9999,
  };

  return createPortal(
    <div
      ref={popoverRef}
      style={style}
      className='service-layout shadow-xl rounded-lg px-2 pt-4 pb-2 w-28 text-sm space-y-2'
    >
      <button onClick={handleRename} className='popover-button chat-list flex gap-2'>
        <FiPenTool /> Rename
      </button>

      <button
        onClick={() => {
          setDeleteModalOpen(true);
          onClose()
        }}
        className='popover-button chat-list text-red-400 flex gap-2'
      >
        <MdDelete /> Delete
      </button>

      {deleteModalOpen && (
        <div className='fixed  top-0 left-0 w-full h-full flex justify-center items-center '>
          <div className='bg-white rounded-lg p-4'>
            <p>Are you sure you want to delete this history?</p>
            <div className='flex justify-end mt-4'>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className='mr-2 px-4 py-2 bg-gray-200 rounded-lg'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='px-4 py-2 bg-red-500 text-white rounded-lg'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default Popover;
