import type { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 'min(920px, 96%)', maxHeight: '90vh', overflow: 'auto',
        background: 'white', borderRadius: 8, padding: 20, boxShadow: '0 10px 30px rgba(2,6,23,0.2)'
      }}>
        {children}
      </div>
    </div>
  );
}
