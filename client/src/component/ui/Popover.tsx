import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiPenTool, MdDelete } from '../../data/icons';

const Popover = ({
  isOpen,
  onClose,
  anchorEl,
  onRequestDelete,
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || !anchorEl) return null;

  // Position relative to anchor
  const rect = anchorEl.getBoundingClientRect();
  const style: React.CSSProperties = {
    position: 'fixed',
    top: rect.bottom + 4 + window.scrollY,
    left: rect.right - 40 + window.scrollX,
    zIndex: 9999,
  };

  return createPortal(
    <div
      ref={popoverRef}
      style={style}
      className='service-layout shadow-xl rounded-lg px-2 pt-4 pb-2 w-28 text-sm space-y-2'
    >
      <button
        onClick={() => {}}
        className='popover-button chat-list flex gap-2'
      >
        <FiPenTool /> Rename
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRequestDelete?.(); // signal parent to close popover and open modal
        }}
        className='popover-button chat-list text-red-400 flex gap-2'
      >
        <MdDelete /> Delete
      </button>
    </div>,
    document.body
  );
};

export default Popover;
