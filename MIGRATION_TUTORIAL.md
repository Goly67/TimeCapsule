# Time Capsule Migration: From Glitch to Firebase with Google Drive

This tutorial will guide you through migrating your Time Capsule web app from Glitch to Firebase, using Google Drive for file storage to leverage your own Drive space for free. We'll use Firebase's services for authentication and database, while storing files in Google Drive.

## Prerequisites

- A Google account
- Your Time Capsule project files
- Basic familiarity with Firebase console

## Step 1: Set Up Firebase Project

1. **Go to Firebase Console**
   - Visit [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Sign in with your Google account

2. **Create a New Project**
   - Click "Create a project" or "Add project"
   - Enter project name: `time-capsule-app` (or your preferred name)
   - Choose whether to enable Google Analytics (optional)
   - Click "Create project"

3. **Wait for Project Creation**
   - Firebase will take a few moments to set up your project
   - Once ready, click "Continue"

## Step 2: Enable Required Services

### Authentication
1. In your Firebase project console, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Optionally enable other providers like Google, GitHub, etc.

### Firestore Database
1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (you can change security rules later)
4. Select a location for your database (choose the one closest to your users)
5. Click "Done"

### Storage (Google Drive)
Instead of Firebase Storage, we'll use Google Drive for file storage to leverage your own Drive space for free:

1. **Go to Google Cloud Console**
   - Visit [https://console.cloud.google.com/](https://console.cloud.google.com/)
   - Sign in with your Google account
   - Create a new project or select an existing one

2. **Enable Google Drive API**
   - In the Cloud Console, go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click on it and enable the API

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - If prompted, configure the OAuth consent screen:
     - User Type: External
     - App name: Time Capsule App
     - User support email: Your email
     - Developer contact information: Your email
   - Application type: Web application
   - Authorized JavaScript origins: Add your domain (e.g., `https://your-project.web.app`)
   - Authorized redirect URIs: Add your domain (e.g., `https://your-project.web.app`)
   - Click "Create"
   - Copy the Client ID (you'll need this later)

4. **Configure Google Auth Provider in Firebase**
   - In your Firebase console, go to "Authentication" > "Sign-in method"
   - Enable "Google" as a sign-in provider
   - Add your OAuth Client ID from Google Cloud Console
   - Click "Save"

## Step 3: Configure Web App

1. **Get Firebase Configuration**
   - In your Firebase project console, click the gear icon → "Project settings"
   - Scroll down to "Your apps" section
   - Click the web icon (`</>`) to add a web app
   - Enter app nickname: "Time Capsule Web App"
   - **Important:** Check "Also set up Firebase Hosting" (we'll use this later)
   - Click "Register app"

2. **Copy Configuration Object**
   - Firebase will show you a config object like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com", // Not used with Google Drive
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef123456"
   };
   ```
   - Copy this configuration

3. **Add Google API Configuration**
   - You'll also need your Google OAuth Client ID from the Cloud Console
   - Add this to your configuration:
   ```javascript
   const GOOGLE_CLIENT_ID = "your-google-oauth-client-id.apps.googleusercontent.com";
   const GOOGLE_API_KEY = "your-google-api-key"; // If using API key for additional features
   ```

4. **Update Your Code**
   - Open `index.html` in your project
   - Replace the placeholder Firebase config with your actual config:
   ```javascript
   // Replace this:
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   // With your actual config from Firebase console
   ```

   - Add Google API configuration:
   ```javascript
   // Add these constants for Google Drive integration
   const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
   const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"; // Optional, for advanced features
   ```

## Step 4: Update Code for Firebase (Replace Glitch API Calls)

Your code currently makes API calls to `https://timecap2.glitch.me`. We need to replace these with Firebase operations. Here are the key functions to update:

### Import Firebase Functions
Add these imports to the top of your `script.js`:

```javascript
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit 
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Remove Firebase Storage imports - we'll use Google Drive instead
// import { ref, uploadBytes, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';

// Add Google APIs script to index.html
// <script src="https://apis.google.com/js/api.js"></script>
```

### Replace Capsule Loading
Replace this Glitch API call:
```javascript
const response = await fetch(`https://timecap2.glitch.me/api/capsules?userId=${currentUser.id}`)
const userCapsules = await response.json()
```

With Firebase Firestore query:
```javascript
async function loadCapsules() {
  if (!auth.currentUser) return [];
  
  try {
    const q = query(
      collection(db, 'capsules'), 
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const capsules = [];
    querySnapshot.forEach((doc) => {
      capsules.push({ id: doc.id, ...doc.data() });
    });
    return capsules;
  } catch (error) {
    console.error('Error loading capsules:', error);
    return [];
  }
}
```

### Replace Capsule Creation
Replace Glitch API calls with:
```javascript
async function createCapsule(capsuleData) {
  try {
    const docRef = await addDoc(collection(db, 'capsules'), {
      ...capsuleData,
      userId: auth.currentUser.uid,
      createdAt: new Date(),
      isArchived: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating capsule:', error);
    throw error;
  }
}
```

### Replace User Search
Replace:
```javascript
const response = await fetch(`https://timecap2.glitch.me/api/users/search?q=${encodeURIComponent(query)}`)
const users = await response.json()
```

With:
```javascript
async function searchUsers(query) {
  try {
    // Note: Firestore doesn't have built-in text search
    // You might want to use a search service like Algolia or implement simple email search
    const q = query(
      collection(db, 'users'), 
      where('email', '>=', query),
      where('email', '<=', query + '\uf8ff'),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
}
```

### Replace Archive/Unarchive Operations
Replace:
```javascript
const response = await fetch(`https://timecap2.glitch.me/api/capsules/${capsuleId}/archive`, { method: 'PUT' })
```

With:
```javascript
async function archiveCapsule(capsuleId) {
  try {
    const capsuleRef = doc(db, 'capsules', capsuleId);
    await updateDoc(capsuleRef, { isArchived: true });
  } catch (error) {
    console.error('Error archiving capsule:', error);
  }
}
```

### Replace Delete Operation
Replace:
```javascript
const response = await fetch(`https://timecap2.glitch.me/api/capsules/${capsuleToDelete}`, { method: 'DELETE' })
```

With:
```javascript
async function deleteCapsule(capsuleId) {
  try {
    await deleteDoc(doc(db, 'capsules', capsuleId));
  } catch (error) {
    console.error('Error deleting capsule:', error);
  }
}
```

### File Upload to Google Drive
Replace any file upload logic with Google Drive API calls. First, add this initialization code after Firebase initialization:

```javascript
// Initialize Google API
function initGoogleAPI() {
  gapi.load('auth2', function() {
    gapi.auth2.init({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/drive.file'
    });
  });
  
  gapi.load('picker', function() {
    // Google Picker will be initialized when needed
  });
}

// Call this after Firebase initializes
initGoogleAPI();
```

Then replace the Firebase Storage upload function with:

```javascript
async function uploadCapsuleFile(file, capsuleId) {
  try {
    // Authenticate with Google
    const googleAuth = gapi.auth2.getAuthInstance();
    if (!googleAuth.isSignedIn.get()) {
      await googleAuth.signIn();
    }
    
    // Create file metadata
    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: ['YOUR_GOOGLE_DRIVE_FOLDER_ID'] // Create a dedicated folder for your app
    };
    
    // Upload file
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);
    
    const accessToken = googleAuth.currentUser.get().getAuthResponse().access_token;
    
    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: form
    });
    
    const result = await response.json();
    
    // Make file publicly accessible (optional, for sharing)
    await fetch(`https://www.googleapis.com/drive/v3/files/${result.id}/permissions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        role: 'reader',
        type: 'anyone'
      })
    });
    
    // Return the file ID and web view link
    return {
      id: result.id,
      url: `https://drive.google.com/uc?id=${result.id}`,
      name: result.name
    };
    
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    throw error;
  }
}
```

### Update Forgot Password (`forgot-password.js`)
Replace the Glitch API URL:
```javascript
const API_BASE_URL = "https://timecap2.glitch.me";
```

With Firebase Auth operations:
```javascript
// Firebase is initialized in index.html
const auth = window.auth;

// Replace API calls with Firebase Auth
async function sendPasswordResetEmail(email) {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

**Important:** Update all instances of Glitch API calls throughout your JavaScript files. Search for `timecap2.glitch.me` and replace each API call with the corresponding Firebase operation.

## Step 5: Deploy to Firebase Hosting

1. **Install Firebase CLI**
   - Open terminal/command prompt
   - Install Firebase CLI globally:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```
   - This will open a browser for authentication

3. **Initialize Firebase in Your Project**
   - Navigate to your project directory
   - Run:
   ```bash
   firebase init
   ```
   - Select "Hosting" from the options
   - Choose your Firebase project
   - Specify public directory: `.` (current directory)
   - Configure as single-page app: Yes
   - Don't overwrite `index.html`: No

4. **Deploy Your App**
   ```bash
   firebase deploy
   ```
   - Firebase will provide a hosting URL like: `https://your-project.web.app`

## Step 6: Security Rules (Important!)

Before going live, update your security rules:

### Firestore Rules
Go to Firestore → Rules in Firebase console:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /capsules/{capsuleId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    // Allow reading shared capsules
    match /shared/{shareId} {
      allow read: if true; // You might want to add more restrictions
    }
  }
}
```

### Storage Rules
Since we're using Google Drive instead of Firebase Storage, security is handled through:

1. **OAuth Scopes**: Limited to `https://www.googleapis.com/auth/drive.file` (only files created by your app)
2. **File Permissions**: Files are made publicly readable only when shared
3. **User Authentication**: Google OAuth ensures only authenticated users can upload
4. **Folder Organization**: Use a dedicated Google Drive folder for your app's files

## Step 7: Testing Your Migration

1. **Test Authentication**
   - Try signing up a new user
   - Test login/logout functionality
   - Test password reset flow

2. **Test Capsule Creation**
   - Create a new time capsule
   - Add text, images, files
   - Set opening date
   - Verify data saves to Firestore

3. **Test File Uploads**
   - Upload images or documents to Google Drive
   - Verify files appear in your designated Drive folder
   - Check that download URLs work for shared files
   - Test file permissions for shared capsules

4. **Test Sharing**
   - Share a capsule link
   - Verify shared capsules load correctly
   - Test notifications for shared capsules

5. **Test Search and Archive**
   - Search for users
   - Archive/unarchive capsules
   - Delete capsules

## Step 8: Production Security Rules

Before going live, update your security rules from test mode to production:

### Firestore Security Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own capsules
    match /capsules/{capsuleId} {
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Users can read capsules shared with them
    match /capsules/{capsuleId} {
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/capsules/$(capsuleId)) &&
        get(/databases/$(database)/documents/capsules/$(capsuleId)).data.recipients.hasAny(recipient => recipient.id == request.auth.uid);
    }
    
    // User profiles
    match /users/{userId} {
      allow read: if true; // Allow reading user profiles for search
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Storage Security Rules
With Google Drive integration:

- **OAuth Scope Limitation**: Use only `drive.file` scope to limit access to files created by your app
- **File Permissions**: Only make files publicly accessible when they need to be shared
- **User Consent**: Users must grant permission for your app to access their Drive
- **Regular Audits**: Monitor your Google Cloud Console for unusual activity
- **API Quotas**: Be aware of Google Drive API rate limits (1 billion requests/day free tier)

## Google Drive Integration Details

### Setting Up a Dedicated Folder
1. Create a folder in Google Drive for your app's files
2. Get the folder ID from the URL: `https://drive.google.com/drive/folders/FOLDER_ID`
3. Use this folder ID in your upload function

### Handling File Sharing
When users share time capsules, you'll need to:
1. Update file permissions to allow access for recipients
2. Store file metadata in Firestore with sharing information
3. Generate shareable links using Google Drive's sharing features

### Code Example for File Sharing
```javascript
async function shareCapsuleFile(fileId, recipientEmail) {
  const googleAuth = gapi.auth2.getAuthInstance();
  const accessToken = googleAuth.currentUser.get().getAuthResponse().access_token;
  
  // Share with specific user
  await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      role: 'reader',
      type: 'user',
      emailAddress: recipientEmail
    })
  });
}
```

### Security Considerations
- **Scope Limitation**: Only request necessary permissions (`drive.file`)
- **User Consent**: Clearly explain what access you're requesting
- **Data Privacy**: Files remain in users' Google Drive accounts
- **API Limits**: Monitor usage to avoid hitting free tier limits
- **Backup Strategy**: Consider how to handle account deletion or access revocation
- **File Organization**: Use consistent folder structures for easy management

## Troubleshooting

### Common Issues

1. **Config Not Working**
   - Double-check your Firebase config object
   - Ensure project ID matches exactly

2. **Authentication Errors**
   - Verify Authentication is enabled in Firebase console
   - Check browser console for detailed errors

3. **File Upload Issues**
   - Confirm Google Drive API is enabled
   - Check OAuth credentials are correct
   - Verify user has granted Drive permissions
   - Check browser console for Google API errors

4. **Google Drive API Errors**
   - Ensure correct OAuth scopes are configured
   - Check API quotas in Google Cloud Console
   - Verify folder ID exists and is accessible
   - Test with Google Drive API Explorer

4. **Deployment Problems**
   - Ensure Firebase CLI is logged in
   - Check that you're in the correct project directory

### Getting Help

- Firebase Documentation: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- Stack Overflow: Search for "Firebase [your issue]"
- Firebase Community: [https://firebase.google.com/community](https://firebase.google.com/community)

## Next Steps

1. Monitor your app's usage in Firebase console
2. Set up proper security rules for production
3. Consider enabling Firebase Analytics for user insights
4. Set up automated deployments with GitHub Actions if desired

Your Time Capsule app is now successfully migrated to Firebase! 🎉