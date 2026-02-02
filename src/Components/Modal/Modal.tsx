
import { useEffect } from 'react';


import css from './Modal.module.css'
import NoteForm from '../../components/NoteForm/NoteForm';

interface NoteModalProps {
  
  onClose: () => void;
}

export default function Modal({ onClose }: NoteModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
    };
}, [onClose]);

const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
};
  
  return (
    <div
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
  onClick={handleBackdropClick}
>
  <div className={css.modal}>
    <NoteForm onClose={onClose} />
  </div>
</div>)}