import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';
import toast from 'react-hot-toast';
import css from './NoteList.module.css';
import { useState } from 'react';
interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);
 
  const { mutate: deleteNoteMutation, isPending } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete note');
    },
    onSettled: () => {

      setDeletingId(null);
    }
  });

  return (
    <ul className={css.list}>
    {notes.map((note) => {
      // Перевіряємо, чи саме ця нотатка зараз видаляється
      const isThisNoteDeleting = deletingId === note.id;

      return (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button 
              className={css.button} 
              disabled={isPending} 
              onClick={() => {
                setDeletingId(note.id); 
                deleteNoteMutation(note.id);
              }}
            >
              {isThisNoteDeleting ? 'Deleting this note...' : 'Delete'}
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);
}