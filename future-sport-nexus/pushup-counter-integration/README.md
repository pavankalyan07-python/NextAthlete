# Push-Up Counter Integration

This project integrates a push-up counting functionality using a Python backend with a frontend application. The backend processes video input to count push-up repetitions, while the frontend provides a user interface for interaction.

## Project Structure

```
pushup-counter-integration
├── backend
│   ├── routes
│   │   └── pushup_counter.py
│   ├── app.py
│   └── requirements.txt
├── frontend
│   ├── src
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── vite-env.d.ts
│   │   ├── components
│   │   │   ├── Layout.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── ui
│   │   │       └── ...
│   │   ├── hooks
│   │   │   └── ...
│   │   ├── lib
│   │   │   └── utils.ts
│   │   ├── pages
│   │   │   ├── About.tsx
│   │   │   ├── Challenges.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── NotFound.tsx
│   │   │   ├── Notifications.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── SignUp.tsx
│   │   │   ├── Sports.tsx
│   │   │   └── sports
│   │   │       └── SportDetail.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── README.md
```

## Backend

### `app.py`
This file serves as the entry point for the backend application. It sets up a Flask or FastAPI server to handle requests, including those for starting the push-up counting process.

### `routes/pushup_counter.py`
This file contains the logic for counting push-up repetitions using OpenCV and MediaPipe. It processes video input from the webcam, calculates the angle of the arms, and counts the repetitions based on the defined criteria.

### `requirements.txt`
This file lists the dependencies required for the backend application, such as Flask or FastAPI, OpenCV, and MediaPipe.

## Frontend

### `src/App.tsx`
This file is the main component of the frontend application. It sets up routing and renders the main layout of the application.

### `src/pages/sports/SportDetail.tsx`
This file contains the `SportDetail` component, which displays detailed information about a specific sport, including the push-up counting functionality. It integrates with the backend to start the push-up counting process.

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd pushup-counter-integration
   ```

2. **Backend Setup:**
   - Navigate to the `backend` directory.
   - Install the required dependencies:
     ```
     pip install -r requirements.txt
     ```
   - Run the backend server:
     ```
     python app.py
     ```

3. **Frontend Setup:**
   - Navigate to the `frontend` directory.
   - Install the frontend dependencies:
     ```
     npm install
     ```
   - Start the frontend development server:
     ```
     npm run dev
     ```

## Usage

- Access the frontend application in your browser at `http://localhost:3000`.
- Navigate to the Sports page and use the "Start Recording" feature to begin counting push-ups.

## License

This project is licensed under the MIT License.