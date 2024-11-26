## Demo Video

Watch the demo video to see how the AI Assistant works:  
[Watch Demo Video](https://drive.google.com/file/d/1vvF1Npf_c3o6y7jYQRGvszMTPV-CS_ed/view?usp=sharing)

# AI Assistant

The **AI Assistant** is a full-stack application designed to help users search for professionals easily using an AI-powered search tool. It allows users to type or use voice input to perform intelligent searches and retrieve results from a database of professionals.

---

## How AI Assistant Works

### Overview

The AI Assistant application consists of two parts:
1. **Frontend**: A React.js-based user interface that allows users to interact with the application.
2. **Backend**: A Node.js/Express API that processes search queries and retrieves data from a MongoDB database.

---

### Workflow

1. **User Input**:
   - Users can input a query via text or voice.
   - The app captures the voice input using the Web Speech API, transcribes it, and converts it into a query string.
   - The query is sent to the backend API.

2. **Backend Processing**:
   - The backend receives the query via the `/api/assistant/search` endpoint.
   - The query is broken down into keywords for better matching.
   - A search is performed in the MongoDB database using fields like `name`, `category`, and `zone`.
   - Results are sorted based on ranking (ascending) and rating (descending).

3. **Data Retrieval**:
   - Relevant professionals matching the query are retrieved from the database.
   - The backend sends a structured JSON response to the frontend.

4. **Displaying Results**:
   - The frontend processes the response and displays the results in a user-friendly, responsive grid.
   - If no results are found, a SweetAlert notification informs the user.

5. **Error Handling**:
   - The system provides clear error messages for:
     - Invalid or empty search queries.
     - Server or database connection errors.

---

## Functionality Details

### 1. Search Functionality

- **Frontend**:
  - A search bar allows users to type or speak their queries.
  - When the user submits a query, it triggers an API call to the backend.

- **Backend**:
  - Processes the query to extract meaningful keywords.
  - Searches the database using regular expressions for flexible matching.
  - Returns sorted results to ensure the most relevant professionals are shown first.

### 2. Voice Input

- The frontend uses the Web Speech API to enable voice input.
- Users can speak their query, which is transcribed into text automatically.
- The transcribed text is then submitted as a query to the backend.

### 3. Database Interaction

- **MongoDB** is used to store and manage professional data.
- Each professional record contains fields like:
  - `name`: The professional’s name.
  - `category`: Their area of expertise (e.g., healthcare, education).
  - `rating`: A numerical rating for the professional.
  - `ranking`: A ranking to prioritize professionals.
  - `zone`: The locations or regions they serve.
- The backend uses Mongoose to interact with the database and retrieve matching records.

### 4. Responsive Design

- The frontend is built with **Tailwind CSS**, ensuring the app looks great on all devices:
  - Mobile
  - Tablet
  - Desktop

### 5. Error Messages

- **Frontend**:
  - Alerts the user with SweetAlert in case of errors like:
    - No results found.
    - Server errors.
- **Backend**:
  - Handles invalid queries and database errors gracefully by returning appropriate HTTP status codes and error messages.

---

## Example Workflow

### Scenario: Searching for a Doctor

1. **Step 1**: User types or speaks "doctor in Dhaka".
2. **Step 2**: The backend extracts keywords: `doctor` and `Dhaka`.
3. **Step 3**: The database searches for records matching:
   - `Category`: doctor
   - `Zone`: Dhaka
4. **Step 4**: Results are sorted by:
   - `Ranking` (ascending).
   - `Rating` (descending).
5. **Step 5**: The frontend displays a list of professionals with details like:
   - Name
   - Category
   - Rating
   - Zone
   - Additional Information (if available).
6. **Step 6**: If no results are found, a SweetAlert popup notifies the user.

---

## Technical Stack

### Frontend

- **React.js**: Handles user interface and interactions.
- **Tailwind CSS**: Provides responsive and modern styling.
- **SweetAlert2**: Used for displaying beautiful alert messages.

### Backend

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Simplifies building RESTful APIs.
- **Mongoose**: For MongoDB schema modeling and interaction.
- **MongoDB Atlas**: Cloud-hosted database for storing professional data.

---

## Key Features

1. **Intelligent Search**:
   - Matches professionals based on multiple fields (`name`, `category`, `zone`).
   - Flexible keyword matching using regular expressions.

2. **Sorting**:
   - Results are sorted by:
     - `Ranking` (ascending).
     - `Rating` (descending).

3. **Voice Search**:
   - Allows users to search using natural speech.

4. **Responsive Design**:
   - Optimized for all devices (mobile, tablet, desktop).

5. **Error Handling**:
   - Friendly error messages for issues like no results or server errors.

---

## Folder Structure

```plaintext
ai-assistant
├── backend
│   ├── models
│   │   └── Professional.js
│   ├── routes
│   │   └── assistant.js
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── vercel.json
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── InputForm.js
│   │   │   └── ResultDisplay.js
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public
│   ├── .env
│   ├── package.json
│   └── tailwind.config.js
