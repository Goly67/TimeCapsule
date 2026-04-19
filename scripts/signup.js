// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getFirestore, doc, setDoc, serverTimestamp, query, where, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS7UIstLBEDbqZ54AnWJAPVEHGzi-cmYY",
  authDomain: "time-capsule-app-3949d.firebaseapp.com",
  projectId: "time-capsule-app-3949d",
  storageBucket: "time-capsule-app-3949d.firebasestorage.app",
  messagingSenderId: "857936766098",
  appId: "1:857936766098:web:735ba0c119e3ccf466724b",
  measurementId: "G-LSSL19VW69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Password Requirements Validation
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordRequirements = {
  length: document.getElementById('req-length'),
  uppercase: document.getElementById('req-uppercase'),
  number: document.getElementById('req-number')
};

passwordInput.addEventListener('input', validatePassword);

function validatePassword() {
  const password = passwordInput.value;

  // Check length
  if (password.length >= 8) {
    passwordRequirements.length.classList.add('requirement-met');
  } else {
    passwordRequirements.length.classList.remove('requirement-met');
  }

  // Check uppercase
  if (/[A-Z]/.test(password)) {
    passwordRequirements.uppercase.classList.add('requirement-met');
  } else {
    passwordRequirements.uppercase.classList.remove('requirement-met');
  }

  // Check number
  if (/[0-9]/.test(password)) {
    passwordRequirements.number.classList.add('requirement-met');
  } else {
    passwordRequirements.number.classList.remove('requirement-met');
  }
}

// Helper function to check if username exists
async function checkUsernameExists(username) {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username.toLowerCase()));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking username:', error);
    return false;
  }
}

// Helper function to generate a temporary email from username
function generateTempEmail(username) {
  return `${username.toLowerCase()}@timecapsule.local`;
}

// Signup Form Submission
const signupForm = document.getElementById('signup-form');
const signupButton = document.getElementById('signup-button');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const acceptTerms = document.getElementById('accept-terms').checked;

  // Validate password requirements
  if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    alert('Password must be at least 8 characters, contain 1 uppercase letter, and 1 number.');
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match. Please re-enter.');
    confirmPasswordInput.focus();
    return;
  }

  // Check terms acceptance
  if (!acceptTerms) {
    alert('You must accept the terms and conditions to continue.');
    return;
  }

  // Show loading state
  signupButton.innerHTML = 'Creating account...';
  signupButton.disabled = true;

  try {
    // Check if username already exists
    const usernameExists = await checkUsernameExists(username);
    if (usernameExists) {
      alert('Username already taken. Please choose a different one.');
      signupButton.innerHTML = 'Create Account';
      signupButton.disabled = false;
      return;
    }

    // If email is provided, verify it's valid email format
    let authEmail = email;
    if (!email) {
      // If no email provided, use generated temp email
      authEmail = generateTempEmail(username);
    }
    
    console.log('Creating user with email:', authEmail);
    
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, authEmail, password);
    const user = userCredential.user;
    console.log('Auth user created successfully:', user.uid);

    // Save user data to Firestore
    console.log('Saving user data to Firestore...');
    await setDoc(doc(db, 'users', user.uid), {
      name: name,
      username: username.toLowerCase(),
      email: email || null,
      authEmail: authEmail,
      createdAt: serverTimestamp()
    });
    console.log('User document saved successfully');

    alert('Account created successfully!');

    // Redirect to tutorial.html after successful signup
    window.location.href = 'tutorial.html';
  } catch (error) {
    console.error('Signup error - Code:', error.code);
    console.error('Signup error - Message:', error.message);
    console.error('Full error:', error);
    alert(error.message);
    signupButton.innerHTML = 'Create Account';
    signupButton.disabled = false;
  }
});
