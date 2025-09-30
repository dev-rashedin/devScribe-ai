import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  children: ReactNode;
}

const Popover = ({ isOpen, onClose, anchorEl, children }: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);

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

  if (!isOpen || !anchorEl) return null;

  // calculate position relative to anchor
  const rect = anchorEl.getBoundingClientRect();
  const style: React.CSSProperties = {
    position: 'absolute',
    top: rect.bottom + 4,
    left: rect.right - 150,
    zIndex: 9999,
  };

  return createPortal(
    <div
      ref={popoverRef}
      style={style}
      className='bg-white shadow-xl rounded-lg p-2 w-40'
    >
      {children}
    </div>,
    document.body
  );
};

export default Popover;
