# note-buddy

This is a simple web application for managing personal notes. The backend is built using Java with Spring Boot, while the frontend is developed using React.js.

## Features

- **Add Note:** Create a new note with a title and content.
- **Edit Note:** Modify the title and content of an existing note.
- **Delete Note:** Remove a note from the list.

## Technologies Used

### Backend

- **Java Spring Boot:** Handles API requests for notes CRUD operations.
- **H2 Database:** An in-memory database for data persistence.
- **Spring Data JPA:** Used for interacting with the database.

### Frontend

- **React.js:** Provides a dynamic and responsive UI.
- **Axios:** Manages HTTP requests between the frontend and backend.
- **Bootstrap:** For UI elements.

## API Endpoints



- `GET /api/notes`: Fetch all notes.
- `POST /api/notes`: Add a new note.
- `PUT /api/notes/{id}`: Update an existing note by its ID.
- `DELETE /api/notes/{id}`: Delete a note by its ID.



## How to Run the Application


### Running the Backend

1. Navigate to the `backend` folder.
2. Run the following command to build the backend:

   ```bash
   mvn clean install
3. Start the Spring Boot application by running:
   ```bash
   mvn spring-boot:run

The backend should now be running at `http://localhost:8080`.

### Running the Frontend

1. Navigate to the `frontend` folder.
2. Install the required Node.js dependencies by running:

   ```bash
   npm install
3. Start the React development server with the following command:
   ```bash
   npm start

The frontend should now be running at `http://localhost:3000`.


