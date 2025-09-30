

const DeleteModal = () => {
  return (
    <>
    {deleteModalId &&
            createPortal(
              <div className='fixed inset-0 flex justify-center items-center bg-black/40 z-[1000]'>
                <div className='service-layout shadow-xl rounded-lg p-6 delete-modal'>
                  <p>Are you sure you want to delete this history?</p>
                  <div className='flex justify-end mt-4'>
                    <button
                      onClick={() => setDeleteModalId(null)}
                      className='mr-2 px-4 py-2 bg-gray-200 rounded-lg'
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(deleteModalId)}
                      className='px-4 py-2 bg-red-500 text-white rounded-lg'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>,
              document.body
            )}
    </>
  )
}
export default DeleteModal