import { createPortal } from 'react-dom';
import { axiosSecureApi } from '../../api';
import { StatusCodes } from 'http-status-toolkit';



const DeleteModal = ({ isOpen, id, onCancel, onDeleted }: DeleteModalProps) => {
  if (!isOpen || !id) return null;

  const handleDelete = async () => {
    try {
      const res = await axiosSecureApi.delete(`/history/${id}`);
      if (res.status === StatusCodes.OK) {
        onDeleted?.(); 
        onCancel(); 
      } else {
        console.error('Failed to delete history');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return createPortal(
    <div className='fixed inset-0 flex justify-center items-center bg-black/40 z-[1000]'>
      <div className='service-layout shadow-xl rounded-lg p-6 delete-modal'>
        <p>Are you sure you want to delete this history?</p>
        <div className='flex justify-end mt-4'>
          <button
            onClick={onCancel}
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
    </div>,
    document.body
  );
};

export default DeleteModal;
