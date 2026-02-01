import { useState, useEffect } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import toast, {Toaster} from 'react-hot-toast';
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from 'use-debounce';
import Pagination from "../Pagination/Pagination";
function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");



  const [topic, setTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useQuery({

    queryKey: ["notes", topic, currentPage],
    queryFn: () => fetchNotes(topic, currentPage),

    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong. Please try again later.", {
        position: "bottom-center",
      });
    }
  }, [isError]);
  const notes = data?. notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const debouncedFetch = useDebouncedCallback((query: string) => {

    fetch(`https://notehub-public.goit.study/api/notes?search=${query}`)
      .then(res => res.json())
      .then(data => setTopic(data))
      .catch(err => console.error(err));
  }, 500);
  
  const handleSearchChange = (value: string) => {
    setSearchQuery(value); 
    debouncedFetch(value); 
  };
  return (
    <>
       <Toaster />
      <div className={css.app}>
        
        
        <header className={css.toolbar}>
          <SearchBox value={searchQuery} onChange={handleSearchChange} />
          
         
          
          {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
          <button className={css.button}>Create note +</button>
        </header>
      
      {notes && notes.length > 0 && <NoteList notes={notes} />}
    {isError && toast.error("Error loading notes", {
        position: "bottom-left",
      })}
        {isLoading && toast.loading("Loading notes...", {
        position: "bottom-right",
      })}</div>
      </>
  );
}

export default App;
