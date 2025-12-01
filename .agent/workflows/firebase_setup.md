---
description: How to retrieve Firebase configuration keys and set up .env.local
---

# Setting up Firebase Configuration

This guide explains how to get your Firebase configuration keys and set up the `.env.local` file for the D Tracker application.

## Prerequisites
- A Google account
- Access to the [Firebase Console](https://console.firebase.google.com/)

## Steps

1.  **Go to Project Settings**:
    - Open the [Firebase Console](https://console.firebase.google.com/).
    - Click on your project (e.g., "D-Tracker").
    - Click the **Gear icon** (Settings) next to "Project Overview" in the left sidebar.
    - Select **Project settings**.

2.  **Locate Your App**:
    - Scroll down to the **Your apps** section.
    - If you haven't created a web app yet, click the **</>** (Web) icon to register your app.
    - If your app is already created, select it from the list.

3.  **Copy the Config**:
    - Look for the **SDK setup and configuration** card.
    - Select **Config** (not CDN).
    - You will see a code snippet like this:
      ```javascript
      const firebaseConfig = {
        apiKey: "AIzaSy...",
        authDomain: "d-tracker-....firebaseapp.com",
        projectId: "d-tracker-...",
        storageBucket: "d-tracker-....firebasestorage.app",
        messagingSenderId: "...",
        appId: "1:..."
      };
      ```

4.  **Create .env.local**:
    - In the root folder of your project (where `package.json` is), create a new file named `.env.local`.
    - **Note**: This file is ignored by git, so your keys remain private.

5.  **Add Keys to .env.local**:
    - Copy the values from the Firebase console and paste them into `.env.local` using the following format:

      ```env
      NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
      NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
      ```

6.  **Restart the Server**:
    - If your development server is running, stop it (Ctrl+C) and restart it (`npm run dev`) for the changes to take effect.
