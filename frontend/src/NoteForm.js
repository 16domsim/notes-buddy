import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { API_BASE_URL } from "./config";

const NoteForm = ({
  fetchNotes,
  selectedNote,
  clearSelectedNote,
  setError,
  setShowErrorModal,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  /**
   * Populates the form fields with the selected note's data when in edit mode.
   * Clears the form fields when adding a new note.
   */
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setIsEditMode(true);
    } else {
      setTitle("");
      setContent("");
      setIsEditMode(false);
    }
  }, [selectedNote]);

  /**
   * Handles form submission.
   * Creates a new note or updates an existing one based on the `isEditMode` state.
   * Shows an error modal if saving fails.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode && selectedNote) {
        // Update the existing note
        await axios.put(`${API_BASE_URL}/${selectedNote.id}`, {
          title,
          content,
        });
      } else {
        // Create a new note
        await axios.post(`${API_BASE_URL}`, {
          title,
          content,
        });
      }
      fetchNotes();
      clearSelectedNote();
    } catch (error) {
      console.error("Error saving note:", error);
      setError("Our server is not working. Please try again later.");
      setShowErrorModal(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Title input*/}
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            required
          />
        </div>
        {/* Content input*/}
        <div className="form-group mb-3">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content"
            rows="4"
            required
            style={{ resize: "none" }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditMode ? "Update Note" : "Add Note"}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
