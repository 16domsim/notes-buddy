import { useState } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import { Modal, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

/**
 * The main component that manages the state and UI of the note-taking application.
 * It includes functionality for listing notes, adding/editing/deleting notes, and handling errors.
 */
function App() {
  const [refreshNotes, setRefreshNotes] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  /**
   * Triggers a refresh of the notes list.
   */
  const refreshNotesList = () => {
    setRefreshNotes(!refreshNotes);
  };

  /**
   * Opens the modal for adding a new note.
   */
  const handleNewNote = () => {
    setSelectedNote(null);
    setShowModal(true);
  };

  /**
   * Opens the modal for editing an existing note.
   *
   * @param {Object} note - The note to be edited.
   */
  const handleEditNote = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  /**
   * Closes the modal.
   */
  const clearSelectedNote = () => {
    setSelectedNote(null);
    setShowModal(false);
  };

  /**
   * Closes the error modal and clears the error message.
   */
  const clearError = () => {
    setError("");
    setShowErrorModal(false);
  };

  return (
    <div className="App">
      <div className="container mt-4">
        {/* Note List */}
        <NoteList
          refresh={refreshNotes}
          onEdit={handleEditNote}
          setError={setError}
          setShowErrorModal={setShowErrorModal}
        />

        {/* Button to open the modal for adding/editing a new note */}
        <Button
          variant="primary"
          className="mt-4 note-btn"
          onClick={handleNewNote}
        >
          <i className="bi bi-plus-lg"></i> {}
        </Button>

        {/* Modal for adding/editing notes */}
        <Modal show={showModal} onHide={clearSelectedNote}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedNote ? "Edit Note" : "Add New Note"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NoteForm
              fetchNotes={refreshNotesList}
              selectedNote={selectedNote}
              clearSelectedNote={clearSelectedNote}
              setError={setError}
              setShowErrorModal={setShowErrorModal}
            />
          </Modal.Body>
        </Modal>

        {/* Error Modal */}
        <Modal show={showErrorModal} onHide={clearError}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{error}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={clearError}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;
