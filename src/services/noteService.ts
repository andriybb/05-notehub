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
        message: string;
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
        'https://notehub-public.goit.study/api/',
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
    const response = await axios.delete(
        `https://notehub-public.goit.study/api/${id}`,
        {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
            },
        },
    );
    return response.data;
}