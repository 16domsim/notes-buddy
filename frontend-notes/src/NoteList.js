import { useEffect, useState } from "react";
import axios from "axios";
import { useCallback } from "react";

import "bootstrap-icons/font/bootstrap-icons.css";
import { API_BASE_URL } from "./config";

const NoteList = ({ refresh, onEdit, setError, setShowErrorModal }) => {
  const [notes, setNotes] = useState([]);

  /**
   * Fetches the list of notes from the server.
   * Shows an error modal if fetching fails.
   */
  const fetchNotes = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Our server is not working. Please try again later.");
      setShowErrorModal(true);
    }
  }, [setError, setShowErrorModal]);

  // Fetch notes when component mounts or refresh is triggered
  useEffect(() => {
    fetchNotes();
  }, [refresh, fetchNotes]);

  /**
   * Deletes a note by its ID.
   * Refreshes the note list after deletion.
   * Shows an error modal if deletion fails.
   *
   * @param {number} id - The ID of the note to delete.
   */
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("Our server is not working. Please try again later.");
      setShowErrorModal(true);
    }
  };

  return (
    <div className="container mt-4">
      <h2>My notes</h2>
      <div className="row">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="col-md-4 mb-3">
              <div className="card note-card">
                {" "}
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.content}</p>
                  {/* Edit Button*/}
                  <button
                    className="btn btn-primary me-2 note-btn"
                    onClick={() => onEdit(note)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  {/* Delete Button*/}
                  <button
                    className="btn btn-danger note-btn"
                    onClick={() => deleteNote(note.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Add a new note by clicking on the + button.</p>
        )}
      </div>
    </div>
  );
};

export default NoteList;
