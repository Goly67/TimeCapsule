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

// Signup Form Submission
const signupForm = document.getElementById('signup-form');
const signupButton = document.getElementById('signup-button');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
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
    const response = await fetch('https://timecap.glitch.me/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.error);
      signupButton.innerHTML = 'Create Account';
      signupButton.disabled = false;
      return;
    }

    const result = await response.json();
    alert(result.message);

    // Redirect to tutorial.html after successful signup
    window.location.href = 'tutorial.html';
  } catch (error) {
    alert('Error connecting to the server.');
    signupButton.innerHTML = 'Create Account';
    signupButton.disabled = false;
  }
});
