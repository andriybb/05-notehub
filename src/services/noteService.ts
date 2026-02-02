import axios from 'axios';
import type { Note } from '../types/note';

interface NoteResponse {
    notes: Note[];
    totalPages: number;

}
interface CreateNoteResponse {
    id: string;
    title: string;}

    interface DeleteNoteResponse {
        id: string;
    }
export async function fetchNotes(search: string, page: number): Promise<NoteResponse> {
    const response = await axios.get<NoteResponse>(
        'https://notehub-public.goit.study/api/notes',
        {
            params: {
                search,
                page,
            },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
            },
        },
    );

    return response.data;
};



export async function createNote(title: string, content: string, tag: string): Promise<CreateNoteResponse> {
    const response = await axios.post(
        'https://notehub-public.goit.study/api/notes',
        {
            title,
            content,
            tag,
        },
        {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
            },
        },
    );

    return response.data;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
    console.log("Attempting to delete note with ID:", id);
    const response = await axios.delete(
        `https://notehub-public.goit.study/api/notes/${id}`,
        {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
            },
        },
    );
    return response.data;
}