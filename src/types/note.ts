export interface Note
    {
        id: string,
        title: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        tag: string
    }
   export type TagType = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

   export interface NoteTagProps {
    tag: TagType;
  }