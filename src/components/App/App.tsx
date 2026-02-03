import { useState, useEffect} from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../../components/NoteList/NoteList";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import toast, {Toaster} from 'react-hot-toast';
import SearchBox from "../../components/SearchBox/SearchBox";
import { useDebouncedCallback } from 'use-debounce';
import Pagination from "../../components/Pagination/Pagination";

import Modal from "../../components/Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
function App() {

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedTopic, setDebouncedTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
 
  const { data, isLoading, isError } = useQuery({
 
    queryKey: ['notes', debouncedTopic, currentPage],
    queryFn: () => fetchNotes(debouncedTopic, currentPage),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Error loading notes", { position: "bottom-right" });
    }
  }, [isError]);

 
  const updateSearch = useDebouncedCallback((value: string) => {
    setDebouncedTopic(value);
    setCurrentPage(1); 
  }, 600);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value); 
    updateSearch(value);   
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  
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
          <button className={css.button} onClick={handleOpenModal}>Create note +</button>
        </header>
      
        <main className={css.mainContent}>
          {isLoading && <p className={css.loading}>Loading notes...</p>}
          
          {!isLoading && notes.length > 0 && <NoteList notes={notes} />}
          
          {!isLoading && notes.length === 0 && (
            <p className={css.empty}>No notes found for "{debouncedTopic}"</p>
          )}
        </main>
        {isModalOpen && (
  <Modal onClose={handleCloseModal}>
    <NoteForm onClose={handleCloseModal} />
  </Modal>
)}
        </div>
      </>
  );
}

export default App;
