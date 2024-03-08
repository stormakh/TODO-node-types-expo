# TODO-expo-node-types

## Description
This project demonstrates the integration of a front-end built with Expo and TypeScript, and a back-end service using Node.js. It provides a simple TODO application with state management and data fetching on the client side, and JWT token signing and a PostgreSQL database hosted on Supabase on the server side.

## Stack
- Frontend:
    - Zustand for state management.
    - TanStack Query for server-state data fetching.

- Backend:
    - Express.js with express-jwt for JWT token signing and verification.
    - Supabase for PostgreSQL database hosting.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (LTS version recommended)
- npm (typically installed with Node.js)
- Expo CLI
- Git (for cloning the repository)

### Running the Frontend
To get the frontend running:

1. Clone the repository and navigate to the front-end directory:
    ```sh
    git clone <repository-url>
    cd TODO-expo-node
    npm install
    ```

2. Change the .env file inside this folder, replace localhost for your actual local ipv4 address in order to have your phone connected to the local server on your machine
    For example, instead of  EXPO_PUBLIC_API_URL=http://localhost:8000 -> go for EXPO_PUBLIC_API_URL=http://192.168.0.116:8000
    You can look for your actual ip by running 'ipconfig' in windows or 'ip addr' in Linux


3. Start the Expo development server:
    ```sh
    npm start
    ```

3. Open the Expo app on your mobile device and scan the QR code displayed in the terminal.

4. The app should now be running on your mobile device.

### Running the Backend
To get the backend running, open a new terminal:

1. Navigate to the backend directory:
    ```sh
    cd api
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Transpile TS into JS:
    ```sh
    npx tsc
    ```


4. Start the server:
    ```sh
    npm start
    ```

5. The backend server should now be running on http://localhost:8000
